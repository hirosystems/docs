---
title: Trust Models
---

## Overview

The current subnet implementation uses a federated system of miners. This federation is fully trusted, but future work on the subnet feature will explore alternative trust models.

In this fully-trusted federation model:

- The federation is responsible for issuing subnet blocks.
- Users can validate these blocks, but the subnet's federation still controls the blocks.
- A majority of the federation must sign each block.
- Federation signatures are validated on the L1 chain.
