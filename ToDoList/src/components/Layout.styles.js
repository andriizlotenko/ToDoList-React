export const getAppBarStyle = (theme) => ({
  background: theme.palette.mode === 'dark'
    ? 'rgba(30, 30, 30, 0.8)'
    : 'linear-gradient(90deg, #4b6cb7 0%, #182848 100%)',
  backdropFilter: 'blur(8px)',
  boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
  position: "sticky",
});

export const logoStyle = {
  mr: 2,
  display: { xs: 'none', md: 'flex' },
  fontFamily: 'monospace',
  fontWeight: 700,
  letterSpacing: '.1rem',
  color: 'inherit',
  textDecoration: 'none',
};

export const todoBtnStyle = {
  borderRadius: '20px',
  borderWidth: '2px',
  fontWeight: 'bold',
  borderColor: 'rgba(255,255,255,0.5)',
  '&:hover': {
    borderColor: '#fff',
    backgroundColor: 'rgba(255,255,255, 0.1)'
  }
};

export const getNavBtnStyle = (path, currentPath, theme) => ({
  color: 'inherit',
  position: 'relative',
  fontWeight: currentPath === path ? 700 : 400,
  '&::after': {
    content: '""',
    position: 'absolute',
    width: currentPath === path ? '100%' : '0%',
    height: '2px',
    bottom: 0,
    left: 0,
    backgroundColor: theme.palette.mode === 'dark' ? '#90caf9' : '#fff',
    transition: 'width 0.3s ease-in-out',
  },
  '&:hover::after': {
    width: '100%',
  },
});