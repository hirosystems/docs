---
title: API-Metadata features
---

## Features

Following are the features of Token-Metadata API:

* Complete [SIP-016](https://github.com/stacksgov/sips/blob/main/sips/sip-016/sip-016-token-metadata.md) metadata ingestion for
    * [SIP-009](https://github.com/stacksgov/sips/blob/main/sips/sip-009/sip-009-nft-standard.md)
      Non-Fungible Tokens
    * [SIP-010](https://github.com/stacksgov/sips/blob/main/sips/sip-010/sip-010-fungible-token-standard.md)
      Fungible Tokens
    * [SIP-013](https://github.com/stacksgov/sips/blob/main/sips/sip-013/sip-013-semi-fungible-token-standard.md)
      Semi-Fungible Tokens
* Automatic metadata refreshes via [SIP-019](https://github.com/stacksgov/sips/pull/72)
  notifications
* Metadata localization support
* Metadata fetching via `http:`, `https:`, `data:` URIs. Also supported via customizable gateways:
    * IPFS
    * Arweave
* Easy to use REST JSON endpoints with ETag caching.=
* Prometheus metrics for job queue status, contract and token counts, API performance, etc
* Image cache/CDN support
