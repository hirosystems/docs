---
title: Use the Stacks Blockchain Archive
sidebar_label: Stacks Blockchain
custom_edit_url: null
---

### Where to Download Archives

Stacks blockchain archives for each network can be found at the following locations:

- mainnet: https://archive.hiro.so/mainnet/stacks-blockchain/
- testnet: https://archive.hiro.so/testnet/stacks-blockchain/

The file name patterns are as follows:

- archive: `<NETWORK>-stacks-blockchain-<VERSION>-<DATE(YYYYMMDD)>.tar.gz`
- shasum: `<NETWORK>-stacks-blockchain-<VERSION>-<DATE(YYYYMMDD)>.sha256`

There is a continually updated archive and shasum which always points to the most recent upload:

- archive: `<NETWORK>-stacks-blockchain-latest.tar.gz`
- shasum: `<NETWORK>-stacks-blockchain-latest.sha256`

or the most recent upload for a particular version:

- archive: `<NETWORK>-stacks-blockchain-2.3.0.0.2-latest.tar.gz`
- shasum: `<NETWORK>-stacks-blockchain-2.3.0.0.2-latest.sha256`

### Restoring a Stacks Blockchain Node Using the Hiro Archive

1. [Download the archive and shasum for the appropriate network](#where-to-download-archives)
1. [Verify the archive with the shasum](./verify-archive-data.md)
1. Extract the archive into the desired directory
   ```bash
       # Target directory must already exist
       tar -zxvf <ARCHIVE FILE> -C /target/directory
   ```
1. [Configure the `working_dir` property in your Stacks Blockchain node Config.toml file](https://docs.stacks.co/docs/nodes-and-miners/stacks-node-configuration#node) to match the directory you extracted the archive to.
1. Launch your Stacks Blockchain node. [You can use one of these example configuration files as a reference.](https://github.com/stacks-network/stacks-blockchain/tree/master/testnet/stacks-node/conf)
1. Verify the dataset is being used by comparing your nodes [local block height](http://localhost:20443/v2/info) with [Hiro's](https://api.hiro.so/v2/info). If the block height matches or is close to Hiro's block height, the restoration was successful.
   1. It may take a few minutes for the local node to respond on this endpoint.
   1. Your block height may be up to a few hundred blocks away from Hiro's depending on the age of the archive. It should catch up relatively quickly.
