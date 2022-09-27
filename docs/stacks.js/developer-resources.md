---
title: Developer Resources
---

# Common Pitfall: Polyfilling Buffer
Stacks.js uses Buffers, which require a polyfill in the browser. The correct `Buffer` object is exported by @stacks/common.
Somewhere at the start of our app (main.js, index.js) we need to set a global Buffer on the window object. This can be done in different ways as shown in the examples below (TypeScript might complain about it).

Example - 1 : [Main.js](https://github.com/hirosystems/stacks.js-starters/blob/efb93261b59494f4eb34a7cb5db5d82a84bd3b7c/templates/template-vue/src/main.js#L6)

Example - 2 : [index.js](https://github.com/hirosystems/stacks.js-starters/blob/efb93261b59494f4eb34a7cb5db5d82a84bd3b7c/templates/template-react/src/index.js#L11)

Example - 3 : [_app.js](https://github.com/hirosystems/stacks.js-starters/blob/efb93261b59494f4eb34a7cb5db5d82a84bd3b7c/templates/template-nextjs/pages/_app.js#L8)

Example - 4 : [index.js](https://github.com/hirosystems/stacks.js-starters/blob/efb93261b59494f4eb34a7cb5db5d82a84bd3b7c/templates/template-demo/src/index.js#L11)

Example - 5 : [main.ts](https://github.com/hirosystems/stacks.js-starters/blob/efb93261b59494f4eb34a7cb5db5d82a84bd3b7c/templates/template-angular/src/main.ts#L9)

Common Pitfall: regenerator-runtime
If using @stacks/connect with vite, rollup, svelte, or vue a package `regenerator-runtime` needs to be manually added to successfully build the project.

(Hopefully fixed soon)

Common Pitfall: BigInt doesn’t work \ BigInt doesn’t support X
BigInt’s work in all modern browsers, but some bundlers try to optimize them incorrectly. If you are targeting browsers that are too outdated, BigInts might fail.
To solve this set your project `browserslist` to the following: https://github.com/hirosystems/stacks.js-starters/blob/efb93261b59494f4eb34a7cb5db5d82a84bd3b7c/templates/template-react/package.json#L34-L40


# Stacks CLI references

import Commands from "../references/_commands.md";

The command line is intended for developers only. Developers can use the command line to interact with the Stacks blockchain as well as test and debug Stacks applications. The command line has the following capabilities:

- Make token transfer transactions
- Deploy smart contracts
- Call smart contract functions
- Generate new accounts
- Convert between testnet and mainnet keys
- Load, store, and list data in Gaia

:::warning

Many of the commands in the Stacks CLI operate on unencrypted private keys. For this reason, do not use the CLI with wallets that hold significant amounts of mainnet STX tokens or other valuable assets.

:::

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
