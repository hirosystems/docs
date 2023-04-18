---
title: March 2023 Product Changelog
---

## Overview

Hiro continually makes changes and updates to products to add new features. Each month, these changes are described on these pages so users can better understand which products are affected, what changes and updates were made, and what users need to do to ensure they have these updates.

The sections below describe the changes and updates made in March 2023.

## Highlights

- [Hiro Platform](https://platform.hiro.so/)
- [Ordinals API](https://docs.hiro.so/ordinals)
- [Ordinals Explorer](https://ordinals.hiro.so/?_gl=1*mjv7yq*_ga*MjgzMDIyNjU5LjE2NjM5MDY1MTk.*_ga_NB2VBT0KY2*MTY4MTg0MzExNS4yMTkuMS4xNjgxODQ1NjM1LjAuMC4w)
- [Documentation landing page](https://docs.hiro.so/?_gl=1*pwuy5q*_ga*MjgzMDIyNjU5LjE2NjM5MDY1MTk.*_ga_NB2VBT0KY2*MTY4MTg0MzExNS4yMTkuMS4xNjgxODQ1Njc2LjAuMC4w)
- [Token Metadata API](https://docs.hiro.so/token-metadata-api/feature-guides/token-metadata-api?_gl=1*dks259*_ga*MjgzMDIyNjU5LjE2NjM5MDY1MTk.*_ga_NB2VBT0KY2*MTY4MTg0MzExNS4yMTkuMS4xNjgxODQ1Njg5LjAuMC4w#service-architecture)


## Hiro Platform

We've officially launched the [Hiro Platform](https://platform.hiro.so/) to create, build and deploy Clarity smart contracts in a cloud-based development environment. You can use the [Hiro Platform documentation](https://docs.hiro.so/platform/overview?_gl=1*19gxvhj*_ga*MjgzMDIyNjU5LjE2NjM5MDY1MTk.*_ga_NB2VBT0KY2*MTY4MTg0MzExNS4yMTkuMS4xNjgxODQ1NzY2LjAuMC4w) to understand the resources, deployment steps, etc.

To learn more, watch the [demo video here](https://www.youtube.com/watch?v=NB1dHCX2cts&ab_channel=Hiro) and read the [blog post here](https://www.hiro.so/blog/meet-the-hiro-platform). 

## Ordinals API

[Ordinals API](https://docs.hiro.so/ordinals?_gl=1*wps5ny*_ga*MjgzMDIyNjU5LjE2NjM5MDY1MTk.*_ga_NB2VBT0KY2*MTY4MTg0MzExNS4yMTkuMS4xNjgxODQ1OTAzLjAuMC4w) is a microservice that indexes Bitcoin Ordinal inscription data and exposes it via REST API endpoints. You can download the specification [here](https://ordinals-api.vercel.app/openapi.yaml).

## Ordinals Explorer

[Ordinal Explorer](https://ordinals.hiro.so/?_gl=1*qyxwtd*_ga*MjgzMDIyNjU5LjE2NjM5MDY1MTk.*_ga_NB2VBT0KY2*MTY4MTg0MzExNS4yMTkuMS4xNjgxODQ1OTAzLjAuMC4w) helps you search by inscription, sat number or block. You also use File types, images, videos, audio, etc., and filters to search your inscriptions.

## Documentation home page

We have a [new documentation landing page](https://docs.hiro.so/?_gl=1*9ceube*_ga*MjgzMDIyNjU5LjE2NjM5MDY1MTk.*_ga_NB2VBT0KY2*MTY4MTg0MzExNS4yMTkuMS4xNjgxODQ2Nzc2LjAuMC4w) with more intuitive features to access information quickly. The getting started links on this page help you quickly onboard to our products. 
The popular sections and product-specific tiles help you navigate through the documentation journey.

## Token metadata API

The [Token metadata API](https://docs.hiro.so/metadata) indexes all Fungible, Non-Fungible, and Semi-Fungible Tokens in the Stacks blockchain and exposes that data through JSON REST API endpoints. The [feature guide](https://docs.hiro.so/token-metadata-api/feature-guides/token-metadata-api?_gl=1*2ijwu6*_ga*MjgzMDIyNjU5LjE2NjM5MDY1MTk.*_ga_NB2VBT0KY2*MTY4MTg0MzExNS4yMTkuMS4xNjgxODQ2ODczLjAuMC4w) shows developers service architecture, features available, and even a quick start section. 
**Note:** As part of this work, we have deprecated several legacy endpoints in the Stacks API that relate to token metadata (deprecated endpoints are labeled as such in documentation [here](https://docs.hiro.so/api?_gl=1*1u92t2x*_ga*MjgzMDIyNjU5LjE2NjM5MDY1MTk.*_ga_NB2VBT0KY2*MTY4MTg0MzExNS4yMTkuMS4xNjgxODQ2ODczLjAuMC4w#tag/Accounts/operation/get_account_nft)), and developers using those endpoints will need to migrate to the new Token Metadata API.

## Other updates

- **Stacks 2.1 is live now:** For Stacks 2.1 documentation, you can refer to [Stacks 2.1 upgrades](https://docs.hiro.so/stacks-2.1-upgrades?_gl=1*1tsz83t*_ga*MjgzMDIyNjU5LjE2NjM5MDY1MTk.*_ga_NB2VBT0KY2*MTY4MTg0MzExNS4yMTkuMS4xNjgxODQ3MDg4LjAuMC4w).
- **API new endpoint:** API team has a [new endpoint](https://github.com/hirosystems/stacks-blockchain-api/pull/1592) that returns a list of stacking pool members for a given delegator principal and [support parsing](https://github.com/hirosystems/stacks-blockchain-api/pull/1583) the new register-asset burnchain-ops for Subnets. 
- **Subnets ongoing work:** added [more failing tests](https://github.com/hirosystems/stacks-subnets/pull/227) for the subnet contract, [watched L1](https://github.com/hirosystems/stacks-subnets/pull/237) subnet contract, and [return block height of the withdrawal](https://github.com/hirosystems/stacks-subnets/pull/228) from the -withdraw? functions. 
- **Hiro wallet support:** Added support for [sending BTC to BNS names](https://github.com/hirosystems/wallet/pull/3365), sending and receiving ordinals, and [PSBTs](https://github.com/hirosystems/wallet/commit/ef053c50e8465394bb36faa0488ea9793b52f52d) (partially signed Bitcoin transactions)! The wallet team also launched a [web portal](http://lockstacks.com/) to improve the stacking experience.
- **Updates for Clarinet integrate:** The Clarinet team shipped updates to include work for subnets, stacks-node 2.1, and on bitcoind v24, which is ideal if users are exploring ordinals.


## Additional resources

* [Hiro 2023 March Release Roundup](https://www.hiro.so/blog/release-roundup-march-2023)
* [Stacks Blockchain API](https://github.com/hirosystems/stacks-blockchain-api/pulse/monthly)
* [Clarinet](https://github.com/hirosystems/clarinet/pulse/monthly)
* [Stacks.js](https://github.com/hirosystems/stacks.js/pulse/monthly)
* [Explorer](https://github.com/hirosystems/explorer/pulse/monthly)
* [Docs](https://github.com/hirosystems/docs/pulse/monthly)
* [Subnets](https://github.com/hirosystems/stacks-subnets/pulse/monthly)
* [Wallet](https://github.com/hirosystems/wallet/pulse/monthly)
