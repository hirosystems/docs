---
title: How to use Extensions
---

Clarinet can be easily extended by community members. Open source contributions to clarinet are welcome.

You may also write your own Clarinet extensions to integrate clarity contracts with your own tooling and workflow.

| Name                      | wallet access | disk write | disk read | Deployment                                                            | Description                                                                                                                                       |
| ------------------------- | ------------- | ---------- | --------- | --------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| stacksjs-helper-generator | no            | yes        | no        | https://deno.land/x/clarinet@v0.29.0/ext/stacksjs-helper-generator.ts | Facilitates contract integration by generating some typescript constants that can be used with stacks.js. Never hard code a stacks address again! |
|                           |               |            |           |                                                                       |

Extensions are run with the following syntax:

```
$ clarinet run --allow-write https://deno.land/x/clarinet@v0.29.0/ext/stacksjs-helper-generator.ts
```

An extension can be deployed as a standalone plugin on [Deno](https://deno.land/), or can also just be a local file if it includes sensitive / private setup informations.

As illustrated in the example above, permissions (wallet / disk read / disk write) are declared using command flags. If at runtime, the Clarinet extension is trying to write to disk, read disk, or access wallets without permission, the script will end up failing.


## What next?

Now that you have deployed your smart contracts, you can now explore any of the following options:

- analyze your contract with Check-checker by referring to [how to analyze with check-checker](how-to-check-contract.md)
- run a local integration block chain by referring to [how to run local integration environment](how-to-run-integration-environment.md)
- deploy clarinet with subnets by referring to [how to deploy with subnets](how-to-deploy-with-subnets.md)
