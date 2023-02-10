---
title: January 2023 Product Changelog
---

## Overview

As Hiro works to provide the most complete and up-to-date information on product releases and updates, the format of the Product Changelog has been altered slightly to make the content easier to read and understand. Instead of deep dives into each individual product, the focus has shifted to the developer experience, and how these updates and changes improve the overall "developer journey."

The sections below describe the changes and updates that were made in January 2023.

## **Developer onboarding**

The Hiro documentation team has been making significant progress on updating the technical documentation. The following updates/changes were added:

- an overview of [Stacks 2.1 Upgrades](https://docs.hiro.so/stacks-2.1-upgrades?_gl=1*b8bjrq*_ga*MTAyNzkwMjY1Mi4xNjc0MTY2NDk3*_ga_NB2VBT0KY2*MTY3NTk3ODQxMS4yMC4xLjE2NzU5Nzg0MTUuMC4wLjA.)
- a new [Deployment Plans](https://docs.hiro.so/clarinet/feature-guides/clarinet-deploy?_gl=1*98aqwm*_ga*MTAyNzkwMjY1Mi4xNjc0MTY2NDk3*_ga_NB2VBT0KY2*MTY3NTk4Mjk2Ny4yMS4wLjE2NzU5ODI5OTIuMC4wLjA.) feature guide.
- additional references for: [Hiro Archive](https://docs.hiro.so/references/hiro-archive?_gl=1*ov74zl*_ga*MTAyNzkwMjY1Mi4xNjc0MTY2NDk3*_ga_NB2VBT0KY2*MTY3NTk4Mjk2Ny4yMS4xLjE2NzU5ODMwMTYuMC4wLjA.) and [Stacks Connect](https://connect.stacks.js.org/).
- [Hiro Contributors Guide](https://docs.hiro.so/contributors-guide?_gl=1*1yqijce*_ga*MTAyNzkwMjY1Mi4xNjc0MTY2NDk3*_ga_NB2VBT0KY2*MTY3NTk4Mjk2Ny4yMS4xLjE2NzU5ODMwNDUuMC4wLjA.) that describes how to contribute to the technical documentation.

## **Empowering developers to do their best work**

Hiro wants to empower developers to do their best work with the latest updates and enhancements to the Hiro product offerings. The Stacks 2.1 upgrade, and its support across different products, including:

- an API release candidate ([v7.0.0](https://github.com/hirosystems/stacks-blockchain-api/releases/tag/v7.0.0-beta.3)) that supports Stacks 2.1, including a resolution for a known issue (genesis sync).

**Note:** This API release candidate is currently in beta.

- Stacks 2.1 now supports Clarinet 1.4.1, Hiro Explorer, and Stacks.js.
- Subnets has been improved with an updated Subnets contract compatible with Clarity2.
- A new trait for NFTs and FTs has been added on the subnet, which specifies a required name and signature for registration. This update ensures the Stacks Blockchain API always knows the correct name for the mint function.

## **Additional bitcoin support across hiro products **

New API endpoints are currently being developed to support Bitcoin-related queries, and a Stacks.js client library to connect Bitcoin Core RPC. These improvements enable STX-to-BTC and BTC-to-STX address conversions.


## **Addition*al resources**

For more detailed information on these updates, please refer to the following resources:

- [Stacks Blockchain API](https://github.com/hirosystems/stacks-blockchain-api/pulse/monthly)
- [Clarinet](https://github.com/hirosystems/clarinet/pulse/monthly)
- [Stacks.js](https://github.com/hirosystems/stacks.js/pulse/monthly)
- [Hiro Explorer](https://github.com/hirosystems/explorer/pulse/monthly)
- [Hiro Documentation](https://github.com/hirosystems/docs/pulse/monthly)
- [Subnets](https://www.hiro.so/blog/release-roundup-january-2023)
- [Hiro January 2023 Release Roundup](https://www.hiro.so/blog/release-roundup-january-2023).