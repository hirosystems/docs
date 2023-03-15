---
title: February 2023 Product Changelog
---

## Overview

Hiro continually makes changes and updates to products to add new features. Each month, these changes are described on these pages so users can better understand which products are affected, what changes and updates were made, and what users need to do to ensure they have these updates.

The sections below describe the changes and updates that were made in February.

## Bitcoin and Ordinals

The latest version of Hiro wallet now supports Bitcoin and Ordinals by allowing users to create Ordinal inscriptions and also send and receive BTC.

The following are the product-specific updates to dive deep into our products.

## Clarinet

* The Ordinal support in Clarinet is now available with the updated `Stacks-network` component used with `chainhook-event-observer`.
* Clarinet team introduced a fix to eliminate space when auto-completing a call to a function, which avoids errors in calling a function using Clarinet.

## Stacks.js

During wallet authentication, the stacks.js team added support for returning btc addresses. The Stacks.js team also documented btc-lib requirements.

## Explorer

The explorer team refactored the UI layer to remove StacksUI for faster development. Some of the popular changes include:
  * Contract balances are made easier
  * Collapse transfer blocks and microblocks and link to tx elements
  * Improved dark mode experience

## Stacks Blockchain API

The API team is actively building new ordinal RESTful APIs as part of a new API microservice.

## Docs

The documentation team had new functionality and features released. 
 * Thumbs up/down functionality to know the feedback from end users.
   * Every documentation page now has a "Is this page useful" feedback form at the bottom.
 * New documentation for [customizing your deployment plans](/docs/clarinet/how-to-guides/how-to-use-deployment-plans.md). You can also watch a video walkthrough [here](https://www.youtube.com/watch?v=YcIg5VCO98s).

## Empower developers as they scale

* [Stacks 2.1 release](https://github.com/stacks-network/stacks-blockchain/pull/3567) is set! Testnet has transitioned to 2.1, and the mainnet will transition to 2.1 at block height 781,551. 
* Subnets work has continued this month as the team prepares for Stacks 2.1 activation. The team has added [burnchain info](https://github.com/hirosystems/stacks-subnets/pull/216) to the event emitter as well as [events for ft/nft registrations](https://github.com/hirosystems/stacks-subnets/pull/215). Lastly, we [added RPC endpoint](https://github.com/hirosystems/stacks-subnets/pull/218) to retrieve withdrawal info for fungible tokens.
* On the API side, the team [implemented support for Subnets](https://github.com/hirosystems/stacks-blockchain-api/pull/1549) with parsing L1 NFT, L1 FT, and L1 STX deposits into synthetic txs. 


## Additional resources

* [Hiro 2023 February Release Roundup](https://www.hiro.so/blog/release-roundup-february-2023).
* [Stacks Blockchain API](https://github.com/hirosystems/stacks-blockchain-api/pulse/monthly)
* [Clarinet](https://github.com/hirosystems/clarinet/pulse/monthly)
* [Stacks.js](https://github.com/hirosystems/stacks.js/pulse/monthly)
* [Explorer](https://github.com/hirosystems/explorer/pulse/monthly)
* [Docs](https://github.com/hirosystems/docs/pulse/monthly)
* [Subnets](https://github.com/hirosystems/stacks-subnets/pulse/monthly)
* [Wallet](https://github.com/hirosystems/wallet/pulse/monthly)
