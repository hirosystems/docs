---
title: Hiro Archive
---

# Hiro Archive

## What is the Hiro Archive

The Hiro Archive is a collection of datasets for various services in the Stacks ecosystem.

The purpose of the Hiro Archive is to enable Stacks developers and users to quickly bootstrap supported services with pre-loaded data, which otherwise could take days or weeks to acquire when syncing from genesis. This is a public service Hiro offers as a benefit to the Stacks community.

All available artifacts can be found here: https://archive.hiro.so
## Supported Services

Nightly mainnet and testnet archives are published for the following services:
  * [Stacks Blockchain](https://github.com/stacks-network/stacks-blockchain)
  * [Stacks Blockchain API](https://github.com/hirosystems/stacks-blockchain-api)
  * [Token Metadata API](https://github.com/hirosystems/token-metadata-api)

## Stacks Blockchain
### Where to Download Archives

Stacks Blockchain archives for each network can be found at the following locations:
* mainnet: https://archive.hiro.so/mainnet/stacks-blockchain/
* testnet: https://archive.hiro.so/testnet/stacks-blockchain/

The file name patterns are as follows:
* archive: `<NETWORK>-stacks-blockchain-<VERSION>-<DATE(YYYYMMDD)>.tar.gz`
* shasum: `<NETWORK>-stacks-blockchain-<VERSION>-<DATE(YYYYMMDD)>.sha256`

There is a continually updated archive and shasum which always points to the most recent upload:
* archive: `<NETWORK>-stacks-blockchain-latest.tar.gz`
* shasum: `<NETWORK>-stacks-blockchain-latest.sha256`

or the most recent upload for a particular version:
* archive: `<NETWORK>-stacks-blockchain-2.3.0.0.2-latest.tar.gz`
* shasum: `<NETWORK>-stacks-blockchain-2.3.0.0.2-latest.sha256`

### Restoring the Stacks Blockchain Node Using the Hiro Archive

1. [Download the archive and shasum for the appropriate network](#where-to-download-archives)
1. [Verify the archive with the shasum](#verifying-integrity)
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

## Stacks Blockchain API
### Prerequisites

Since the Stacks Blockchain API depends on a Stacks Blockchain node being at the same block height, you will need to first [restore a Stacks Blockchain node using the Hiro Archive](#restoring-the-stacks-blockchain-node-using-the-hiro-archive) before restoring the Stacks Blockchain API. Otherwise, you may encounter errors when running the API.

In order for the Stacks Blockchain and Stacks Blockchain API archives to be compatible, they must meet the following criteria:
* Both archives correspond to the same Stacks network (mainnet/testnet)
* The API archive version must be compatible with the Stacks Blockchain archive version (See [API release notes](https://github.com/hirosystems/stacks-blockchain-api/releases) for guidance)
* Both archives were created on the same date

### Restoration Methods

There are two ways to restore a Stacks Blockchain API using the Hiro Archive.

You can either:
* Restore the Postgres database
    * This is the quickest method, and is suitable for most scenarios.
* Restore via tab-separated-values (TSV) file
    * This is a file which contains the raw unprocessed events from a Stacks Blockchain node. The API can ingest this file to process events into a Postgres database.
    * This method will be several times slower
    * Generally useful when a Postgres database archive is not available or cannot be used for any reason.

The archive file you'll need to download will depend on your method of restoration. There is no scenario where you would need both restoration methods.

### Where to Download Archives

Depending on the [restoration method](#restoration-methods), Stacks Blockchain API archives for each network can be found at the following locations:
* Postgres database dump
    * mainnet: https://archive.hiro.so/mainnet/stacks-blockchain-api-pg/
    * testnet: https://archive.hiro.so/testnet/stacks-blockchain-api-pg/
* TSV file
    * mainnet: https://archive.hiro.so/mainnet/stacks-blockchain-api/
    * testnet: https://archive.hiro.so/testnet/stacks-blockchain-api/

The file name patterns are as follows:
* Postgres database dump
    * archive: `stacks-blockchain-api-pg-<DATABASE VERSION>-<API VERSION>-<DATE(YYYYMMDD)>.dump`
    * shasum: `stacks-blockchain-api-pg-<DATABASE VERSION>-<API VERSION>-<DATE(YYYYMMDD)>.sha256`
* TSV file
    * archive: `<network>-stacks-blockchain-api-<API VERSION>-<DATE(YYYYMMDD)>.gz`
    * shasum: `<network>-stacks-blockchain-api-<API VERSION>-<DATE(YYYYMMDD)>.sha256`

There is a continually updated archive and shasum which always points to the most recent upload:
* Postgres database dump
    * archive: `stacks-blockchain-api-pg-<DATABASE VERSION>-latest.dump`
    * shasum: `stacks-blockchain-api-pg-<DATABASE VERSION>-latest.sha256`
* TSV file
    * archive: `<network>-stacks-blockchain-api-latest.gz`
    * shasum: `<network>-stacks-blockchain-api-latest.sha256`

or the most recent upload for a particular version:
* Postgres database dump
    * archive: `stacks-blockchain-api-pg-<DATABASE VERSION>-<API VERSION>-latest.dump`
    * shasum: `stacks-blockchain-api-pg-<DATABASE VERSION>-<API VERSION>-latest.sha256`
* TSV file
    * archive: `<network>-stacks-blockchain-api-<API VERSION>-latest.gz`
    * shasum: `<network>-stacks-blockchain-api-<API VERSION>-latest.sha256`

### Restoring the Stacks Blockchain API Using the Hiro Archive

**If restoring via Postgres dump**
1. [Download the archive and shasum for the appropriate network and restoration method](#where-to-download-archives-1)
1. [Verify the archive with the shasum](#verifying-integrity)
1. Import the archive file into a running Postgres database (may take up to an hour depending on database specs and tuning)
    ```bash
        export PGPASSWORD=<YOUR POSTGRES PASSWORD>
        pg_restore --username postgres --verbose --jobs 4 --dbname stacks_blockchain_api /path/to/archive/file
    ```
1. Launch the Stacks Blockchain API service
1. Verify the dataset is being used by comparing your nodes [local block height](http://localhost:3999/extended/v1/status) with [Hiro's](https://api.hiro.so/extended/v1/status). If the block height matches or is close to Hiro's block height, the restoration was successful.
    1. It may take a few minutes for the local node to respond on this endpoint.
    1. Your block height may be up to a few hundred blocks away from Hiro's depending on the age of the archive. It should catch up relatively quickly.


**If restoring via TSV file**
1. [Download the archive and shasum for the appropriate network and restoration method](#where-to-download-archives-1)
1. [Verify the archive with the shasum](#verifying-integrity)
1. Extract the archive into the desired directory
    ```bash
        # Target directory must already exist
        gzip -d <ARCHIVE FILE> --stdout > /path/to/extracted/file
    ```
1. [Follow these directions to process and import the events in the TSV file into your Postgres database.](https://github.com/hirosystems/stacks-blockchain-api#export-and-import)
1. Launch the Stacks Blockchain API service
1. Verify the dataset is being used by comparing your nodes [local block height](http://localhost:3999/extended/v1/status) with [Hiro's](https://api.hiro.so/extended/v1/status). If the block height matches or is close to Hiro's block height, the restoration was successful.
    1. It may take a few minutes for the local node to respond on this endpoint.
    1. Your block height may be up to a few hundred blocks away from Hiro's depending on the age of the archive. It should catch up relatively quickly.

## Token Metadata API
### Prerequisites

Since the Token Metadata API depends on a Stacks Blockchain API, you will need to first launch a Stacks Blockchain API configured for the same Stacks network.

If you don't already have one, you can follow [these instructions](#stacks-blockchain-api) to launch one with an archive.

### Where to Download Archives

Token Metadata API archives for each network can be found at the following locations:
* mainnet: https://archive.hiro.so/mainnet/token-metadata-api-pg/
* testnet: https://archive.hiro.so/testnet/token-metadata-api-pg/

The file name patterns are as follows:
* archive: `token-metadata-api-pg-<DATABASE VERSION>-<API VERSION>-<DATE(YYYYMMDD)>.dump`
* shasum: `token-metadata-api-pg-<DATABASE VERSION>-<API VERSION>-<DATE(YYYYMMDD)>.sha256`

There is a continually updated archive and shasum which always points to the most recent upload:
* archive: `token-metadata-api-pg-<DATABASE VERSION>-latest.dump`
* shasum: `token-metadata-api-pg-<DATABASE VERSION>-latest.sha256`

or the most recent upload for a particular version:
* archive: `token-metadata-api-pg-<DATABASE VERSION>-<API VERSION>-latest.dump`
* shasum: `token-metadata-api-pg-<DATABASE VERSION>-<API VERSION>-latest.sha256`

### Restoring the Token Metadata API Using the Hiro Archive

1. [Download the archive and shasum for the appropriate network](#where-to-download-archives-2)
1. [Verify the archive with the shasum](#verifying-integrity)
1. Import the archive file into a running Postgres database (may take up to an hour depending on database specs and tuning)
    ```bash
        export PGPASSWORD=<YOUR POSTGRES PASSWORD>
        pg_restore --username postgres --verbose --jobs 4 --dbname token_metadata_api /path/to/archive/file
    ```
1. Launch the Token Metadata API service
1. Verify the restoration was successful by viewing the [total number of tokens and contracts tracked in the service.](http://localhost:3000/metadata) If the total number of each property is greater than zero, the restoration was successful.
    1. It may take a few minutes for the local node to respond on this endpoint.

## Verifying Integrity

All datasets have an associated SHA256 hash file which can be used to verify the integrity of the downloaded dataset.
As some of the archives are quite large, this is useful to ensure the file you've downloaded matches the file maintained in the Archive.

After downloading an archive file and its associated shasum file, you can verify the integrity of the archive file like so:
```bash
    echo "$(cat <SHASUM FILE> | awk '{print $1}')  <ARCHIVE FILE>" | shasum --check
    <ARCHIVE FILE>: OK

    # Example
    echo "$(cat mainnet-stacks-blockchain-api-latest.sha256 | awk '{print $1}')  mainnet-stacks-blockchain-api-latest.gz" | shasum --check

    # If the integrity check succeeds, a log will be printed indicating so
    mainnet-stacks-blockchain-api-latest.gz: OK

    # Otherwise a log will be printed indicating failure
    mainnet-stacks-blockchain-api-latest.gz: FAILED
    shasum: WARNING: 1 computed checksum did NOT match
```

If the integrity check fails for any reason, you may need to delete the local archive and re-attempt the download. If issues persist, switch to a different network and try again.
