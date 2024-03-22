import * as React from 'react';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';


const sorts = ['Recommended', 'Highest Rated', 'Most Reviewed', 'Closest']

export default function SortSelect() {

  const [sort, setSort] = React.useState(sorts[0]);

  const handleChange = (event: SelectChangeEvent) => {
    setSort(event.target.value);
  };

  return (<Box sx={{minWidth: 165}}>
    <FormControl variant="standard" sx={{mx: 2}}>
  <InputLabel id="sort-select-label">Sort</InputLabel>
  <Select
    labelId="sort-select-label"
    id="sort-select"
    value={sort}
    onChange={handleChange}
    label="Sort"
    MenuProps={{ disableScrollLock: true }} 
  >
    {sorts.map(sort => <MenuItem key={sort} value={sort}>{sort}</MenuItem>)}
  </Select>
</FormControl>
  </Box>)

};