---
title: How to Publish Contract
---

## Publish the NFT contract to the Stacks and Subnets

Once the Stacks node and the hyperchain node boots up (use the indicators in the top right panel to determine this), we can 
start to interact with the chains. To begin with, we want to publish NFT contracts onto both the L1 and L2. When the user
deposits their L1 NFT onto the hyperchain, their asset gets minted by the L2 NFT contract. 
The publish script takes in four arguments: the name of the contract to be published, the filename for the contract 
source code, the layer on which to broadcast the transaction (1 or 2), and the nonce of the transaction.
First, publish the layer 1 contracts. You can enter this command (and the following transaction commands) in the same 
terminal window as you entered the environment variables. Make sure you are in the `scripts` directory. 
These transactions are called by the principal `USER_ADDR`.
```
node ./publish_tx.js trait-standards ../contracts/trait-standards.clar 1 0 
node ./publish_tx.js simple-nft-l1 ../contracts/simple-nft.clar 1 1
```

Verify that the contracts were published by using the Clarinet console.
For the layer 1 contracts, you should see the following in the "transactions" region in a recent block.

🟩  deployed: ST2NEB84ASENDXKYGJPQW86YXQCEFEX2ZQPG87ND.trait-standards (ok true)              

🟩  deployed: ST2NEB84ASENDXKYGJPQW86YXQCEFEX2ZQPG87ND.simple-nft-l1 (ok true)

Then, publish the layer 2 contracts. Note, it might take a minute for the hyperchain node to start accepting transactions, 
so these commands could fail if you send them too early (but you can always re-try when the node is ready).
These transactions are called by the principal `USER_ADDR`.
```
node ./publish_tx.js trait-standards ../contracts-l2/trait-standards.clar 2 0 
node ./publish_tx.js simple-nft-l2 ../contracts-l2/simple-nft-l2.clar 2 1 
```

To verify that the layer 2 transactions were processed, grep the hyperchains log for the transaction IDs 
of *each* hyperchain transaction.
The transaction ID is logged to the console after the call to `publish_tx` - make sure this is the ID you grep for.
```
docker logs hyperchain-node.nft-use-case.devnet 2>&1 | grep "17901e5ad0587d414d5bb7b1c24c3d17bb1533f5025d154719ba1a2a0f570246"
```

Look for a log line similar to the following in the results:
```
Jul 19 12:34:41.683519 INFO Tx successfully processed. (ThreadId(9), src/chainstate/stacks/miner.rs:235), event_name: transaction_result, tx_id: 17901e5ad0587d414d5bb7b1c24c3d17bb1533f5025d154719ba1a2a0f570246, event_type: success, payload: SmartContract
```

To ensure the contracts were successfully parsed and published, we will grep for the name of the contract and ensure there are no 
error lines returned (not atypical for no lines to be returned at this step).
```
docker logs hyperchain-node.nft-use-case.devnet 2>&1 | grep "simple-nft-l2"
```
