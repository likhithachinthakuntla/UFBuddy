import { Box, Button, Checkbox, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Typography} from '@mui/material';
import * as React from 'react';
import { Stars } from '../../../components';

type FilterDrawerProps = {
  filters: EstFilters,
  setFilters: (newFilters: EstFilters) => void
}

export default function FilterDrawer({filters, setFilters}: FilterDrawerProps) {
  

  const handleStarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newVal = (event.target as HTMLInputElement).value
    setFilters({...filters, minStars: parseInt(newVal)});
  };

  const handleOpenChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({...filters, openNow: event.target.checked});
  };

  return (<Box sx={{m: 2}}>
      <Typography sx={{fontWeight: 'bold'}}>
        Filters
      </Typography>
      <FormControl sx={{my: 2}}>
      <FormLabel>Hours</FormLabel>
      <FormControlLabel sx={{mb: 1}} control={<Checkbox checked={filters.openNow} onChange={handleOpenChange}/>} label="Open Now" />
      <FormLabel id="min-stars-group">Rating</FormLabel>
      <RadioGroup
        aria-labelledby="min-stars-group"
        name="controlled-radio-buttons-group"
        value={filters.minStars}
        onChange={handleStarChange}
      >
        {
          [1,2,3,4,5].map(num => <FormControlLabel key={num} value={num} disableTypography control={<Radio />} label={<Stars sx={{display: 'flex', alignItems: 'center'}} rating={num} size={20}/>} />)
        }
      </RadioGroup>
      {filters.minStars > 0 && <Button onClick={e => setFilters({...filters, minStars: 0})}>Clear Rating Filter</Button>}
    </FormControl>
    </Box>
  );
};