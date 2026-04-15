import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Menu, X, Search, Bell, User, LogOut, Settings, Package, Store } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import logo from '@/assets/logo.jpeg';

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenu, setUserMenu] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();
  const { cartCount } = useCart();

  const dashboardLink = user?.role === 'seller' ? '/dashboard/seller' : '/dashboard/buyer';
  const isSellerView = location.pathname.startsWith('/dashboard/seller');

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container mx-auto flex h-20 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="UI Marketplace" className="h-14 md:h-16 w-auto object-contain" />
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-6 md:flex">
          {isSellerView ? (
            <>
              <Link to="/dashboard/seller" className="text-sm font-medium text-primary transition-colors hover:text-primary-dark">
                Store Overview
              </Link>
              <Link to="/dashboard/seller/products" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
                My Listings
              </Link>
              <Link to="/dashboard/seller/orders" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
                Manage Orders
              </Link>
              <Link to="/wallet" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
                Wallet
              </Link>
            </>
          ) : (
            <>
              <Link to="/products" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
                Browse
              </Link>
              <Link to="/categories" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
                Categories
              </Link>
              {isAuthenticated && (
                <Link to="/messages" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
                  Messages
                </Link>
              )}
              <Link to="/products" className="flex h-9 items-center gap-2 rounded-lg border border-input bg-secondary px-3 text-sm text-muted-foreground transition-colors hover:bg-muted">
                <Search className="h-4 w-4" />
                <span>Search products...</span>
              </Link>
            </>
          )}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          {isAuthenticated ? (
            <>
              <Link to="/notifications">
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                </Button>
              </Link>
              {!isSellerView && (
                <Link to="/cart">
                  <Button variant="ghost" size="icon" className="relative">
                    <ShoppingCart className="h-5 w-5" />
                    {cartCount > 0 && (
                      <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-accent-foreground">{cartCount}</span>
                    )}
                  </Button>
                </Link>
              )}
              <div className="relative">
                <button onClick={() => setUserMenu(!userMenu)} className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                  {user?.fullname?.charAt(0) || 'U'}
                </button>
                {userMenu && (
                  <div className="absolute right-0 top-11 z-50 w-56 rounded-xl border border-border bg-card p-2 shadow-lg">
                    <div className="border-b border-border px-3 py-2">
                      <p className="text-sm font-medium text-foreground">{user?.fullname}</p>
                      <p className="text-xs text-muted-foreground">{user?.email}</p>
                    </div>
                    <div className="mt-1 space-y-0.5">
                      {(user?.role === 'buyer' || user?.role === 'both') && (
                        <Link to="/dashboard/buyer" onClick={() => setUserMenu(false)} className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-foreground hover:bg-muted">
                          <Package className="h-4 w-4" /> Buyer Dashboard
                        </Link>
                      )}
                      {(user?.role === 'seller' || user?.role === 'both') && (
                        <Link to="/dashboard/seller" onClick={() => setUserMenu(false)} className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-foreground hover:bg-muted">
                          <Store className="h-4 w-4" /> Seller Dashboard
                        </Link>
                      )}
                      <Link to="/settings" onClick={() => setUserMenu(false)} className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-foreground hover:bg-muted">
                        <Settings className="h-4 w-4" /> Settings
                      </Link>
                      <button onClick={() => { logout(); setUserMenu(false); navigate('/'); }} className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-destructive hover:bg-muted">
                        <LogOut className="h-4 w-4" /> Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="hero-outline" size="sm">Sign In</Button>
              </Link>
              <Link to="/register">
                <Button variant="hero" size="sm">Get Started</Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile toggle */}
        <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden">
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-border bg-background md:hidden"
          >
            <div className="flex flex-col gap-2 p-4">
              {isSellerView ? (
                <>
                  <Link to="/dashboard/seller" onClick={() => setMobileOpen(false)} className="rounded-lg px-3 py-2 text-sm font-medium hover:bg-muted">Store Overview</Link>
                  <Link to="/dashboard/seller/products" onClick={() => setMobileOpen(false)} className="rounded-lg px-3 py-2 text-sm font-medium hover:bg-muted">My Listings</Link>
                  <Link to="/dashboard/seller/orders" onClick={() => setMobileOpen(false)} className="rounded-lg px-3 py-2 text-sm font-medium hover:bg-muted">Manage Orders</Link>
                  <Link to="/wallet" onClick={() => setMobileOpen(false)} className="rounded-lg px-3 py-2 text-sm font-medium hover:bg-muted">Wallet</Link>
                </>
              ) : (
                <>
                  <Link to="/products" onClick={() => setMobileOpen(false)} className="rounded-lg px-3 py-2 text-sm font-medium hover:bg-muted">Browse Products</Link>
                  <Link to="/categories" onClick={() => setMobileOpen(false)} className="rounded-lg px-3 py-2 text-sm font-medium hover:bg-muted">Categories</Link>
                  {isAuthenticated && (
                    <>
                      <Link to="/messages" onClick={() => setMobileOpen(false)} className="rounded-lg px-3 py-2 text-sm font-medium hover:bg-muted">Messages</Link>
                      <Link to="/cart" onClick={() => setMobileOpen(false)} className="rounded-lg px-3 py-2 text-sm font-medium hover:bg-muted">Cart {cartCount > 0 && `(${cartCount})`}</Link>
                    </>
                  )}
                </>
              )}
              {isAuthenticated && (
                <>
                  <Link to="/notifications" onClick={() => setMobileOpen(false)} className="rounded-lg px-3 py-2 text-sm font-medium hover:bg-muted">Notifications</Link>
                  {(user?.role === 'buyer' || user?.role === 'both') && !isSellerView && (
                    <Link to="/dashboard/buyer" onClick={() => setMobileOpen(false)} className="rounded-lg px-3 py-2 text-sm font-medium hover:bg-muted">Buyer Dashboard</Link>
                  )}
                  {(user?.role === 'seller' || user?.role === 'both') && !isSellerView && (
                    <Link to="/dashboard/seller" onClick={() => setMobileOpen(false)} className="rounded-lg px-3 py-2 text-sm font-medium hover:bg-muted">Seller Dashboard</Link>
                  )}
                </>
              )}
              <hr className="my-2" />
              {isAuthenticated ? (
                <>
                  <Link to="/settings" onClick={() => setMobileOpen(false)} className="rounded-lg px-3 py-2 text-sm font-medium hover:bg-muted">Settings</Link>
                  <button onClick={() => { logout(); setMobileOpen(false); navigate('/'); }} className="rounded-lg px-3 py-2 text-left text-sm font-medium text-destructive hover:bg-muted">Sign Out</button>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={() => setMobileOpen(false)}>
                    <Button variant="hero-outline" className="w-full">Sign In</Button>
                  </Link>
                  <Link to="/register" onClick={() => setMobileOpen(false)}>
                    <Button variant="hero" className="w-full">Get Started</Button>
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
