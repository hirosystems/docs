---
title: Hiro Archiver
---

# Hiro Archiver

## What is the Hiro Archiver

The purpose of the Hiro Archiver is to enable developers and users of the Hiro ecosystem to download and use any of the 
published datasets needed to run a Stacks environment. This is a public service Hiro offers as a benefit to the 
Stacks community.  


_Important: incremental updates to the TSV file is no longer supported as of v6.x.x of the API, therefore TSV archives will no longer be published. 
Going forward users can restore using the PostgreSQL archive and generate a new TSV from that database using the API's 'export-events' 
[function](https://github.com/hirosystems/stacks-blockchain-api#export-and-import)._  

## How to download
_** Important note:  the `blockstack-publish` bucket has been deprecated and should no longer be used.**_

Hiro pushes out new datasets nightly. The best way to download these datasets is by constructing a download link.

The URL format is as follows:

| Base Url                                            | Env      | Service     | File                                           | 
|-----------------------------------------------------|----------|-------------|------------------------------------------------|
| https://storage.googleapis.com/hirosystems-archive/ |          |             |                                                |
| _(deprecated)_                                      | mainnet/ | api/        | mainnet-blockchain-api-{version}-latest.tar.gz |
|                                                     | mainnet/ | blockchain/ | mainnet-blockchain-{version}-latest.tar.gz     |
|                                                     | mainnet/ | postgres/   | mainnet-postres-{version}-latest.tar.gz        |
| _(deprecated)_                                      | testnet/ | api/        | testnet-blockchain-api-{version}-latest.tar.gz |
|                                                     | testnet/ | blockchain/ | testnet-blockchain-{version}-latest.tar.gz     |
|                                                     | testnet/ | postgres/   | testnet-postgres-{version}-latest.tar.gz       |

The links shown in the table above will always point to the latest of the _version_ specified. A previous day's version may also be pulled by simply 
replacing `latest` with the date formatted as `yyyymmdd`. Use the table below for current versions.

| Env     | Service            | Version    |
|---------|--------------------|------------|
| Mainnet | API _(deprecated)_ | 5.0.0      | 
|         | Blockchain         | 2.05.0.3.0 |
|         | Postgresql         | 14         |
| Testnet | API _(deprecated)_ | 5.0.0      |
|         | Blockchain         | 2.05.0.3.0 |
|         | Postgresql         | 14         |

Archives are generated in the format {ENV}-{SERVICE}-{VERSION}-{YYYYMMDD}.tar.gz. For example,`mainnet-blockchain-5.0.0-20221013.tar.gz`.

### Constructing the download link

Here are a couple of examples of how a download link can be generated for a specific dataset: 

```[mainnet api .tsv from latest]
 https://storage.googleapis.com/hirosystems-archive/mainnet/api/mainnet-blockchain-5.0.0-latest.tar.gz
 
[testnet postgres database from August 26, 2022]
 https://storage.googleapis.com/hirosystems-archive/testnet/postgres/testnet-postgres-14-20220826.tar.gz 
```

## How to use

### [New] for v6.x.x of the API
Generating a TSV directly from the Postgres database is the preferred method of obtaining and replaying the TSV for v6.x.x.  
It is necessary to restore the Postgres database first, then from the API at startup, run the following command:
```shell
node ./lib/index.js export-events --file {{ your awesome tsv filename }} --overwrite-file
node ./lib/index.js import-events --file {{ your awesome tsv filename }} --mode pruned --wipe-db --force
```

### Importing the API .tsv (deprecated as of v6.x.x)

The api .tsv location is configurable by setting the `STACKS_EXPORT_EVENTS_FILE` env var of the application. Un-tar 
the file after downloading.

```shell
tar -xvf mainnet-blockchain-api-4.0.3-latest.tar.gz -C /root/api/stacks-node-events.tsv
```

### Importing the blockchain chainstate

The location of the chainstate is configurable by modifying `working_dir` parameter under the `[node]` section of the 
`Config.toml` file. Un-tar the file after downloading. An example is shown below.

```shell
[mainnet]
tar -xvf mainnet-blockchain-2.05.0.2.2-stretch-latest.tar.gz -C /root/stacks-node/data/mainnet

[testnet]
tar -xvf mainnet-blockchain-2.05.0.2.2-stretch-latest.tar.gz -C /root/stacks-node/data/xenon
```

### Importing the Postgresql database

A working Postgresql database is required. You do not need to un-tar the file prior to import.
```shell
runuser -l postgres -c 'pg_restore -v -C -d stacks_node_api stacks_node_postgres.tar.gz'

[optional]
runuser -l postgres -c "psql -c \"alter user postgres with password {{ your awesome password }};\""
```
