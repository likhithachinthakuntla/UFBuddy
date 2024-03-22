import * as React from 'react';
import { Link as MuiLink, LinkProps } from '@mui/material';
import {
  Link as RouterLink, NavLinkProps,
} from 'react-router-dom';


export default function Link(props: LinkProps & NavLinkProps) {
  return <MuiLink underline="hover" component={RouterLink} {...props} />
}