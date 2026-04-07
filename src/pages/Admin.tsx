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
import {
  ShieldCheck, Users, Package, Store, AlertTriangle, TrendingUp,
  CheckCircle, XCircle, Eye, Ban, Search, BarChart3, MessageSquare,
  Clock, DollarSign, Flag, Settings, Activity, ArrowUpRight, ArrowDownRight,
  Trash2, UserCheck, UserX, FileText, Bell
} from 'lucide-react';

// Mock admin data
const pendingProducts = [
  { id: '1', title: 'iPhone 14 Pro Max', seller: 'Adebayo Tunde', sellerEmail: 'adebayo@ui.edu.ng', price: 450000, category: 'Electronics', condition: 'Used - Like New', images: ['/placeholder.svg'], submittedAt: '2025-01-15', description: 'Barely used iPhone 14 Pro Max, 256GB, Deep Purple.' },
  { id: '2', title: 'Organic Chemistry Textbook', seller: 'Funke Adeyemi', sellerEmail: 'funke@ui.edu.ng', price: 8500, category: 'Textbooks', condition: 'Used - Good', images: ['/placeholder.svg'], submittedAt: '2025-01-14', description: 'Clayden Organic Chemistry 2nd Edition. Some highlights.' },
  { id: '3', title: 'HP Pavilion Laptop', seller: 'Chukwuemeka Obi', sellerEmail: 'chukwuemeka@ui.edu.ng', price: 280000, category: 'Electronics', condition: 'Used - Fair', images: ['/placeholder.svg'], submittedAt: '2025-01-13', description: 'HP Pavilion 15, 8GB RAM, 256GB SSD. Minor scratches.' },
  { id: '4', title: 'Study Desk & Chair Set', seller: 'Ngozi Eze', sellerEmail: 'ngozi@ui.edu.ng', price: 35000, category: 'Furniture', condition: 'Used - Good', images: ['/placeholder.svg'], submittedAt: '2025-01-12', description: 'Sturdy wooden desk with ergonomic chair. Perfect for hostel.' },
];

const pendingSellers = [
  { id: '1', name: 'Adeola Bamidele', email: 'adeola@ui.edu.ng', faculty: 'Technology', matric: 'U2020/1234', phone: '08012345678', appliedAt: '2025-01-15', storeName: 'Adeola Tech Store', reason: 'I want to sell gadgets and electronics to fellow students.' },
  { id: '2', name: 'Blessing Okafor', email: 'blessing@ui.edu.ng', faculty: 'Arts', matric: 'U2021/5678', phone: '08098765432', appliedAt: '2025-01-14', storeName: 'Bless Fashion Hub', reason: 'I make custom fashion items and want to reach more students.' },
  { id: '3', name: 'Ibrahim Musa', email: 'ibrahim@ui.edu.ng', faculty: 'Science', matric: 'U2019/9012', phone: '07033344455', appliedAt: '2025-01-13', storeName: 'Ibrahim Books', reason: 'Selling used textbooks at affordable prices.' },
];

const allUsers = [
  { id: '1', name: 'Adebayo Tunde', email: 'adebayo@ui.edu.ng', role: 'seller', faculty: 'Technology', status: 'active', joined: '2024-09-01', totalOrders: 45, totalSales: 1250000 },
  { id: '2', name: 'Funke Adeyemi', email: 'funke@ui.edu.ng', role: 'buyer', faculty: 'Science', status: 'active', joined: '2024-10-15', totalOrders: 12, totalSales: 0 },
  { id: '3', name: 'Chukwuemeka Obi', email: 'chukwuemeka@ui.edu.ng', role: 'both', faculty: 'Law', status: 'active', joined: '2024-08-20', totalOrders: 8, totalSales: 320000 },
  { id: '4', name: 'Ngozi Eze', email: 'ngozi@ui.edu.ng', role: 'seller', faculty: 'Arts', status: 'suspended', joined: '2024-11-05', totalOrders: 3, totalSales: 75000 },
  { id: '5', name: 'Yusuf Abdullahi', email: 'yusuf@ui.edu.ng', role: 'buyer', faculty: 'Education', status: 'active', joined: '2025-01-02', totalOrders: 1, totalSales: 0 },
  { id: '6', name: 'Chiamaka Nwankwo', email: 'chiamaka@ui.edu.ng', role: 'buyer', faculty: 'Pharmacy', status: 'active', joined: '2024-12-10', totalOrders: 6, totalSales: 0 },
];

