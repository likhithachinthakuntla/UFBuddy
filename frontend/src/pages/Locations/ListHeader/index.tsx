import * as React from 'react';

import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import SortSelect from './SortSelect'

const Container = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
}));


export default function ListHeader() {

  return <Box sx={{my: 2}}>
    <Container>
      <Typography variant="h4">
        Browsing University of Florida businesses
      </Typography>
      <SortSelect />
    </Container>
  </Box>

};