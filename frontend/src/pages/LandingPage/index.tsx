import { Container, Box, Typography, Grid, Card, CardContent, CardMedia } from '@mui/material';
import React from 'react';
import { useNavigate } from "react-router-dom";
import Header from './Header'
import { bodyCategories } from './config'


export default function LandingPage() {

  const navigate = useNavigate()
 
  return (
    <div>
      <Header handleSearch={s => navigate(`/search${s ? `?query=${s}` : ''}`)} maxWidth="md"/>
      <Box sx={{backgroundColor: '#f5f5f5', py: 4}}>
        <Container maxWidth="md">
          <Typography variant="h4" color="primary" sx={{textAlign: 'center', fontSize: 20, mb: 3}}>Yelp UF</Typography>
          <Grid container justifyContent="space-between" spacing={4}>
            {bodyCategories.map(c => {

              return (<Grid item key={c.name} sx={{flex: 1}}>
                <Card variant="outlined" sx={{cursor: 'pointer', '&:hover': { borderColor: '#aaa', borderWidth: 1 } }} tabIndex={0} onClick={() => navigate('/search?category=' + c.name)}>
                <CardMedia
                  component="img"
                  height="140"
                  image={c.image}
                  alt={`${c.name} example image`}
                />
                <CardContent sx={{ '&&': { py: 1.5 }}}>
                  <Typography style={{textTransform: 'capitalize', textAlign: 'center'}}>{c.name}</Typography>
                </CardContent>
                </Card>
                </Grid>)
            })}


          </Grid>
        </Container>
      </Box>
      <Box minHeight={300}>
        <Container maxWidth="md">
        <Grid container spacing={3}>
          <Grid item xs={4}>
          </Grid>
          <Grid item xs={4}>
          </Grid>
          <Grid item xs={4}>
          </Grid>
        </Grid>
      </Container>
      </Box>
      
    </div>
  );
};