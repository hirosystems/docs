---
title: Event dispatching / observer interface
---

# Event dispatching / observer interface

This document helps you build developer and API tools for Subnets.

## Configure Event Observer Interface

The `stacks-node` supports a configurable event observer interface.
This is enabled by adding an entry to the node's `config.toml` file:

```toml
...
[[events_observer]]
endpoint = "listener:3700"
events_keys = [
  "*"
]
...
```

The `stacks-node` will then execute HTTP POSTs to the configured
endpoint in two events:

1. A new Stacks block is processed.
2. New mempool transactions have been received.

These events are sent to the configured endpoint at two URLs:


### `POST /new_block`

This payload includes data related to a newly processed block,
and any events emitted from Stacks transactions during the block.

If the transaction originally comes from the parent microblock stream 
preceding this block, the microblock related fields will be filled in.

Example:

```json
{
  "block_hash": "0x4eaabcd105865e471f697eff5dd5bd85d47ecb5a26a3379d74fae0ae87c40904",
  "block_height": 3,
  "burn_block_time": 1591301733,
  "events": [
    {
      "event_index": 1,
      "committed": true,
      "stx_transfer_event": {
        "amount": "1000",
        "recipient": "ST31DA6FTSJX2WGTZ69SFY11BH51NZMB0ZZ239N96",
        "sender": "ST3WM51TCWMJYGZS1QFMC28DH5YP86782YGR113C1"
      },
      "txid": "0x738e4d44636023efa08374033428e44eca490582bd39a6e61f3b6cf749b4214c",
      "type": "stx_transfer_event"
    }
  ],
  "index_block_hash": "0x329efcbcc6daf5ac3f264522e0df50eddb5be85df6ee8a9fc2384c54274d7afc",
  "parent_block_hash": "0xf5d4ce0efe1d42c963d615ce57f0d014f263a985175e4ece766eceff10e0a358",
  "parent_index_block_hash": "0x0c8b38d44d6af72703a4767ff4cea683ec965346d9e9a7ded2d773fb4f257c28",
  "parent_microblock": "0xedd15cf1e697c28df934e259f0f82970a7c9edc2d39bef04bdd0d422116235c6",
  "transactions": [
    {
      "contract_abi": null,
      "raw_result": "0x03",
      "raw_tx": "0x808000000004008bc5147525b8f477f0bc4522a88c8339b2494db50000000000000002000000000000000001015814daf929d8700af344987681f44e913890a12e38550abe8e40f149ef5269f40f4008083a0f2e0ddf65dcd05ecfc151c7ff8a5308ad04c77c0e87b5aeadad31010200000000040000000000000000000000000000000000000000000000000000000000000000",
      "status": "success",
      "tx_index": 0,
      "txid": "0x3e04ada5426332bfef446ba0a06d124aace4ade5c11840f541bf88e2e919faf6",
      "microblock_sequence": "None",
      "microblock_hash": "None",
      "microblock_parent_hash": "None",
      "burnchain_op": null,
    },
    {
      "contract_abi": null,
      "raw_result": "0x03",
      "raw_tx": "0x80800000000400f942874ce525e87f21bbe8c121b12fac831d02f4000000000000000000000000000003e800006ae29867aec4b0e4f776bebdcea7f6d9a24eeff370c8c739defadfcbb52659b30736ad4af021e8fb741520a6c65da419fdec01989fdf0032fc1838f427a9a36102010000000000051ac2d519faccba2e435f3272ff042b89435fd160ff00000000000003e800000000000000000000000000000000000000000000000000000000000000000000",
      "status": "success",
      "tx_index": 1,
      "txid": "0x738e4d44636023efa08374033428e44eca490582bd39a6e61f3b6cf749b4214c",
      "microblock_sequence": "3",
      "microblock_hash": "0x9304fcbcc6daf5ac3f264522e0df50eddb5be85df6ee8a9fc2384c54274daaac",
      "microblock_parent_hash": "0x4893ab44636023efa08374033428e44eca490582bd39a6e61f3b6cf749b474bd"
      "burnchain_op": null,
    }
   ],
   "matured_miner_rewards": [
    {
      "recipient": "ST31DA6FTSJX2WGTZ69SFY11BH51NZMB0ZZ239N96",
      "coinbase_amount": "1000",
      "tx_fees_anchored": "800",
      "tx_fees_streamed_confirmed": "0",
      "from_stacks_block_hash": "0xf5d4ce0efe1d42c963d615ce57f0d014f263a985175e4ece766eceff10e0a358",
      "from_index_block_hash": "0x329efcbcc6daf5ac3f264522e0df50eddb5be85df6ee8a9fc2384c54274d7afc",
    }
   ],
   "anchored_cost": {
    "runtime": 100,
    "read_count": 10,
    "write_count": 5,
    "read_length": 150,
    "write_length": 75
   },
   "confirmed_microblocks_cost": {
    "runtime": 100,
    "read_count": 10,
    "write_count": 5,
    "read_length": 150,
    "write_length": 75
   }
}
```

