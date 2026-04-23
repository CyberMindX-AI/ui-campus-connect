import { ReactNode } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({ children }: { children: ReactNode }) => {
  const isLandingPage = window.location.pathname === '/';
  return (
    <div className={`flex min-h-screen flex-col ${isLandingPage ? 'bg-white' : 'bg-slate-50'}`}>
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
