---
id: clarinet
title: Deploy Clarinet with Hyperchains
---

# Deploy with Hyperchains on Devnet

Clarinet may be used for facilitating experimentations with [Hyperchains](https://www.youtube.com/watch?v=PFPwuVCGGuI).
To get started with hyperchains, in your `Devnet.toml`, enable the flag

```toml
[devnet]
# ...
enable_hyperchain_node = true
```

This same file can be used for customizing the hyperchain-node (miner, etc).

When running the command below, Clarinet will spin up a hyperchain node.

```bash
$ clarinet integrate
```

For more information on how to use and interact with this incoming L2 
can be found on the [Hyperchain repository](https://github.com/hirosystems/stacks-hyperchains).
