---
title: Register Chainhooks on Devnet
---

Follow these steps to register your Chainhooks on Devnet using Clarinet:

> **_NOTE:_**
> This feature requires Clarinet version 2.1.0 or higher. Refer to our [Clarinet - Getting Started](../../clarinet/getting-started.md#install-clarinet) page for an installation guide.

## Create Your Chainhook Predicates

First, within your Clarinet project, you'll need to create your Chainhook predicate files.

These should be situated in the root of your project directory. The files can either be separate or stored within a specific folder, e.g., `/chainhooks` in your project root directory:

```bash
clarinet-project/
│
├── Clarinet.toml
│
├── contracts/
│   ├── counter.clar
│
├── chainhooks/  # Directory to place Chainhook predicate files - can be named anything
│   ├── increment.json
│   ├── decrement.json
│
... # other project files
```

For examples on how to define your predicates, refer to the [Stacks](./chainhooks-with-stacks.md) and [Bitcoin](./chainhooks-with-bitcoin.md) guides.

## Start the Devnet

To start the Devnet, run the `clarinet devnet start` command from the root of your project directory. Running this command will begin a local Chainhook service in the background that automatically registers your Chainhook files within the project directory against the network.

## Confirm Registration

Once your Devnet starts, the Chainhook service initiates the registration process. You'll know that the registration of your Chainhooks was successful by checking the confirmation message in your terminal:

```bash
INFO Feb  5 15:20:07.233382 2 chainhooks registered
```

If you do not see this message at the top of your `clarinet devnet start` logs, verify that you are using `clarinet` version 2.1.0 or higher.

## Working With Chainhooks

With these steps completed, your Chainhooks are ready to trigger whenever local contract actions occur. You can monitor your network activity locally, through the `clarinet devnet start` terminal, to confirm Chainhooks execution as you further develop and test your smart contracts. When an action occurs, you should see something like this:

```bash
INFO Feb  5 15:21:07.233382 1 hooks triggered
```

At this point, you can verify the payload for that action depending on whether you are expecting an `http_post` or `file_append` result from your `then_that` configuration.
