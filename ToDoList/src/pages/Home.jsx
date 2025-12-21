import { Box, Typography, Button, Grid, Avatar, Paper } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

export default function Home() {
  return (
    <Box sx={{ maxWidth: 1000, mx: 'auto', mt: 4 }}>
      <Grid container spacing={6} alignItems="center">

        <Grid item xs={12} md={7}>
          <Typography variant="overline" color="primary" fontWeight="bold">
            Front-end Developer
          </Typography>
          <Typography variant="h2" component="h1" fontWeight="800" sx={{ mb: 2 }}>
            Привіт, я <span style={{ color: '#764ba2' }}>Андрій</span> 👋
          </Typography>
          <Typography variant="h5" color="text.secondary" sx={{ mb: 4, lineHeight: 1.6 }}>
            Я створюю сучасні веб-додатки, використовуючи React.
          </Typography>

          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              variant="contained"
              size="large"
              component={RouterLink}
              to="/portfolio"
              sx={{ borderRadius: '50px', px: 4 }}
            >
              Мої роботи
            </Button>
            <Button
              variant="outlined"
              size="large"
              component={RouterLink}
              to="/testimonials"
              sx={{ borderRadius: '50px', px: 4 }}
            >
              Відгуки
            </Button>
          </Box>
        </Grid>

        <Grid item xs={12} md={5} sx={{ display: 'flex', justifyContent: 'center' }}>
          <Box
            sx={{
              position: 'relative',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: -20,
                right: -20,
                width: '100%',
                height: '100%',
                border: '4px solid #764ba2',
                borderRadius: '50%',
                zIndex: 0
              }
            }}
          >
            <Avatar
              alt="My Photo"
              src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&h=400&fit=crop" 
              sx={{ width: 300, height: 300, boxShadow: 10, position: 'relative', zIndex: 1 }}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}