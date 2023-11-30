---
title: Build the frontend
---

# Interacting with the Friend.tech contracts

## Introduction

Stacks.js is a collection of libraries that makes it easy to interact with the Stacks blockchain. In this guide, we'll walk through the process of connecting to a wallet, calling a smart contract function, handling the response, and disconnecting from the wallet.

## Setting up the Development Environment

First, you'll need to set up your development environment. This includes installing Node.js and creating a new React application. You'll also need to install the necessary Stacks.js libraries:

```bash
yarn add @stacks/network @stacks/transactions @stacks/connect
```

## Connecting to a Wallet

To connect to a wallet, we'll use the showConnect function from the `@stacks/connect` library. This function opens the Stacks Wallet and asks the user to approve the connection.

Here's how you can use it in your React application:

```tsx
import { AppConfig, showConnect, UserSession } from '@stacks/connect';

const appConfig = new AppConfig(['store_write', 'publish_data']);
const userSession = new UserSession({ appConfig });

const authOptions = {
  userSession,
  appDetails: {
    name: 'Friend.tech',
    icon: 'src/logo.svg',
  },
  onFinish: data => {
    let userData = data.userSession.loadUserData();
    setAddress(userData.profile.stxAddress.testnet);
    setIsWalletConnected(true);
  },
  onCancel: () => {
    console.log('oops');
  },
  redirectTo: '/',
};

const connectWallet = () => {
  showConnect(authOptions);
};
```

In this code, showConnect is called when the "Connect Wallet" button is clicked. The onFinish callback is called when the user approves the connection, and the setIsWalletConnected state is set to true.

## Interacting With a Smart Contract

To interact with a smart contract, we'll use the callReadOnlyFunction function from the @stacks/transactions library. This function allows us to call a read-only function on a smart contract and get the result.

Here's how you can use it in your React application:

```tsx
import { StacksMocknet } from '@stacks/network';
import { callReadOnlyFunction, cvToString, standardPrincipalCV } from '@stacks/transactions';

const checkIsKeyHolder = async () => {
  const network = new StacksMocknet();
  const contractAddress = 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM';
  const contractName = 'keys';
  const functionName = 'is-keyholder';
  const functionArgs = [standardPrincipalCV('ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM')];

  const result = await callReadOnlyFunction({
    network,
    contractAddress,
    contractName,
    functionName,
    functionArgs,
    senderAddress: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
  });

  setIsKeyHolder(cvToString(result) === 'true');
};
```

In this code, callReadOnlyFunction is called with the necessary parameters to call the is-keyholder function on the keys contract. The result is then converted to a string and compared to 'true' to set the isKeyHolder state.

## Disconnecting From a Wallet

To disconnect from a wallet, we'll use the signUserOut function from the UserSession object. This function clears the session and removes the session data from local storage.

Here's how you can use it in your React application:

```tsx
const disconnectWallet = () => {
  if (userSession.isUserSignedIn()) {
    userSession.signUserOut('/');
    setAddress('');
    setIsWalletConnected(false);
  }
};
```

In this code, signUserOut is called when the "Disconnect Wallet" button is clicked. The setIsWalletConnected state is then set to false.

## Challenges

- **Buy Keys**: Implement a feature that allows users to buy keys. This will involve calling a smart contract function that handles the purchase.
- **Sell Keys**: Implement a feature that allows users to sell keys. This will involve calling a smart contract function that handles the sale.
- **Access Control**: Implement a feature that restricts access to certain chatrooms based on whether the user is a key holder. This will involve checking the isKeyHolder state before rendering the chatroom.
- **Create Chatrooms**: Implement a feature that allows users to create new chatrooms. This might involve deploying a new smart contract for each chatroom.
