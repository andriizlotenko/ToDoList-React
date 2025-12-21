import { Outlet, Link as RouterLink, useLocation } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box, IconButton, Container } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import TerminalIcon from '@mui/icons-material/Terminal';
import { useTheme } from '@mui/material/styles';
import { useColorMode } from '../theme/ThemeContext';
import { getAppBarStyle, logoStyle, todoBtnStyle, getNavBtnStyle } from './Layout.styles';

export default function Layout() {
  const theme = useTheme();
  const { toggleColorMode } = useColorMode();
  const location = useLocation();

  const navItems = [
    { label: 'Головна', path: '/' },
    { label: 'Портфоліо', path: '/portfolio' },
    { label: 'Відгуки', path: '/testimonials' },
  ];

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar sx={getAppBarStyle(theme)}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>

            <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
              <TerminalIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
              <Typography variant="h6" noWrap component={RouterLink} to="/" sx={logoStyle}>
                DEV.PORTFOLIO
              </Typography>
            </Box>

            <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', gap: 2 }}>
              {navItems.map((item) => (
                <Button
                  key={item.path}
                  component={RouterLink}
                  to={item.path}
                  sx={getNavBtnStyle(item.path, location.pathname, theme)}
                >
                  {item.label}
                </Button>
              ))}
            </Box>

            <Box sx={{ flexGrow: 0, display: 'flex', alignItems: 'center', gap: 1 }}>
              <Button
                variant="outlined"
                color="inherit"
                component={RouterLink}
                to="/todo-list"
                sx={todoBtnStyle}
              >
                App Demo
              </Button>

              <IconButton onClick={toggleColorMode} color="inherit" sx={{ ml: 1 }}>
                {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
              </IconButton>
            </Box>

          </Toolbar>
        </Container>
      </AppBar>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          display: 'flex',
          justifyContent: 'center',
          width: '100%'
        }}
      >
        <Box sx={{ width: '100%', maxWidth: '1200px' }}>
           <Outlet />
        </Box>
      </Box>
    </Box>
  );
}