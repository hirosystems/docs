# Nonce handling

In order to prevent stuck transactions, you must track the next available nonce for principals issuing transactions. The
Stacks Blockchain API provides an endpoint to make nonce handling simpler when usint the following command:

```bash
# for mainnet, remove `.testnet`
# replace <principal> with your STX address
curl 'https://stacks-node-api-microblocks.testnet.stacks.co/extended/v1/address/<principal>/nonces'
```

```json
{
  "last_executed_tx_nonce": 5893,
  "last_mempool_tx_nonce": null,
  "possible_next_nonce": 5894,
  "detected_missing_nonces": []
}
```

You can use the `possible_next_nonce` property as the nonce for your next transaction.
