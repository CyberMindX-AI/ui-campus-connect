import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useAdminData } from '@/hooks/api/useAdmin';
import {
  ShieldCheck, Users, Package, Store, AlertTriangle, TrendingUp,
  CheckCircle, XCircle, Eye, Ban, Search, BarChart, MessageSquare,
  Clock, DollarSign, Flag, Settings, Activity, ArrowUpRight, ArrowDownRight,
  Trash2, UserCheck, UserX, FileText, Bell, LogOut, Loader2, Mail, CreditCard, Shield
} from 'lucide-react';
import { notificationService } from '@/services/notification.service';
import { authService } from '@/services/auth.service';

// Placeholder for local state if needed
const INITIAL_USERS: any[] = [];
const INITIAL_REPORTS: any[] = [];

const ADMIN_CREDENTIALS = { email: 'admin@ui.edu.ng', password: 'Admin@2025' };

const Admin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [isAdminAuth, setIsAdminAuth] = useState(() => {
    return sessionStorage.getItem('ui_admin_auth') === 'true';
  });
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const { 
    products: productsQuery, 
    sellers: sellersQuery, 
    reports: reportsQuery, 
    transactions: transactionsQuery,
    users: usersQuery,
    approveProductMutation, 
    rejectProductMutation, 
    approveSellerMutation 
  } = useAdminData();

  const approveProduct = approveProductMutation.mutateAsync;
  const rejectProduct = rejectProductMutation.mutateAsync;
  const approveSeller = approveSellerMutation.mutateAsync;

  const products = productsQuery.data || [];
  const sellers = sellersQuery.data || [];
  const reportsData = reportsQuery.data || [];
  const transactionsData = transactionsQuery.data || [];
  const usersData = usersQuery.data || [];
  
  const [processingId, setProcessingId] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
  const [selectedSeller, setSelectedSeller] = useState<any | null>(null);
  const [rejectReason, setRejectReason] = useState('');
  const [showRejectDialog, setShowRejectDialog] = useState(false);
  const [rejectType, setRejectType] = useState<'product' | 'seller'>('product');
  const [rejectId, setRejectId] = useState('');
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);
  const [approvedIds, setApprovedIds] = useState<Set<string>>(new Set());
  const [rejectedIds, setRejectedIds] = useState<Set<string>>(new Set());
  const [platformSettings, setPlatformSettings] = useState({
    maintenanceMode: false,
    newRegistrations: true,
    sellerAutoApproval: false,
    productAutoApproval: false,
    maxListingPrice: 5000000,
    escrowEnabled: true,
    emailNotifications: true,
  });

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminEmail === ADMIN_CREDENTIALS.email && adminPassword === ADMIN_CREDENTIALS.password) {
      setIsAdminAuth(true);
      sessionStorage.setItem('ui_admin_auth', 'true');
      setAuthError('');
      toast({ title: '✅ Welcome, Admin', description: 'You are now logged into the admin dashboard.' });
    } else {
      setAuthError('Invalid admin credentials. Please try again.');
    }
  };

  const handleAdminLogout = () => {
    setIsAdminAuth(false);
    sessionStorage.removeItem('ui_admin_auth');
    navigate('/');
  };

  if (!isAdminAuth) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#EFF6FF]">
        <div className="w-full max-w-md px-4">
          <div className="rounded-2xl border border-[#BFDBFE] bg-white p-8 shadow-xl">
            <div className="mb-6 text-center">
              <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-xl bg-[#2563EB]">
                <ShieldCheck className="h-8 w-8 text-white" />
              </div>
              <h1 className="font-heading text-2xl font-bold text-[#1E3A5F]">Admin Access</h1>
              <p className="mt-1 text-sm text-[#64748B]">UI Marketplace Control Center</p>
            </div>
            <form onSubmit={handleAdminLogin} className="space-y-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-[#1E3A5F]">Admin Email</label>
                <Input
                  type="email"
                  placeholder="admin@ui.edu.ng"
                  value={adminEmail}
                  onChange={e => setAdminEmail(e.target.value)}
                  className="border-[#BFDBFE] focus:border-[#2563EB] focus:ring-[#2563EB]"
                  required
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-[#1E3A5F]">Password</label>
                <div className="relative">
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter admin password"
                    value={adminPassword}
                    onChange={e => setAdminPassword(e.target.value)}
                    className="border-[#BFDBFE] pr-10 focus:border-[#2563EB] focus:ring-[#2563EB]"
                    required
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#64748B] hover:text-[#1E3A5F]">
                    <Eye className="h-4 w-4" />
                  </button>
                </div>
              </div>
              {authError && (
                <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600">{authError}</div>
              )}
              <Button type="submit" className="w-full bg-[#2563EB] text-white hover:bg-[#1D4ED8]">
                <ShieldCheck className="mr-2 h-4 w-4" /> Sign In as Admin
              </Button>
            </form>
            <div className="mt-4 text-center">
              <button onClick={() => navigate('/')} className="text-sm text-[#2563EB] hover:underline">← Back to Marketplace</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const handleApproveProduct = async (product: any) => {
    const id = product.id;
    setProcessingId(id);
    try {
      await approveProduct(id);
      
      // Optimistic UI update: mark as approved locally so it changes immediately
      setApprovedIds(prev => new Set(prev).add(id));
      
      // Send notification to seller
      await notificationService.sendNotification({
        user_id: product.seller_id,
        title: 'Product Approved',
        message: `Your product "${product.title}" has been approved and is now live on the marketplace.`,
        type: 'success'
      });

      setSelectedProduct(null);
      toast({ title: '✅ Approved', description: `"${product.title}" is now live.` });
    } catch (error: any) {
      toast({ title: 'Error', description: error.message || 'Failed to approve product.', variant: 'destructive' });
    } finally {
      setProcessingId(null);
    }
  };

  const handleRejectItem = async () => {
    try {
      if (rejectType === 'product') {
        const product = products.find(p => p.id === rejectId);
        setRejectedIds(prev => new Set(prev).add(rejectId));
        await rejectProduct({ id: rejectId, reason: rejectReason });

        if (product) {
          await notificationService.sendNotification({
            user_id: product.seller_id,
            title: 'Product Rejected',
            message: `Your product "${product.title}" was rejected. Reason: ${rejectReason}. Please update and resubmit if applicable.`,
            type: 'error'
          });
        }
      } else if (rejectType === 'seller') {
        // Find the seller application user_id
        const sellerApp = sellers.find((s: any) => s.id === rejectId);
        if (sellerApp) {
          await notificationService.sendNotification({
            user_id: sellerApp.user_id,
            title: 'Seller Application Rejected',
            message: `Your seller application has been rejected. Reason: ${rejectReason}. Please contact admin for more information.`,
            type: 'error'
          });
        }
      }
      setShowRejectDialog(false);
      setRejectReason('');
      setSelectedProduct(null);
      setSelectedSeller(null);
    } catch (error: any) {
      setRejectedIds(prev => { const s = new Set(prev); s.delete(rejectId); return s; });
      toast({ title: 'Error', description: error.message || 'Failed to reject item.', variant: 'destructive' });
    }
  };

  const handleApproveSeller = async (id: string, userId: string) => {
    try {
      await approveSeller({ applicationId: id, userId });
      // Send approval notification to seller
      await notificationService.sendNotification({
        user_id: userId,
        title: 'Seller Application Approved',
        message: 'Congratulations! Your seller application has been approved. You can now list products on UI Marketplace.',
        type: 'success'
      });
      setSelectedSeller(null);
      toast({ title: 'Seller Approved', description: 'The user has been granted seller status.' });
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to approve seller.', variant: 'destructive' });
    }
  };

  const handleViewId = async (path: string) => {
    try {
      const signedUrl = await authService.getStudentIdUrl(path);
      if (signedUrl) {
        window.open(signedUrl, '_blank');
      } else {
        toast({ title: 'Error', description: 'Could not generate access URL for ID.', variant: 'destructive' });
      }
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to fetch ID document.', variant: 'destructive' });
    }
  };

  const toggleUserStatus = (id: string) => {
    // Requires a mutation to the backend in production
    toast({ title: 'User Updated', description: 'User status change requested.' });
  };

  const resolveReport = (id: string, action: string) => {
    // Requires a mutation to the backend in production
    toast({ title: 'Report Resolved', description: `Action taken: ${action}` });
  };

  const stats = {
    totalUsers: usersData.length,
    activeUsers: usersData.filter((u: any) => u.status === 'active').length,
    totalSellers: usersData.filter((u: any) => (u.role === 'seller' || u.role === 'both') && u.student_id_verified === true).length,
    pendingProducts: products.length,
    pendingSellers: sellers.length,
    pendingReports: reportsData.filter((r: any) => r.status === 'pending').length,
    totalRevenue: transactionsData.reduce((acc: number, t: any) => acc + (tx_amount(t)), 0),
    monthlyGrowth: 0,
    totalTransactions: transactionsData.length,
    disputeRate: transactionsData.length > 0 ? (reportsData.length / transactionsData.length * 100).toFixed(1) : 0,
  };

  function tx_amount(tx: any) {
    return tx.amount || 0;
  }

  return (
    <>
      <div className="min-h-screen bg-[#EFF6FF]">
        {/* Admin Header */}
        <div className="bg-[#2563EB] text-white">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20">
                  <ShieldCheck className="h-7 w-7" />
                </div>
                <div>
                  <h1 className="font-heading text-2xl font-bold">Admin Dashboard</h1>
                  <p className="text-sm text-white/70">UI Marketplace Control Center</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="border-white/30 text-white">
                  <Activity className="mr-1 h-3 w-3" /> System Online
                </Badge>
                <Button size="sm" variant="outline" className="border-white/30 text-white hover:bg-white/10" onClick={handleAdminLogout}>
                  <LogOut className="mr-1 h-4 w-4" /> Logout
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-6">
          {/* Stats Overview */}
          <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <Users className="h-5 w-5 text-[#2563EB]" />
                  <span className="flex items-center text-xs text-green-600"><ArrowUpRight className="h-3 w-3" /> 0%</span>
                </div>
                <p className="mt-2 text-2xl font-bold text-foreground">{stats.totalUsers}</p>
                <p className="text-xs text-muted-foreground">Total Students</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <Store className="h-5 w-5 text-[#2563EB]" />
                  <span className="flex items-center text-xs text-green-600"><ArrowUpRight className="h-3 w-3" /> 0%</span>
                </div>
                <p className="mt-2 text-2xl font-bold text-foreground">{stats.totalSellers}</p>
                <p className="text-xs text-muted-foreground">Verified Sellers</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <ShieldCheck className="h-5 w-5 text-emerald-500" />
                </div>
                <p className="mt-2 text-2xl font-bold text-foreground">{stats.activeUsers}</p>
                <p className="text-xs text-muted-foreground">Active Students</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <Package className="h-5 w-5 text-orange-500" />
                </div>
                <p className="mt-2 text-2xl font-bold text-foreground">{stats.pendingProducts}</p>
                <p className="text-xs text-muted-foreground">Pending Products</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <Flag className="h-5 w-5 text-destructive" />
                </div>
                <p className="mt-2 text-2xl font-bold text-foreground">{stats.pendingReports}</p>
                <p className="text-xs text-muted-foreground">Open Reports</p>
              </CardContent>
            </Card>
          </div>

          {/* Main Tabs */}
          <Tabs defaultValue="products" className="space-y-4">
            <TabsList className="flex h-auto flex-wrap gap-1 bg-muted p-1">
              <TabsTrigger value="products" className="gap-1 text-xs sm:text-sm">
                <Package className="h-4 w-4" /> Products <Badge variant="secondary" className="ml-1 h-5 px-1.5 text-[10px]">{products.length}</Badge>
              </TabsTrigger>
              <TabsTrigger value="sellers" className="gap-1 text-xs sm:text-sm">
                <Store className="h-4 w-4" /> Sellers <Badge variant="secondary" className="ml-1 h-5 px-1.5 text-[10px]">{sellers.length}</Badge>
              </TabsTrigger>
              <TabsTrigger value="users" className="gap-1 text-xs sm:text-sm">
                <Users className="h-4 w-4" /> Users
              </TabsTrigger>
              <TabsTrigger value="transactions" className="gap-1 text-xs sm:text-sm">
                <DollarSign className="h-4 w-4" /> Transactions
              </TabsTrigger>
              <TabsTrigger value="reports" className="gap-1 text-xs sm:text-sm">
                <Flag className="h-4 w-4" /> Reports <Badge variant="destructive" className="ml-1 h-5 px-1.5 text-[10px]">{reportsData.filter((r: any) => r.status === 'pending').length}</Badge>
              </TabsTrigger>
              <TabsTrigger value="settings" className="gap-1 text-xs sm:text-sm">
                <Settings className="h-4 w-4" /> Settings
              </TabsTrigger>
            </TabsList>

            {/* PENDING PRODUCTS TAB */}
            <TabsContent value="products" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Package className="h-5 w-5 text-[#2563EB]" /> Product Approval Queue
                  </CardTitle>
                  <CardDescription>Review and approve product listings before they go live.</CardDescription>
                </CardHeader>
                <CardContent>
                  {products.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <CheckCircle className="mb-3 h-12 w-12 text-[#2563EB]/30" />
                      <p className="font-medium text-foreground">All caught up!</p>
                      <p className="text-sm text-muted-foreground">No products pending review.</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {products.map(product => (
                        <div key={product.id} className="flex flex-col gap-3 rounded-xl border border-border p-4 transition-colors hover:bg-muted/30 sm:flex-row sm:items-center sm:justify-between">
                          <div className="flex items-start gap-3">
                            <img src={product.images?.[0] || '/placeholder.svg'} alt="" className="h-16 w-16 rounded-lg border border-border bg-muted object-cover" onError={(e) => { (e.target as HTMLImageElement).src = '/placeholder.svg'; }} />
                            <div className="min-w-0">
                              <h4 className="font-medium text-foreground">{product.title}</h4>
                              <p className="text-sm text-muted-foreground">by {product.seller?.fullname || product.seller_id}</p>
                              <div className="mt-1 flex flex-wrap gap-1.5">
                                <Badge variant="outline" className="text-[10px]">{product.category}</Badge>
                                <Badge variant="outline" className="text-[10px]">{product.condition}</Badge>
                                <span className="text-sm font-semibold text-[#2563EB]">₦{product.price.toLocaleString()}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {approvedIds.has(product.id) ? (
                              <span className="flex items-center gap-1 rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-700">
                                <CheckCircle className="h-3 w-3" /> Approved
                              </span>
                            ) : rejectedIds.has(product.id) ? (
                              <span className="flex items-center gap-1 rounded-full bg-red-100 px-3 py-1 text-xs font-bold text-red-700">
                                <XCircle className="h-3 w-3" /> Rejected
                              </span>
                            ) : (
                              <>
                                <Button size="sm" variant="outline" onClick={() => setSelectedProduct(product)}>
                                  <Eye className="mr-1 h-3 w-3" /> Review
                                </Button>
                                  <Button 
                                    size="sm" 
                                    className="bg-[#2563EB] text-white hover:bg-[#1D4ED8]" 
                                    onClick={() => handleApproveProduct(product)}
                                    disabled={processingId === product.id}
                                  >
                                    {processingId === product.id ? (
                                      <Loader2 className="h-3 w-3 animate-spin" />
                                    ) : (
                                      <CheckCircle className="mr-1 h-3 w-3" />
                                    )} 
                                    Approve
                                  </Button>
                                  <Button 
                                    size="sm" 
                                    variant="destructive" 
                                    onClick={() => { setRejectType('product'); setRejectId(product.id); setShowRejectDialog(true); }}
                                    disabled={processingId === product.id}
                                  >
                                    <XCircle className="mr-1 h-3 w-3" /> Reject
                                  </Button>
                              </>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* PENDING SELLERS TAB */}
            <TabsContent value="sellers" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Store className="h-5 w-5 text-[#2563EB]" /> Seller Approval Queue
                  </CardTitle>
                  <CardDescription>Review seller applications before granting marketplace access.</CardDescription>
                </CardHeader>
                <CardContent>
                  {sellers.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <CheckCircle className="mb-3 h-12 w-12 text-[#2563EB]/30" />
                      <p className="font-medium text-foreground">All caught up!</p>
                      <p className="text-sm text-muted-foreground">No seller applications pending.</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {sellers.map(seller => (
                        <div key={seller.id} className="flex flex-col gap-3 rounded-xl border border-border p-4 transition-colors hover:bg-muted/30 sm:flex-row sm:items-center sm:justify-between">
                          <div className="flex items-start gap-3">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#2563EB]/10 font-bold text-[#2563EB]">
                              {seller.name.charAt(0)}
                            </div>
                            <div className="min-w-0">
                              <h4 className="font-medium text-foreground">{seller.name}</h4>
                              <p className="text-sm text-muted-foreground">{seller.email} · {seller.faculty}</p>
                              <p className="text-xs text-muted-foreground">Store: <span className="font-medium text-foreground">{seller.storeName}</span></p>
                              <p className="mt-1 text-xs text-muted-foreground">Applied {new Date(seller.created_at).toLocaleDateString()}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button size="sm" variant="outline" onClick={() => setSelectedSeller(seller)}>
                              <Eye className="mr-1 h-3 w-3" /> View
                            </Button>
                            <Button size="sm" className="bg-[#2563EB] text-white hover:bg-[#1D4ED8]" onClick={() => handleApproveSeller(seller.id, seller.user_id)}>
                              <UserCheck className="mr-1 h-3 w-3" /> Approve
                            </Button>
                            <Button size="sm" variant="destructive" onClick={() => { setRejectType('seller'); setRejectId(seller.id); setShowRejectDialog(true); }}>
                              <UserX className="mr-1 h-3 w-3" /> Reject
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* USERS TAB */}
            <TabsContent value="users" className="space-y-4">
              <Card>
                <CardHeader>
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <Users className="h-5 w-5 text-[#2563EB]" /> All Users
                      </CardTitle>
                      <CardDescription>{usersData.length} registered users</CardDescription>
                    </div>
                    <div className="relative w-full sm:w-64">
                      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input placeholder="Search users..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>User</TableHead>
                          <TableHead>Role</TableHead>
                          <TableHead>Faculty</TableHead>
                          <TableHead>Status</TableHead>
                  <TableHead>Orders</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {usersData.filter((u: any) => !search || (u.fullname || '').toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase())).map((u: any) => (
                          <TableRow key={u.id}>
                            <TableCell>
                              <div>
                                <div className="flex items-center gap-2 flex-wrap">
                                  <p className="font-medium text-foreground">
                                    {u.fullname}
                                    {u.nickname && <span className="text-muted-foreground font-normal"> ({u.nickname})</span>}
                                  </p>
                                  {u.badge_type && u.badge_type !== 'none' && (
                                    <Badge variant="secondary" className="bg-amber-100 text-amber-700 hover:bg-amber-100 text-[10px] py-0">
                                      <Shield className="mr-1 h-3 w-3" /> {u.badge_type}
                                    </Badge>
                                  )}
                                </div>
                                <p className="text-xs text-muted-foreground">{u.email}</p>
                                <div className="mt-1 flex flex-wrap gap-1">
                                  <Badge variant={u.email_verified ? "outline" : "secondary"} className={u.email_verified ? "text-emerald-600 border-emerald-200 bg-emerald-50" : "text-slate-400"}>
                                    <Mail className="mr-1 h-3 w-3" /> {u.email_verified ? 'Email Verified' : 'Email Unverified'}
                                  </Badge>
                                  {(u.role === 'seller' || u.role === 'both') && (
                                    <Badge variant={u.student_id_verified ? "outline" : "secondary"} className={u.student_id_verified ? "text-blue-600 border-blue-200 bg-blue-50" : "text-slate-400"}>
                                      <CreditCard className="mr-1 h-3 w-3" /> {u.student_id_verified ? 'ID Verified' : 'ID Unverified'}
                                    </Badge>
                                  )}
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge variant={u.role === 'seller' ? 'default' : u.role === 'both' ? 'secondary' : 'outline'} className="capitalize">{u.role}</Badge>
                            </TableCell>
                            <TableCell className="text-sm text-muted-foreground">{u.faculty}</TableCell>
                            <TableCell>
                              <Badge variant={u.status === 'active' ? 'default' : 'destructive'} className="capitalize">{u.status}</Badge>
                            </TableCell>
                            <TableCell className="text-sm">{u.totalOrders}</TableCell>
                            <TableCell className="text-right">
                              <div className="flex items-center justify-end gap-1 flex-wrap">
                                {/* View Student ID */}
                                {u.student_id_url && (
                                  <Button size="sm" variant="ghost" onClick={() => handleViewId(u.student_id_url)} title="View Student ID">
                                    <CreditCard className="h-4 w-4" />
                                  </Button>
                                )}
                                {/* Verify Student ID - only for sellers */}
                                {(u.role === 'seller' || u.role === 'both') && u.student_id_url && !u.student_id_verified && (
                                  <Button size="sm" variant="outline" className="text-xs text-blue-600 border-blue-200 hover:bg-blue-50" onClick={async () => {
                                    try {
                                      const { adminService: svc } = await import('@/services/admin.service');
                                      await svc.verifyStudentId(u.id);
                                      await (await import('@/services/notification.service')).notificationService.sendNotification({
                                        user_id: u.id,
                                        title: 'Student ID Verified',
                                        message: 'Your Student ID has been verified by admin. You can now list products.',
                                        type: 'success'
                                      });
                                      toast({ title: 'ID Verified', description: `${u.fullname}'s Student ID is now verified.` });
                                    } catch(e: any) { toast({ title: 'Error', description: e.message, variant: 'destructive' }); }
                                  }}>
                                    <UserCheck className="h-3 w-3 mr-1" /> Verify ID
                                  </Button>
                                )}
                                {/* Assign Badge - only for sellers */}
                                {(u.role === 'seller' || u.role === 'both') && (
                                  <Select onValueChange={async (val) => {
                                    try {
                                      const { adminService: svc } = await import('@/services/admin.service');
                                      await svc.assignBadge(u.id, val);
                                      toast({ title: 'Badge Assigned', description: `${u.fullname} now has the "${val}" badge.` });
                                    } catch(e: any) { toast({ title: 'Error', description: e.message, variant: 'destructive' }); }
                                  }}>
                                    <SelectTrigger className="h-7 w-[110px] text-[11px] border-amber-200 text-amber-700">
                                      <SelectValue placeholder="Assign Badge" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="none">Remove Badge</SelectItem>
                                      <SelectItem value="verified">Verified</SelectItem>
                                      <SelectItem value="top-seller">Top Seller</SelectItem>
                                      <SelectItem value="trusted">Trusted</SelectItem>
                                      <SelectItem value="featured">Featured</SelectItem>
                                    </SelectContent>
                                  </Select>
                                )}
                                {/* Ban/Unban */}
                                <Button size="sm" variant="ghost" onClick={() => toggleUserStatus(u.id)}>
                                  {u.status === 'active' ? <Ban className="h-4 w-4 text-destructive" /> : <CheckCircle className="h-4 w-4 text-[#2563EB]" />}
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* TRANSACTIONS TAB */}
            <TabsContent value="transactions" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <DollarSign className="h-5 w-5 text-accent" /> Recent Transactions
                  </CardTitle>
                  <CardDescription>Monitor all marketplace transactions and escrow status.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>ID</TableHead>
                          <TableHead>Product</TableHead>
                          <TableHead>Buyer</TableHead>
                          <TableHead>Seller</TableHead>
                          <TableHead>Amount</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Date</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {transactionsData.map((tx: any) => (
                          <TableRow key={tx.id}>
                            <TableCell className="font-mono text-xs text-muted-foreground">{tx.id}</TableCell>
                             <TableCell className="font-medium text-foreground">{tx.product?.title || 'Unknown Product'}</TableCell>
                            <TableCell className="text-sm">{tx.buyer?.fullname || 'Student'}</TableCell>
                            <TableCell className="text-sm">{tx.seller?.fullname || 'Seller'}</TableCell>
                            <TableCell className="font-semibold text-foreground">₦{(tx.amount || 0).toLocaleString()}</TableCell>
                            <TableCell>
                              <Badge variant={tx.status === 'completed' ? 'default' : tx.status === 'disputed' ? 'destructive' : 'secondary'} className="capitalize">
                                {tx.status.replace('_', ' ')}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-sm text-muted-foreground">{new Date(tx.created_at).toLocaleDateString()}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* REPORTS TAB */}
            <TabsContent value="reports" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Flag className="h-5 w-5 text-destructive" /> Reports & Flags
                  </CardTitle>
                  <CardDescription>Handle reported products, users, and policy violations.</CardDescription>
                </CardHeader>
                <CardContent>
                  {reportsData.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <CheckCircle className="mb-3 h-12 w-12 text-[#2563EB]/30" />
                      <p className="font-medium text-foreground">No open reports</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {reportsData.map((report: any) => (
                        <div key={report.id} className="flex flex-col gap-3 rounded-xl border border-border p-4 sm:flex-row sm:items-center sm:justify-between">
                          <div>
                            <div className="flex items-center gap-2">
                              <Badge variant={report.type === 'product' ? 'outline' : 'secondary'} className="capitalize text-[10px]">{report.type}</Badge>
                              <Badge variant={report.status === 'pending' ? 'destructive' : 'secondary'} className="capitalize text-[10px]">{report.status}</Badge>
                            </div>
                            <h4 className="mt-1 font-medium text-foreground">{report.title}</h4>
                            <p className="text-sm text-muted-foreground">{report.reason}</p>
                             <p className="text-xs text-muted-foreground">Reported by {report.reporter?.fullname || 'Student'} · {new Date(report.created_at).toLocaleDateString()}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button size="sm" variant="outline" onClick={() => resolveReport(report.id, 'Warning issued')}>
                              <AlertTriangle className="mr-1 h-3 w-3" /> Warn
                            </Button>
                            <Button size="sm" variant="destructive" onClick={() => resolveReport(report.id, 'Item removed')}>
                              <Trash2 className="mr-1 h-3 w-3" /> Remove
                            </Button>
                            <Button size="sm" variant="ghost" onClick={() => resolveReport(report.id, 'Dismissed')}>
                              Dismiss
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* SETTINGS TAB */}
            <TabsContent value="settings" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Platform Controls</CardTitle>
                    <CardDescription>Toggle core platform features.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {[
                      { key: 'maintenanceMode' as const, label: 'Maintenance Mode', desc: 'Take the platform offline for maintenance' },
                      { key: 'newRegistrations' as const, label: 'New Registrations', desc: 'Allow new users to register' },
                      { key: 'sellerAutoApproval' as const, label: 'Auto-Approve Sellers', desc: 'Automatically approve seller applications' },
                      { key: 'productAutoApproval' as const, label: 'Auto-Approve Products', desc: 'Skip manual product review' },
                      { key: 'escrowEnabled' as const, label: 'Escrow System', desc: 'Hold payments until delivery confirmation' },
                      { key: 'emailNotifications' as const, label: 'Email Notifications', desc: 'Send email alerts to users' },
                    ].map(setting => (
                      <div key={setting.key} className="flex items-center justify-between rounded-lg border border-border p-3">
                        <div>
                          <p className="text-sm font-medium text-foreground">{setting.label}</p>
                          <p className="text-xs text-muted-foreground">{setting.desc}</p>
                        </div>
                        <Switch
                          checked={platformSettings[setting.key] as boolean}
                          onCheckedChange={(val) => setPlatformSettings(prev => ({ ...prev, [setting.key]: val }))}
                        />
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Quick Actions</CardTitle>
                    <CardDescription>Common administrative actions.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button variant="outline" className="w-full justify-start gap-2">
                      <Bell className="h-4 w-4" /> Send Platform Announcement
                    </Button>
                    <Button variant="outline" className="w-full justify-start gap-2">
                      <FileText className="h-4 w-4" /> Export User Data (CSV)
                    </Button>
                    <Button variant="outline" className="w-full justify-start gap-2">
                      <BarChart className="h-4 w-4" /> Generate Analytics Report
                    </Button>
                    <Button variant="outline" className="w-full justify-start gap-2">
                      <MessageSquare className="h-4 w-4" /> View Support Tickets
                    </Button>
                    <Button variant="destructive" className="w-full justify-start gap-2">
                      <AlertTriangle className="h-4 w-4" /> Clear All Cache
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Product Review Dialog */}
      <Dialog open={!!selectedProduct} onOpenChange={(open) => { if (!open) { setSelectedProduct(null); setSelectedImageIdx(0); } }}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Review Product Listing</DialogTitle>
            <DialogDescription>Verify images and details before approving this listing.</DialogDescription>
          </DialogHeader>
          {selectedProduct && (
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-3">
                <div 
                  className="aspect-square rounded-xl overflow-hidden border border-border bg-muted cursor-zoom-in group relative"
                  onClick={() => window.open(selectedProduct.images?.[selectedImageIdx], '_blank')}
                  title="Click to view full size"
                >
                  <img 
                    src={selectedProduct.images?.[selectedImageIdx] || '/placeholder.svg'} 
                    alt="" 
                    className="h-full w-full object-cover transition-transform group-hover:scale-105" 
                    onError={(e) => { (e.target as HTMLImageElement).src = '/placeholder.svg'; }}
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                    <Search className="text-white opacity-0 group-hover:opacity-100 h-8 w-8" />
                  </div>
                </div>
                
                {/* Thumbnail Gallery */}
                {(selectedProduct.images?.length || 0) > 1 && (
                  <div className="flex flex-wrap gap-2">
                    {selectedProduct.images.map((img: string, idx: number) => (
                      <button 
                        key={idx} 
                        onClick={() => setSelectedImageIdx(idx)}
                        className={`h-12 w-12 rounded-md overflow-hidden border-2 transition-all ${
                          selectedImageIdx === idx ? 'border-primary' : 'border-transparent opacity-60 hover:opacity-100'
                        }`}
                      >
                        <img src={img} alt="" className="h-full w-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
                <p className="text-[10px] text-center text-muted-foreground uppercase font-bold tracking-widest">
                  Click main image to open original
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-foreground">{selectedProduct.title}</h3>
                  <p className="text-2xl font-black text-[#2563EB] mt-1">₦{selectedProduct.price.toLocaleString()}</p>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="bg-muted/50 p-2 rounded-lg">
                    <p className="text-muted-foreground mb-0.5">Seller</p>
                    <p className="font-bold">{selectedProduct.seller}</p>
                  </div>
                  <div className="bg-muted/50 p-2 rounded-lg">
                    <p className="text-muted-foreground mb-0.5">Category</p>
                    <p className="font-bold capitalize">{selectedProduct.category}</p>
                  </div>
                  <div className="bg-muted/50 p-2 rounded-lg">
                    <p className="text-muted-foreground mb-0.5">Condition</p>
                    <p className="font-bold">{selectedProduct.condition}</p>
                  </div>
                  <div className="bg-muted/50 p-2 rounded-lg">
                    <p className="text-muted-foreground mb-0.5">Submitted</p>
                    <p className="font-bold">{selectedProduct.submittedAt}</p>
                  </div>
                </div>

                <div>
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-1">Description</p>
                  <div className="text-sm text-slate-600 max-h-32 overflow-y-auto pr-2 custom-scrollbar">
                    {selectedProduct.description}
                  </div>
                </div>

                <DialogFooter className="gap-2 pt-4">
                  {approvedIds.has(selectedProduct.id) ? (
                    <div className="flex-1 flex items-center justify-center gap-2 rounded-lg bg-emerald-100 py-3 text-sm font-bold text-emerald-700">
                      <CheckCircle className="h-4 w-4" /> Listing Approved
                    </div>
                  ) : rejectedIds.has(selectedProduct.id) ? (
                    <div className="flex-1 flex items-center justify-center gap-2 rounded-lg bg-red-100 py-3 text-sm font-bold text-red-700">
                      <XCircle className="h-4 w-4" /> Listing Rejected
                    </div>
                  ) : (
                    <>
                      <Button variant="outline" className="flex-1" onClick={() => { setRejectType('product'); setRejectId(selectedProduct.id); setShowRejectDialog(true); }}>
                        <XCircle className="mr-1 h-4 w-4" /> Reject
                      </Button>
                      <Button 
                        className="flex-1 bg-[#2563EB] text-white hover:bg-[#1D4ED8]" 
                        onClick={() => handleApproveProduct(selectedProduct)}
                        disabled={approveProductMutation.isPending}
                      >
                        {approveProductMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <CheckCircle className="mr-1 h-4 w-4" />} 
                        Approve
                      </Button>
                    </>
                  )}
                </DialogFooter>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Seller Review Dialog */}
      <Dialog open={!!selectedSeller} onOpenChange={() => setSelectedSeller(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Review Seller Application</DialogTitle>
            <DialogDescription>Review this seller's application details.</DialogDescription>
          </DialogHeader>
          {selectedSeller && (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#2563EB]/10 text-xl font-bold text-[#2563EB]">
                  {selectedSeller.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">{selectedSeller.name}</h3>
                  <p className="text-sm text-muted-foreground">{selectedSeller.email}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div><span className="text-muted-foreground">Faculty:</span> <span className="font-medium text-foreground">{selectedSeller.faculty}</span></div>
                <div><span className="text-muted-foreground">Matric:</span> <span className="font-medium text-foreground">{selectedSeller.matric}</span></div>
                <div><span className="text-muted-foreground">Phone:</span> <span className="font-medium text-foreground">{selectedSeller.phone}</span></div>
                <div><span className="text-muted-foreground">Store:</span> <span className="font-medium text-foreground">{selectedSeller.storeName}</span></div>
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Why they want to sell:</p>
                <p className="mt-1 text-sm text-muted-foreground">{selectedSeller.reason}</p>
              </div>
              <DialogFooter className="gap-2">
                <Button variant="destructive" onClick={() => { setRejectType('seller'); setRejectId(selectedSeller.id); setShowRejectDialog(true); }}>
                  <UserX className="mr-1 h-4 w-4" /> Reject
                </Button>
                <Button className="bg-[#2563EB] text-white" onClick={() => handleApproveSeller(selectedSeller.id, selectedSeller.user_id)}>
                  <UserCheck className="mr-1 h-4 w-4" /> Approve
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Reject Reason Dialog */}
      <Dialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Rejection Reason</DialogTitle>
            <DialogDescription>Provide a reason for rejection. This will be sent to the {rejectType === 'product' ? 'seller' : 'applicant'}.</DialogDescription>
          </DialogHeader>
          <Textarea
            placeholder="Enter reason for rejection..."
            value={rejectReason}
            onChange={e => setRejectReason(e.target.value)}
            rows={4}
          />
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowRejectDialog(false)}>Cancel</Button>
            <Button variant="destructive" onClick={handleRejectItem} disabled={!rejectReason.trim()}>
              Confirm Rejection
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Admin;
