---
Title: FAQ's
---

# FAQ's

The sections below provide answers to common questions you may ask when working with the Stacks Blockchain API. This page will continually be updated as our developer community and users surface new issues and questions.

**Question**: 

I am attempting to receive the status from a local Stacks Blockchain node API and present to a user how close it is to being synced. I can retrieve the current height of the local node (`/v2/info`). Is there any way for me to retrieve the real current height from an API node that is not completely synced? I want to avoid going directly to the centrally-hosted node.

**Answer**:

Although the Stacks Blockchain API does not yet know when it is in sync mode vs normal "chain follower" mode, you may check the current height of the API by viewing the status endpoint (e.g. https://stacks-node-api.mainnet.stacks.co/extended/v1/status).

You may also review the following issues:

- [Feat/health check endpoint stacks-network/stacks-blockchain#2768](https://github.com/stacks-network/stacks-blockchain/pull/2768)
- [Update /extended/v1/status to "syncing" if more than X blocks are missing](https://github.com/hirosystems/stacks-blockchain-api/issues/1055) stacks-blockchain-api#1055

**Question**:

https://stacks-node-api.mainnet.stacks.co/extended/v1/tokens/nft/holdings/?limit=200&principal=SP3EQ7FQ8TFXB792P7VAGRXER0YNFMGM1Y8RS69RC is only reporting 49 NFTs; however, the marketplace shows it has 133 NFTs: 92 NFTs for sale, and 41 NFTs are unlisted,. Why is `/holdings/` not returning all results?

**Answer**:

Many marketplace contracts are custodial; mmeaning, you do not actually own the NFT, but the marketplace contract does (but it has been marked to your address). This is why the NFT does not appear in `/holdings`.

**Question**:

Are there any limits on the number of times I can continuously call the Stacks Blockchain API?

**Answer**:

The Stacks Blockchain API has a rate limit set to ensure all users can make queries to the API. If you exceed this rate limit, you will receive a 429 error. To avoid receiving this error, you may choose to run your own node and the Stacks Blockchain API, or use websockets.

The current rate limts for Stacks Blockchain API are listed in the table below.

| **Endpoint**                                                                                | **Rate-Limit (RPM)**  |
| ------------------------------------------------------------------------------------------- | --------------------- |
| stacks-node-api.mainnet.stacks.co/extended/ <br/> stacks-node-api.stacks.co/extended/ <br/> | <br/> 500 <br/> <br/> |
| stacks-node-api.mainnet.stacks.co/rosetta/ <br/> stacks-node-api.stacks.co/rosetta/<br/>    | <br/> 200 <br/> <br/> |
| stacks-node-api.mainnet.stacks.co/v2/ <br/> stacks-node-api.stacks.co/v2/ <br/>             | <br/> 100 <br/> <br/> |
| stacks-node-api.testnet.stacks.co/extended/ <br/>                                           | 100 <br/>             |
| stacks-node-api.testnet.stacks.co/v2/ <br/>                                                 | 100 <br/>             |
| stacks-node-api.testnet.stacks.co/extended/v1/faucets/ <br/>                                | 1 <br/>               |

**Question**:

I noticed that the Stacks Blockchain API becomes "stuck" when it is at a certain block height. What can I do to fix this issue?

**Answer**:

If the Stacks Blockchain API becomes "stuck" and does not return a 200 status code from a node block message, causing the node to resend the same message over and over, simply try restarting the full API stack (postgres, API, stacks-blockchain node) with a known-good backup.

You may also file an issue in the [Stacks Blockchain API GitHub repository](https://github.com/hirosystems/stacks-blockchain-api).
 
**Question**

I am receiving the following message when attempting to process NFT metadata: "NFT metadata processing is not enabled on this server." Is this expected behavior on mainnet?

**Answer**

You received this error because the NFT metadata was not standardized at the time the API tried to implement support. If you receive this error, please see the [Token Metadata Service](https://github.com/hirosystems/token-metadata-service) repository for instructions on how to implement NFT metadata processing. 
