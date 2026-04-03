import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User, Shield, Bell, Store, Eye, Trash2, Camera } from 'lucide-react';
import Layout from '@/components/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const tabs = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'security', label: 'Security', icon: Shield },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'store', label: 'Store', icon: Store },
  { id: 'privacy', label: 'Privacy', icon: Eye },
  { id: 'account', label: 'Account', icon: Trash2 },
];

const Settings = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const { user } = useAuth();
  const { toast } = useToast();
  const [name, setName] = useState(user?.fullname || 'Student');
  const [bio, setBio] = useState('');

  const handleSave = () => {
    toast({ title: 'Settings saved!', description: 'Your changes have been applied.' });
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
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">
                      {name.charAt(0)}
                    </div>
                    <button className="absolute bottom-0 right-0 flex h-7 w-7 items-center justify-center rounded-full bg-accent text-accent-foreground">
                      <Camera className="h-3 w-3" />
                    </button>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{name}</p>
                    <p className="text-sm text-muted-foreground">{user?.email || 'student@ui.edu.ng'}</p>
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
                  <Label htmlFor="bio">Bio</Label>
                  <textarea id="bio" value={bio} onChange={(e) => setBio(e.target.value)}
                    className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm" rows={3}
                    placeholder="Tell others about yourself..." />
                </div>
                <Button variant="hero" onClick={handleSave}>Save Changes</Button>
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
                  <Button variant="hero" onClick={handleSave}>Update Password</Button>
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
                <Button variant="hero" onClick={handleSave}>Save Preferences</Button>
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
                <Button variant="hero" onClick={handleSave}>Save Store Settings</Button>
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
                <Button variant="hero" onClick={handleSave}>Save Privacy Settings</Button>
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