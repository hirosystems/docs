---
title: Subnets - Learn the basics
sidebar_label: Learn the basics
custom_edit_url: null
---

A subnet is a network separate from the Stacks mainnet blockchain. A subnet can be thought of as a layer-2 (L2), and the Stacks chain can be thought of as a layer-1 (L1). A subnet interfaces with the Stacks chain via a smart contract specific to the subnet. Different subnets use distinct contracts on the Stacks chain as an interface.

This interface contract has several functions that allow it to act as an intermediary between the Stacks chain and some particular subnet. These functions include, but are not limited to, the following functions:

- `commit-block`: Called by subnet miners to record block hashes and withdrawal states on the Stacks chain.
- `deposit-ft-asset` / `deposit-stx` / `deposit-nft-asset`: Called by users to deposit assets into the subnet. The subnet miners "listens" for calls to these functions and perform a mint on the subnets to replicate this state. Meanwhile, on the L1, the assets live in the subnet contract.
- `withdraw-ft-asset` / `withdraw-stx` / `withdraw-nft-asset`: Called by users to withdrawal assets from the subnet. Withdrawal is a two step process, where the user first initiates a withdrawal within the subnet, then calls these functions on the Stacks chain to complete the withdrawal.

In order to register new allowed assets, the subnet's administrator must call `register-new-ft-contract`, or `register-new-nft-contract`. Only assets that have been registered can be deposited into the subnet.
