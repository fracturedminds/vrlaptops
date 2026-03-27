import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { getPhoneCallUrl } from "../utils/contact";
import '../css/navbar.css';
import logo from '../assets/logo.png'


export default function Navbar() {
    return (
      <AppBar position="sticky" className="navbar" elevation={1}>
        <Toolbar className="navbar-toolbar">
          <Link to="/" className="navbar-logo-wrap" aria-label="Go to home page">
            <img
              src={logo}
              alt="VR Laptops World Logo"
              className="navbar-logo"
            />
          </Link>

          <Box className="navbar-center-branding">
            <Typography className="navbar-title">
              VR Laptops World
            </Typography>
            <Typography className="navbar-subtitle">
              Refurbished Laptops | Sales & Service
            </Typography>
          </Box>

          <Button
            className="enquire-btn"
            component="a"
            href={getPhoneCallUrl()}
            rel="noopener noreferrer"
            variant="contained"
          >
            <Typography sx={{ fontWeight: 700 }}>
              Enquire Us
            </Typography>
          </Button>
        </Toolbar>
      </AppBar>
    )
}