const reportedItems = [
  { id: '1', type: 'product', title: 'Suspicious Electronics', reporter: 'Funke Adeyemi', reason: 'Possible counterfeit product', status: 'pending', reportedAt: '2025-01-15' },
  { id: '2', type: 'user', title: 'Ngozi Eze', reporter: 'Adebayo Tunde', reason: 'Seller not delivering items', status: 'investigating', reportedAt: '2025-01-13' },
  { id: '3', type: 'product', title: 'Exam Papers for Sale', reporter: 'Ibrahim Musa', reason: 'Violates academic integrity policy', status: 'pending', reportedAt: '2025-01-12' },
];

const recentTransactions = [
  { id: 'TXN001', buyer: 'Funke Adeyemi', seller: 'Adebayo Tunde', product: 'Samsung Galaxy S23', amount: 320000, status: 'completed', date: '2025-01-15' },
  { id: 'TXN002', buyer: 'Yusuf Abdullahi', seller: 'Chukwuemeka Obi', product: 'Law Textbooks Bundle', amount: 15000, status: 'in_escrow', date: '2025-01-14' },
  { id: 'TXN003', buyer: 'Chiamaka Nwankwo', seller: 'Ngozi Eze', product: 'Study Lamp', amount: 5500, status: 'disputed', date: '2025-01-13' },
  { id: 'TXN004', buyer: 'Adebayo Tunde', seller: 'Blessing Okafor', product: 'Custom T-Shirt', amount: 8000, status: 'completed', date: '2025-01-12' },
];

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

  const [products, setProducts] = useState(pendingProducts);
  const [sellers, setSellers] = useState(pendingSellers);
  const [users, setUsers] = useState(allUsers);
  const [reports, setReports] = useState(reportedItems);
  const [search, setSearch] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<typeof pendingProducts[0] | null>(null);
  const [selectedSeller, setSelectedSeller] = useState<typeof pendingSellers[0] | null>(null);
  const [rejectReason, setRejectReason] = useState('');
  const [showRejectDialog, setShowRejectDialog] = useState(false);
  const [rejectType, setRejectType] = useState<'product' | 'seller'>('product');
  const [rejectId, setRejectId] = useState('');
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

  const approveProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    setSelectedProduct(null);
    toast({ title: '✅ Product Approved', description: 'The product is now live on the marketplace.' });
  };

  const rejectItem = () => {
    if (rejectType === 'product') {
      setProducts(prev => prev.filter(p => p.id !== rejectId));
      setSelectedProduct(null);
    } else {
      setSellers(prev => prev.filter(s => s.id !== rejectId));
      setSelectedSeller(null);
    }
    setShowRejectDialog(false);
    setRejectReason('');
    toast({ title: '❌ Rejected', description: `The ${rejectType} has been rejected. Notification sent.`, variant: 'destructive' });
  };

  const approveSeller = (id: string) => {
    setSellers(prev => prev.filter(s => s.id !== id));
    setSelectedSeller(null);
    toast({ title: '✅ Seller Approved', description: 'The seller can now list products on the marketplace.' });
  };

  const toggleUserStatus = (id: string) => {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, status: u.status === 'active' ? 'suspended' : 'active' } : u));
    toast({ title: 'User Updated', description: 'User status has been changed.' });
  };

  const resolveReport = (id: string, action: string) => {
    setReports(prev => prev.filter(r => r.id !== id));
    toast({ title: 'Report Resolved', description: `Action taken: ${action}` });
  };

  const stats = {
    totalUsers: allUsers.length,
    activeUsers: allUsers.filter(u => u.status === 'active').length,
    totalSellers: allUsers.filter(u => u.role === 'seller' || u.role === 'both').length,
    pendingProducts: products.length,
    pendingSellers: sellers.length,
    pendingReports: reports.filter(r => r.status === 'pending').length,
    totalRevenue: 12500000,
    monthlyGrowth: 23.5,
    totalTransactions: 1247,
    disputeRate: 2.3,
  };

  return (
      <div className="min-h-screen bg-[#EFF6FF]">
        {/* Admin Header */}
        <div className="bg-[#2563EB] text-white">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-foreground/20">
                  <ShieldCheck className="h-7 w-7" />
                </div>
                <div>
                  <h1 className="font-heading text-2xl font-bold">Admin Dashboard</h1>
                  <p className="text-sm text-primary-foreground/70">UI Marketplace Control Center</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="border-primary-foreground/30 text-primary-foreground">
                  <Activity className="mr-1 h-3 w-3" /> System Online
                </Badge>
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
                  <Users className="h-5 w-5 text-primary" />
                  <span className="flex items-center text-xs text-green-600"><ArrowUpRight className="h-3 w-3" /> 12%</span>
                </div>
                <p className="mt-2 text-2xl font-bold text-foreground">{stats.totalUsers}</p>
                <p className="text-xs text-muted-foreground">Total Users</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <Store className="h-5 w-5 text-primary" />
                  <span className="flex items-center text-xs text-green-600"><ArrowUpRight className="h-3 w-3" /> 8%</span>
                </div>
                <p className="mt-2 text-2xl font-bold text-foreground">{stats.totalSellers}</p>
                <p className="text-xs text-muted-foreground">Active Sellers</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <DollarSign className="h-5 w-5 text-accent" />
                  <span className="flex items-center text-xs text-green-600"><ArrowUpRight className="h-3 w-3" /> {stats.monthlyGrowth}%</span>
                </div>
                <p className="mt-2 text-2xl font-bold text-foreground">₦{(stats.totalRevenue / 1000000).toFixed(1)}M</p>
                <p className="text-xs text-muted-foreground">Total Revenue</p>
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
                <Flag className="h-4 w-4" /> Reports <Badge variant="destructive" className="ml-1 h-5 px-1.5 text-[10px]">{reports.filter(r => r.status === 'pending').length}</Badge>
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
                    <Package className="h-5 w-5 text-primary" /> Product Approval Queue
                  </CardTitle>
                  <CardDescription>Review and approve product listings before they go live.</CardDescription>
                </CardHeader>
                <CardContent>
                  {products.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <CheckCircle className="mb-3 h-12 w-12 text-primary/30" />
                      <p className="font-medium text-foreground">All caught up!</p>
                      <p className="text-sm text-muted-foreground">No products pending review.</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {products.map(product => (
                        <div key={product.id} className="flex flex-col gap-3 rounded-xl border border-border p-4 transition-colors hover:bg-muted/30 sm:flex-row sm:items-center sm:justify-between">
                          <div className="flex items-start gap-3">
                            <img src={product.images[0]} alt="" className="h-16 w-16 rounded-lg border border-border bg-muted object-cover" />
                            <div className="min-w-0">
                              <h4 className="font-medium text-foreground">{product.title}</h4>
                              <p className="text-sm text-muted-foreground">by {product.seller}</p>
                              <div className="mt-1 flex flex-wrap gap-1.5">
                                <Badge variant="outline" className="text-[10px]">{product.category}</Badge>
                                <Badge variant="outline" className="text-[10px]">{product.condition}</Badge>
                                <span className="text-sm font-semibold text-primary">₦{product.price.toLocaleString()}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button size="sm" variant="outline" onClick={() => setSelectedProduct(product)}>
                              <Eye className="mr-1 h-3 w-3" /> Review
                            </Button>
                            <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90" onClick={() => approveProduct(product.id)}>
                              <CheckCircle className="mr-1 h-3 w-3" /> Approve
                            </Button>
                            <Button size="sm" variant="destructive" onClick={() => { setRejectType('product'); setRejectId(product.id); setShowRejectDialog(true); }}>
                              <XCircle className="mr-1 h-3 w-3" /> Reject
                            </Button>
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
                    <Store className="h-5 w-5 text-primary" /> Seller Approval Queue
                  </CardTitle>
                  <CardDescription>Review seller applications before granting marketplace access.</CardDescription>
                </CardHeader>
                <CardContent>
                  {sellers.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <CheckCircle className="mb-3 h-12 w-12 text-primary/30" />
                      <p className="font-medium text-foreground">All caught up!</p>
                      <p className="text-sm text-muted-foreground">No seller applications pending.</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {sellers.map(seller => (
                        <div key={seller.id} className="flex flex-col gap-3 rounded-xl border border-border p-4 transition-colors hover:bg-muted/30 sm:flex-row sm:items-center sm:justify-between">
                          <div className="flex items-start gap-3">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 font-bold text-primary">
                              {seller.name.charAt(0)}
                            </div>
                            <div className="min-w-0">
                              <h4 className="font-medium text-foreground">{seller.name}</h4>
                              <p className="text-sm text-muted-foreground">{seller.email} · {seller.faculty}</p>
                              <p className="text-xs text-muted-foreground">Store: <span className="font-medium text-foreground">{seller.storeName}</span></p>
                              <p className="mt-1 text-xs text-muted-foreground">Applied {seller.appliedAt}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button size="sm" variant="outline" onClick={() => setSelectedSeller(seller)}>
                              <Eye className="mr-1 h-3 w-3" /> View
                            </Button>
                            <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90" onClick={() => approveSeller(seller.id)}>
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
                        <Users className="h-5 w-5 text-primary" /> All Users
                      </CardTitle>
                      <CardDescription>{users.length} registered users</CardDescription>
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
                        {users.filter(u => !search || u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase())).map(u => (
                          <TableRow key={u.id}>
                            <TableCell>
                              <div>
                                <p className="font-medium text-foreground">{u.name}</p>
                                <p className="text-xs text-muted-foreground">{u.email}</p>
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
                              <div className="flex items-center justify-end gap-1">
                                <Button size="sm" variant="ghost" onClick={() => toggleUserStatus(u.id)}>
                                  {u.status === 'active' ? <Ban className="h-4 w-4 text-destructive" /> : <CheckCircle className="h-4 w-4 text-primary" />}
                                </Button>
                                <Button size="sm" variant="ghost">
                                  <MessageSquare className="h-4 w-4" />
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
                        {recentTransactions.map(tx => (
                          <TableRow key={tx.id}>
                            <TableCell className="font-mono text-xs text-muted-foreground">{tx.id}</TableCell>
                            <TableCell className="font-medium text-foreground">{tx.product}</TableCell>
                            <TableCell className="text-sm">{tx.buyer}</TableCell>
                            <TableCell className="text-sm">{tx.seller}</TableCell>
                            <TableCell className="font-semibold text-foreground">₦{tx.amount.toLocaleString()}</TableCell>
                            <TableCell>
                              <Badge variant={tx.status === 'completed' ? 'default' : tx.status === 'disputed' ? 'destructive' : 'secondary'} className="capitalize">
                                {tx.status.replace('_', ' ')}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-sm text-muted-foreground">{tx.date}</TableCell>
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
                  {reports.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <CheckCircle className="mb-3 h-12 w-12 text-primary/30" />
                      <p className="font-medium text-foreground">No open reports</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {reports.map(report => (
                        <div key={report.id} className="flex flex-col gap-3 rounded-xl border border-border p-4 sm:flex-row sm:items-center sm:justify-between">
                          <div>
                            <div className="flex items-center gap-2">
                              <Badge variant={report.type === 'product' ? 'outline' : 'secondary'} className="capitalize text-[10px]">{report.type}</Badge>
                              <Badge variant={report.status === 'pending' ? 'destructive' : 'secondary'} className="capitalize text-[10px]">{report.status}</Badge>
                            </div>
                            <h4 className="mt-1 font-medium text-foreground">{report.title}</h4>
                            <p className="text-sm text-muted-foreground">{report.reason}</p>
                            <p className="text-xs text-muted-foreground">Reported by {report.reporter} · {report.reportedAt}</p>
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
                      <BarChart3 className="h-4 w-4" /> Generate Analytics Report
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
      <Dialog open={!!selectedProduct} onOpenChange={() => setSelectedProduct(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Review Product</DialogTitle>
            <DialogDescription>Review this product listing before approving.</DialogDescription>
          </DialogHeader>
          {selectedProduct && (
            <div className="space-y-4">
              <img src={selectedProduct.images[0]} alt="" className="h-48 w-full rounded-lg border border-border bg-muted object-cover" />
              <div>
                <h3 className="text-lg font-semibold text-foreground">{selectedProduct.title}</h3>
                <p className="text-2xl font-bold text-primary">₦{selectedProduct.price.toLocaleString()}</p>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div><span className="text-muted-foreground">Seller:</span> <span className="font-medium text-foreground">{selectedProduct.seller}</span></div>
                <div><span className="text-muted-foreground">Category:</span> <span className="font-medium text-foreground">{selectedProduct.category}</span></div>
                <div><span className="text-muted-foreground">Condition:</span> <span className="font-medium text-foreground">{selectedProduct.condition}</span></div>
                <div><span className="text-muted-foreground">Submitted:</span> <span className="font-medium text-foreground">{selectedProduct.submittedAt}</span></div>
              </div>
              <p className="text-sm text-muted-foreground">{selectedProduct.description}</p>
              <DialogFooter className="gap-2">
                <Button variant="destructive" onClick={() => { setRejectType('product'); setRejectId(selectedProduct.id); setShowRejectDialog(true); }}>
                  <XCircle className="mr-1 h-4 w-4" /> Reject
                </Button>
                <Button className="bg-primary text-primary-foreground" onClick={() => approveProduct(selectedProduct.id)}>
                  <CheckCircle className="mr-1 h-4 w-4" /> Approve
                </Button>
              </DialogFooter>
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
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-xl font-bold text-primary">
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
                <Button className="bg-primary text-primary-foreground" onClick={() => approveSeller(selectedSeller.id)}>
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
            <Button variant="destructive" onClick={rejectItem} disabled={!rejectReason.trim()}>
              Confirm Rejection
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default Admin;
