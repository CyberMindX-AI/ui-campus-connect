import { Link } from 'react-router-dom';

const Footer = () => (
  <footer className="border-t border-border bg-primary text-primary-foreground">
    <div className="container mx-auto px-4 py-12">
      <div className="grid gap-8 md:grid-cols-4">
        <div>
          <div className="mb-3 flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-foreground">
              <span className="font-heading text-sm font-bold text-primary">UI</span>
            </div>
            <span className="font-heading text-lg font-bold">Marketplace</span>
          </div>
          <p className="text-sm text-primary-foreground/70">
            The premier University of Ibadan student commerce platform. Buy, sell & thrive within your campus community.
          </p>
        </div>
        <div>
          <h4 className="mb-3 font-heading text-sm font-semibold uppercase tracking-wider text-primary-foreground/60">Platform</h4>
          <ul className="space-y-2 text-sm text-primary-foreground/80">
            <li><Link to="/products" className="hover:text-primary-foreground">Browse Products</Link></li>
            <li><Link to="/categories" className="hover:text-primary-foreground">Categories</Link></li>
            <li><Link to="/register" className="hover:text-primary-foreground">Become a Seller</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 font-heading text-sm font-semibold uppercase tracking-wider text-primary-foreground/60">Support</h4>
          <ul className="space-y-2 text-sm text-primary-foreground/80">
            <li><a href="#" className="hover:text-primary-foreground">Help Center</a></li>
            <li><a href="#" className="hover:text-primary-foreground">Safety Tips</a></li>
            <li><a href="#" className="hover:text-primary-foreground">Report an Issue</a></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 font-heading text-sm font-semibold uppercase tracking-wider text-primary-foreground/60">Legal</h4>
          <ul className="space-y-2 text-sm text-primary-foreground/80">
            <li><a href="#" className="hover:text-primary-foreground">Terms of Service</a></li>
            <li><a href="#" className="hover:text-primary-foreground">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-primary-foreground">Community Guidelines</a></li>
          </ul>
        </div>
      </div>
      <div className="mt-10 border-t border-primary-foreground/20 pt-6 text-center text-sm text-primary-foreground/50">
        © 2025 UI Marketplace — University of Ibadan. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
