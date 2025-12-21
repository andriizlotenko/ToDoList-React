import { useState, useMemo } from 'react';
import { createTheme, ThemeProvider as MUIThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { ColorModeContext } from './ThemeContext';
import AppGlobalStyles from './AppGlobalStyles';

export function ThemeProvider({ children }) {
  const [mode, setMode] = useState('light');

  const colorMode = useMemo(() => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
  }), []);

  const theme = useMemo(() => createTheme({
        palette: {
          mode,
          primary: { main: mode === 'light' ? '#256bc1ff' : '#90caf9' },
          background: {
            default: mode === 'light' ? '#f0f2f5' : '#121212',
            paper: mode === 'light' ? '#ffffff' : '#1e1e1e',
          },
          text: {
             primary: mode === 'light' ? 'rgba(0, 0, 0, 0.87)' : '#ffffff',
          }
        },
  }), [mode]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <MUIThemeProvider theme={theme}>
        <CssBaseline />
        <AppGlobalStyles />
        {children}
      </MUIThemeProvider>
    </ColorModeContext.Provider>
  );
}