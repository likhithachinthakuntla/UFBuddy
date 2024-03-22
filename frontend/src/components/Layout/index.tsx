import * as React from 'react';
import Header from './Header'
import Toolbar from '@mui/material/Toolbar';

export type LayoutProps = {
  children: React.ReactNode,
  header?: boolean
}

export default function Layout({children, header}: LayoutProps) {

  return (
    <>
    {header && <><Header /><Toolbar /></>}
    <main>
      {children}
    </main>
    </>
  );
};

Layout.defaultProps = {
  header: true
}