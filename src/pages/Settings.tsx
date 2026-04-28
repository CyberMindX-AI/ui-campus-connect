import { useState, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User, Shield, Bell, Store, Eye, Trash2, Camera, Loader2, Check, X, CreditCard } from 'lucide-react';
import Layout from '@/components/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { uploadAvatar, authService } from '@/services/auth.service';

const tabs = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'security', label: 'Security', icon: Shield },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'store', label: 'Store', icon: Store },
  { id: 'verification', label: 'Verification', icon: Shield },
  { id: 'privacy', label: 'Privacy', icon: Eye },
  { id: 'account', label: 'Account', icon: Trash2 },
];

const Settings = () => {
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState(searchParams.get('tab') || 'profile');
  const { user, login } = useAuth();
  const { toast } = useToast();
  const [name, setName] = useState(user?.fullname || 'Student');
  const [nickname, setNickname] = useState(user?.nickname || '');
  const [bio, setBio] = useState('');
  const [avatarUrl, setAvatarUrl] = useState(user?.avatar || '');
  const [studentIdUrl, setStudentIdUrl] = useState(user?.student_id_url || '');
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [uploadingId, setUploadingId] = useState(false);
  const [savingProfile, setSavingProfile] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const idInputRef = useRef<HTMLInputElement>(null);

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user?.id) return;

    // Validate file type and size
    if (!file.type.startsWith('image/')) {
      toast({ title: 'Invalid file', description: 'Please select an image file.', variant: 'destructive' });
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast({ title: 'File too large', description: 'Avatar must be under 5MB.', variant: 'destructive' });
      return;
    }

    setUploadingAvatar(true);
    try {
      const publicUrl = await uploadAvatar(user.id, file);
      setAvatarUrl(publicUrl);
      // Update the auth context cache with the new avatar
      login({ ...user, avatar: publicUrl });
      toast({ title: 'Avatar updated!', description: 'Your profile picture has been changed.' });
    } catch (error: any) {
      toast({
        title: 'Upload failed',
        description: error.message || 'Could not upload avatar. Make sure the "avatars" storage bucket exists.',
        variant: 'destructive',
      });
    } finally {
      setUploadingAvatar(false);
    }
  };

  const handleIdUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user?.id) return;

    setUploadingId(true);
    try {
      const publicUrl = await authService.uploadStudentId(user.id, file);
      setStudentIdUrl(publicUrl);
      // Update profile with ID URL
      await authService.updateProfile(user.id, { student_id_url: publicUrl });
      login({ ...user, student_id_url: publicUrl });
      toast({ title: 'ID Uploaded!', description: 'Your Student ID has been submitted for verification.' });
    } catch (error: any) {
      toast({ title: 'Upload failed', description: error.message, variant: 'destructive' });
    } finally {
      setUploadingId(false);
    }
  };

  const handleSave = async () => {
    if (!user?.id) return;
    setSavingProfile(true);
    try {
      await authService.updateProfile(user.id, { fullname: name, nickname: nickname });
      login({ ...user, fullname: name, nickname: nickname });
      toast({ title: 'Settings saved!', description: 'Your changes have been applied.' });
    } catch (error: any) {
      toast({ title: 'Save failed', description: error.message, variant: 'destructive' });
    } finally {
      setSavingProfile(false);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6 sm:py-8">
        <h1 className="font-heading text-xl font-bold text-foreground sm:text-2xl">Settings</h1>

        <div className="mt-6 grid gap-6 lg:grid-cols-4">
          {/* Tabs */}
          <div className="flex gap-2 overflow-x-auto lg:flex-col">
            {tabs.map((t) => (
              <button key={t.id} onClick={() => setActiveTab(t.id)}
                className={`flex items-center gap-2 whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  activeTab === t.id ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-muted'
                }`}>
                <t.icon className="h-4 w-4" /> {t.label}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            {activeTab === 'profile' && (
              <div className="rounded-xl border border-border bg-card p-4 sm:p-6 space-y-6">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    {avatarUrl ? (
                      <img
                        src={avatarUrl}
                        alt={name}
                        className="h-20 w-20 rounded-full object-cover border-2 border-border"
                        onError={(e) => { (e.target as HTMLImageElement).src = '/placeholder.svg'; }}
                      />
                    ) : (
                      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">
                        {name.charAt(0).toUpperCase()}
                      </div>
                    )}
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      disabled={uploadingAvatar}
                      className="absolute bottom-0 right-0 flex h-7 w-7 items-center justify-center rounded-full bg-accent text-accent-foreground hover:bg-accent/80 transition-colors disabled:opacity-50"
                    >
                      {uploadingAvatar ? <Loader2 className="h-3 w-3 animate-spin" /> : <Camera className="h-3 w-3" />}
                    </button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      className="sr-only"
                      onChange={handleAvatarChange}
                    />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{name}</p>
                    <p className="text-sm text-muted-foreground">{user?.email || 'student@ui.edu.ng'}</p>
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="text-xs text-primary hover:underline mt-1"
                      disabled={uploadingAvatar}
                    >
                      {uploadingAvatar ? 'Uploading...' : 'Change photo'}
                    </button>
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" value={name} onChange={(e) => setName(e.target.value)} className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="faculty">Faculty</Label>
                    <Input id="faculty" value={user?.faculty || 'Science'} className="mt-1" readOnly />
                  </div>
                </div>
                <div>
                  <Label htmlFor="nickname">Public Nickname (Optional)</Label>
                  <Input id="nickname" value={nickname} onChange={(e) => setNickname(e.target.value)} className="mt-1" placeholder="e.g. Ade" />
                  <p className="mt-1 text-xs text-muted-foreground">This is the name buyers will see on your listings.</p>
                </div>
                <div>
                  <Label htmlFor="bio">Bio</Label>
                  <textarea id="bio" value={bio} onChange={(e) => setBio(e.target.value)}
                    className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm" rows={3}
                    placeholder="Tell others about yourself..." />
                </div>
                <Button variant="hero" onClick={handleSave} disabled={savingProfile}>
                  {savingProfile ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" />Saving...</> : 'Save Changes'}
                </Button>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="rounded-xl border border-border bg-card p-4 sm:p-6 space-y-6">
                <h2 className="font-heading text-lg font-semibold text-foreground">Security</h2>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="currentPw">Current Password</Label>
                    <Input id="currentPw" type="password" className="mt-1" />
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div><Label htmlFor="newPw">New Password</Label><Input id="newPw" type="password" className="mt-1" /></div>
                    <div><Label htmlFor="confirmPw">Confirm Password</Label><Input id="confirmPw" type="password" className="mt-1" /></div>
                  </div>
                  <Button variant="hero" onClick={() => toast({ title: 'Password updated!' })}>Update Password</Button>
                </div>
                <hr className="border-border" />
                <div>
                  <h3 className="text-sm font-semibold text-foreground">Two-Factor Authentication</h3>
                  <p className="mt-1 text-xs text-muted-foreground">Add an extra layer of security with email OTP</p>
                  <Button variant="outline" size="sm" className="mt-3">Enable 2FA</Button>
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="rounded-xl border border-border bg-card p-4 sm:p-6 space-y-4">
                <h2 className="font-heading text-lg font-semibold text-foreground">Notification Preferences</h2>
                {['New messages', 'Order updates', 'New reviews', 'Payment confirmations', 'Wishlist alerts', 'Platform announcements'].map((pref) => (
                  <div key={pref} className="flex items-center justify-between rounded-lg border border-border p-3">
                    <span className="text-sm text-foreground">{pref}</span>
                    <div className="flex gap-4">
                      <label className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <input type="checkbox" defaultChecked className="accent-primary" /> Email
                      </label>
                      <label className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <input type="checkbox" defaultChecked className="accent-primary" /> Push
                      </label>
                    </div>
                  </div>
                ))}
                <Button variant="hero" onClick={() => toast({ title: 'Preferences saved!' })}>Save Preferences</Button>
              </div>
            )}

            {activeTab === 'store' && (
              <div className="rounded-xl border border-border bg-card p-4 sm:p-6 space-y-4">
                <h2 className="font-heading text-lg font-semibold text-foreground">Store Settings</h2>
                <div><Label htmlFor="storeName">Store Name</Label><Input id="storeName" className="mt-1" placeholder="Your Store Name" /></div>
                <div><Label htmlFor="storeDesc">Store Description</Label>
                  <textarea id="storeDesc" className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm" rows={3} placeholder="Describe your store..." />
                </div>
                <div><Label htmlFor="returnPolicy">Return Policy</Label>
                  <textarea id="returnPolicy" className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm" rows={2} placeholder="Your return/exchange policy..." />
                </div>
                <div><Label htmlFor="pickup">Pickup Location</Label><Input id="pickup" className="mt-1" placeholder="e.g. Kuti Hall Room 205" /></div>
                <Button variant="hero" onClick={() => toast({ title: 'Store settings saved!' })}>Save Store Settings</Button>
              </div>
            )}

            {activeTab === 'verification' && (
              <div className="rounded-xl border border-border bg-card p-4 sm:p-6 space-y-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Shield className="h-6 w-6" />
                  </div>
                  <div>
                    <h2 className="font-heading text-lg font-semibold text-foreground">Account Verification</h2>
                    <p className="text-sm text-muted-foreground">Verify your identity as a UI student</p>
                  </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-4">
                    <div className="rounded-lg border border-border p-4">
                      <h3 className="text-sm font-bold text-foreground mb-2">Email Verification</h3>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {user?.email_verified ? (
                            <Check className="h-4 w-4 text-emerald-500" />
                          ) : (
                            <X className="h-4 w-4 text-slate-300" />
                          )}
                          <span className="text-sm font-medium">{user?.email_verified ? 'Verified' : 'Unverified'}</span>
                        </div>
                        {!user?.email_verified && (
                          <Button size="sm" variant="outline">Verify Now</Button>
                        )}
                      </div>
                    </div>

                    <div className="rounded-lg border border-border p-4">
                      <h3 className="text-sm font-bold text-foreground mb-2">Student ID Verification</h3>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {user?.student_id_verified ? (
                            <Check className="h-4 w-4 text-emerald-500" />
                          ) : (
                            <X className="h-4 w-4 text-slate-300" />
                          )}
                          <span className="text-sm font-medium">{user?.student_id_verified ? 'Verified' : 'Pending Review'}</span>
                        </div>
                        {!user?.student_id_verified && (
                          <Button size="sm" variant="outline" onClick={() => idInputRef.current?.click()} disabled={uploadingId}>
                            {uploadingId ? 'Uploading...' : studentIdUrl ? 'Re-upload ID' : 'Upload ID'}
                          </Button>
                        )}
                        <input ref={idInputRef} type="file" className="sr-only" onChange={handleIdUpload} accept="image/*" />
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-50 rounded-xl p-4 flex flex-col items-center justify-center border-2 border-dashed border-slate-200">
                    {studentIdUrl ? (
                      <div className="space-y-3 w-full text-center">
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Submitted Document</p>
                        <img src={studentIdUrl} alt="Student ID" className="max-h-32 mx-auto rounded-lg shadow-sm border border-border" />
                        <p className="text-[10px] text-muted-foreground italic">Admin will review this document within 24 hours.</p>
                      </div>
                    ) : (
                      <div className="text-center space-y-2">
                        <CreditCard className="h-8 w-8 text-slate-300 mx-auto" />
                        <p className="text-sm font-medium text-slate-500">No document uploaded</p>
                        <p className="text-xs text-slate-400">Upload a clear photo of your UI Student ID card</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'privacy' && (
              <div className="rounded-xl border border-border bg-card p-4 sm:p-6 space-y-4">
                <h2 className="font-heading text-lg font-semibold text-foreground">Privacy</h2>
                <div className="flex items-center justify-between rounded-lg border border-border p-3">
                  <div><p className="text-sm font-medium text-foreground">Profile Visibility</p><p className="text-xs text-muted-foreground">Allow other users to see your profile</p></div>
                  <input type="checkbox" defaultChecked className="accent-primary h-4 w-4" />
                </div>
                <div className="flex items-center justify-between rounded-lg border border-border p-3">
                  <div><p className="text-sm font-medium text-foreground">Show Online Status</p><p className="text-xs text-muted-foreground">Let others see when you're online</p></div>
                  <input type="checkbox" defaultChecked className="accent-primary h-4 w-4" />
                </div>
                <Button variant="hero" onClick={() => toast({ title: 'Privacy settings saved!' })}>Save Privacy Settings</Button>
              </div>
            )}

            {activeTab === 'account' && (
              <div className="rounded-xl border border-border bg-card p-4 sm:p-6 space-y-6">
                <h2 className="font-heading text-lg font-semibold text-foreground">Account</h2>
                <div className="rounded-lg border border-border p-4">
                  <h3 className="text-sm font-medium text-foreground">Export Data</h3>
                  <p className="mt-1 text-xs text-muted-foreground">Download a copy of all your data</p>
                  <Button variant="outline" size="sm" className="mt-3">Request Export</Button>
                </div>
                <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4">
                  <h3 className="text-sm font-medium text-yellow-800">Deactivate Account</h3>
                  <p className="mt-1 text-xs text-yellow-600">Temporarily disable your account</p>
                  <Button variant="outline" size="sm" className="mt-3 border-yellow-300 text-yellow-700">Deactivate</Button>
                </div>
                <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-4">
                  <h3 className="text-sm font-medium text-destructive">Delete Account</h3>
                  <p className="mt-1 text-xs text-muted-foreground">Permanently delete your account. 30-day grace period applies.</p>
                  <Button variant="destructive" size="sm" className="mt-3">Delete Account</Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Settings;