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

  // If on a non-landing page and NOT authenticated (e.g. Login, Register)
  // show only the logo (absolute)
  if (location.pathname !== '/' && !isAuthenticated) {
    return (
      <nav className="absolute top-6 left-0 z-50 w-full px-8">
        <Link to="/" className="inline-block">
          <img src={logo} alt="UI Marketplace" className="h-10 w-auto object-contain" />
        </Link>
      </nav>
    );
  }

  // For everyone on landing page, OR authenticated users on any page
  const isLandingPage = location.pathname === '/';

  return (
    <nav className={`z-50 transition-all duration-300 ${
      isLandingPage 
        ? "fixed top-4 left-1/2 -translate-x-1/2 w-[95%] max-w-4xl border border-slate-200 bg-white/90 backdrop-blur-md rounded-2xl shadow-lg shadow-slate-200/30" 
        : "sticky top-0 w-full border-b border-slate-100 bg-white shadow-sm"
    }`}>
      <div className={`container mx-auto flex items-center justify-between px-6 ${isLandingPage ? "h-12" : "h-16"}`}>
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="UI Marketplace" className={isLandingPage ? "h-7 md:h-8 w-auto object-contain" : "h-9 md:h-10 w-auto object-contain"} />
          <span className="font-bold text-slate-900 tracking-tight hidden sm:block">UI Marketplace</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-6 md:flex">
          {isSellerView ? (
            <>
              <Link to="/dashboard/seller" className="text-sm font-semibold text-primary">Store Overview</Link>
              <Link to="/dashboard/seller/products" className="text-sm font-semibold text-slate-500 hover:text-primary transition-colors">My Listings</Link>
              <Link to="/dashboard/seller/orders" className="text-sm font-semibold text-slate-500 hover:text-primary transition-colors">Orders</Link>
              <Link to="/wallet" className="text-sm font-semibold text-slate-500 hover:text-primary transition-colors">Wallet</Link>
            </>
          ) : (
            <>
              {/* Marketing Links - Only on Landing Page */}
              {isLandingPage && (
                <>
                  <a href="/#home" className="text-sm font-semibold text-slate-500 hover:text-primary transition-colors">Home</a>
                  <a href="/#about" className="text-sm font-semibold text-slate-500 hover:text-primary transition-colors">About</a>
                  <a href="/#how" className="text-sm font-semibold text-slate-500 hover:text-primary transition-colors">How it works</a>
                  <a href="/#faqs" className="text-sm font-semibold text-slate-500 hover:text-primary transition-colors">FAQs</a>
                </>
              )}
              
              {/* App Links - On Dashboard or for Authenticated Users */}
              {(!isLandingPage || isAuthenticated) && (
                <>
                  <Link to="/products" className="text-sm font-semibold text-slate-500 hover:text-primary transition-colors">Browse</Link>
                  <Link to="/categories" className="text-sm font-semibold text-slate-500 hover:text-primary transition-colors">Categories</Link>
                  {isAuthenticated && (
                    <Link to="/wishlist" className="text-sm font-semibold text-slate-500 hover:text-primary transition-colors">Wishlist</Link>
                  )}
                  {isAuthenticated && (
                    <Link to="/messages" className="text-sm font-semibold text-slate-500 hover:text-primary transition-colors">Messages</Link>
                  )}
                  {isAuthenticated && !isLandingPage && (
                    <Link to={dashboardLink} className="text-sm font-semibold text-primary">Dashboard</Link>
                  )}
                </>
              )}
            </>
          )}
        </div>

        <div className="hidden items-center gap-4 md:flex">
          {isAuthenticated ? (
            <>
              <Link to="/notifications">
                <Button variant="ghost" size="icon" className="text-slate-500 hover:text-primary">
                  <Bell className="h-5 w-5" />
                </Button>
              </Link>
              {!isSellerView && (
                <Link to="/cart">
                  <Button variant="ghost" size="icon" className="relative text-slate-500 hover:text-primary">
                    <ShoppingCart className="h-5 w-5" />
                    {cartCount > 0 && (
                      <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white">{cartCount}</span>
                    )}
                  </Button>
                </Link>
              )}
              <div className="relative">
                <button onClick={() => setUserMenu(!userMenu)} className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-900 text-xs font-bold text-white">
                  {user?.fullname?.charAt(0) || 'U'}
                </button>
                {userMenu && (
                  <div className="absolute right-0 top-10 z-50 w-56 rounded-xl border border-slate-100 bg-white p-2 shadow-xl shadow-slate-200">
                    <div className="border-b border-slate-50 px-3 py-2">
                      <p className="text-sm font-bold text-slate-900">{user?.fullname}</p>
                      <p className="text-xs text-slate-500 truncate">{user?.email}</p>
                    </div>
                    <div className="mt-1 space-y-0.5">
                      {(user?.role === 'buyer' || user?.role === 'both') && (
                        <Link to="/dashboard/buyer" onClick={() => setUserMenu(false)} className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-primary">
                          <Package className="h-4 w-4" /> Buyer Dashboard
                        </Link>
                      )}
                      {(user?.role === 'seller' || user?.role === 'both') && (
                        <Link to="/dashboard/seller" onClick={() => setUserMenu(false)} className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-primary">
                          <Store className="h-4 w-4" /> Seller Dashboard
                        </Link>
                      )}
                      <Link to="/settings" onClick={() => setUserMenu(false)} className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-primary">
                        <Settings className="h-4 w-4" /> Settings
                      </Link>
                      <button onClick={() => { logout(); setUserMenu(false); navigate('/'); }} className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-destructive hover:bg-destructive/5 transition-colors">
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
                <Button variant="ghost" className="text-sm font-semibold text-slate-600">Sign In</Button>
              </Link>
              <Link to="/register">
                <Button className="bg-slate-900 text-white hover:bg-slate-800 rounded-lg text-sm font-semibold h-9 px-5">Get Started</Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile toggle */}
        <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden text-slate-600">
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
            className={`overflow-hidden border-t border-slate-100 bg-white md:hidden ${isLandingPage ? "rounded-b-3xl shadow-xl" : "shadow-md"}`}
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
                  {isLandingPage && (
                    <>
                      <a href="/#home" onClick={() => setMobileOpen(false)} className="rounded-lg px-3 py-2 text-sm font-medium hover:bg-muted">Home</a>
                      <a href="/#about" onClick={() => setMobileOpen(false)} className="rounded-lg px-3 py-2 text-sm font-medium hover:bg-muted">About</a>
                      <a href="/#how" onClick={() => setMobileOpen(false)} className="rounded-lg px-3 py-2 text-sm font-medium hover:bg-muted">How it works</a>
                      <a href="/#faqs" onClick={() => setMobileOpen(false)} className="rounded-lg px-3 py-2 text-sm font-medium hover:bg-muted">FAQs</a>
                    </>
                  )}
                  
                  {(!isLandingPage || isAuthenticated) && (
                    <>
                      <Link to="/products" onClick={() => setMobileOpen(false)} className="rounded-lg px-3 py-2 text-sm font-medium hover:bg-muted">Browse Products</Link>
                      <Link to="/categories" onClick={() => setMobileOpen(false)} className="rounded-lg px-3 py-2 text-sm font-medium hover:bg-muted">Categories</Link>
                      <Link to="/wishlist" onClick={() => setMobileOpen(false)} className="rounded-lg px-3 py-2 text-sm font-medium hover:bg-muted">Wishlist</Link>
                      <Link to="/messages" onClick={() => setMobileOpen(false)} className="rounded-lg px-3 py-2 text-sm font-medium hover:bg-muted">Messages</Link>
                      <Link to="/cart" onClick={() => setMobileOpen(false)} className="rounded-lg px-3 py-2 text-sm font-medium hover:bg-muted">Cart {cartCount > 0 && `(${cartCount})`}</Link>
                      {isAuthenticated && !isLandingPage && (
                        <Link to={dashboardLink} onClick={() => setMobileOpen(false)} className="rounded-lg px-3 py-2 text-sm font-bold text-primary hover:bg-muted">Dashboard</Link>
                      )}
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