#### Layer 1-triggered transactions

Some subnet transactions are broadcasted via the layer-1 (just as some
Stacks transactions are broadcasted via Bitcoin). These transactions
use the `burnchain_op` field of the `transaction` object to convey information
from the layer-1 operation. The following block payload contains an example of this:

```json
  {
    "anchored_cost": {
      "read_count": 9,
      "read_length": 3621,
      "runtime": 4325000,
      "write_count": 3,
      "write_length": 2
    },
    "block_hash": "0x6951c0d3cf1ce9169685c897fdb7eee594fc232e805560117859d71b08f9c8e3",
    "block_height": 6,
    "burn_block_hash": "0x1c712cfaf83f8f9bc5990b611a18317e44497028e4d4440331dac0313802b01a",
    "burn_block_height": 18,
    "burn_block_time": 0,
    "confirmed_microblocks_cost": {
      "read_count": 0,
      "read_length": 0,
      "runtime": 0,
      "write_count": 0,
      "write_length": 0
    },
    "events": [
      {
        "committed": true,
        "event_index": 1,
        "nft_mint_event": {
          "asset_identifier": "ST18F1AHKW194BWQ3CEFDPWVRARA79RBGFEWSDQR8.simple-nft::nft-token",
          "raw_value": "0x0100000000000000000000000000000001",
          "recipient": "ST18F1AHKW194BWQ3CEFDPWVRARA79RBGFEWSDQR8",
          "value": {
            "UInt": 1
          }
        },
        "txid": "0x7c558d682960d87f0af8f2904a5b561cdfb1732c878a048fc280454282e9eeb2",
        "type": "nft_mint_event"
      },
      {
        "committed": true,
        "event_index": 0,
        "ft_mint_event": {
          "amount": "1",
          "asset_identifier": "ST18F1AHKW194BWQ3CEFDPWVRARA79RBGFEWSDQR8.simple-ft::ft-token",
          "recipient": "ST18F1AHKW194BWQ3CEFDPWVRARA79RBGFEWSDQR8"
        },
        "txid": "0x37eeac70800f4d6b6f18948d8987c26410a288afdbf6b0a30daeb17daaf300bc",
        "type": "ft_mint_event"
      }
    ],
    "index_block_hash": "0xdb379f4c3e43d3ee986ceff9e63c8fb222d855a640fe230ce33d080169315eee",
    "matured_miner_rewards": [],
    "miner_txid": "0x5af873ac3ded0e8041c539a66ecec3e85ec467a63fdda2526c6eeab6ad4fc416",
    "parent_block_hash": "0x2bb521ae1d336e23a2e750d2dbbb2abfebc8f0295a9d4391cd72c40f0060a3fd",
    "parent_burn_block_hash": "0x44e53851d23867abaf86abf0ad4013c9cfffbccb36afbb5c319b2d58743db4ce",
    "parent_burn_block_height": 16,
    "parent_burn_block_timestamp": 0,
    "parent_index_block_hash": "0x4237bf67c1f20126ea67bc8b8beea1f80d44248e2d10290e6c2de97f6ed4a64d",
    "parent_microblock": "0x0000000000000000000000000000000000000000000000000000000000000000",
    "parent_microblock_sequence": 0,
    "transactions": [
      {
        "burnchain_op": {
          "deposit_ft": {
            "amount": 1,
            "burn_header_hash": "44e53851d23867abaf86abf0ad4013c9cfffbccb36afbb5c319b2d58743db4ce",
            "l1_contract_id": "ST18F1AHKW194BWQ3CEFDPWVRARA79RBGFEWSDQR8.simple-ft",
            "name": "ft-token",
            "sender": "ST18F1AHKW194BWQ3CEFDPWVRARA79RBGFEWSDQR8",
            "subnet_contract_id": "ST18F1AHKW194BWQ3CEFDPWVRARA79RBGFEWSDQR8.simple-ft",
            "txid": "37eeac70800f4d6b6f18948d8987c26410a288afdbf6b0a30daeb17daaf300bc"
          }
        },
        "contract_abi": null,
        "execution_cost": {
          "read_count": 5,
          "read_length": 1622,
          "runtime": 1966000,
          "write_count": 2,
          "write_length": 1
        },
        "microblock_hash": null,
        "microblock_parent_hash": null,
        "microblock_sequence": null,
        "raw_result": "0x0703",
        "raw_tx": "0x00",
        "status": "success",
        "tx_index": 0,
        "txid": "0x37eeac70800f4d6b6f18948d8987c26410a288afdbf6b0a30daeb17daaf300bc"
      },
      {
        "burnchain_op": {
          "deposit_nft": {
            "burn_header_hash": "44e53851d23867abaf86abf0ad4013c9cfffbccb36afbb5c319b2d58743db4ce",
            "id": 1,
            "l1_contract_id": "ST18F1AHKW194BWQ3CEFDPWVRARA79RBGFEWSDQR8.simple-nft",
            "sender": "ST18F1AHKW194BWQ3CEFDPWVRARA79RBGFEWSDQR8",
            "subnet_contract_id": "ST18F1AHKW194BWQ3CEFDPWVRARA79RBGFEWSDQR8.simple-nft",
            "txid": "7c558d682960d87f0af8f2904a5b561cdfb1732c878a048fc280454282e9eeb2"
          }
        },
        "contract_abi": null,
        "execution_cost": {
          "read_count": 4,
          "read_length": 1999,
          "runtime": 2359000,
          "write_count": 1,
          "write_length": 1
        },
        "microblock_hash": null,
        "microblock_parent_hash": null,
        "microblock_sequence": null,
        "raw_result": "0x0703",
        "raw_tx": "0x00",
        "status": "success",
        "tx_index": 1,
        "txid": "0x7c558d682960d87f0af8f2904a5b561cdfb1732c878a048fc280454282e9eeb2"
      },
      {
        "burnchain_op": null,
        "contract_abi": null,
        "execution_cost": {
          "read_count": 0,
          "read_length": 0,
          "runtime": 0,
          "write_count": 0,
          "write_length": 0
        },
        "microblock_hash": null,
        "microblock_parent_hash": null,
        "microblock_sequence": null,
        "raw_result": "0x0703",
        "raw_tx": "0x800cf475620400a0e3473dd203d4f46ad5c24e5b444f5212e11d3b000000000000000500000000000000000001584c0b3805734fb438d2f2034c0503250effa85bf6a84e0a8d70122b86c5eb0b4fcf946276d515a5318576dc5b05234ab38d687046851e85deb72fb606da89cc010200000000040000000000000000000000000000000000000000000000000000000000000000",
        "status": "success",
        "tx_index": 2,
        "txid": "0x427628fb9dc3a2848c551c4e1f6188138e030a091425574985f7af257757ee58"
      }
    ]
  }
```

