import { Link } from 'react-router-dom';
import logo from '@/assets/logo.jpeg';

const Footer = () => (
  <footer className="border-t border-slate-100 bg-white text-slate-500">
    <div className="container mx-auto px-6 py-16">
      <div className="grid gap-12 md:grid-cols-4">
        <div>
          <div className="mb-6">
            <img src={logo} alt="UI Marketplace" className="h-12 w-auto object-contain grayscale opacity-70" />
          </div>
          <p className="text-sm leading-relaxed">
            Built for getting things done on the net — clear posts, secure payments, verified campus logistics.
          </p>
          <div className="mt-6 text-slate-900 font-bold text-sm">
            Ibadan, Nigeria
          </div>
        </div>
        <div>
          <h4 className="mb-6 font-bold text-slate-900 text-sm uppercase tracking-widest">Product</h4>
          <ul className="space-y-4 text-sm">
            <li><Link to="/" className="hover:text-primary transition-colors">How it works</Link></li>
            <li><Link to="/register" className="hover:text-primary transition-colors">Start Trading</Link></li>
            <li><Link to="/register" className="hover:text-primary transition-colors">Become a Seller</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-6 font-bold text-slate-900 text-sm uppercase tracking-widest">Support</h4>
          <ul className="space-y-4 text-sm">
            <li><Link to="/help" className="hover:text-primary transition-colors">Help Center</Link></li>
            <li><Link to="/support" className="hover:text-primary transition-colors">Contact Support</Link></li>
            <li><Link to="/help" className="hover:text-primary transition-colors">Safety Tips</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-6 font-bold text-slate-900 text-sm uppercase tracking-widest">Legal</h4>
          <ul className="space-y-4 text-sm">
            <li><Link to="/terms" className="hover:text-primary transition-colors">Terms of Service</Link></li>
            <li><Link to="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
          </ul>
        </div>
      </div>
      <div className="mt-16 pt-8 border-t border-slate-50 text-center text-xs font-medium tracking-wide">
        © 2026 UI Marketplace — Built for getting things done on the net.
      </div>
    </div>
  </footer>
);

export default Footer;
