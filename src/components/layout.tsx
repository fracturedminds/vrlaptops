import React from 'react';
import Navbar from './navbar';
import Footer from './footer';
import { Box } from '@mui/material';

interface LayoutProps {
    children: React.ReactNode;
  }
  
  const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
      <>
        <Navbar />
        <Box component="main" className="app-main">
          {children}
        </Box>
        <Footer/>
      </>
    );
  };
  
  export default Layout;
