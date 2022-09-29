---
Title: FAQ
---

# FAQ's

I'm trying to get the status from a local Stacks Blockchain node API and present to a user how close it is to being synced. I can get the current height of the local node (/v2/info) Is there any way to get the real current height from an API node that is not completely synced? I want to avoid going directly to the centrally hosted node.

The API does not yet know when it's in sync mode vs normal "chain follower" mode, so there's no other way to check if you're synced other than comparing to another synced API's block height
 
question, https://stacks-node-api.mainnet.stacks.co/extended/v1/tokens/nft/holdings/?limit=200&principal=SP3EQ7FQ8TFXB792P7VAGRXER0YNFMGM1Y8RS69RC is only reporting 49 nft's but the marketplaces show it has 133 nfts, 92 for sale, 41 unlisted, why is not /holdings/ giving me everything?

a lot of marketplace contracts are custodial, meaning you don't actually own the NFT but the marketplace contract does (but it has been marked to your address)... that's why the NFT doesn't appear in /holdings


is there any limit of how many times we can call the API continuously.

Yes it's rate limited you'll get 429s if you query too much, or you can run your own node + API and the restriction won't be there. Another option are websockets too.


The API is stuck at a certain block height
 
What are the API rate limits?
 
"NFT metadata processing is not enabled on this server" is expected on mainnet?
 
We are waiting on the SIP to implement this, and we are simply just waiting for that to happen. 