The `burnchain_op` field contains an "externally tagged" object. These example burnchain ops cover the whole of the
subnet burnchain_op enum:

```json
{
  "deposit_stx": {
    "amount": 7381273163198273,
    "burn_header_hash": "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    "sender": "SP000000000000000000002Q6VF78",
    "txid": "3333333333333333333333333333333333333333333333333333333333333333"
  }
}
{
  "deposit_ft": {
    "amount": 7381273163198273,
    "burn_header_hash": "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    "l1_contract_id": "SP000000000000000000002Q6VF78.bns",
    "name": "ft-name",
    "sender": "SP000000000000000000002Q6VF78.bns",
    "subnet_contract_id": "SP000000000000000000002Q6VF78.bns",
    "txid": "1111111111111111111111111111111111111111111111111111111111111111"
  }
}
{
  "deposit_nft": {
    "burn_header_hash": "cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
    "id": 123123,
    "l1_contract_id": "SP000000000000000000002Q6VF78.bns",
    "sender": "SP000000000000000000002Q6VF78.bns",
    "subnet_contract_id": "SP000000000000000000002Q6VF78.bns",
    "txid": "f1f1f1f1f1f1f1f1f1f1f1f1f1f1f1f1f1f1f1f1f1f1f1f1f1f1f1f1f1f1f1f1"
  }
}
{
  "leader_block_commit": {
    "block_header_hash": "1212121212121212121212121212121212121212121212121212121212121212",
    "burn_header_hash": "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    "txid": "a1a1a1a1a1a1a1a1a1a1a1a1a1a1a1a1a1a1a1a1a1a1a1a1a1a1a1a1a1a1a1a1",
    "withdrawal_merkle_root": "3131313131313131313131313131313131313131313131313131313131313131"
  }
}
{
  "withdraw_stx": {
    "amount": 7381273163198273,
    "burn_header_hash": "babababababababababababababababababababababababababababababababa",
    "recipient": "SP000000000000000000002Q6VF78",
    "txid": "3b3b3b3b3b3b3b3b3b3b3b3b3b3b3b3b3b3b3b3b3b3b3b3b3b3b3b3b3b3b3b3b"
  }
}
{
  "withdraw_nft": {
    "burn_header_hash": "cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
    "id": 123123,
    "l1_contract_id": "SP000000000000000000002Q6VF78.bns",
    "recipient": "SP000000000000000000002Q6VF78.bns",
    "txid": "f1f1f1f1f1f1f1f1f1f1f1f1f1f1f1f1f1f1f1f1f1f1f1f1f1f1f1f1f1f1f1f1"
  }
}
{
  "withdraw_ft": {
    "amount": 7381273163198273,
    "burn_header_hash": "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    "l1_contract_id": "SP000000000000000000002Q6VF78.bns",
    "name": "ft-name",
    "recipient": "SP000000000000000000002Q6VF78.bns",
    "txid": "1111111111111111111111111111111111111111111111111111111111111111"
  }
}
```

