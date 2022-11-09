---
title: Clarinet Deployment Plans
---

## Overview

Collaboration and the ability for teams to work together when deploying smart contracts is important factor in leveraging Clarinet. Hiro has developed a set of primitives that will enable teams to work together more effectively, ensuring that these teams can create smart contracts faster and easier.

Referred to as Deployment Plans, you will be able to simplify the smart contract deployment process to stacks or bitcoin environment.

## Design

 Deployment Plans were designed to create a standardized protocol for deploying smart contracts on any network based on stacks or bitcoin (devnet, testnet, mainnet) while also minimizing the complexity with deployments. Some of these complexities can include dependencies, chaining limits, the process to initialize a smart contract, and underlying deployment costs.

 By using Deployment Plans, you can commit, audit, and test contracts without including any secrets in the Deployment Plan, and share these contracts without exposing any sensitive information.

## Deployment Plans Primitives

Deployment plans consist of the following four primitives:

- deploy contracts
- call contracts
- send bitcoin transactions
- wait for block

With these four individual primitives, you can:

- Deploy a contract in an in-memory simulated chain (simnet only). 
- Call a contract that has been deployed in an in-memory simulated chain (simnet only).
- Deploy an external contract on another testnet / devnet network using another wallet + search, and replace all references to this contract in the local contracts to deploy (devnet / testnet only).
- Deploy a contract (devnet / testnet / mainnet).
- Call a contract (devnet / testnet / mainnet).
- Perform a simple bitcoin transfer from a p2pkh address to a p2pkh address (experimental, regtest / testnet / mainnet).

## References

For a more detailed discussion of Deployment Plans and how you can use them in your workflows, please see the following resources:

[Meet 4 New Features in Clarinet](https://www.hiro.so/blog/meet-4-new-features-in-clarinet) blog post.

[Introduction to Smart Contract Integration with Clarinet](https://www.youtube.com/watch?v=or01j0a9MUo&list=PL5Ujm489LoJaAz9kUJm8lYUWdGJ2AnQTb&index=12) YouTube video.