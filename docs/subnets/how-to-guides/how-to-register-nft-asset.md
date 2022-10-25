---
title: How to Register NFT asset
---

Create the transaction to register the new NFT asset we just published. This must be called by a miner of the hyperchains contract.
Specifically, this transaction will be sent by `AUTH_HC_MINER_ADDR`. 
```
node ./register_nft.js 0
```
Look for the following transaction confirmation in the Clarinet console in an upcoming block on the layer 1.

🟩  invoked: ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.hyperchain::register-new-nft-contract(ST2CY5V39NHDPWSXMW9QDT3HC3GD6Q6XX4CFRK9AG.simple-nft-l1, "hyperchain-deposit-nft-token") (ok true)
