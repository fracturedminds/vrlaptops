import type { FC } from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Link,
  Stack,
} from '@mui/material';
import {
  Phone as PhoneIcon,
  Email as EmailIcon,
  LocationOn as LocationIcon,
  WhatsApp as WhatsAppIcon,
  Instagram as InstagramIcon,
  YouTube as YouTubeIcon,
  Facebook as FacebookIcon, 
} from '@mui/icons-material';
import { FaGooglePlay } from 'react-icons/fa';
import logo from '../assets/logo.png';

const Footer: FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: '#1e1e2f',
        color: '#f0f0f0',
        py: { xs: 4, md: 5 },
        borderTop: '4px solid #ff8c42',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} justifyContent="space-between">
          {/* Column 1: Logo & Social Media */}
          <Grid item xs={12} md={4}>
            <Box sx={{ mb: 2 }}>
              {/* Replace the src with your actual logo */}
              <img
                src={logo}
                alt="VR Laptops World Logo"
                style={{ maxWidth: '100%', height: '20vh' }}
              />
            </Box>
            <Typography
              variant="subtitle2"
              sx={{ color: '#ff8c42', mb: 2, fontStyle: 'italic' }}
            >
              Sales & Service
            </Typography>
            <Typography variant="body2" sx={{ color: '#cccccc', mb: 2, fontSize:"0.8rem" }}>
              Follow us for updates, offers, and new arrivals.
            </Typography>
            <Stack direction="row" spacing={2}>
              <Link
                href="https://wa.me/916300761707" // replace with actual WhatsApp link
                target="_blank"
                rel="noopener"
                sx={{ color: '#f0f0f0', '&:hover': { color: '#25D366' } }}
              >
                <WhatsAppIcon fontSize="large" />
              </Link>
              <Link
                href="https://www.instagram.com/vr_laptops_world?igsh=Znp5NjI4ZDcybno1" // replace with actual Instagram
                target="_blank"
                rel="noopener"
                sx={{ color: '#f0f0f0', '&:hover': { color: '#E4405F' } }}
              >
                <InstagramIcon fontSize="large" />
              </Link>
              <Link
                href="https://youtube.com/@vr_laptops_world?si=hyFelGYvtRWbYX2-" // replace with actual YouTube
                target="_blank"
                rel="noopener"
                sx={{ color: '#f0f0f0', '&:hover': { color: '#FF0000' } }}
              >
                <YouTubeIcon fontSize="large" />
              </Link>
              <Link
                href="https://www.facebook.com/share/1AvnDq7hJx/" // replace with actual Facebook
                target="_blank"
                rel="noopener"
                sx={{ color: '#f0f0f0', '&:hover': { color: '#1877F2' } }}
              >
                <FacebookIcon fontSize="large" />
              </Link>
              <Link
                href="https://play.google.com/store/apps/details?id=com.rupeecom_yktogagc.vr"
                target="_blank"
                rel="noopener"
                sx={{ color: '#f0f0f0', '&:hover': { color: '#3DDC84' }}} // Play Store green
              >
                <FaGooglePlay size={32} />
              </Link>
            </Stack>
          </Grid>

          {/* Column 2: About Us (from 1st image) */}
          <Grid item xs={12} md={4}>
            <Typography
              variant="h6"
              component="h3"
              gutterBottom
              sx={{
                fontWeight: 600,
                letterSpacing: 0.5,
                borderBottom: '2px solid #ff8c42',
                display: 'inline-block',
                pb: 0.8,
                mb: 2,
              }}
            >
              About Us
            </Typography>
            <Typography variant="body2" sx={{ mb: 1.5, color: '#dddddd',fontSize:"0.8rem" }}>
              <Box component="span" sx={{ color: '#ff8c42', fontWeight: 500 }}>
                VR LAPTOPS WORLD
              </Box>{' '}
               is your trusted destination for quality
              laptops and desktops. We specialize in:
            </Typography>
            <List dense disablePadding>
              {[
                'Imported Used & Refurbished Laptops',
                'Brand New Desktops',
                'All Laptop & Desktop Accessories — Displays, Batteries, Chargers, Keyboards, Hinges',
                'Laptop Chip Level Service',
              ].map((text) => (
                <ListItem key={text} sx={{ py: 0.3, px: 0, fontSize:"0.8rem" }}>
                  <ListItemText
                    primary={text}
                    primaryTypographyProps={{
                      variant: 'body2',
                      sx: { color: '#cccccc' },
                    }}
                  />
                </ListItem>
              ))}
            </List>
            <Typography
              variant="body2"
              sx={{ mt: 1.5, fontStyle: 'italic', color: '#aaa', fontSize:"0.8rem" }}
            >
              “Branded refurbished laptops & desktops • Sales & service since
              establishment”
            </Typography>
          </Grid>

          {/* Column 3: Contact Us (from 3rd image) */}
          <Grid item xs={12} md={4}>
            <Typography
              variant="h6"
              component="h3"
              gutterBottom
              sx={{
                fontWeight: 600,
                letterSpacing: 0.5,
                borderBottom: '2px solid #ff8c42',
                display: 'inline-block',
                pb: 0.8,
                mb: 2,
               }}
            >
              Contact Us
            </Typography>
            <List dense disablePadding>
              <ListItem sx={{ py: 0.8, px: 0 }}>
                <ListItemIcon sx={{ minWidth: 36, color: '#ff8c42' }}>
                  <PhoneIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText
                  primary="+91 6300761707"
                  secondary="+91 8008269904"
                  primaryTypographyProps={{ variant: 'body2', color: '#f0f0f0' }}
                  secondaryTypographyProps={{ variant: 'body2', color: '#cccccc' }}
                />
              </ListItem>
              <ListItem sx={{ py: 0.8, px: 0 }}>
                <ListItemIcon sx={{ minWidth: 36, color: '#ff8c42' }}>
                  <EmailIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Link
                      href="mailto:vrlaptopsworld@gmail.com"
                      underline="hover"
                      sx={{
                        color: '#f0f0f0',
                        fontSize:"0.8rem",
                        '&:hover': { color: '#ff8c42' },
                      }}
                    >
                      vrlaptopsworld@gmail.com
                    </Link>
                  }
                  primaryTypographyProps={{ variant: 'body2' }}
                />
              </ListItem>
              <ListItem sx={{ py: 0.8, px: 0, alignItems: 'flex-start' }}>
                <ListItemIcon sx={{ minWidth: 36, color: '#ff8c42', mt: 0.3 }}>
                  <LocationIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText
                  primary="South India Shopping mall, 23-1526, beside Line, near Madras Bustand Wahabpeta, Ramesh Reddy Nagar, Nellore, Andhra Pradesh 524003"
                  primaryTypographyProps={{
                    variant: 'body2',
                    sx: { color: '#cccccc' },
                  }}
                />
              </ListItem>
            </List>
            <Typography variant="body2" sx={{ mt: 2, color: '#bbb',fontSize:"0.8rem" }}>
              Visit our showroom for demos and support.
            </Typography>
          </Grid>
        </Grid>

        <Divider sx={{ borderColor: '#33334e', my: 2 }} />

        {/* Bottom copyright */}
        <Typography
          variant="body2"
          align="center"
          
          sx={{ color: '#aaa', letterSpacing: 0.3,fontSize:"0.8rem" }}
        >
          Copyright © {new Date().getFullYear()} VR LAPTOPS WORLD (Sales & Service) — All
          rights reserved. 
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;