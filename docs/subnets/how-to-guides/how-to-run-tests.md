---
title: How to Run Tests
---

You can run tests by navigating to the `testnet/stacks-node/` directory and run the following command:

```
testnet/stacks-node$ cargo test
```

If you want to ignore some tests, navigate to the `testnet/stacks-node` directory and use the following command:

```
testnet/stacks-node$ cargo test -- --ignored --num-threads=1
```
