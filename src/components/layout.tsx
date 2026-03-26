import React from 'react';
import Navbar from './navbar';
import Footer from './footer';

interface LayoutProps {
    children: React.ReactNode;
  }
  
  const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
      <>
        <Navbar />
        <main style={{ minHeight: '80vh', padding: '20px' }}>{children}</main>
        <Footer/>
      </>
    );
  };
  
  export default Layout;