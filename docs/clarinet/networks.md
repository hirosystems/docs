---
title: Network Types
custom_edit_url: null
---

Clarinet supports different network types to cater to various development and testing needs. Here's a brief overview of each:

| Network | Description                                                                                                                                                                | Use Case                                                                   |
| ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| Simnet  | Optimized for fast feedback loops, introspection, and portability. Can be run anywhere and generate reports about contract analysis, execution, costs, etc.                | Ideal for initial development and unit-testing.                            |
| Devnet  | Local Stacks and Bitcoin nodes running on Docker for relatively fast feedback loops. Includes optional components like stacks-api, bitcoin-explorer, stacks-explorer, etc. | Use for integration tests or to develop the front-end of your dApp locally |
| Testnet | A pre-production network that offers a realistic environment for testing.                                                                                                  | Ideal for final testing before deploying to Mainnet.                       |
| Mainnet | The production network where real transactions occur.                                                                                                                      | Use when you're ready to deploy your smart contract to production.         |
