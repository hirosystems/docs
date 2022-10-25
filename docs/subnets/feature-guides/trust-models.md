---
title: Trust Models
---


The current implementation of subnets uses a federated system of miners. This federation is fully-trusted, but future work on subnets will explore alternative trust models.

In a fully - trusted model:

- Miners are responsible for issuing subnet blocks.
- Users can validate, but subnet miners control withdrawals.
- Trust can be federated with a 2-phase commit and BFT protocol for miner block issuance.
- Federation requires a majority of miners to approve withdrawals.
