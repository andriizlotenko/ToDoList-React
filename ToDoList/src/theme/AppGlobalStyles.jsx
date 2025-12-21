import { GlobalStyles } from '@mui/material';
import { useTheme } from '@mui/material/styles';

export default function AppGlobalStyles() {
  const theme = useTheme();
  const mode = theme.palette.mode;

  return (
    <GlobalStyles styles={{
      ':root': {
        colorScheme: mode,
      },
      '.app-wrapper': {
        background: mode === 'light' ? 'transparent' : '#121212 !important',
        transition: 'background 0.3s ease',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
      },
      '.app-container': {
        background: mode === 'light' ? '#ffffff' : '#1e1e1e !important',
        color: mode === 'light' ? '#333' : '#fff !important',
        transition: 'background 0.3s ease, color 0.3s ease',
        padding: '2rem',
        borderRadius: '16px',
        boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
        width: '100%',
        maxWidth: '720px',
      },
      'h1': {
         color: mode === 'light' ? 'inherit' : '#fff',
         textAlign: 'center',
         marginBottom: '1rem',
      },

      'input': {
         color: mode === 'light' ? '#333' : '#fff !important',
         backgroundColor: 'transparent',
         caretColor: mode === 'light' ? '#333' : '#fff',
      },
      'input[type="checkbox"]': {
         accentColor: mode === 'light' ? '#764ba2' : '#90caf9',
         width: '1.2rem',
         height: '1.2rem',
         cursor: 'pointer',
         marginRight: '10px',
         border: '1px solid gray',
      },

      '.MuiListItem-root:hover, .MuiCard-root:hover': {
        '& input[type="text"]': {
           color: '#000000 !important',
           caretColor: '#000000 !important',
           borderBottom: '1px solid #000000',
        },

        '& input[type="checkbox"]': {
           outline: '2px solid #000000',
           outlineOffset: '-2px',
           filter: 'none',
        },

        '& .MuiIconButton-root': {
           color: '#000000 !important',
           opacity: 1,
        }
      },

      '.MuiIconButton-root:hover': {
         color: '#764ba2 !important',
      }
    }} />
  );
}