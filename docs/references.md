---
id: references
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
