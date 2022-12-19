---
title: Hiro Archive
---

# Hiro Archive

## What is the Hiro Archive

The purpose of the Hiro Archive is to enable developers and users of the Hiro ecosystem to download and use any of the 
published datasets needed to run a Stacks environment. This is a public service Hiro offers as a benefit to the 
Stacks community.  

## How to download
_** Important note: the `hirosystems-archive` bucket has been deprecated and should no longer be used.**_

Hiro pushes out new datasets nightly. All available artifacts can be found here: https://archive.hiro.so

## How to use
The artifacts hosted can be used to quickly spin up a new [stacks-blockchain](https://github.com/stacks-network/stacks-blockchain) node, or comprehensive [stacks-blockchain-api](https://github.com/hirosystems/stacks-blockchain-api) deployment.

### Importing the stacks-blockchain chainstate

The location of the chainstate is configurable by [modifying the `working_dir` parameter under the `[node]` section of the 
`Config.toml`](https://docs.stacks.co/docs/nodes-and-miners/stacks-node-configuration#working_dir-optional) file.

Un-tar the file after downloading:

```shell
# mainnet
curl https://archive.hiro.so/mainnet/stacks-blockchain/mainnet-stacks-blockchain-latest.tar.gz -O mainnet-stacks-blockchain-latest.tar.gz
tar -zxvf mainnet-stacks-blockchain-latest.tar.gz

# testnet
curl https://archive.hiro.so/testnet/stacks-blockchain/testnet-stacks-blockchain-latest.tar.gz -O testnet-stacks-blockchain-latest.tar.gz
tar -zxvf testnet-stacks-blockchain-latest.tar.gz
```

### Importing the stacks-blockchain-api Postgresql database

A working Postgresql database is required.
```shell
curl https://archive.hiro.so/mainnet/stacks-blockchain-api-pg/stacks-blockchain-api-pg-14-latest.dump -O stacks-blockchain-api-pg-14-latest.dump
runuser -l postgres -c 'pg_restore -v -C -d stacks-blockchain-api-pg-14-latest.dump'

[optional]
runuser -l postgres -c "psql -c \"alter user postgres with password {{ your awesome password }};\""
```

### Replay stacks-blockchain-api events

If you need to replay stacks-blockchain events in the API after importing the Postgresql data, you can generate a tab-separated values (TSV) file via [the export/import process documented here](https://github.com/hirosystems/stacks-blockchain-api#export-and-import).
