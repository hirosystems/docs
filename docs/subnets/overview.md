---
title: Overview
---
# Overview

Subnets are a layer-2 scaling solution in the Stacks blockchain that offers low latency and high throughput workloads. It enables developers to build fast and reliable experiences on Stacks.

## Background

Subnets are a network that is separate from the Stacks chain. Subnets can be thought of as a layer-2 (L2), 
and the Stacks chain can be thought of as a layer-1 (L1). The subnets interfaces with the Stacks chain via a smart
contract that is specific to the subnet. Different subnets will use distinct Stacks contracts as an interface. 
This interface contract has several functions that allow it to act as an intermediary between the Stacks chain and
some particular subnet. These functions include but are not limited to:
- `commit-block`: Called by subnet miners to record block hashes and withdrawal state on the Stacks chain.
- `deposit-ft-asset` / `deposit-stx` / `deposit-nft-asset`: Called by users to deposit assets into the subnets 
  contract. The subnet "listens" for calls to these functions, and performs a mint on the subnets to 
  replicate this state. Meanwhile, on the L1, the assets live in the contract.
- `withdraw-ft-asset` / `withdraw-stx` / `withdraw-nft-asset`: Called by miners to withdraw assets from the subnets. 
  In an upcoming update to the subnets repo, this function will be called by users directly. 

In order to register new allowed assets, a valid miner may call `setup-allowed-contracts`, `register-ft-contract`, or `register-nft-contract`. 
The transaction sender must be part of the miners list defined in the subnets contract.

## Features

Subnets are designed to transact on Stacks assets, meaning users can move assets in and out of subnets. While a user’s assets are in a subnet, they trust that subnet’s consensus rules. This subnet will interact with the Stacks chain using a smart contract specific to that subnet.

> **_NOTE:_**
> 
> The current implementation of subnets uses a 2-phase commit protocol amongst a fully-trusted pool of miners.

Below are some of the features of subnets:

- Each subnet may define its throughput settings. The default implementation should support at least 4x high throughput for transactions and may reduce confirmation time from 10 minutes to 1 minute.
- Interacting with a subnet is similar to interacting with a different Stacks network (example: testnet vs. mainnet).
- The Stacks blockchain can support many different subnets.
- Each subnet may use the same or different consensus rules.
- This repository implements a consensus mechanism that uses a two-phase commit among a federated pool of miners.
- To deposit into a subnet, users submit a layer-1 transaction to invoke the deposit method on that subnet's smart contract.
- For withdrawals, users commit the withdrawal on the subnet and then submit a layer-1 transaction to invoke the subnet's smart contract's withdraw method.
