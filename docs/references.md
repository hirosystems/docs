---
title: Resources for Stacks Developers
---

The resources in this section are provided for reference toward developer resources in the Stacks ecosystem. From Clarity language resources to Stacks.js documentation, this section contains information for the complete development of a Stacks app.

## Interacting with the blockchain

The [Stacks CLI](/references/stacks-cli) provides an easy way for you to interact with the Stacks live blockchain (testnet or mainnet). The CLI can be used to test transactions, perform stacking, or deploy contracts. Since the Stacks CLI operates on unencrypted private keys, it is recommended that you use the CLI as a development tool only, and not against accounts with significant amounts of mainnet STX tokens.

## Contract development

Smart contracts on Stacks are developed in Clarity, a LISP-based, non-Turing complete, interpreted, functional language developed specifically for use on blockchains. Hiro provides development tools for Clarity, and Clarity reference material is available in the Stacks ecosystem documentation.

- [Clarity Overview](https://docs.stacks.co/docs/write-smart-contracts/clarity-language/)
- [Clarity Types](https://docs.stacks.co/docs/write-smart-contracts/clarity-language/language-types)
- [Clarity Keywords](https://docs.stacks.co/docs/write-smart-contracts/clarity-language/language-keywords)
- [Clarity Functions](https://docs.stacks.co/references/language-functions)

## Frontend development

Hiro provides the Stacks.js libraries for developing Stacks web apps in JavaScript or TypeScript. Stacks.js consists of several libraries for interacting with the Stacks blockchain. The [connect](https://github.com/hirosystems/connect#readme) library allows you to interact with the Hiro web wallet, allowing you to read important user information. The [transactions](https://stacks.js.org/modules/transactions.html) library has helper functions for converting JavaScript types to Clarity types (and vice versa), as well as functions for for forming Stacks transactions.

For a full list of Stacks.js libraries, see the sidebar.

# Stacks CLI references

import Commands from "./references/_commands.md";

The command line is intended for developers only. Developers can use the command line to interact with the Stacks blockchain as well as test and debug Stacks applications. The command line has the following capabilities:

- Make token transfer transactions
- Deploy smart contracts
- Call smart contract functions
- Generate new accounts
- Convert between testnet and mainnet keys
- Load, store, and list data in Gaia

> **Warning**
>
>Many of the commands in the Stacks CLI operate on unencrypted private keys. For this reason, do not use the CLI with wallets that hold significant amounts of mainnet STX tokens or other valuable assets.
>

## Prerequisites

You must have [Node.js](https://www.nodejs.org) v12 or higher (v14 recommended). Linux or macOS users can avoid `sudo` or [permissions problems](https://docs.npmjs.com/resolving-eacces-permissions-errors-when-installing-packages-globally) by installing Node.js with [`nvm`](https://github.com/nvm-sh/nvm). These instructions assume you are using a Linux or macOS system.

## Installing the Stacks CLI

Install the Stacks CLI with the following command:

```sh
npm install -g @stacks/cli
```

### Troubleshooting the CLI installation

If you encounter `EACCES` permissions errors, try the following:

- Review [Resolving EACCES permissions errors](https://docs.npmjs.com/resolving-eacces-permissions-errors-when-installing-packages-globally) in the npm docs
- Install Node.js with the [Node Version Manager](https://github.com/nvm-sh/nvm)

## List of commands

To see the general usage for the Stacks CLI, you can run the `stx` command without any arguments. To see a list of subcommands, run `stx help`. To view usage and options for any subcommand, run `stx <subcommand> help`. The following are the available subcommands:

<Commands />
