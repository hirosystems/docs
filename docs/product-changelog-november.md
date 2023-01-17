---
title: November 2022 Product Changelog
---

## **Stacks API**

For the month of November, the Stacks API team was focused on the Stacks 2.1 network upgrade, which included work on the following items:
‍
- The team introduced the [new property](https://github.com/hirosystems/stacks-blockchain-api/pull/1413) `miner_address` to the `miner_rewards` event payload to indicate the principal that mined the block. This property stores that value so that later queries are able to use it to find things like unique miners. A key Stacks 2.1 feature is the option to choose alternative recipients for rewards, which enables you to track the `miner_rewards` event for alternative recipients via the `miner_address` field. This field encodes the miner address. 

**Note**This field replaces the `recipient` field with the generalized recipient, which is currently hard-coded to the miner. 

- The Stacks API team also implemented parsing for the new [PoX-2 print events](https://github.com/hirosystems/stacks-blockchain-api/pull/1403). This update adds account balance locked state validations tests to ensure the Stacks API and stacks-node have matching balance and locked state after each of the various Stacking operations and through each of the PoX transition periods. 

Finally, [aggregating query limit logic](https://github.com/hirosystems/stacks-blockchain-api/pull/1401) was added, setting query limits based on the resource type being queried, which mostly determines which tables are queried. Categorizing queries in this way meant modifying some of the existing query limits for some endpoints. This should help reduce and avoid out of memory (OOM) errors in the future.

For an overview of PRs merged and issues closed in the past 30 days, in addition to the latest stable release and pre-release, please refer to the following resources:

- [Stacks API GitHub Repository Overview](https://github.com/hirosystems/stacks-blockchain-api/pulse/monthly)
- [Stacks API v6.2.1](https://github.com/hirosystems/stacks-blockchain-api/releases/tag/v6.2.1)
- [Stacks Pre-Release v7.0.0-stacks-2.1.1](https://github.com/hirosystems/stacks-blockchain-api/releases/tag/v7.0.0-stacks-2.1.1)


## **Blockchain**

The Hiro team helped reach an ecosystem milestone with code complete on the Stacks 2.1 network upgrade. For more details regarding the Stacks 2.1 update, check out the [Developer’s Guide to Stacks 2.1](https://www.hiro.so/blog/a-developers-guide-to-stacks-2-1) blog post, and a blog post on [how the upgrade will impact stacking](https://www.hiro.so/blog/how-the-stacks-2-1-transition-impacts-stacking). 

## **Clarinet**

The Clarinet team made several updates to chainhooks, a feature that lets developers add IFTTT logic across both the Bitcoin and Stacks blockchains to their applications. The first chainhook update modifies the developer experience by adding a [new mode](https://github.com/hirosystems/clarinet/pull/657): `$ chainhook-node replay –testnet`. This command enables you to replay devnet / testnet / mainnet dumps. The `chainhookd-node` experience is also being improved by adding presets. You can now use commands like: `$ chainhook-node start` – and identify devnet, testnet, or mainnet and have their local environments set up in just a few minutes. Check out instructions for how to use chainhooks in the [Using Chainhooks](https://docs.hiro.so/clarinet/feature-guides/chainhooks?_gl=1*yvh6u7*_ga*NTQ3NDA3NTIuMTY2MDA3MTQ1MA..*_ga_NB2VBT0KY2*MTY3MzYzNTY4Mi43Mi4wLjE2NzM2MzU2ODIuMC4wLjA.#using-chainhooks)feature guide. 

To support the [Stacks 2.1 upgrade](https://github.com/hirosystems/clarinet/pull/669), the Clarinet team has improved error management in event observer, added support for new event types and clarity version in deployment plans, among other improvements. 

For more information on these Clarinet updates, including an overview of merged PRs and closed issues and the latest Clarinet release, please refer the following resources:

- [Clarinet GitHub Repository Overview](https://github.com/hirosystems/clarinet/pulse/monthly)
- [Clarinet v1.1.0](https://github.com/hirosystems/clarinet/releases/tag/v1.1.0)

## **Stacks.js**

The Stacks.js team released several updates and features to support Stacks 2.1. The most notable update added new stacking methods, support for new BTC address formats, and helpers for the PoX transition. 

For more information on the PRs that were merged, the issues that were closed in the past month, and a comparison between the previous Stacks.js version (v5.0.2) and the current Stacks.js release (v6.0.2), please refer to the following resources:

- [Stacks.js GitHub Repository Overview](https://github.com/hirosystems/stacks.js/pulse/monthly)
- [Stacks.js Change Comparison](https://github.com/hirosystems/stacks.js/compare/v5.0.2...v6.0.2)

## **Hiro Wallet**

The Hiro Wallet team released an update to the fee estimate query used to suggest fee rates to a user. The team also added the option to easily transfer assets within the same wallet. Also, the team added support for BNS recipients allowing users to add a .btc name in the recipient field and send to the associated address.

The current releases are:

- [Web v3.26.0](https://github.com/hirosystems/stacks-wallet-web/releases/tag/v3.26.0)
- [Desktop v.4.6.1](https://github.com/hirosystems/stacks-wallet-web/releases/tag/v3.26.0)

## *Explorer**

To support Stacks 2.1, the Clarity version for smart contract transactions is now displayed, alt recipient for coinbase transactions, and memo for STX transfer events. 

The ability to see the historical STX price on transactions was added in the Explorer. Please note that the price listed will be on the day of the transaction, not the exact moment of the transaction.

There is also now tooltip support when a user hovers over the icons in the Sandbox, improving navigation.

Finally, the team has added a new feature that allows users to easily copy and paste the exact local time of any transaction, instead of having to manually write it down, by clicking on the tooltip. This improvement came directly from user feedback and was implemented in order to simplify the process of collecting a transaction’s time and date. 

For an overview of these changes, please refer to the following resources:

- [Explorer GitHub Repository](https://github.com/hirosystems/explorer/pulse/monthly)
- [Explorer v.1.61.0](https://github.com/hirosystems/explorer/releases/tag/v1.61.0)

## Additional Resources

[Hiro 2022 November Release Roundup](https://www.hiro.so/blog/release-roundup-november-2022).