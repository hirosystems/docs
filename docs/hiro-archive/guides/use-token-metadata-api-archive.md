---
title: Use Token Metadata API Archive
sidebar_label: Token Metadata API Archive
custom_edit_url: null
---

### Prerequisites

Since the Token Metadata API depends on a Stacks Blockchain API, you will need to first launch a Stacks Blockchain API configured for the same Stacks network.

If you don't already have one, you can follow [these instructions](./use-stacks-blockchain-api-archive.md) to launch one with an archive.

### Where to Download Archives

Token Metadata API archives for each network can be found at the following locations:

- mainnet: https://archive.hiro.so/mainnet/token-metadata-api-pg/
- testnet: https://archive.hiro.so/testnet/token-metadata-api-pg/

The file name patterns are as follows:

- archive: `token-metadata-api-pg-<DATABASE VERSION>-<API VERSION>-<DATE(YYYYMMDD)>.dump`
- shasum: `token-metadata-api-pg-<DATABASE VERSION>-<API VERSION>-<DATE(YYYYMMDD)>.sha256`

There is a continually updated archive and shasum which always points to the most recent upload:

- archive: `token-metadata-api-pg-<DATABASE VERSION>-latest.dump`
- shasum: `token-metadata-api-pg-<DATABASE VERSION>-latest.sha256`

or the most recent upload for a particular version:

- archive: `token-metadata-api-pg-<DATABASE VERSION>-<API VERSION>-latest.dump`
- shasum: `token-metadata-api-pg-<DATABASE VERSION>-<API VERSION>-latest.sha256`

### Restoring the Token Metadata API Using the Hiro Archive

1. [Download the archive and shasum for the appropriate network](#where-to-download-archives)
1. [Verify the archive with the shasum](./verify-archive-data.md)
1. Import the archive file into a running Postgres database (may take up to an hour depending on database specs and tuning)
   ```bash
       export PGPASSWORD=<YOUR POSTGRES PASSWORD>
       pg_restore --username postgres --verbose --jobs 4 --dbname token_metadata_api /path/to/archive/file
   ```
1. Launch the Token Metadata API service
1. Verify the restoration was successful by viewing the [total number of tokens and contracts tracked in the service.](http://localhost:3000/metadata) If the total number of each property is greater than zero, the restoration was successful.
   1. It may take a few minutes for the local node to respond on this endpoint.
