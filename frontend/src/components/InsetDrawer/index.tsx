import * as React from 'react';
import { Drawer, DrawerProps } from '@mui/material';
import { styled } from '@mui/material/styles';


const StyledDrawer = styled(Drawer)(({ theme }) => ({
  '& .MuiDrawer-paper': {
    boxSizing: 'border-box',
    zIndex: 0,
  },
  '& .MuiDrawer-paper::before': {
    content: '""',
    ...theme.mixins.toolbar
  },
}));

interface InsetDrawerProps extends DrawerProps {
  width: string | number
}

export default function InsetDrawer({children, width, ...rest}: InsetDrawerProps) {
  
  return (
      <StyledDrawer
        variant="permanent"
        sx={{'& .MuiDrawer-paper': { width }}}
        {...rest}
      >
        {children}
      </StyledDrawer>
  );
};