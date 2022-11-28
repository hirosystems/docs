---
title: Migrate Stacking to 2.1
---

## Overview

In this article, you will learn about Stacks 2.05 to 2.1 migration and how the Hiro product changes reflect this upgrade.

## What is Stacks 2.1?

[Stacks 2.1](https://stacks.org/stacks-21-what-to-expect) is a fork and protocol upgrade of the Stacks blockchain. Among other improvements, Stacks 2.1 includes an updated [Proof-of-Transfer](https://docs.stacks.co/docs/understand-stacks/proof-of-transfer) (PoX) [contract](https://docs.stacks.co/docs/noteworthy-contracts/stacking-contract) (aka PoX-2) for Stacking.

## What is PoX-2?

[Proof-of-transfer(PoX)](https://docs.stacks.co/docs/understand-stacks/proof-of-transfer) is a consensus mechanism in modern blockchains. In Stacks 2.05 or earlier versions, this consensus mechanism uses `.PoX` or `.PoX-1` smart contracts. With the Stacks 2.1 update, the new fork is updated to `.PoX-2`. 

### PoX periods

The PoX-2 fork happens with the following periods. These periods helps Hiro understand the transition of the new [network upgrade - SIP-015](https://github.com/stacksgov/sips/blob/feat/sip-015/sips/sip-015/sip-015-network-upgrade.md).

- **`Period 1`**—Before the 2.1 fork
- **`Period 2`**—In the 2.1 fork, but PoX-2 has not started yet
- **`Period 3`**—In the 2.1 fork, now PoX-2 is active

> **_NOTE:_**
>
> PoX-2 is not immediately used for reward cyles after the 2.1 fork! Period 2 (2a and 2b) allows stackers to stack and delegate their funds using PoX-2.

Now, lets dive into each product and understand the new features or improvements to the existing features for Stacks 2.1 updates.

## Clarinet

### Update Devnet settings

After you [set up local development environment](clarinet/how-to-guides/how-to-set-up-local-development-environment.md) and [create your project](clarinet/how-to-guides/how-to-create-new-project.md), navigate to your project directory and then to `settings/Devnet.toml`. 

You'll find a section [devnet] with the following settings.

```
[devnet]
disable_stacks_explorer = false
disable_stacks_api = false
# disable_bitcoin_explorer = true
# working_dir = "tmp/devnet"
```

Now, add a new setting `enable_next_features = true` and keep the remaining settings without any change.

The updated Devnet.toml looks like:

```
[devnet]
...
enable_next_features = true
disable_stacks_explorer = false
disable_stacks_api = false
```

Spin up a local Devnet network using the command:

`$ clarinet integrate`

If you have any trouble with the above command, refer to our [troubleshooting guide](clarinet/troubleshooting.md) or report an issue [here](https://github.com/hirosystems/clarinet/issues).

And a new stacks-node will spin up. At Bitcoin block height 107, the chainstate will migrate to epoch 2.05, which was a soft introduced earlier this year, reducing the costs of operations, and at bitcoin block height 114, the chainstate will migrate to epoch 2.1.
If the contracts you're developing use Clarity 2, you must wait for this epoch to be crossed before deploying your contracts.

These block heights can be customized using the settings:

[devnet]
...
epoch_2_05 = 107
epoch_2_1 = 114


> **_NOTE:_**
> This new feature is experimental, if you experience bugs or something suspicious, please file an issue.

#### Known limitations

When running clarinet integrate with Stacks 2.1, contracts can not be automatically deployed in the current release. The default devnet deployment needs to be manually applied, using the command

`$ clarinet deployments apply --devnet`

Clarinet has updates for the following features to work on Stacks 2.1. For more information, refer to [new features in Clarinet](https://www.hiro.so/blog/meet-4-new-features-in-clarinet)

## Stacks Blockchain API

### Distinguish contract versions

The endpoints ` /extended/v1/tx/<txid>` and `/extended/v1/contract/<contract-principal>` returns a new property `clarity_version`.

Sample response for a versioned smart contract transaction with Clarity version 2:

"clarity_version": 2

Sample response for a regular (non-versioned) smart contract transaction with Clarity version null:

"clarity_version": null

### Coinbase payouts

The Stacks 2.1 updates supports alternate recipient for coinbase transactions. The `alt_recipient` value is passed in the blockchain transaction and the API returns a new coinbase `alt_recipient` property on applicable requests. ; however, if you want to use the new methods detailed above, you need to update to `@stacks/stacking` to version >=`6.0.0`.

The `alt_recipient` value varies based on the standard vs contract principal recipients.

Standard principal recipient:
`"alt_recipient": "ST2X2FYCY01Y7YR2TGC2Y6661NFF3SMH0NGXPWTV5" <-- New`

Contract principal recipient:
`"alt_recipient": "ST2X2FYCY01Y7YR2TGC2Y6661NFF3SMH0NGXPWTV5.hello_world" <-- New`

### PoX2 support for Rosetta API

The PoX-2 support is extended to various functions mentioned [below](#new-pox-interactive-functions-for-clarity) and [Rosetta API](https://www.rosetta-api.org/).

- **Address format changes**: Adding support for segwit/taproot/bech32 addresses in PoX 2.
- **Constructing stacking operations**: Rosetta has built-in support for performing various "Stacking" operations, which under the hood perform PoX-1 contract calls. These need to be changed to PoX-2 contract calls.
- **Parsing stacking operations**: Adding support for performing various "Stacking" operations, which involve PoX-2 contract calls.

## Stacks.js

Mention about 3 sections below.

- Methods now accept `poxAddress` in more BTC address formats (P2PKH, P2SH, P2WPKH, P2WSH, P2TR).
- New [Stacking](#new-pox-interaction-functions-clarity) and [Helper](#new-helper-methods) methods.

### New PoX interactive functions for Clarity

The following `@stacks/stacking` methods interact with [new PoX functions added in 2.1](https://github.com/stacksgov/sips/blob/feat/sip-015/sips/sip-015/sip-015-network-upgrade.md#new-method-stack-extend).

- [`stack-extend`](https://github.com/stacksgov/sips/blob/7c6c69d37c0ab46c0c782bbb203f9eea6d4d42a4/sips/sip-015/sip-015-network-upgrade.md#new-method-stack-extend) = `client.stackExtend()`
- [`stack-increase`](https://github.com/stacksgov/sips/blob/7c6c69d37c0ab46c0c782bbb203f9eea6d4d42a4/sips/sip-015/sip-015-network-upgrade.md#new-method-stack-increase) = `client.stackIncrease()`
- [`delegate-stack-extend`](https://github.com/stacksgov/sips/blob/7c6c69d37c0ab46c0c782bbb203f9eea6d4d42a4/sips/sip-015/sip-015-network-upgrade.md#new-method-delegate-stack-extend) = `client.delegateStackExtend()`
- [`delegate-stack-increase`](https://github.com/stacksgov/sips/blob/7c6c69d37c0ab46c0c782bbb203f9eea6d4d42a4/sips/sip-015/sip-015-network-upgrade.md#new-method-delegate-stack-increase) = `client.delegateStackIncrease()`
- [`stack-aggregation-commit-indexed`](https://github.com/stacksgov/sips/blob/7c6c69d37c0ab46c0c782bbb203f9eea6d4d42a4/sips/sip-015/sip-015-network-upgrade.md#new-method-stack-aggregation-commit-indexed) = `client.stackAggregationCommitIndexed()`
- [`stack-aggregation-increase`](https://github.com/stacksgov/sips/blob/7c6c69d37c0ab46c0c782bbb203f9eea6d4d42a4/sips/sip-015/sip-015-network-upgrade.md#new-method-stack-aggregation-increase) = `client.stackAggregationIncrease()`

### New helper methods

<!-- todo: add links to api reference, once live -->

- `StackingClient.getAccountBalanceLocked()` gets the locked balance of the address from a node (`/v2` endpoint)
- `StackingClient.getAccountExtendedBalance()` gets more detailed balances of the address from an API (`/extended` endpoint); this includes STX, FTs, and NFTs
- `StackingClient.getDelegationStatus()` gets the `get-delegation-info` information of the address from a node (read-only contract call)
- `StackingClient.getPoxOperationInfo()` gets information about the current period of transition to PoX-2

### Migration

Previous `@stacks/stacking` releases will automatically switch to the new PoX contract (in Period 2b).
However, if you want to use the new methods detailed above, you need to update to `@stacks/stacking` to a version >=`6.0.0`.

```
npm install @stacks/stacking@^6.0.0
```
