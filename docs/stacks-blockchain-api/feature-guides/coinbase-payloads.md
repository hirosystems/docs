---
Title: Coinbase payloads alt-recipient
---

# Coinbase payload alt-recipient

The Stacks 2.1 updates support new coinbase transactions to pay to a smart contract or an alternative standard principal. The alternative standard principal helps the miner to pay to an alternate STX address directly. `alt_recipient` is a new property added to the coinbase payload responses to support coinbase-pay-to-alt-recipient transactions. With the [`Get trasaction`](https://docs.hiro.so/api#tag/Transactions/operation/get_transaction_by_id) API request, `alt_recipient` is added to the coinbase_payload response along with the property `data`.

## Regular principal recipient

The regular coinbase transaction with no alternate recipients looks like:

```
"coinbase_payload": {
        "data": "0x0000000000000000000000000000000000000000000000000000000000000000",
        "alt_recipient": null  <-- New
      }
```

The `alt-recipient` property value differs for standard and contract principal recipients.

## Standard Principal Recipient

The standard pricipal recipient coinbase_payload looks like:

```
"coinbase_payload": {
        "data": "0x0000000000000000000000000000000000000000000000000000000000000000",
        "alt_recipient": "ST2X2FYCY01Y7YR2TGC2Y6661NFF3SMH0NGXPWTV5"
      }
    }
```

## Contract Principal Recipient

The contract principal recipient coinbase_payload looks like:

```
"coinbase_payload": {
        "data": "0x0000000000000000000000000000000000000000000000000000000000000000",
        "alt_recipient": "ST2X2FYCY01Y7YR2TGC2Y6661NFF3SMH0NGXPWTV5.hello_world"
      }

```

## References

- You can try the [`Get transaction`](https://docs.hiro.so/api#tag/Transactions/operation/get_transaction_by_id) API with your transaction ID.
