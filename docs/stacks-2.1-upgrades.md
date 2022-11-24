---
title: Migrate Stacking to 2.1
---

## Overview

In this article, you'll learn about Stacks 2.05 to 2.1 migration and how our product changes reflect this upgrade.

## What is Stacks 2.1?

[Stacks 2.1](https://stacks.org/stacks-21-what-to-expect) is a fork and protocol upgrade of the Stacks blockchain. Among other improvements, it includes an updated [Proof-of-Transfer](https://docs.stacks.co/docs/understand-stacks/proof-of-transfer) (PoX) [contract](https://docs.stacks.co/docs/noteworthy-contracts/stacking-contract) (aka PoX-2) for Stacking.

## What is PoX-2?

[Proof-of-transfer(PoX)](https://docs.stacks.co/docs/understand-stacks/proof-of-transfer) is a consesus mechanism in modern blockchains. In Stacks 2.05 or earlier versions, this consensus mechanism uses `.PoX` or `.PoX-1` smart contract. With the Stacks 2.1 update, the new fork is updated to `.PoX-2`.

### PoX Periods

The PoX-2 fork happens with the following periods. The following periods helps us understand the transition of the new [network upgrade - SIP-015](https://github.com/stacksgov/sips/blob/feat/sip-015/sips/sip-015/sip-015-network-upgrade.md).

- **`Period 1`** — Before the 2.1 fork
- **`Period 2`** — In the 2.1 fork, but before the first PoX-2 reward cycle
  - **`Period 2a`** — In the 2.1 fork, but before v1_unlock_height
  - **`Period 2b`** — In the 2.1 fork, after v1_unlock_height, but before the first PoX-2 reward cycle
- **`Period 3`** — In the 2.1 fork, now PoX-2 is active

> **_NOTE:_**
>
> PoX-2 is not immediately used for reward cyles after the 2.1 fork! Period 2 (2a and 2b) allows stackers to stack and delegate their funds using PoX-2.

Now, lets dive into each product and understand the new features or improvements to the existing features for Stacks 2.1 updates.

## Clarinet

Clarinet has updates for the following features to work on Stacks 2.1. For more information, refer to [new features in Clarinet](https://www.hiro.so/blog/meet-4-new-features-in-clarinet)

- Clarinet integrate
- Chainhooks
- Smart contract deployment

## Stacks Blockchain API

### Distinguish Contract Versions

The endpoints ` /extended/v1/tx/<txid>` and `/extended/v1/contract/<contract-principal>` returns a new property `clarity_version`.

Sample response for a versioned smart contract transaction with Clarity version 2:

"clarity_version": 2

Sample response for a regular (non-versioned) smart contract transaction with Clarity version null:

"clarity_version": null

### Coinbase Payouts

The Stacks 2.1 updates supports alternate recipient for coinbase transactions. The `alt_recipient` value is passed in the blockchain transaction and the API returns a new coinbase `alt_recipient` property on applicable requests.

The `alt_recipient` value varies based on the standard vs contract principal recipients.

Standard principal recipient:
`"alt_recipient": "ST2X2FYCY01Y7YR2TGC2Y6661NFF3SMH0NGXPWTV5" <-- New`

Contract principal recipient:
`"alt_recipient": "ST2X2FYCY01Y7YR2TGC2Y6661NFF3SMH0NGXPWTV5.hello_world" <-- New`

### PoX2 support for Rosetta API

The PoX-2 support is extended to various functions mentioned [below](#new-pox-interactive-functions-for-clarity) and [Rosetta API](https://www.rosetta-api.org/).

- **Address format changes**: Adding support for segwit/taproot/bech32 addresses in PoX 2
- **Constructing stacking operations**: Rosetta has built-in support for performing various "Stacking" operations, which under the hood perform PoX-1 contract calls. These need to be changed to PoX-2 contract calls.
- **Parsing stacking operations**: Adding support for performing various "Stacking" operations, which involve PoX-2 contract calls.

## Stacks.js

Mention about 3 sections below.

- Methods now accept `poxAddress` in more BTC address formats (P2PKH, P2SH, P2WPKH, P2WSH, P2TR)
- New [Stacking](#new-pox-interaction-functions-clarity) and [Helper](#new-helper-methods) methods

### New PoX Interactive functions for Clarity

The following `@stacks/stacking` methods interact with [new PoX functions added in 2.1](https://github.com/stacksgov/sips/blob/feat/sip-015/sips/sip-015/sip-015-network-upgrade.md#new-method-stack-extend).

- [`stack-extend`](https://github.com/stacksgov/sips/blob/7c6c69d37c0ab46c0c782bbb203f9eea6d4d42a4/sips/sip-015/sip-015-network-upgrade.md#new-method-stack-extend) = `client.stackExtend()`
- [`stack-increase`](https://github.com/stacksgov/sips/blob/7c6c69d37c0ab46c0c782bbb203f9eea6d4d42a4/sips/sip-015/sip-015-network-upgrade.md#new-method-stack-increase) = `client.stackIncrease()`
- [`delegate-stack-extend`](https://github.com/stacksgov/sips/blob/7c6c69d37c0ab46c0c782bbb203f9eea6d4d42a4/sips/sip-015/sip-015-network-upgrade.md#new-method-delegate-stack-extend) = `client.delegateStackExtend()`
- [`delegate-stack-increase`](https://github.com/stacksgov/sips/blob/7c6c69d37c0ab46c0c782bbb203f9eea6d4d42a4/sips/sip-015/sip-015-network-upgrade.md#new-method-delegate-stack-increase) = `client.delegateStackIncrease()`
- [`stack-aggregation-commit-indexed`](https://github.com/stacksgov/sips/blob/7c6c69d37c0ab46c0c782bbb203f9eea6d4d42a4/sips/sip-015/sip-015-network-upgrade.md#new-method-stack-aggregation-commit-indexed) = `client.stackAggregationCommitIndexed()`
- [`stack-aggregation-increase`](https://github.com/stacksgov/sips/blob/7c6c69d37c0ab46c0c782bbb203f9eea6d4d42a4/sips/sip-015/sip-015-network-upgrade.md#new-method-stack-aggregation-increase) = `client.stackAggregationIncrease()`

### New Helper Methods

<!-- todo: add links to api reference, once live -->

- `StackingClient.getAccountBalanceLocked()` gets the locked balance of the address from a node (`/v2` endpoint)
- `StackingClient.getAccountExtendedBalance()` gets more detailed balances of the address from an API (`/extended` endpoint); this includes STX, FTs, and NFTs
- `StackingClient.getDelegationStatus()` gets the `get-delegation-info` information of the address from a node (readonly contract call)
- `StackingClient.getPoxOperationInfo()` gets information about the current period of transition to PoX-2

### Migration

Previous `@stacks/stacking` releases will automatically switch to the new PoX contract (in Period 2b).
However, if you want to use the new methods detailed above, you need to update to `@stacks/stacking` to a version >=`6.0.0`.

```
npm install @stacks/stacking@^6.0.0
```
