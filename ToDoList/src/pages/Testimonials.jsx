import { Box, Typography, Grid, Paper, Avatar, Rating } from '@mui/material';
import { reviews } from '../data/reviewsData';

export default function Testimonials() {
  return (
    <Box sx={{ maxWidth: 1000, mx: 'auto', mt: 4, px: 2 }}>

      <Typography variant="h3" align="center" fontWeight="bold" gutterBottom>
        Відгуки клієнтів
      </Typography>
      <Typography variant="h6" align="center" color="text.secondary" sx={{ mb: 6 }}>
        Що кажуть люди про співпрацю зі мною
      </Typography>

      <Grid container spacing={3} justifyContent="center">
        {reviews.map((review) => (
          <Grid item xs={12} md={4} key={review.id}>
            <Paper
              elevation={3}
              sx={{
                p: 3,
                height: '100%',
                borderRadius: 4,
                position: 'relative',
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(10px)',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar src={review.avatar} sx={{ width: 56, height: 56, mr: 2 }} />
                <Box>
                  <Typography variant="subtitle1" fontWeight="bold">{review.name}</Typography>
                  <Typography variant="caption" color="text.secondary">{review.role}</Typography>
                </Box>
              </Box>
              <Rating value={review.rating} readOnly size="small" sx={{ mb: 2 }} />
              <Typography variant="body2" sx={{ fontStyle: 'italic', color: 'text.primary' }}>
                "{review.text}"
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}