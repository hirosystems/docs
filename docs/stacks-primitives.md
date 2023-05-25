---
title: Stacks Primitives
---

# Stacks Primitives

This articles helps you to interact with the live code blocks.

## Stacks Transactions

### Key Generation

```js live noInline
import { 
  createStacksPrivateKey,
  makeRandomPrivKey,
  getPublicKey,
  publicKeyToString,
  privateKeyToString
} from '@stacks/transactions';

// Random key
const privateKey = makeRandomPrivKey();
// Get public key from private
const publicKey = getPublicKey(privateKey);

// Private key from hex string
const key = 'b244296d5907de9864c0b0d51f98a13c52890be0404e83f273144cd5b9960eed01';
const privateKeyFromHex = createStacksPrivateKey(key);
console.log(privateKeyToString(privateKey));
console.log(privateKeyToString(privateKeyFromHex));
console.log(publicKeyToString(publicKey));
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
console.log("making token transfer");
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
  bufferCVFromString,
  makeContractCall,
  bytesToHex
} from '@stacks/transactions';
import { StacksTestnet, StacksMainnet } from '@stacks/network';

const txOptions = {
  contractAddress: 'SP000000000000000000002Q6VF78',
  contractName: 'pox-2',
  functionName: 'reward-cycle-to-burn-height',
  functionArgs: [uintCV(1)],
  fee: 0,
  senderKey: 'b244296d5907de9864c0b0d51f98a13c52890be0404e83f273144cd5b9960eed01',
  validateWithAbi: true,
  sponsored: true,
  anchorMode: AnchorMode.Any,
};

console.log("making contract call");
try {
  const transaction = await makeContractCall(txOptions);
  const serializedTx = bytesToHex(transaction.serialize());
  const bytesReader = new BytesReader(Buffer.from(serializedTx, 'hex'));
  const deserializedTx = deserializeTransaction(bytesReader);
  const sponsorKey = '770287b9471081c8acd37d57190c7a70f0da2633311cc120853537362d32e67c01';
  const fee = 1000;

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
  console.log(txId);
}
catch (e) {
  console.log("error", e); 
}
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

const recipient = standardPrincipalCV('STNHKEPYEPJ8ET55ZZ0M5A34J0R3N5FM2CMMMAZ6');
const amount = 2500000;
const fee = 0;
const memo = 'test memo';

// private keys of the participants in the transaction
const privKeyStrings = [
  '753b7cc01a1a2e86221266a154af739463fce51219d97e4f856cd7200c3bd2a601',       
  '7287ba251d44a4d3fd9276c88ce34c5c52a038955511cccaf77e61068649c17801',
  '530d9f61984c888536871c6573073bdfc0058896dc1adfe9a6a10dfacadc209101'
];

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
  publicKeys: pubKeyStrings, // public key string array with &amp;amp;amp;amp;gt;= numSignatures elements
  anchorMode: AnchorMode.Any,
});

const serializedTx = transaction.serialize();
const bytesReader = new BytesReader(Buffer.from(serializedTx, 'hex'));
const deserializedTx = deserializeTransaction(bytesReader);
console.log(deserializedTx);
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
