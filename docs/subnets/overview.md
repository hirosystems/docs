---
title: Overview
---

# Subnet Overview

A subnet is a layer-2 scaling solution for the Stacks blockchain, offering low latency and high throughput, enabling developers to build fast and reliable user experiences on Stacks.

## Background

A subnet is a network separate from the Stacks mainnet blockchain. A subnet can be thought of as a layer-2 (L2), and the Stacks chain can be thought of as a layer-1 (L1). A subnet interfaces with the Stacks chain via a smart contract specific to the subnet. Different subnets use distinct contracts on the Stacks chain as an interface.

This interface contract has several functions that allow it to act as an intermediary between the Stacks chain and some particular subnet. These functions include, but are not limited to, the following functions:

- `commit-block`: Called by subnet miners to record block hashes and withdrawal states on the Stacks chain.
- `deposit-ft-asset` / `deposit-stx` / `deposit-nft-asset`: Called by users to deposit assets into the subnet. The subnet miners "listens" for calls to these functions and perform a mint on the subnets to replicate this state. Meanwhile, on the L1, the assets live in the subnet contract.
- `withdraw-ft-asset` / `withdraw-stx` / `withdraw-nft-asset`: Called by users to withdrawal assets from the subnet. Withdrawal is a two step process, where the user first initiates a withdrawal within the subnet, then calls these functions on the Stacks chain to complete the withdrawal.

In order to register new allowed assets, the subnet's administrator must call `register-new-ft-contract`, or `register-new-nft-contract`. Only assets that have been registered can be deposited into the subnet.

## Architecture

This diagram outlines the interaction between a subnet and the Stacks layer-1 chain.

![Architecture of subnets.](images/subnets-architecture.png)

## Features

A subnet is designed to temporarily hold Stacks assets. Users can deposit assets from the Stacks chain, take advantage of faster transactions and lower fees while on the subnet, and withdraw them when finished. While a user's assets are in a subnet, the asset is locked in the subnet contract on the Stacks chain, and representations of those assets are created—appearing in a user's Hiro Wallet—and handled by applications on the subnet.

:::note

_The current subnet implementation relies on either a single block producer or a fully-trusted federation of block producers. Users of a subnet should be aware that they are sacrificing decentralization and security for the speed provided in the subnet, and therefore should only deposit assets into trusted subnets._

:::

Listed below are some of the features of a subnet:

- Each subnet may define its throughput settings. The default implementation should support at least 4x higher throughput for transactions and reduce confirmation time from 10 minutes to 1 minute.
- Interacting with a subnet is similar to interacting with a different Stacks network (for example testnet vs. mainnet).
- The Stacks blockchain may support many different subnets.
- Each subnet may use the same or different consensus rules.
- This repository implements a consensus mechanism that uses a two-phase commit among a federated pool of miners.
- FTs, NFTs, and STX deposits and withdrawals are supported via user-submitted L1 transactions.
- To deposit into a subnet, users submit a layer-1 transaction to invoke the deposit method on that subnet's smart contract.
- For withdrawals, users commit the withdrawal on the subnet and then submit a layer-1 transaction to invoke the subnet's smart contract's withdraw method.
