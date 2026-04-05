import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";
import { CartProvider } from "@/contexts/CartContext";
import Index from "./pages/Index.tsx";
import Login from "./pages/Login.tsx";
import Register from "./pages/Register.tsx";
import Products from "./pages/Products.tsx";
import ProductDetail from "./pages/ProductDetail.tsx";
import Cart from "./pages/Cart.tsx";
import Categories from "./pages/Categories.tsx";
import BuyerDashboard from "./pages/BuyerDashboard.tsx";
import SellerDashboard from "./pages/SellerDashboard.tsx";
import EmailVerification from "./pages/EmailVerification.tsx";
import Checkout from "./pages/Checkout.tsx";
import MyOrders from "./pages/MyOrders.tsx";
import Messages from "./pages/Messages.tsx";
import Notifications from "./pages/Notifications.tsx";
import Settings from "./pages/Settings.tsx";
import Wallet from "./pages/Wallet.tsx";
import Dispute from "./pages/Dispute.tsx";
import CreateProduct from "./pages/CreateProduct.tsx";
import SellerOrders from "./pages/SellerOrders.tsx";
import SellerStore from "./pages/SellerStore.tsx";
import SellerProducts from "./pages/SellerProducts.tsx";
import Wishlist from "./pages/Wishlist.tsx";
import HelpCenter from "./pages/HelpCenter.tsx";
import Terms from "./pages/Terms.tsx";
import Privacy from "./pages/Privacy.tsx";
import NotFound from "./pages/NotFound.tsx";
import Admin from "./pages/Admin.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <CartProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/verify-email" element={<EmailVerification />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/dashboard/buyer" element={<BuyerDashboard />} />
              <Route path="/dashboard/buyer/orders" element={<MyOrders />} />
              <Route path="/dashboard/seller" element={<SellerDashboard />} />
              <Route path="/dashboard/seller/orders" element={<SellerOrders />} />
              <Route path="/dashboard/seller/products" element={<SellerProducts />} />
              <Route path="/dashboard/seller/products/new" element={<CreateProduct />} />
              <Route path="/dashboard/seller/products/:id/edit" element={<CreateProduct />} />
              <Route path="/store/:storeSlug" element={<SellerStore />} />
              <Route path="/messages" element={<Messages />} />
              <Route path="/messages/:conversationId" element={<Messages />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/wallet" element={<Wallet />} />
              <Route path="/support" element={<Dispute />} />
              <Route path="/dispute/:orderId" element={<Dispute />} />
              <Route path="/help" element={<HelpCenter />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </CartProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
