import * as React from 'react';
import { Box, SxProps, Typography } from '@mui/material';

import Stars from '../Stars'

type RatingProps = {
  rating: number,
  numRatings?: number,
  size: number,
  label?: string,
  labelStyles?: SxProps
}
export default function Rating({rating, numRatings, label, size, labelStyles}: RatingProps) {
  
  return (
    <Box sx={{display: 'flex', alignItems: 'center'}}>
      <Stars rating={rating} size={size} sx={{mr: 1.5, display: 'flex', alignItems: 'center'}} />
      <Typography color="text.secondary" sx={{...(labelStyles || {}), fontSize: size*0.6}}>
        {numRatings}{label ? ` ${label}` : ''}
      </Typography>
    </Box>
  );
};

Rating.defaultProps = {
  size: 16
}