---
title: Deployment Plans
---

# Deployment Plans

Deployment plans is a process to publish one more contracts to a network (testnet or mainnet).
This article walks you through deploying your contracts using deployment plans in the [Hiro Platform](https://platform.hiro.so/).

To learn more about Deployment plans, refer to [Customize deployment](https://docs.hiro.so/clarinet/how-to-guides/how-to-use-deployment-plans#deployment-plans)

## Generate Deployment Plan

This section helps you with generating a deployment plan to deploy your contracts all at once.

First, sign up to the [Hiro Platform](https://platform.hiro.so/) or login to the Platform if you are an existing user with your credentials. For guidance, refer to the [getting started](https://docs.hiro.so/platform/getting-started#sign-up-as-a-new-user) guide.

Then, [create or import a project](https://docs.hiro.so/platform/getting-started#create-or-import-project) to use deployment plans.

To launch the deployment plans pane, click on the **deploy** button on the top right corner of the page.

![Deploy button]()

This brings up the deployment plans pane where you can select the network to deploy the contracts using deployment plans. `Generate for Testnet` or `Generate for Mainnet`.

![Deployment plans pane]()

## Deploy

In this section, you will learn how to deploy your contracts using your created deployment plans. 

- Select `Generate for Testnet` to deploy your contracts to the Testnet.
![]()
- Next, you will connect the wallet to the application and select `Confirm` to confirm the deployment.
![]()
- Now in your list of contracts, you will see the status of your deployment changes to `In mempool`, and upon completion, the status can be either `Deployed`, indicating successful deployment of contracts, or `Failed`, reflecting that there might be some error in the deployment process.
![]()

## Regenerate Plan

In this section, you will learn how to regenerate your deployment plan to include any new contract you created using the editor.
- To create a new contract, refer to this [link](https://docs.hiro.so/clarinet/how-to-guides/how-to-add-contract).
  
:::note

Make sure that the new contract is added to the `clarinet.toml` file

:::

- Now select `Regenerate Plan` to get the updated list of contracts in your selected deployment plan.


## Remove

To remove a deployment plan, select the `Remove` button.

