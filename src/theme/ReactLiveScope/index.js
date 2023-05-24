import React from 'react';
import * as StacksNetwork from '@stacks/network';
import * as StacksCommon from '@stacks/common';
import * as StacksConnect from '@stacks/connect';
import * as StacksTransactions from '@stacks/transactions';
import * as StacksEncryption from '@stacks/encryption';
import * as StacksProfile from '@stacks/profile';
import * as StacksAuth from '@stacks/auth';
import * as StacksStorage from '@stacks/storage';
//import * as StacksWalletSDK from '@stacks/wallet-sdk';
import * as StacksStacking from '@stacks/stacking';
import * as StacksBlockchainApiClient from '@stacks/blockchain-api-client';

const ButtonExample = props => (
  <button
    {...props}
    style={{
      backgroundColor: 'white',
      color: 'black',
      border: 'solid red',
      borderRadius: 20,
      padding: 10,
      cursor: 'pointer',
      ...props.style,
    }}
  />
);

// Add react-live imports you need here
const ReactLiveScope = {
  React,
  ...React,
  ButtonExample,
  ...StacksNetwork,
  ...StacksCommon,
  ...StacksConnect,
  ...StacksTransactions,
  ...StacksEncryption,
  ...StacksProfile,
  ...StacksAuth,
  ...StacksStorage,
  //...StacksWalletSDK,
  ...StacksStacking,
  ...StacksBlockchainApiClient,
};

export default ReactLiveScope;
