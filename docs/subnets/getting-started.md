---
# The default id is the same as the one defined below. so not needed
title: Getting Started
custom_edit_url: null
---

You understand subnets from the [overview](./index.md)—now you can test one out in action. Hiro's Clarinet can serve a local subnet with [`clarinet integrate`](../clarinet/guides/how-to-run-integration-environment.md) as one of the networks in your Stacks development environment.

## What to expect

This guide walks a user through a **subnet demonstration**: minting and transferring NFTs between a main chain (local devnet) and a subnet to showcase subnet's high throughput and low latency functionality. By the end of this guide, the user will:

- Deploy the layer-1 contract that governs the interface to your subnet
- Deploy the layer-2 subnet contract that runs our example application—an NFT contract
- Create the handful of [Stacks.js](https://github.com/hirosystems/stacks.js) scripts that will allow us to interact with our subnet and its contract application

Hiro has a [Subnet demo app](https://github.com/hirosystems/subnet-demo-app) demonstrating subnets' capabilities through a simple hypothetical NFT marketplace where minting, listing, and offers happen on L2. You can follow the steps by watching [this youtube presentation](https://www.youtube.com/watch?v=FHKf-9C0LoI).

## Run a local subnet with Clarinet

Clarinet provides a tool to set up a complete local development environment, known as a "devnet", which uses Docker to spin up a Bitcoin node, a Stacks node, a Stacks API node, a Stacks Explorer, and now, a subnet node and subnet API node. This allows developers to configure a subnet and develop and test applications locally on a system that matches the production environment.

In this section, we will explain how to launch and interact with the devnet's subnet node using a simple NFT example project.

Ensure you have `clarinet` installed and the version is 1.7.1 or above. If you do not already have Clarinet installed, please refer to the Clarinet installation instructions [here](../clarinet/getting-started.md#install-clarinet) for installation procedures.

### Create a new project with Clarinet

To create a new project, run:

```sh
clarinet new subnet-nft-example
cd subnet-nft-example
```

This command creates a new directory with a Clarinet project already initialized, and then switches into that directory.

### Create the contracts

While this guide does involve writing and publishing a Clarity contract to your local subnet, Clarinet does not yet support contract deployment to subnets directly. Instead, we will manually deploy the contract through a Stacks.js script in a later step.

#### Creating the Stacks (L1) contract

Our first contract will be the L1 contract that serves as an interface with the subnet node, in this instance allowing us to mint and transfer NFTs between the layers. Our L1 NFT contract is going to implement the [SIP-009 NFT trait](https://github.com/stacksgov/sips/blob/main/sips/sip-009/sip-009-nft-standard.md#trait).

We will add this to our project as a requirement so that Clarinet will deploy it for us.

```sh
clarinet requirements add ST1NXBK3K5YYMD6FD41MVNP3JS1GABZ8TRVX023PT.nft-trait
```

We'll also use a new trait defined for the subnet, `mint-from-subnet-trait`, that allows the subnet to mint a new asset on the Stacks chain if it was originally minted on the subnet and then withdrawn. We will add a requirement for this contract as well:

```sh
clarinet requirements add ST13F481SBR0R7Z6NMMH8YV2FJJYXA5JPA0AD3HP9.subnet-traits-v1
```

Now, we will use Clarinet to create our L1 contract:

```sh
clarinet contract new simple-nft-l1
```

This creates the file, _./contracts/simple-nft-l1.clar_. Open the file and add the following content:

```clarity
(define-constant CONTRACT_OWNER tx-sender)
(define-constant CONTRACT_ADDRESS (as-contract tx-sender))

(define-constant ERR_NOT_AUTHORIZED (err u1001))

(impl-trait 'ST1NXBK3K5YYMD6FD41MVNP3JS1GABZ8TRVX023PT.nft-trait.nft-trait)
(impl-trait 'ST13F481SBR0R7Z6NMMH8YV2FJJYXA5JPA0AD3HP9.subnet-traits-v1.mint-from-subnet-trait)

(define-data-var lastId uint u0)
(define-map CFG_BASE_URI bool (string-ascii 256))

(define-non-fungible-token nft-token uint)

(define-read-only (get-last-token-id)
  (ok (var-get lastId))
)

(define-read-only (get-owner (id uint))
  (ok (nft-get-owner? nft-token id))
)

(define-read-only (get-token-uri (id uint))
  (ok (map-get? CFG_BASE_URI true))
)

(define-public (transfer (id uint) (sender principal) (recipient principal))
  (begin
    (asserts! (is-eq tx-sender sender) ERR_NOT_AUTHORIZED)
    (nft-transfer? nft-token id sender recipient)
  )
)

;; test functions
(define-public (test-mint (recipient principal))
  (let
    ((newId (+ (var-get lastId) u1)))
    (var-set lastId newId)
    (nft-mint? nft-token newId recipient)
  )
)

(define-public (mint-from-subnet (id uint) (sender principal) (recipient principal))
    (begin
        ;; Check that the tx-sender is the provided sender
        (asserts! (is-eq tx-sender sender) ERR_NOT_AUTHORIZED)

        (nft-mint? nft-token id recipient)
    )
)

(define-public (gift-nft (recipient principal) (id uint))
  (begin
    (nft-mint? nft-token id recipient)
  )
)
```

:::note

_This contract implements the `mint-from-subnet-trait` and the SIP-009 `nft-trait.` When `mint-from-subnet-trait` is implemented, it allows an NFT to be minted on the subnet, then later withdrawn to the L1._

:::

#### Creating the subnet (L2) contract

Next, we will manually create the subnet contract at _./contracts/simple-nft-l2.clar_. This can be accomplished using the "New File..." interface in your editor, or with `touch contracts/simple-nft-l2.clar` in the terminal.

:::note

_We are not using Clarinet to add this contract because we do not want it to be deployed on the Stacks network, and Clarinet does not yet support deployment on the subnet. Instead, in a later step, we will write and run a Stacks.js script that communicates to the subnet node to deploy this contract._

:::

Open the new file and add the following content:

```clarity
(define-constant CONTRACT_OWNER tx-sender)
(define-constant CONTRACT_ADDRESS (as-contract tx-sender))

(define-constant ERR_NOT_AUTHORIZED (err u1001))

(impl-trait 'ST000000000000000000002AMW42H.subnet.nft-trait)

(define-data-var lastId uint u0)

(define-non-fungible-token nft-token uint)


;; NFT trait functions
(define-read-only (get-last-token-id)
  (ok (var-get lastId))
)

(define-read-only (get-owner (id uint))
  (ok (nft-get-owner? nft-token id))
)

(define-read-only (get-token-uri (id uint))
  (ok (some "unimplemented"))
)

(define-public (transfer (id uint) (sender principal) (recipient principal))
  (begin
    (asserts! (is-eq tx-sender sender) ERR_NOT_AUTHORIZED)
    (nft-transfer? nft-token id sender recipient)
  )
)

;; mint functions
(define-public (mint-next (recipient principal))
  (let
    ((newId (+ (var-get lastId) u1)))
    (var-set lastId newId)
    (nft-mint? nft-token newId recipient)
  )
)

(define-public (gift-nft (recipient principal) (id uint))
  (begin
    (nft-mint? nft-token id recipient)
  )
)

(define-read-only (get-token-owner (id uint))
  (nft-get-owner? nft-token id)
)

(impl-trait 'ST000000000000000000002AMW42H.subnet.subnet-asset)

;; Called for deposit from the burnchain to the subnet
(define-public (deposit-from-burnchain (id uint) (recipient principal))
  (begin
    (asserts! (is-eq tx-sender 'ST000000000000000000002AMW42H) ERR_NOT_AUTHORIZED)
    (nft-mint? nft-token id recipient)
  )
)

;; Called for withdrawal from the subnet to the burnchain
(define-public (burn-for-withdrawal (id uint) (owner principal))
  (begin
    (asserts! (is-eq tx-sender owner) ERR_NOT_AUTHORIZED)
    (nft-burn? nft-token id owner)
  )
)
```

This contract implements the `nft-trait` and the `subnet-asset` trait. The `nft-trait` is the same as the SIP-009 trait on the Stacks network. `subnet-asset` defines the functions required for deposit and withdrawal. `deposit-from-burnchain` is invoked by the subnet node's consensus logic whenever a deposit is made in layer-1. `burn-for-withdrawal` is invoked by the `nft-withdraw?` or `ft-withdraw?` functions of the subnet contract, that a user calls when they wish to withdraw their asset from the subnet back to the layer-1.

### Configuring the Devnet

The settings for the devnet are found in _./settings/Devnet.toml_. In order to launch a subnet in the devnet, we need to tell Clarinet to enable a subnet node and a corresponding API node. Open the file and uncomment or add the following lines under `[devnet]`:

```toml
enable_subnet_node = true
```

Also, we can see a few default settings that `clarinet` will be using for our subnet. It is not necessary to modify any of these settings, but doing so allows you to customize your test environment.

```toml
# L1 Subnet contract which the subnet will attempt to communicate with
subnet_contract_id = "ST167FDXCJGS54J1T0J42VTX46G0QQQFRJGBK28RN.subnet-v3-0-1"
# Docker image of subnet node
subnet_node_image_url = "hirosystems/stacks-subnets:0.8.1"
# Docker image of subnet API
subnet_api_image_url = "hirosystems/stacks-blockchain-api:latest"
```

### Launching the Devnet

Once the configuration is complete, run the following command to start the devnet environment:

```sh
clarinet integrate
```

This will launch docker containers for a bitcoin node, a Stacks node, the Stacks API service, a subnet node, the subnet API service, and an explorer service. While running, `clarinet integrate` opens a terminal UI that shows various data points about the state of the network.

All of the nodes and services are running and ready when we see:

![Clarinet integrate services](images/subnet-devnet.png)

Once this state is reached, we should see successful calls to `commit-block` in the transactions console. This is the subnet miner committing blocks to the L1. Leave this running and perform the next steps in another terminal.

### Setup Node.js scripts

Clarinet does not yet support direct interaction with the subnet node through deployment plans. Instead, we will interact with our subnet node with [Stacks.js](https://stacks.js.org) scripts.

By the end of this section, we will have these several scripts that correspond to the various kinds of functionality we can invoke from our application:

- _deposit-stx.js_ - deposit STX into the subnet
- _publish.js_ - publish a smart contract
- _register.js_ - register an NFT with the subnet so it can be deposited and withdrawn
- _mint.js_ - mint a new NFT on the L1 (devnet)
- _deposit.js_ - deposit the NFT into the subnet by by calling the `deposit-nft-asset` function on the L1 subnet contract
- _transfer.js_ - transfer the NFT from one user to another in the subnet
- _withdraw-l2.js_ - the two-step withdrawal process starts with withdrawing an asset from the L2 (subnet)
- _withdraw-l1.js_ - the second step to withdrawal is a call to `withdraw-nft-asset` on the L1 subnet contract
- _verify.js_ - querying the current owner of an NFT

We will save these scripts in a new directory, _./scripts/_.

```sh
mkdir scripts
cd scripts
touch {deposit-stx,publish,register,mint,deposit,transfer,withdraw-l2,withdraw-l1,verify}.js
```

Then we will initialize a Node.js project and install the Stacks.js dependencies:

```sh
npm init -y
npm install @stacks/network @stacks/transactions
```

In the generated `package.json` file, add the following into the `json` to enable modules:

```json
  "type": "module",
```

To simplify our scripts, we will define some environment variables in our terminal that will be used to hold the signing keys for various subnet transactions.

```sh
export DEPLOYER_ADDR=ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM
export DEPLOYER_KEY=753b7cc01a1a2e86221266a154af739463fce51219d97e4f856cd7200c3bd2a601

export USER_ADDR=ST2NEB84ASENDXKYGJPQW86YXQCEFEX2ZQPG87ND
export USER_KEY=f9d7206a47f14d2870c163ebab4bf3e70d18f5d14ce1031f3902fbbc894fe4c701

export ALT_USER_ADDR=ST2REHHS5J3CERCRBEPMGH7921Q6PYKAADT7JP2VB
export ALT_USER_KEY=3eccc5dac8056590432db6a35d52b9896876a3d5cbdea53b72400bc9c2099fe801

export SUBNET_URL="http://localhost:30443"
export SUBNET_CHAIN_ID=1426085120
```

#### Deposit STX script

We'll start with a script to deposit STX into the subnet accounts. Without first depositing any STX, we wouldn't be able to pay the fees on the subnet. This script adds 5 STX to each account that we'll be making transactions from.

_deposit-stx.js_:

```js
import {
  makeContractCall,
  AnchorMode,
  standardPrincipalCV,
  uintCV,
  PostConditionMode,
  broadcastTransaction,
} from '@stacks/transactions';
import { StacksTestnet, HIRO_MOCKNET_DEFAULT } from '@stacks/network';

async function main() {
  const network = new StacksTestnet({ url: HIRO_MOCKNET_DEFAULT });
  const nonce = 0;

  let txOptions = {
    contractAddress: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
    contractName: 'subnet-v3-0-1',
    functionName: 'deposit-stx',
    functionArgs: [
      uintCV(5000000), // amount
      standardPrincipalCV(process.env.USER_ADDR), // sender
    ],
    senderKey: process.env.USER_KEY,
    validateWithAbi: false,
    network,
    anchorMode: AnchorMode.Any,
    fee: 10000,
    postConditionMode: PostConditionMode.Allow,
    nonce,
  };

  let transaction = await makeContractCall(txOptions);

  let txid = await broadcastTransaction(transaction, network);

  console.log(txid);

  txOptions = {
    contractAddress: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
    contractName: 'subnet-v3-0-1',
    functionName: 'deposit-stx',
    functionArgs: [
      uintCV(5000000), // amount
      standardPrincipalCV(process.env.ALT_USER_ADDR), // sender
    ],
    senderKey: process.env.ALT_USER_KEY,
    validateWithAbi: false,
    network,
    anchorMode: AnchorMode.Any,
    fee: 10000,
    postConditionMode: PostConditionMode.Allow,
    nonce,
  };

  transaction = await makeContractCall(txOptions);

  txid = await broadcastTransaction(transaction, network);

  console.log(txid);
}

main();
```

#### Publish contract script

Next, we'll add a script to publish a contract. To make it reusable, we will allow this script to handle some command line arguments:

1. Contract name
2. Path to contract
3. Network layer (1 = Stacks, 2 = Subnet)
4. The deployer's current account nonce

_publish.js_:

```js
import { AnchorMode, makeContractDeploy, broadcastTransaction } from '@stacks/transactions';
import { StacksTestnet, HIRO_MOCKNET_DEFAULT } from '@stacks/network';
import { readFileSync } from 'fs';

async function main() {
  const contractName = process.argv[2];
  const contractFilename = process.argv[3];
  const networkLayer = parseInt(process.argv[4]);
  const nonce = parseInt(process.argv[5]);
  const senderKey = process.env.USER_KEY;
  let network = null;
  if (networkLayer == 1) {
    network = new StacksTestnet({ url: HIRO_MOCKNET_DEFAULT });
  } else if (networkLayer == 2) {
    network = new StacksTestnet({ url: process.env.SUBNET_URL });
    network.chainId = process.env.SUBNET_CHAIN_ID;
  } else {
    console.log(`Invalid networkLayer: ${networkLayer}`);
    return 1;
  }

  const codeBody = readFileSync(contractFilename, { encoding: 'utf-8' });

  const transaction = await makeContractDeploy({
    codeBody,
    contractName,
    senderKey,
    network,
    anchorMode: AnchorMode.Any,
    fee: 10000,
    nonce,
  });

  const txid = await broadcastTransaction(transaction, network);

  console.log(txid);
}

main();
```

#### Register NFT script

We also need to register our NFT with our subnet, allowing it to be deposited into the subnet. To do this, we'll write another script, but because we only need to do this once, we will hardcode our details into the script.

This script calls `register-new-nft-contract` on the L1 subnet contract, passing the L1 and L2 NFT contracts we will publish.

_register.js_:

```js
import {
  makeContractCall,
  AnchorMode,
  contractPrincipalCV,
  broadcastTransaction,
  getNonce,
} from '@stacks/transactions';
import { StacksTestnet, HIRO_MOCKNET_DEFAULT } from '@stacks/network';

async function main() {
  const network = new StacksTestnet({ url: HIRO_MOCKNET_DEFAULT });
  const senderKey = process.env.DEPLOYER_KEY;
  const deployerAddr = process.env.DEPLOYER_ADDR;
  const userAddr = process.env.USER_ADDR;
  const nonce = (await getNonce(deployerAddr, network)) + BigInt(1);

  const txOptions = {
    contractAddress: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
    contractName: 'subnet-v3-0-1',
    functionName: 'register-new-nft-contract',
    functionArgs: [
      contractPrincipalCV(deployerAddr, 'simple-nft-l1'),
      contractPrincipalCV(userAddr, 'simple-nft-l2'),
    ],
    senderKey,
    validateWithAbi: false,
    network,
    anchorMode: AnchorMode.Any,
    fee: 10000,
    nonce,
  };

  const transaction = await makeContractCall(txOptions);

  const txid = await broadcastTransaction(transaction, network);

  console.log(txid);
}

main();
```

#### Mint NFT script

In order to move NFTs to and from the subnet, we will need to have some NFTs on our devnet. To do this, we need to mint, so we also write a script for submitting NFT mint transactions to the layer-1 network. This script takes just one argument: the user's current account nonce.

_mint.js_:

```js
import {
  makeContractCall,
  AnchorMode,
  standardPrincipalCV,
  uintCV,
  broadcastTransaction,
} from '@stacks/transactions';
import { StacksTestnet, HIRO_MOCKNET_DEFAULT } from '@stacks/network';

async function main() {
  const network = new StacksTestnet({ url: HIRO_MOCKNET_DEFAULT });
  const senderKey = process.env.USER_KEY;
  const deployerAddr = process.env.DEPLOYER_ADDR;
  const addr = process.env.USER_ADDR;
  const nonce = parseInt(process.argv[2]);

  const txOptions = {
    contractAddress: deployerAddr,
    contractName: 'simple-nft-l1',
    functionName: 'gift-nft',
    functionArgs: [standardPrincipalCV(addr), uintCV(5)],
    senderKey,
    validateWithAbi: false,
    network,
    anchorMode: AnchorMode.Any,
    fee: 10000,
    nonce,
  };

  const transaction = await makeContractCall(txOptions);

  const txid = await broadcastTransaction(transaction, network);

  console.log(txid);
}

main();
```

#### Deposit NFT script

We also want to be able to deposit an asset into the subnet. To do this, we will write another script to call the `deposit-nft-asset` function on the layer-1 subnet contract. Like the NFT minting script, this script takes just one argument: the user's current account nonce.

_deposit.js_

```js
import {
  makeContractCall,
  AnchorMode,
  standardPrincipalCV,
  uintCV,
  contractPrincipalCV,
  PostConditionMode,
  broadcastTransaction,
} from '@stacks/transactions';
import { StacksTestnet, HIRO_MOCKNET_DEFAULT } from '@stacks/network';

async function main() {
  const network = new StacksTestnet({ url: HIRO_MOCKNET_DEFAULT });
  const senderKey = process.env.USER_KEY;
  const addr = process.env.USER_ADDR;
  const deployerAddr = process.env.DEPLOYER_ADDR;
  const nonce = parseInt(process.argv[2]);

  const txOptions = {
    contractAddress: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
    contractName: 'subnet-v3-0-1',
    functionName: 'deposit-nft-asset',
    functionArgs: [
      contractPrincipalCV(deployerAddr, 'simple-nft-l1'), // contract ID of nft contract on L1
      uintCV(5), // ID
      standardPrincipalCV(addr), // sender
    ],
    senderKey,
    validateWithAbi: false,
    network,
    anchorMode: AnchorMode.Any,
    fee: 10000,
    postConditionMode: PostConditionMode.Allow,
    nonce,
  };

  const transaction = await makeContractCall(txOptions);

  const txid = await broadcastTransaction(transaction, network);

  console.log(txid);
}

main();
```

#### Transfer NFT script

We will want to transfer an NFT from one user to another to demonstrate some subnet transactions. We will write another script to invoke the NFT's `transfer` function in the subnet. Again, this script takes just one argument: the user's current account nonce.

_transfer.js_

```js
import {
  makeContractCall,
  AnchorMode,
  standardPrincipalCV,
  uintCV,
  PostConditionMode,
  broadcastTransaction,
} from '@stacks/transactions';
import { StacksTestnet } from '@stacks/network';

async function main() {
  let network = new StacksTestnet({ url: process.env.SUBNET_URL });
  network.chainId = process.env.SUBNET_CHAIN_ID;
  const senderKey = process.env.USER_KEY;
  const addr = process.env.USER_ADDR;
  const alt_addr = process.env.ALT_USER_ADDR;
  const nonce = parseInt(process.argv[2]);

  const txOptions = {
    contractAddress: addr,
    contractName: 'simple-nft-l2',
    functionName: 'transfer',
    functionArgs: [
      uintCV(5), // ID
      standardPrincipalCV(addr), // sender
      standardPrincipalCV(alt_addr), // recipient
    ],
    senderKey,
    validateWithAbi: false,
    network,
    anchorMode: AnchorMode.Any,
    fee: 10000,
    nonce,
    postConditionMode: PostConditionMode.Allow,
  };

  const transaction = await makeContractCall(txOptions);

  const txid = await broadcastTransaction(transaction, network);

  console.log(txid);
}

main();
```

#### L2 withdraw script

In order to withdraw an asset from a subnet, users must first submit a withdraw transaction on that subnet. To support this, we will write a script that invokes the `nft-withdraw?` method on the layer-2 subnet contract. This script takes just a single argument: the user's current account nonce.

_withdraw-l2.js_

```js
import {
  makeContractCall,
  AnchorMode,
  standardPrincipalCV,
  contractPrincipalCV,
  uintCV,
  broadcastTransaction,
  PostConditionMode,
} from '@stacks/transactions';
import { StacksTestnet } from '@stacks/network';

async function main() {
  let network = new StacksTestnet({ url: process.env.SUBNET_URL });
  network.chainId = process.env.SUBNET_CHAIN_ID;
  const senderKey = process.env.ALT_USER_KEY;
  const contractAddr = process.env.USER_ADDR;
  const addr = process.env.ALT_USER_ADDR;
  const nonce = parseInt(process.argv[2]);

  const txOptions = {
    contractAddress: 'ST000000000000000000002AMW42H',
    contractName: 'subnet',
    functionName: 'nft-withdraw?',
    functionArgs: [
      contractPrincipalCV(contractAddr, 'simple-nft-l2'),
      uintCV(5), // ID
      standardPrincipalCV(addr), // recipient
    ],
    senderKey,
    validateWithAbi: false,
    network,
    anchorMode: AnchorMode.Any,
    fee: 10000,
    nonce,
    postConditionMode: PostConditionMode.Allow,
  };

  const transaction = await makeContractCall(txOptions);

  const txid = await broadcastTransaction(transaction, network);

  console.log(txid);
}

main();
```

#### L1 withdraw script

The second step of a withdrawal is to call the `withdraw-nft-asset` method on the layer-1 subnet contract. This method requires information from the subnet to verify that the withdrawal is valid. We will write a script that queries our subnet node's RPC interface for this information and then issues the layer-1 withdrawal transaction.

This script has two input arguments: the (subnet) block height of the layer-2 withdrawal transaction, and the user's current account nonce.

_withdraw-l1.js_

```js
import {
  makeContractCall,
  deserializeCV,
  AnchorMode,
  standardPrincipalCV,
  uintCV,
  someCV,
  PostConditionMode,
  contractPrincipalCV,
  broadcastTransaction,
} from '@stacks/transactions';
import { StacksTestnet, HIRO_MOCKNET_DEFAULT } from '@stacks/network';

async function main() {
  const network = new StacksTestnet({ url: HIRO_MOCKNET_DEFAULT });
  const subnetUrl = process.env.SUBNET_URL;
  const senderKey = process.env.ALT_USER_KEY;
  const addr = process.env.ALT_USER_ADDR;
  const l1ContractAddr = process.env.DEPLOYER_ADDR;
  const l2ContractAddr = process.env.USER_ADDR;
  const withdrawalBlockHeight = process.argv[2];
  const nonce = parseInt(process.argv[3]);
  const withdrawalId = 0;

  let json_merkle_entry = await fetch(
    `${subnetUrl}/v2/withdrawal/nft/${withdrawalBlockHeight}/${addr}/${withdrawalId}/${l2ContractAddr}/simple-nft-l2/5`
  ).then(x => x.json());
  let cv_merkle_entry = {
    withdrawal_leaf_hash: deserializeCV(json_merkle_entry.withdrawal_leaf_hash),
    withdrawal_root: deserializeCV(json_merkle_entry.withdrawal_root),
    sibling_hashes: deserializeCV(json_merkle_entry.sibling_hashes),
  };

  const txOptions = {
    senderKey,
    network,
    anchorMode: AnchorMode.Any,
    contractAddress: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
    contractName: 'subnet-v3-0-1',
    functionName: 'withdraw-nft-asset',
    functionArgs: [
      contractPrincipalCV(l1ContractAddr, 'simple-nft-l1'), // nft-contract
      uintCV(5), // ID
      standardPrincipalCV(addr), // recipient
      uintCV(withdrawalId), // withdrawal ID
      uintCV(withdrawalBlockHeight), // withdrawal block height
      someCV(contractPrincipalCV(l1ContractAddr, 'simple-nft-l1')), // nft-mint-contract
      cv_merkle_entry.withdrawal_root, // withdrawal root
      cv_merkle_entry.withdrawal_leaf_hash, // withdrawal leaf hash
      cv_merkle_entry.sibling_hashes,
    ], // sibling hashes
    fee: 10000,
    postConditionMode: PostConditionMode.Allow,
    nonce,
  };

  const transaction = await makeContractCall(txOptions);

  const txid = await broadcastTransaction(transaction, network);

  console.log(txid);
}

main();
```

#### Verify script

Lastly, we need a simple way to query for the current owner of an NFT, so we will write a script that invokes the read-only `get-owner` function via either the subnet or stacks node's RPC interface. This script takes just one argument indicating whether it should query the subnet (`2`) or the stacks node (`1`).

_verify.js_

```js
import { uintCV, callReadOnlyFunction, cvToString } from '@stacks/transactions';
import { StacksTestnet, HIRO_MOCKNET_DEFAULT } from '@stacks/network';

async function main() {
  const networkLayer = parseInt(process.argv[2]);
  const senderAddress = process.env.ALT_USER_ADDR;
  let contractAddress = null;
  let contractName = null;
  let network = null;

  if (networkLayer == 1) {
    contractName = 'simple-nft-l1';
    contractAddress = process.env.DEPLOYER_ADDR;
    network = new StacksTestnet({ url: HIRO_MOCKNET_DEFAULT });
  } else if (networkLayer == 2) {
    contractName = 'simple-nft-l2';
    contractAddress = process.env.USER_ADDR;
    network = new StacksTestnet({ url: process.env.SUBNET_URL });
    network.chainId = process.env.SUBNET_CHAIN_ID;
  } else {
    console.log(`Invalid networkLayer: ${networkLayer}`);
    return 1;
  }

  const txOptions = {
    contractAddress,
    contractName,
    functionName: 'get-owner',
    functionArgs: [uintCV(5)],
    network,
    senderAddress,
  };

  const result = await callReadOnlyFunction(txOptions);

  console.log(cvToString(result.value));
}

main();
```

### Interacting with the subnet

We will now use this set of scripts to demonstrate a subnet's functionality. We will:

1. Deposit some STX into the subnet, so that we can pay transaction fees
2. Publish our NFT contract on the subnet
3. Mint a new NFT in the stacks network
4. Deposit this NFT into the subnet
5. Transfer the NFT from one user to another in the subnet
6. Withdraw the NFT from the subnet

First, we will deposit 5 STX into the subnet for each of our users:

```sh
node ./deposit-stx.js
```

Since this is an L1 transaction, we can see it in Clarinet's terminal interface, or look for it in the Stacks Explorer, at `http://localhost:8000`. Once this transaction has been confirmed in the L1, it will also trigger a STX transfer in the L2. To see that, we can add the subnet to the Explorer as a new network. To switch to the subnet, select "Network" in the top right, then "Add a network." In the popup, choose a name, e.g. "Devnet Subnet", and then for the URL, use `http://localhost:13999`. Once we see a STX transfer of 5.00 STX, we'll know that the deposit was successful.

![STX deposit successful](images/deposit-stx.png)

Next, we will publish the L2 NFT contract to the subnet:

```sh
node ./publish.js simple-nft-l2 ../contracts/simple-nft-l2.clar 2 0
```

Clarinet's terminal interface does not show the transactions on the subnet, but now we can see the transaction in the subnet explorer that we just set up. You will know this contract deployment succeeded when you see the contract deploy transaction for "simple-nft-l2" in the list of confirmed transactions. Be sure to confirm transactions before proceeding.

![contract deploy confirmed](images/subnets-deployment-confirmed.png)

:::note

_Each of these scripts depend upon the prior transaction to be published to either the L1 devnet or the L2 subnet before the next transaction can be completed successfully (for instance, the `register.js` transaction must be published to a devnet block before the `mint.js` transaction can be called). The Explorer shows these transactions in each new block; be sure to occasionally refresh the Explorer._

:::

Now that the NFT contracts are deployed to both the L1 and the L2, we will register the NFT with the subnet.

```sh
node ./register.js
```

This is an L1 transaction so that you can watch for it in the Clarinet interface or the Devnet network on the Explorer.

Now, we need an asset to work with, so we will mint an NFT on the L1:

```js
node ./mint.js 1
```

We can see this transaction either on the Clarinet interface or in the Devnet network on Explorer.

:::note

_If you run into problems with any of these transactions, it might be helpful to review the Docker logs from the stacks-node and/or the subnet-node:_

```
docker logs stacks-node.subnet-nft-example.devnet | less
docker logs subnet-node.subnet-nft-example.devnet | less
```

:::

Once the mint has been processed, we can deposit it into the subnet:

```js
node ./deposit.js 2
```

We can see this transaction either on the Clarinet interface or in the Devnet network on the Explorer. Similar to the initial STX deposit that we performed, this deposit will trigger a transfer on the L2, which we can see in the subnet explorer as well. On the subnet, we should see a call to `deposit-from-burnchain`.

We can verify that the NFT is now owned by the subnet contract (`ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.subnet-v3-0-1`) on the L1 using:

```js
node ./verify.js 1
```

Similarly, we can verify that the NFT is owned by the expected address (`ST2NEB84ASENDXKYGJPQW86YXQCEFEX2ZQPG87ND`) on the L2:

```js
node ./verify.js 2
```

Now that the NFT is inside the subnet, we can transfer it from one address to another:

```js
node ./transfer.js 1
```

We can see this transaction in the "Devnet Subnet" network in our Explorer.

If we call the `verify.js` script again, we should now see that the NFT is owned. by `ST2REHHS5J3CERCRBEPMGH7921Q6PYKAADT7JP2VB`.

Now, we will initiate a withdrawal from the subnet, by calling the `nft-withdraw?` function on the L2 subnet contract.

```js
node ./withdraw-l2.js 0
```

We can confirm that this transaction is successful in the L2 explorer.

:::note

_In the explorer, note the block height that this withdrawal transaction is included in. Fill in this block height for `$height` in the next step._

:::

For the second part of the withdraw, we call `withdraw-nft-asset` on the L1 subnet contract:

```sh
node ./withdraw-l1.js $height 1
```

This is an L1 transaction, so it can be confirmed in the L1 explorer or in the Clarinet terminal UI.

If everything goes well, now the NFT should be owned by the correct user on the L1 (`ST2REHHS5J3CERCRBEPMGH7921Q6PYKAADT7JP2VB`):

```sh
node ./verify.js 1
```

In the subnet, this asset should not be owned by anyone (`none`):

```sh
node ./verify.js 2
```
