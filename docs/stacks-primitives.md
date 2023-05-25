---
title: Stacks Primitives
---

# Stacks Primitives

This articles helps you to interact with the live code blocks.

## Stacks Transactions

### Key Generation

```js live noInline
import { createStacksPrivateKey, makeRandomPrivKey, getPublicKey } from '@stacks/transactions';

// Random key
const privateKey = makeRandomPrivKey();
// Get public key from private
const publicKey = getPublicKey(privateKey);

// Private key from hex string
const key = 'b244296d5907de9864c0b0d51f98a13c52890be0404e83f273144cd5b9960eed01';
const privateKeyFromHex = createStacksPrivateKey(key);
console.log(privateKey);
console.log(privateKeyFromHex);
console.log(publicKey);
```

### STX Token Transfer Transaction
```js live noInline
import { makeSTXTokenTransfer, broadcastTransaction, AnchorMode } from '@stacks/transactions';

const txOptions = {
  recipient: 'SP3FGQ8Z7JY9BWYZ5WM53E0M9NK7WHJF0691NZ159',
  amount: 12345,
  senderKey: 'b244296d5907de9864c0b0d51f98a13c52890be0404e83f273144cd5b9960eed01',
  network: 'testnet', // for mainnet, use 'mainnet'
  memo: 'test memo',
  nonce: 0, // set a nonce manually if you don't want builder to fetch from a Stacks node
  fee: 200, // set a tx fee if you don't want the builder to estimate
  anchorMode: AnchorMode.Any,
};

const transaction = await makeSTXTokenTransfer(txOptions);

// to see the raw serialized tx
const serializedTx = transaction.serialize(); // Uint8Array
const serializedTxHex = bytesToHex(serializedTx); // hex string

// broadcasting transaction to the specified network
const broadcastResponse = await broadcastTransaction(transaction);
const txId = broadcastResponse.txid;
console.log(txId);
```


## Sponsoring Transactions

```js live noInline

  import {
  sponsorTransaction,
  BytesReader,
  deserializeTransaction,
  broadcastTransaction,
} from '@stacks/transactions';
import { StacksTestnet, StacksMainnet } from '@stacks/network';

const bytesReader = new BytesReader(Buffer.from(serializedTx, 'hex'));
const deserializedTx = deserializeTransaction(bytesReader);
const sponsorKey = '770287b9471081c8acd37d57190c7a70f0da2633311cc120853537362d32e67c01';
const fee = 1000n;

const sponsorOptions = {
  transaction: deserializedTx,
  sponsorPrivateKey: sponsorKey,
  fee,
  sponsorNonce: 0,
};

const sponsoredTx = await sponsorTransaction(sponsorOptions);

// for mainnet, use `StacksMainnet()`
const network = new StacksTestnet();

const broadcastResponse = await broadcastTransaction(sponsoredTx, network);
const txId = broadcastResponse.txid;
```

## Supporting multi-signature transactions

```js live noInline
import {
  makeUnsignedSTXTokenTransfer,
  createStacksPrivateKey,
  deserializeTransaction,
  pubKeyfromPrivKey,
  publicKeyToString,
  TransactionSigner,
  standardPrincipalCV,
  BytesReader,
  AnchorMode,
} from '@stacks/transactions';

const recipient = standardPrincipalCV('SP3FGQ8...');
const amount = 2500000n;
const fee = 0n;
const memo = 'test memo';

// private keys of the participants in the transaction
const privKeyStrings = ['6d430bb9...', '2a584d89...', 'd5200dee...'];

// create private key objects from string array
const privKeys = privKeyStrings.map(createStacksPrivateKey);

// corresponding public keys
const pubKeys = privKeyStrings.map(pubKeyfromPrivKey);

// create public key string array from objects
const pubKeyStrings = pubKeys.map(publicKeyToString);

const transaction = await makeUnsignedSTXTokenTransfer({
  recipient,
  amount,
  fee,
  memo,
  numSignatures: 2, // number of signature required
  publicKeys: pubKeyStrings, // public key string array with >= numSignatures elements
  anchorMode: AnchorMode.Any,
});

const serializedTx = transaction.serialize();
```


## Calling Read-Only functions
```js live noInline

import {
  bufferCVFromString,
  callReadOnlyFunction,
  uintCV,
} from "@stacks/transactions";
import { StacksMainnet } from "@stacks/network";

const contractAddress = "SP000000000000000000002Q6VF78";
const contractName = "pox-2";
const functionName = "reward-cycle-to-burn-height";
const cycle = uintCV(1);
const network = new StacksMainnet();
const senderAddress = "SP3HHGW68DAV4RXVXNWENSQPAFX6HQQW40XEEHVWE";

const options = {
  contractAddress,
  contractName,
  functionName,
  functionArgs: [cycle],
  network,
  senderAddress,
};

const result = await callReadOnlyFunction(options);
console.log(result.value.toString());
```
