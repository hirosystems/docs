---
title: How to Withdraw NFT
---

### Background on withdrawals
Withdrawals from the hyperchain are a 2-step process. 

The owner of an asset must call `withdraw-ft?` / `withdraw-stx?` / `withdraw-nft?` in a Clarity contract on the hyperchain,
which destroys those assets on the hyperchain, and adds that particular withdrawal to a withdrawal data structure for that block.
The withdrawal data structure serves as a cryptographic record of the withdrawals in a particular block, and has an 
overall associated hash. This hash is committed to the L1 interface contract via the `commit-block` function.

The second step involves calling the appropriate withdraw function in the hyperchains interface 
contract on the L1 chain. You must also pass in the "proof" that corresponds to your withdrawal. 
This proof includes the hash of the withdrawal data structure that this withdrawal was included in, 
the hash of the withdrawal itself, and a list of hashes to be used to prove that the particular withdrawal is valid. Currently, 
this function must be called by a hyperchain miner, but in an upcoming hyperchain release, the asset owner must call 
this function. 

### Step 6a: Withdraw the NFT on the hyperchain 
Perform the withdrawal on the layer 2 by calling `withdraw-nft-asset` in the `simple-nft-l2` contract. This will be called 
by the principal `ALT_USER_ADDR`.
```
node ./withdraw_nft_l2.js 0 
```
Grep the hyperchain node to ensure success:
```
docker logs hyperchain-node.nft-use-case.devnet 2>&1 | grep "5b5407ab074b4d78539133fe72020b18d44535a586574d0bd1f668e05dc89c2f"
Jul 19 13:07:33.804109 INFO Tx successfully processed. (ThreadId(9), src/chainstate/stacks/miner.rs:235), event_name: transaction_result, tx_id: 3ff9b9b0f33dbd6087f302fa9a7a113466cf7700ba7785a741b391f5ec7c5ba4, event_type: success, payload: ContractCall

docker logs hyperchain-node.nft-use-case.devnet 2>&1 | grep "withdraw-nft-asset"
Jul 19 13:22:34.800652 INFO Contract-call successfully processed (ThreadId(8), src/chainstate/stacks/db/transactions.rs:731), contract_name: ST2CY5V39NHDPWSXMW9QDT3HC3GD6Q6XX4CFRK9AG.simple-nft-l2, function_name: withdraw-nft-asset, function_args: [u5, ST2JHG361ZXG51QTKY2NQCVBPPRRE2KZB1HR05NNC], return_value: (ok true), cost: ExecutionCost { write_length: 2, write_count: 2, read_length: 1647, read_count: 5, runtime: 2002000 }
```

In order to successfully complete the withdrawal on the L1, it is necessary to know the height at which the withdrawal occurred. 
You can find the height of the withdrawal using grep:
```
docker logs hyperchain-node.nft-use-case.devnet 2>&1 | grep "Parsed L2 withdrawal event"
Jul 19 13:22:34.801290 INFO Parsed L2 withdrawal event (ThreadId(8), src/clarity_vm/withdrawal.rs:56), type: nft, block_height: 47, sender: ST2JHG361ZXG51QTKY2NQCVBPPRRE2KZB1HR05NNC, withdrawal_id: 0, asset_id: ST2CY5V39NHDPWSXMW9QDT3HC3GD6Q6XX4CFRK9AG.simple-nft-l2::nft-token
```
Get the withdrawal height by looking at the `block_height` in the returned line. There may be multiple lines returned 
by the grep. Try the higher heights first, and work backward. 

### Step 6b: Complete the withdrawal on the Stacks chain 
Use the withdrawal height we just obtained from the grep and substitute that for `WITHDRAWAL_BLOCK_HEIGHT`.
You might need to wait a little bit for the hyperchain block to become official (even if
the grep already returned a result) for the transaction to succeed. If the hyperchain has not advanced sufficiently, you 
may get the error `Supplied block height not found`. For now, this script assumes that the requested 
withdrawal was the only one in the hyperchain block it was a part of (thus, you may run into issues using this script 
if you are attempting to withdraw multiple assets in a short span of time). 
```
node ./withdraw_nft_l1.js {WITHDRAWAL_BLOCK_HEIGHT} 1
```

Check for the success of this transaction in the Clarinet console:

🟩  invoked: ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.hyperchain::withdraw-nft-asset(u5, ST2JHG361ZXG51QTKY2NQCVBPPRRE2KZB1HR05...

You can also navigate to the Stacks Explorer (the URL of this will be listed in the Clarinet console), and check that the expected 
principal now owns the NFT (`ALT_USER_ADDR`). You can check this by clicking on the transaction corresponding to 
`withdraw-nft-asset`. 
