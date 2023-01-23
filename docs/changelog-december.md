---
title: December Product Changelog
---

## Overview

Hiro contnually makes changes and updates to our products to add new features and functionality. Each month, these changes are described in these pages so you can better understand which products are affected, what changes and updates were made, and what you will need to do to ensure you have these updates.

The sections below describe the changes and updates that were made in December.

## **Stacks API**

There were a number of changes that were made to support the Stacks 2.1 update. These changes and updates were made to prepare you to activate Stacks 2.1.

The other significant changes made for Stacks API were focused on API v7. These improvements include:
- additional Blockchain Naming Support (BNS)
- Fixes to Rosetta
- Improved error handling with new `env` configuration for API shutdowns

For more detailed information about these updates and changes, please refer to the following resources:

- [Stacks API GitHub Repository Overview](https://github.com/hirosystems/stacks-blockchain-api/pulse/monthly)
- [Stacks API v6.2.3](https://github.com/hirosystems/stacks-blockchain-api/compare/v6.2.2...v6.2.3)
- [Stacks Pre-Release v7.0.0-stacks-2.1.2](https://github.com/hirosystems/stacks-blockchain-api/releases/tag/v7.0.0-stacks-2.1.2)

## **Blockchain**

There was a major update to the Hiro Archiver completed in December. This change enables you to download and use any of the published datasets needed to run a Stacks environment. For more information on Hiro Archiver updates, please refer to the [Hiro Archive](https://docs.hiro.so/references/hiro-archive?_gl=1*1369xwy*_ga*NTQ3NDA3NTIuMTY2MDA3MTQ1MA..*_ga_NB2VBT0KY2*MTY3MzU0MDkxMS43MC4wLjE2NzM1NDA5MTEuMC4wLjA.#what-is-the-hiro-archive) technical documentation.

One other change was made to how artifacts are used. These hosted artifacts can be used to quickly spin up a new stacks-blockchain node, or comprehensive stacks-blockchain-api deployment.

## **Clarinet**

Like the Stacks API, Clarinet was also improved and updated to support Stacks 2.1, along with support for devnet stability. 

Another update was made to enable you to jump to the definition of any function, variable, constant, map, function argument, including the ability to find defintions of a `contract call`.

For more information on these Clarinet updates, please refer to the following resources:

- [Clarinet GitHub Repository Overview](https://github.com/hirosystems/clarinet/pulse/monthly)
- [Clarinet v1.3.0](https://github.com/hirosystems/clarinet/releases/tag/v1.3.0)

## **Stacks.js**

Stacks.js changes were made to prepare for the Stacks 2.1 update. Several issues were fixed, new features and updates were made, and the Stacks.js version was incrementally updated to v5.0.2. 

For more information on these updates, please refer to the following resources:

- [Stacks.js GitHub Repository Overview](https://github.com/hirosystems/stacks.js/pulse/monthly)
- [Stacks.js Change Comparison](https://github.com/hirosystems/stacks.js/compare/v5.0.2...v6.0.2)

## **Hiro wallet**

Seevral new features were released for the Hiro Wallet. These features include:

- A "Get Support" button was added, making it easier to transfer within the same wallet.
- The Hiro Wallet was updated to enable you to track the app domain as an event property for all events triggered within the flow.

For more information on these changes, please refer to the following resources:

- [Web v3.29.0](https://github.com/hirosystems/stacks-wallet-web/compare/v3.28.0...v3.29.0)
- [Desktop v.4.7.0](https://github.com/hirosystems/stacks-wallet/releases/tag/v4.7.0)

## **Explorer**

Stacks Explorer had several new features added and implemented to improve the overall Explorer experience. These updates include:

- Several bug fixes were released to improve Explorer stability.
- The Explorer Sandbox now supports list arguments, while also including the ability to support calling from the contract page.
- The Explorer page also now shows high level statistics, making it easier for users to quickly find important pieces of information such as STX Supply, Last Block, Current Stacking Cycle, and Next Stacking Cycle.
- Block information is now excluded from transactions in microblocks.
- Dark Mode was updated to fix color issues.

For more information on these changes, please refer to the following resources:

- [Explorer GitHub Repository](https://github.com/hirosystems/explorer/pulse/monthly)
- [Explorer v.1.69.0](https://github.com/hirosystems/explorer/releases/tag/v1.69.0)

## Additional resources

[Hiro 2022December Release Roundup](https://www.hiro.so/blog/release-roundup-december-2022).
