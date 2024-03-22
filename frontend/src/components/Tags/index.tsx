import * as React from 'react';
import { Box, Chip, SxProps } from '@mui/material';
import Link from '../Link'
import { Link as RouterLink } from 'react-router-dom'


type TagsProps = {
  tags: string[],
  variant: 'chips' | 'links'
  linkStyle?: SxProps
}


export default function Tags({tags, variant, linkStyle}: TagsProps) {


  if(variant === 'links') {
    return (
      <Box>
         {tags.map((tag, i) => <Link to={`/tag/${tag}`} sx={{...linkStyle, mr: 0.5}} key={i}>{tag}{i !== tags.length-1 ? ',' : ''}</Link>)}
      </Box>
    )
  }

  
  return (
    <Box sx={{display: 'flex', flexWrap: 'wrap'}}>
      {tags.map((tag, i) => <Chip component={RouterLink} to={`/tag/${tag}`} onClick={() => {}} size="small" sx={{mr: 1}} key={i} label={tag} />)}
    </Box>
  );
};