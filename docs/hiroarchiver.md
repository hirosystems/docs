# Hiro Archiver

## What is the Hiro Archiver
The purpose of the Hiro Archiver is to enable developers and users of the Hiro ecosystem to download and use any of the 
published datasets needed to run a Stacks environment. This is a public service Hiro offers as a benefit to the 
Stacks community.  

## How to download
Hiro pushes out new datasets nightly. The best way to download these datasets is by constructing a download link.<br>
The URL format is as follows:

| Base Url                                           | Env      | Service     | File                                           | 
|----------------------------------------------------|----------|-------------|------------------------------------------------|
| https://storage.googleapis.com/blockstack-publish/ |          |             |                                                |
|                                                    | mainnet/ | api/        | mainnet-blockchain-api-{version}-latest.tar.gz |
|                                                    | mainnet/ | blockchain/ | mainnet-blockchain-{version}-latest.tar.gz     |
|                                                    | mainnet/ | postgres/   | mainnet-postres-{version}-latest.tar.gz        |
|                                                    | testnet/ | api/        | testnet-blockchain-api-{version}-latest.tar.gz |
|                                                    | testnet/ | blockchain/ | testnet-blockchain-{version}-latest.tar.gz     |
|                                                    | testnet/ | postgres/   | testnet-postgres-{version}-latest.tar.gz       |

The links shown in the table above will always point to the latest of the _version_ specified. A previous day's version may also be pulled by simply 
replacing `latest` with the date formatted as `yyyymmdd`. Use the table below for current versions.

| Env     | Service    | Version      |
|---------|------------|--------------|
| Mainnet | API        | 4.0.3        |
|         | Blockchain | 2.05.0.2.2   |
|         | Postgresql | 14           |
| Testnet | API        | 3.0.3        |
|         | Blockchain | 2.05.0.2.2   |
|         | Postgresql | 14           |


### Constructing the download link
To construct the download link, use the links shown below.
```
[mainnet api .tsv from latest]
 https://storage.googleapis.com/blockstack-publish/mainnet/api/mainnet-blockchain-api-4.0.3-latest.tar.gz
 
[testnet postgres database from August 26, 2022]
 https://storage.googleapis.com/blockstack-publish/testnet/postgres/testnet-postgres-14-20220826.tar.gz 
```

## How to use

### Importing the API .tsv
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
