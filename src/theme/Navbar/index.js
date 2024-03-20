import React from 'react';
import Navbar from '@theme-original/Navbar';
import { TopBanner } from '@site/src/components/banner/Banner';

export default function NavbarWrapper(props) {
  return (
    <>
      <TopBanner />
      <Navbar {...props} />
    </>
  );
}