**Note** that withdraw operations and block commit operations on the
layer-1 do not impact the subnet's transaction state, so these
burnchain ops will not appear in transaction receipts.

### `POST /new_burn_block`

This payload includes information about burn blocks as their sortitions are processed.
In the event of PoX forks, a `new_burn_block` event may be triggered for a burn block
previously processed.

Example:

```json
{
  "burn_block_hash": "0x4eaabcd105865e471f697eff5dd5bd85d47ecb5a26a3379d74fae0ae87c40904",
  "burn_block_height": 331,
  "reward_recipients": [
    {
      "recipient": "1C56LYirKa3PFXFsvhSESgDy2acEHVAEt6",
      "amt": 5000
    }
  ],
  "reward_slot_holders": [
    "1C56LYirKa3PFXFsvhSESgDy2acEHVAEt6",
    "1C56LYirKa3PFXFsvhSESgDy2acEHVAEt6"
  ],
  "burn_amount": 12000
}
```

* `reward_recipients` is an array of all the rewards received during this burn block. It may
  include recipients who did _not_ have reward slots during the block. This could happen if
  a miner's commitment was included a block or two later than intended. Such commitments would
  not be valid, but the reward recipient would still receive the burn `amt`.
* `reward_slot_holders` is an array of the Bitcoin addresses that would validly receive
  PoX commitments during this block. These addresses may not actually receive rewards during
  this block if the block is faster than miners have an opportunity to commit.

