import AppBar from '@mui/material/AppBar';
import { Box, Typography } from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import { getPhoneCallUrl } from "../utils/contact";
import '../css/navbar.css';
import logo from '../assets/logo.png'


export default function Navbar() {
    return (
        <>
         <AppBar position="static" className="navbar">

<Toolbar className="navbar-toolbar">

  {/* LEFT : LOGO */}
  <Box>
  <img
                src={logo}
                alt="VR Laptops World Logo"
                style={{ maxWidth: '100%', height: '10vh' }}
              />
            </Box>

  {/* CENTER : SEARCH */}
  <TextField
  variant="outlined"
  placeholder="Search laptops..."
  size="small"
  className="search-bar"
  InputProps={{
    startAdornment: (
      <InputAdornment position="start">
        <SearchIcon />
      </InputAdornment>
    ),
    }}
/>


  {/* RIGHT : ENQUIRE */}
  <Button
  className='enquire-btn'
    component="a"
    href={getPhoneCallUrl()}
    target="_blank"
    rel="noopener noreferrer"
    variant="contained"
    >
      <Typography sx={{fontWeigh:700}}>
      Enquire Us
      </Typography>
    </Button>

</Toolbar>

</AppBar>
</>
    )
     }