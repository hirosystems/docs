---
title: Build Contracts
---

This guide helps you create/build contracts using the [Hiro Platform](https://platform.hiro.so/).

## Prerequisites

- Log in using any of the methods described in the [Getting started](getting-started.md) guide.
- You have accepted the *Terms and Conditions*.s
- You have created or imported a project by following the steps in the [create project](create-project.md) guide.

## Build contract

This section helps you create your contracts using the Hiro Platform. 

If you have imported a project with no clarity contracts, you will see a window to open editor, as shown below.

![Open editor](images/open-editor.png)

You can now create contracts using any of the following ways.

1. Write new contracts
2. Add a contract to the project

### Write new contracts

You can create a new contract for your project by following the steps below. Note that the sample project used here is [clarity examples project](https://github.com/hirosystems/clarity-examples), and it is assumed that your project has no clarity contracts.

1. On the [projects page](https://platform.hiro.so/projects), select the project you want to create a contract. 
2. Then, select the *Open Editor* button. 
3. This opens up a new tab with VS code editor to edit your project. 
4. In the left nav, you can see the project and its directories.
5. Expand *examples* and see a directory *contracts* but no contracts are in this folder.
6. Right-select the *contracts* folder, select *New file* and add a new contract with a name of your choice. Eg: *clarity_contract_1.clar*
    ![Write new contract](images/write-new-contract.png)
7. This will create a `.clar` file in the *contracts* folder. Now you can use the [clarity examples](https://github.com/hirosystems/clarity-examples) to customize your contract.
   
    :::tip

    If you are new to clarity, try [Clarity Camp](https://learn.stacks.org/course/clarity-camp) to understand writing smart contracts.

    :::

8. Once you are ready with your `.clar` file, you can update the `Clarinet.toml` file located in the same project directory. Use the following code to update the `.toml` file with these parameters. `[contracts.<your-contract-name>]` and path to use your `.clar` file name as `path = "<your-contract-name.clar>"`.

    ```
    [project]
    name = "CLARITY-EXAMPLES-5XE7"
    requirements = []
    [contracts.clarity_contract_1]
    path = "clarity_contract_1.clar"
    clarity_version = 1
    epoch = "2.05"
    ```
Save the file. You can now deploy your contracts in your project by referring to the [deploy project](deploy-project.md) guide.

## Add a new contract

When you are on the [projects](https://platform.hiro.so/projects) page with a list of projects, select a project with at least one contract. Select the *Open Editor* button to open your project in the VS code editor.

You can now add a new contract by following **1-7** steps in the [write new contracts](build-contract#write-new-contracts) section mentioned above in this article.

In the 8th step, where you edit the `clarinet.toml` file, you will add two lines of code, as shown below. Note that the below code assumes that the newly added contract is *clarity_contract_2*. Also, add the path to your new contract as shown below.

    ```
    [project]
    name = "CLARITY-EXAMPLES-5XE7"
    requirements = []
    [contracts.clarity_contract_1.clar]
    [contracts.clarity_contract_2.clar]  --> new
    path = "clarity_contract_1.clar"
    path = "clarity_contract_2.clar"  --> new
    clarity_version = 1
    epoch = "2.05"
    ```

### Test contract

You can customize your contracts by checking, testing, and debugging them using the VS code terminal inside the Hiro Platform. On your projects page, select the *Open editor* button to open up the VS code editor. Select the three horizontal lines icon to open a new terminal. Refer to the following documents to test your contracts in the VS code terminal.

- [Check contracts](../../../clarinet/docs/how-to-guides/how-to-check-contract.md)
- [Test contracts](../../../clarinet/docs/how-to-guides/how-to-test-contract.md)
- [Debug contracts](../../../clarinet/docs/how-to-guides/how-to-debug-contract.md)

:::note

The VS Code terminal is currently not supported for clarinet integrate and deployment plans.

:::

Once you are done adding, customizing, and testing the contracts, save your files. The Hiro platform will take care of binding your clarity contracts in your projects and deploy them as pods in Kubernetes with security.

You can now proceed to the deployment process by referring to the [deploy project](deploy-project.md) guide.
