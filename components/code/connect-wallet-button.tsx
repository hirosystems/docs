'use client';

import { connect, disconnect } from '@stacks/connect';
import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export const ConnectWalletButton: React.FC = () => {
  const [isSignedIn, setIsSignedIn] = React.useState(false);

  async function authenticate() {
    try {
      await connect();
      setIsSignedIn(true);
    } catch (error) {
      console.error('Authentication failed:', error);
      setIsSignedIn(false);
    }
  }

  const logout = async () => {
    try {
      disconnect();
      setIsSignedIn(false);
    } catch (error) {
      console.error('Disconnect failed:', error);
    }
  };

  return (
    <Button
      className={cn('px-5 py-2 text-sm leading-5 font-semibold z-10 shadow-lg')}
      onClick={isSignedIn ? () => void logout() : authenticate}
    >
      {isSignedIn ? 'Log out' : 'Connect wallet'}
    </Button>
  );
};