### `POST /new_microblocks`

This payload includes data related to one or more microblocks that are either emmitted by the 
node itself, or received through the network. 

Example:

```json
{
  "parent_index_block_hash": "0x999b38d44d6af72703a476dde4cea683ec965346d9e9a7ded2d773fb4f257a3b",
  "events": [
    {
      "event_index": 1,
      "committed": true,
      "stx_transfer_event": {
        "amount": "1000",
        "recipient": "ST31DA6FTSJX2WGTZ69SFY11BH51NZMB0ZZ239N96",
        "sender": "ST3WM51TCWMJYGZS1QFMC28DH5YP86782YGR113C1"
      },
      "txid": "0x738e4d44636023efa08374033428e44eca490582bd39a6e61f3b6cf749b4214c",
      "type": "stx_transfer_event"
    }
  ],
  "transactions": [
    {
      "contract_abi": null,
      "raw_result": "0x03",
      "raw_tx": "0x808000000004008bc5147525b8f477f0bc4522a88c8339b2494db50000000000000002000000000000000001015814daf929d8700af344987681f44e913890a12e38550abe8e40f149ef5269f40f4008083a0f2e0ddf65dcd05ecfc151c7ff8a5308ad04c77c0e87b5aeadad31010200000000040000000000000000000000000000000000000000000000000000000000000000",
      "status": "success",
      "tx_index": 0,
      "txid": "0x3e04ada5426332bfef446ba0a06d124aace4ade5c11840f541bf88e2e919faf6",
      "microblock_sequence": "3",
      "microblock_hash": "0x9304fcbcc6daf5ac3f264522e0df50eddb5be85df6ee8a9fc2384c54274daaac",
      "microblock_parent_hash": "0x4893ab44636023efa08374033428e44eca490582bd39a6e61f3b6cf749b474bd"
    },
    {
      "contract_abi": null,
      "raw_result": "0x03",
      "raw_tx": "0x80800000000400f942874ce525e87f21bbe8c121b12fac831d02f4000000000000000000000000000003e800006ae29867aec4b0e4f776bebdcea7f6d9a24eeff370c8c739defadfcbb52659b30736ad4af021e8fb741520a6c65da419fdec01989fdf0032fc1838f427a9a36102010000000000051ac2d519faccba2e435f3272ff042b89435fd160ff00000000000003e800000000000000000000000000000000000000000000000000000000000000000000",
      "status": "success",
      "tx_index": 1,
      "txid": "0x738e4d44636023efa08374033428e44eca490582bd39a6e61f3b6cf749b4214c",
      "microblock_sequence": "4",
      "microblock_hash": "0xfcd4fc34c6daf5ac3f264522e0df50eddb5be85df6ee8a9fc2384c5427459e43",
      "microblock_parent_hash": "0x9304fcbcc6daf5ac3f264522e0df50eddb5be85df6ee8a9fc2384c54274daaac"
    }
  ],
  "burn_block_hash": "0x4eaabcd105865e471f697eff5dd5bd85d47ecb5a26a3379d74fae0ae87c40904",
  "burn_block_height": 331,
  "burn_block_timestamp": 1651301734
}
```

* `burn_block_{}` are the stats related to the burn block that is associated with the stacks 
  block that precedes this microblock stream.
* Each transaction json object includes information about the microblock the transaction was packaged into. 

### `POST /new_mempool_tx`

This payload includes raw transactions newly received in the
node's mempool.

Example:

```json
[
  "0x80800000000400f942874ce525e87f21bbe8c121b12fac831d02f4000000000000000000000000000003e800006ae29867aec4b0e4f776bebdcea7f6d9a24eeff370c8c739defadfcbb52659b30736ad4af021e8fb741520a6c65da419fdec01989fdf0032fc1838f427a9a36102010000000000051ac2d519faccba2e435f3272ff042b89435fd160ff00000000000003e800000000000000000000000000000000000000000000000000000000000000000000"
]
```


