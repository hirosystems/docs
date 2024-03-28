---
title: Use the Stacks Blockchain API Archive
sidebar_label: Stacks Blockchain API Archive
custom_edit_url: null
---

### Prerequisites

Since the Stacks Blockchain API depends on a Stacks Blockchain node being at the same block height, you will need to first [restore a Stacks Blockchain node using the Hiro Archive](#restoration-methods) before restoring the Stacks Blockchain API. Otherwise, you may encounter errors when running the API.

In order for the Stacks Blockchain and Stacks Blockchain API archives to be compatible, they must meet the following criteria:

- Both archives correspond to the same Stacks network (mainnet/testnet)
- The API archive version must be compatible with the Stacks Blockchain archive version (See [API release notes](https://github.com/hirosystems/stacks-blockchain-api/releases) for guidance)
- Both archives were created on the same date

### Restoration Methods

There are two ways to restore a Stacks Blockchain API using the Hiro Archive. The archive file you'll need to download will depend on your method of restoration. There is no scenario where you would need both restoration methods.

**Restore via Postgres database dump (Recommended)**

This is the quickest and most direct method, and is suitable for most scenarios. It consists of a backup of the API's Postgres database taken using `pg_dump`. We generally recommend starting with this method before attempting the method below if this one does not work for any reason.

**Restore via tab-separated-values (TSV) file**

This method is several times slower than restoring from a Postgres dump. The API TSV file contains the raw unprocessed events from a Stacks Blockchain node. The API can ingest this file to process events into a Postgres database.
Restoring from a TSV file can be useful when a Postgres database archive for a particular API version is not available or when it cannot be used for any reason.

### Where to Download Archives

Depending on the [restoration method](#restoration-methods), Stacks Blockchain API archives for each network can be found at the following locations:

- Postgres database dump
  - mainnet: https://archive.hiro.so/mainnet/stacks-blockchain-api-pg/
  - testnet: https://archive.hiro.so/testnet/stacks-blockchain-api-pg/
- TSV file
  - mainnet: https://archive.hiro.so/mainnet/stacks-blockchain-api/
  - testnet: https://archive.hiro.so/testnet/stacks-blockchain-api/

The file name patterns are as follows:

- Postgres database dump
  - archive: `stacks-blockchain-api-pg-<DATABASE VERSION>-<API VERSION>-<DATE(YYYYMMDD)>.dump`
  - shasum: `stacks-blockchain-api-pg-<DATABASE VERSION>-<API VERSION>-<DATE(YYYYMMDD)>.sha256`
- TSV file
  - archive: `<network>-stacks-blockchain-api-<API VERSION>-<DATE(YYYYMMDD)>.gz`
  - shasum: `<network>-stacks-blockchain-api-<API VERSION>-<DATE(YYYYMMDD)>.sha256`

There is a continually updated archive and shasum which always points to the most recent upload:

- Postgres database dump
  - archive: `stacks-blockchain-api-pg-<DATABASE VERSION>-latest.dump`
  - shasum: `stacks-blockchain-api-pg-<DATABASE VERSION>-latest.sha256`
- TSV file
  - archive: `<network>-stacks-blockchain-api-latest.gz`
  - shasum: `<network>-stacks-blockchain-api-latest.sha256`

or the most recent upload for a particular version:

- Postgres database dump
  - archive: `stacks-blockchain-api-pg-<DATABASE VERSION>-<API VERSION>-latest.dump`
  - shasum: `stacks-blockchain-api-pg-<DATABASE VERSION>-<API VERSION>-latest.sha256`
- TSV file
  - archive: `<network>-stacks-blockchain-api-<API VERSION>-latest.gz`
  - shasum: `<network>-stacks-blockchain-api-<API VERSION>-latest.sha256`

### Restoring the Stacks Blockchain API Using the Hiro Archive

**If restoring via Postgres dump**

1. [Download the archive and shasum for the appropriate network and restoration method](#where-to-download-archives)
1. [Verify the archive with the shasum](./verify-archive-data.md)
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

1. [Download the archive and shasum for the appropriate network and restoration method](#where-to-download-archives)
1. [Verify the archive with the shasum](./verify-archive-data.md)
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
