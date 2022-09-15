---
id: clarinet
title: Add a New Contract
---

# New Contract

## Add a new contract

Clarinet can handle adding a new contract and its configuration to your project when you use the following command:

```bash
$ clarinet contract new bbtc
```

Clarinet will add 2 files to your project:
- the contract file in the `contracts` directory
- the contract test file in the `tests` directory

```bash
.
├── Clarinet.toml
├── contracts
│   └── bbtc.clar
├── settings
│   └── Devnet.toml
│   └── Mainnet.toml
│   └── Testnet.toml
└── tests
    └── bbtc_test.ts
```

Clarinet will also add a configuration to the `Clarinet.toml` file for your contract.

```toml
[project.cache_location]
path = ".requirements"
[contracts.bbtc]
path = "contracts/bbtc.clar"
```

You can add contracts to your project by adding the files manually, however, you must make sure to add the appropriate configuration
to `Clarinet.toml` in order for Clarinet to recognize the contracts.