### `POST /drop_mempool_tx`

This payload includes raw transactions newly received in the
node's mempool.

Example:

```json
{
  "dropped_txids": ["d7b667bb93898b1d3eba4fee86617b06b95772b192f3643256dd0821b476e36f"],
  "reason": "ReplaceByFee"
}
```

Reason can be one of:

* `ReplaceByFee` - replaced by a transaction with the same nonce, but a higher fee
* `ReplaceAcrossFork` - replaced by a transaction with the same nonce but in the canonical fork
* `TooExpensive` - the transaction is too expensive to include in a block
* `StaleGarbageCollect` - transaction was dropped because it became stale

### `POST /mined_block`

This payload includes data related to block mined by this Stacks node. This
will never be invoked if the node is configured only as a follower. This is invoked
when the miner **assembles** the block; this block may or may not win the sortition.

This endpoint will only broadcast events to observers that explicitly register for
`MinedBlocks` events, `AnyEvent` observers will not receive the events by default.

Example:

```json
{
  "block_hash": "0x4eaabcd105865e471f697eff5dd5bd85d47ecb5a26a3379d74fae0ae87c40904",
  "stacks_height": 3,
  "target_burn_height": 745000,
  "block_size": 145000,
  "anchored_cost": {
    "runtime": 100,
    "read_count": 10,
    "write_count": 5,
    "read_length": 150,
    "write_length": 75
  },
  "confirmed_microblocks_cost": {
    "runtime": 100,
    "read_count": 10,
    "write_count": 5,
    "read_length": 150,
    "write_length": 75
  },
  "tx_events": [
    {
      "Success": {
        "txid": "3e04ada5426332bfef446ba0a06d124aace4ade5c11840f541bf88e2e919faf6", 
        "fee": 0, 
        "execution_cost": { 
          "write_length": 0, 
          "write_count": 0, 
          "read_length": 0, 
          "read_count": 0, 
          "runtime": 0
        }, 
        "result": {
          "ResponseData": 
          {
            "committed": true,
            "data": true
          }
        }
    }}, 
    {
      "ProcessingError": {
        "txid": "eef9f46b20fb637bd07ec92ad3ec175a5a4bdf3e8799259fc5b16a272090d4de",
        "error": "Duplicate contract 'ST3BMYNT1DW2QSRZWB6M4S183NK1BXGJ41TEBCCH8.example'"
      }
    }
  ]
}
```

### `POST /mined_microblock`

This payload includes data related to microblocks mined by this Stacks node. This
will never be invoked if the node is configured only as a follower. This is invoked
when the miner **assembles** the microblock; this microblock may or may be incorporated
into the canonical chain.

This endpoint will only broadcast events to observers that explicitly register for
`MinedMicroblocks` events, `AnyEvent` observers will not receive the events by default.

Example:

```json
{
  "block_hash": "0x4eaabcd105865e471f697eff5dd5bd85d47ecb5a26a3379d74fae0ae87c40904",
  "sequence": 3,
  "anchor_block_consensus_hash": "53c166a709a9abd64a92a57f928a8b26aad08992",
  "anchor_block": "43dbf6095c7622db6607d9584c3f65e908ca4eb77d86ee8cc1352aafec5d68b5",
  "tx_events": [
    {
      "Success": {
        "txid": "3e04ada5426332bfef446ba0a06d124aace4ade5c11840f541bf88e2e919faf6", 
        "fee": 0, 
        "execution_cost": { 
          "write_length": 10, 
          "write_count": 10, 
          "read_length": 20, 
          "read_count": 10, 
          "runtime": 1290
        }, 
        "result": {
          "ResponseData": 
          {
            "committed": true,
            "data": true
          }
        }
    }}, 
    {
      "Skipped": {
        "txid": "eef9f46b20fb637bd07ec92ad3ec175a5a4bdf3e8799259fc5b16a272090d4de",
        "reason": "tx.anchor_mode does not support microblocks, anchor_mode=OnChainOnly."
      }
    }
  ]
}
```
