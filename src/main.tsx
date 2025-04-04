import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// Uncomment this once you have configured your Firebase provider
//import FirebaseProvider from '@/providers/FirebaseProvider';
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import { ThemeProvider } from "@emotion/react";
import App from './App.tsx'
import './index.css'

/**
 * The themes are left blank here so you can 
 * import your customized theme if you want.
 */

const theme = createTheme();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MuiThemeProvider theme={theme}>
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        {/* Uncomment this once you have configured your Firebase settings
        <FirebaseProvider>*/}
          <App />
        {/* Uncomment this once you have configured your Firebase settings
        </FirebaseProvider>*/}
      </ThemeProvider>
    </MuiThemeProvider>
  </StrictMode>,
)
