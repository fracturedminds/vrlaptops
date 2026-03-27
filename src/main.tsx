import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const headingFont = '"Montserrat", "Poppins", "Helvetica", "Arial", sans-serif';
const bodyFont = '"Poppins", "Helvetica", "Arial", sans-serif';

const theme = createTheme({
  typography: {
    fontFamily: bodyFont,
    h1: { fontFamily: headingFont, fontWeight: 700 },
    h2: { fontFamily: headingFont, fontWeight: 700 },
    h3: { fontFamily: headingFont, fontWeight: 700 },
    h4: { fontFamily: headingFont, fontWeight: 700 },
    h5: { fontFamily: headingFont, fontWeight: 700 },
    h6: { fontFamily: headingFont, fontWeight: 700 },
    subtitle1: { fontFamily: headingFont, fontWeight: 600 },
    subtitle2: { fontFamily: headingFont, fontWeight: 600 },
    button: { fontFamily: headingFont, fontWeight: 600, textTransform: 'none' },
    body1: { fontFamily: bodyFont },
    body2: { fontFamily: bodyFont },
  },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </StrictMode>,
);
