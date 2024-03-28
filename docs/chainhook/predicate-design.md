---
title: Predicate Design
custom_edit_url: null
---

Predicates are conditions you can define to scan the blocks easier and faster on a blockchain.

Predicates are defined in the If-this, then-that format. You'll write your condition in the `if-this` condition template and use `then-that` to output the result.

### `if-this` Predicate Design

The `if-this` predicate design can use the following attributes to define the predicates. The 'scope' parameter is mandatory to use with any other parameters.

- scope (mandatory)
- equals
- op_return
  - ends_with
- p2pkh
- p2sh
- p2wpkh
- operation

**Example:**

```json
{
  "if_this": {
    "scope": "txid",
    "equals": "0xfaaac1833dc4883e7ec28f61e35b41f896c395f8d288b1a177155de2abd6052f"
  }
}
```

### `then-that` Predicate Design

The `then-that` predicate design can use the following attributes to output the result based on the `if-this` condition defined.

- http_post
  - url
  - authorization_header
- file_append
  - path

**Example:**

```jsonc
{
  "then_that": {
    "file_append": {
      "path": "/tmp/events.json",
    },
  },
}
```

For more information on predicate definitions, refer to [how to use chainhooks with bitcoin](./guides/chainhooks-with-bitcoin.md) and [how to use chainhooks with Stacks](./guides/chainhooks-with-stacks.md).
