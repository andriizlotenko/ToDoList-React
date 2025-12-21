import { Box, Typography, Grid, Card, CardContent, CardMedia, CardActions, Button, Chip, Stack } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

import { projects } from '../data/projectsData';

export default function Portfolio() {
  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', px: 2 }}>

      <Typography variant="h3" align="center" fontWeight="bold" gutterBottom>
        Моє Портфоліо
      </Typography>
      <Typography variant="h6" align="center" color="text.secondary" sx={{ mb: 6 }}>
        Вибрані проєкти, над якими я працював останнім часом
      </Typography>

      <Grid container spacing={4} justifyContent="center" alignItems="stretch">
        {projects.map((project) => (
          <Grid
            item
            xs={12}
            md={4}
            key={project.id}
            sx={{ display: 'flex' }}
          >
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                borderRadius: 4,
                transition: '0.3s',
                '&:hover': { transform: 'scale(1.02)', boxShadow: 6 }
              }}
            >
              <CardMedia
                component="img"
                height="200"
                image={project.image}
                alt={project.title}
              />

              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="div" fontWeight="bold">
                  {project.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {project.description}
                </Typography>

                <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ mt: 1 }}>
                  {project.tags.map(tag => (
                    <Chip key={tag} label={tag} size="small" variant="outlined" />
                  ))}
                </Stack>
              </CardContent>

              <CardActions sx={{ p: 2 }}>
                {project.isInternal ? (
                  <Button
                    size="small"
                    variant="contained"
                    component={RouterLink}
                    to={project.link}
                    fullWidth
                  >
                    Відкрити Демо
                  </Button>
                ) : (
                  <Button
                    size="small"
                    variant="outlined"
                    disabled
                    fullWidth
                  >
                    В розробці
                  </Button>
                )}
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}