---
title: Migrate Stacking to 2.1
---

## Overview 2.1 Transition

### Glossary

#### "Stacks 2.1"

[Stacks 2.1](https://stacks.org/stacks-21-what-to-expect) is a fork and protocol upgrade of the Stacks blockchain. Among other improvements, it includes an updated [Proof-of-Transfer](https://docs.stacks.co/docs/understand-stacks/proof-of-transfer) (PoX) [contract](https://docs.stacks.co/docs/clarity/noteworthy-contracts/stacking-contract) (aka PoX-2) for Stacking.

#### "PoX-2"

The first iteration of the PoX contract is now sometimes referred to as "PoX-1". PoX-2 (part of the 2.1 fork) is an update to the original contract. The new contract is named `.pox-2` (while the contract is named just `.pox`).

<!-- todo: maybe explain sip-015 periods in more detail -->
<!-- todo: add graphic -->

### PoX Transition & Periods

:::warning
PoX-2 is not immediately active after the 2.1 fork! Period 2 allows stacking pool users to delegate their funds to the pool of their choice, using PoX-2.
:::

- **`Period 1`** — Before the 2.1 fork
- **`Period 2`** — In the 2.1 fork, but PoX-2 hasn't started yet
- **`Period 3`** — In the 2.1 fork, now PoX-2 is active

## What's New?

- Methods now accept `poxAddress` in more BTC address formats (P2PKH, P2SH, P2WPKH, P2WSH, P2TR)
- New [Stacking](#new-pox-interaction-functions-clarity) and [Helper](#new-helper-methods) methods

### New PoX Interaction Functions (Clarity)

The following `@stacks/stacking` methods interact with [new PoX functions added in 2.1](https://github.com/stacksgov/sips/blob/feat/sip-015/sips/sip-015/sip-015-network-upgrade.md#new-method-stack-extend).

- [`stack-extend`](https://github.com/stacksgov/sips/blob/4ed252c11ade5569ab11a28d373b267f0e5499d4/sips/sip-015/sip-015-network-upgrade.md#new-method-stack-extend) = `client.stackExtend()`
- [`stack-increase`](https://github.com/stacksgov/sips/blob/4ed252c11ade5569ab11a28d373b267f0e5499d4/sips/sip-015/sip-015-network-upgrade.md#new-method-stack-increase) = `client.stackIncrease()`
- [`delegate-stack-extend`](https://github.com/stacksgov/sips/blob/4ed252c11ade5569ab11a28d373b267f0e5499d4/sips/sip-015/sip-015-network-upgrade.md#new-method-delegate-stack-extend) = `client.delegateStackExtend()`
- [`delegate-stack-increase`](https://github.com/stacksgov/sips/blob/4ed252c11ade5569ab11a28d373b267f0e5499d4/sips/sip-015/sip-015-network-upgrade.md#new-method-delegate-stack-increase) = `client.delegateStackIncrease()`

### New Helper Methods

<!-- todo: add links to api reference, once live -->

- `StackingClient.getAccountBalanceLocked()` gets the locked balance of the address from a node (`/v2` endpoint)
- `StackingClient.getAccountExtendedBalance()` gets more detailed balances of the address from an API (`/extended` endpoint); this includes STX, FTs, and NFTs
- `StackingClient.getDelegationStatus()` gets the `get-delegation-info` information of the address from a node (readonly contract call)
- `StackingClient.getPoxOperationInfo()` gets information about the current period of transition to PoX-2

## Migration

<!-- todo: version number is not fixated yet, might change -->

Previous `@stacks/stacking` releases should automatically switch to the new PoX contract (in Period 3).
However, if you want to use the new methods detailed above, you need to update to `@stacks/stacking` to a version >=`6.0.0`.

```
npm install @stacks/stacking@6.0.0
```
