import { Link } from 'react-router-dom';
import { ShoppingBag, Github, Twitter, Instagram } from 'lucide-react';
import { ADMIN_WHATSAPP_NUMBER } from '@/lib/whatsapp';

const Footer = () => (
  <footer className="border-t border-slate-100 bg-white py-12 sm:py-16">
    <div className="container mx-auto px-4 grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
      <div className="max-w-xs">
        <Link to="/" className="flex items-center gap-2 mb-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary shadow-lg shadow-primary/20">
            <ShoppingBag className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="font-heading text-xl font-black text-slate-900 tracking-tight">UI Marketplace</span>
        </Link>
        <p className="text-sm leading-relaxed text-slate-500 mb-6">
          The official marketplace for University of Ibadan students. Buy and sell anything from textbooks to electronics within your campus community.
        </p>
        <div className="flex gap-4">
          <a href="#" className="h-10 w-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-primary hover:text-white transition-all"><Twitter size={18} /></a>
          <a href="#" className="h-10 w-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-primary hover:text-white transition-all"><Instagram size={18} /></a>
          <a href="#" className="h-10 w-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-primary hover:text-white transition-all"><Github size={18} /></a>
        </div>
      </div>
      <div>
        <h4 className="mb-6 font-bold text-slate-900 text-sm uppercase tracking-widest">Marketplace</h4>
        <ul className="space-y-4 text-sm">
          <li><Link to="/products" className="hover:text-primary transition-colors">All Products</Link></li>
          <li><Link to="/products?category=textbooks" className="hover:text-primary transition-colors">Textbooks</Link></li>
          <li><Link to="/products?category=electronics" className="hover:text-primary transition-colors">Electronics</Link></li>
          <li><Link to="/products?category=fashion" className="hover:text-primary transition-colors">Fashion</Link></li>
        </ul>
      </div>
      <div>
        <h4 className="mb-6 font-bold text-slate-900 text-sm uppercase tracking-widest">Support</h4>
        <ul className="space-y-4 text-sm">
          <li><Link to="/help" className="hover:text-primary transition-colors">Help Center</Link></li>
          <li><Link to="/support" className="hover:text-primary transition-colors">Contact Support</Link></li>
          <li><a href={`tel:${ADMIN_WHATSAPP_NUMBER}`} className="hover:text-primary transition-colors">Admin: {ADMIN_WHATSAPP_NUMBER}</a></li>
          <li><Link to="/help" className="hover:text-primary transition-colors">Safety Tips</Link></li>
        </ul>
      </div>
      <div>
        <h4 className="mb-6 font-bold text-slate-900 text-sm uppercase tracking-widest">Legal</h4>
        <ul className="space-y-4 text-sm">
          <li><Link to="/terms" className="hover:text-primary transition-colors">Terms of Service</Link></li>
          <li><Link to="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
          <li><Link to="/terms" className="hover:text-primary transition-colors">Escrow Protection</Link></li>
        </ul>
      </div>
    </div>
    <div className="container mx-auto px-4 mt-12 pt-8 border-t border-slate-50">
      <p className="text-center text-xs text-slate-400">
        &copy; {new Date().getFullYear()} UI Marketplace. Built for UI students by UI students.
      </p>
    </div>
  </footer>
);

export default Footer;
