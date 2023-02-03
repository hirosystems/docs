---
title: November 2022 Product Changelog
---

## Overview

Hiro continually makes changes and updates to add new features. Each month, these changes describe which products are affected, what changes and updates were made, and what actions need to be taken to ensure have these updates.these updates are applied.

The sections below describe the changes and updates made in November


## **Stacks API**

Stacks API had several updates and changes released to prepare for the upcoming Stacks 2.1 network upgrade. Specifically, the following updates were made:

- A new property,[`miner_address`](https://github.com/hirosystems/stacks-blockchain-api/pull/1413), was added to the `miner_rewards` event payload. This property identifies the principal that mined the block, while also storing that value so subsequent queries can use this property to find items like unique miners.

A key Stacks 2.1 feature is the option to choose alternative recipients for rewards, which enables you to track the `miner_rewards` event for alternative recipients via the `miner_address` field. This field encodes the miner address. 

**Note**This field replaces the `recipient` field with the generalized recipient, which is currently hard-coded to the miner. 

- A new parsing methodology was introduced for the new [PoX-2 print events](https://github.com/hirosystems/stacks-blockchain-api/pull/1403). This update adds account balance locked state validations tests to ensure Stacks API and `stacks-node` have matching balance and locked states after each of the various Stacking operations, and through each of the PoX transition periods. 

- The[aggregating query limit logic](https://github.com/hirosystems/stacks-blockchain-api/pull/1401) feature was added, which sets query limits based on the resource type being queried, which mostly determines which tables are queried. Categorizing queries in this way meant modifying some of the existing query limits for some endpoints. This should help reduce and avoid out of memory (OOM) errors in the future.

For more information on these updates and changes, please refer to the following resources:

- [Stacks API GitHub Repository Overview](https://github.com/hirosystems/stacks-blockchain-api/pulse/monthly)
- [Stacks API v6.2.1](https://github.com/hirosystems/stacks-blockchain-api/releases/tag/v6.2.1)
- [Stacks Pre-Release v7.0.0-stacks-2.1.1](https://github.com/hirosystems/stacks-blockchain-api/releases/tag/v7.0.0-stacks-2.1.1)


## **Blockchain**

An ecosystem milestone was reached with code complete on the Stacks 2.1 network upgrade.

For more detailed information about the Stacks 2.1 update, please see the [Developer’s Guide to Stacks 2.1](https://www.hiro.so/blog/a-developers-guide-to-stacks-2-1) blog post, and the blog post on [how the upgrade impacts stacking](https://www.hiro.so/blog/how-the-stacks-2-1-transition-impacts-stacking). 

## **Clarinet**

There were several updates and changes made to chainhooks, a feature that enables developers to add IFTTT logic across both the Bitcoin and Stacks blockchains to their applications. These updates included:

- The developer experience was modified by adding a [new mode](https://github.com/hirosystems/clarinet/pull/657): `$ chainhook-node replay –testnet`,which enables you to replay devnet / testnet / mainnet dumps.

- The `chainhookd-node` experience was improved by adding presets. You may now use commands like: `$ chainhook-node start` and identify devnet, testnet, or mainnet and have their local environments set up in just a few minutes. For more information about these commands, please see the [Using Chainhooks](https://docs.hiro.so/clarinet/feature-guides/chainhooks?_gl=1*yvh6u7*_ga*NTQ3NDA3NTIuMTY2MDA3MTQ1MA..*_ga_NB2VBT0KY2*MTY3MzYzNTY4Mi43Mi4wLjE2NzM2MzU2ODIuMC4wLjA.#using-chainhooks)feature guide.

- To support the [Stacks 2.1 upgrade](https://github.com/hirosystems/clarinet/pull/669), Clarinet was updated to improve error management in event observer, while adding support for new event types and clarity version in deployment plans.

For more detailed information on these updates, please refer the following resources:

- [Clarinet GitHub Repository Overview](https://github.com/hirosystems/clarinet/pulse/monthly)
- [Clarinet v1.1.0](https://github.com/hirosystems/clarinet/releases/tag/v1.1.0)

## **Stacks.js**

Stacks.js was updated to support the Stacks 2.1 network upgrade. These updates support Stacks 2.1 and include features such as:

- Support for new stacking methods

- Support for new BTC address formats

- New helpers for the PoX transition

For more information on these updates, please refer to the following resources:

- [Stacks.js GitHub Repository Overview](https://github.com/hirosystems/stacks.js/pulse/monthly)

- [Stacks.js Change Comparison](https://github.com/hirosystems/stacks.js/compare/v5.0.2...v6.0.2)

## **Hiro wallet**

Hiro Wallet was updated with the following changes:

- A change was made to the fee estimate query used to suggest fee rates to a user.

- You now have the option to easily transfer assets within the same wallet.

- Support was added for BNS recipients, enabling users to add a .btc name in the recipient field and send to the associated address.

For more information about these changes, please refer to the following resources:

- [Web v3.26.0](https://github.com/hirosystems/stacks-wallet-web/releases/tag/v3.26.0)

- [Desktop v.4.6.1](https://github.com/hirosystems/stacks-wallet-web/releases/tag/v3.26.0)

## *Explorer**

There were several changes made to Explorer to improve stability and provide additional information for Explorer users. These updates include:

- The Clarity version for smart contract transactions is now displayed, alt recipient for Coinbase transactions, and memo for STX transfer events. 

- The ability to see the historical STX price on transactions was added in the Explorer. Please note that the price listed is on the day of the transaction, not the exact moment of the transaction.

- There is also now support when a user hovers over the icons in the Sandbox, improving navigation.

- Users can now easily copy and paste the exact local time of any transaction, instead of having to manually write it down, by clicking on the tool tip. 

For more information about these changes, please see the following resources:

- [Explorer GitHub Repository](https://github.com/hirosystems/explorer/pulse/monthly)
- [Explorer v.1.61.0](https://github.com/hirosystems/explorer/releases/tag/v1.61.0)

## Additional resources

[Hiro 2022 November Release Roundup](https://www.hiro.so/blog/release-roundup-november-2022).
