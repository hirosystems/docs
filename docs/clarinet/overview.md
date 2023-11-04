---
# The default id is the same as the one defined below. so not needed
title: Overview
---

# Clarinet Overview

> Announcement: As part of a simplification and improvement process of the Clarinet project, the commands `clarinet test` and `clarinet run` are now be deprecated and won't be available in Clarinet 2 that will be released in October 2023.
> The testing features are available now in the Clarinet SDK.

<!-- See the [Clarinet SDK announcement on our blog](link to come). -->

> See our guide to learn how to [test smart contract](./guides/test-contract-with-clarinet-sdk.md). The SDK API reference is also available [here](./guides/clarinet-js-sdk.md)

[Clarinet](https://www.hiro.so/clarinet) provides a CLI package with a [clarity](https://clarity-lang.org/) runtime, a REPL, and a testing harness. Clarinet includes a Javascript library, a testing environment, and a browser-based Sandbox. With Clarinet, you can rigorously iterate on your smart contracts locally before moving into production.

Clarinet consists of two main components:

- Clarity REPL (Read, Evaluate, Print, Loop)
- Testing harness.

When the above components are used together, you can rapidly develop and test a Clarity smart contract, by deploying the contract to a local `devnet` or `testnet` environment.

![screenshot](images/demo.gif)

## Network Types

Clarinet supports different network types to cater to various development and testing needs. Here's a brief overview of each:

| Network | Description                                                                                                                                                                | Use Case                                                                   |
| ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| Simnet  | Optimized for fast feedback loops, introspection, and portability. Can be run anywhere and generate reports about contract analysis, execution, costs, etc.                | Ideal for initial development and unit-testing.                            |
| Devnet  | Local Stacks and Bitcoin nodes running on Docker for relatively fast feedback loops. Includes optional components like stacks-api, bitcoin-explorer, stacks-explorer, etc. | Use for integration tests or to develop the front-end of your dApp locally |
| Testnet | A pre-production network that offers a realistic environment for testing.                                                                                                  | Ideal for final testing before deploying to Mainnet.                       |
| Mainnet | The production network where real transactions occur.                                                                                                                      | Use when you're ready to deploy your smart contract to production.         |

To better understand Clarinet and how to develop with Clarinet, Hiro has created an introductory video tutorial series from Hiro Engineer [Ludo Galabru](https://twitter.com/ludovic?lang=en) that will guide you through some of the basics of using Clarinet. The video series also shows you how to use Clarinet to develop, test, and deploy smart contracts.

To view these video tutorials, please see [Hiro's Youtube channel](https://www.youtube.com/playlist?list=PL5Ujm489LoJaAz9kUJm8lYUWdGJ2AnQTb).

For the latest information on Clarinet, refer to [blog posts on Clarinet](https://www.hiro.so/search?query=Clarinet).

When developing smart contracts, you can also use the [Clarity Visual Studio Code plugin](https://marketplace.visualstudio.com/items?itemName=HiroSystems.clarity-lsp).
