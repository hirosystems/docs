---
title: Create Project
---

This article walks you through the process of creating a new project or importing a project from GitHub.

## Prerequisite

Log into the [Hiro Platform](https://platform.hiro.so/) using any of the login methods explained in the [Getting started](getting-started.md) guide.

Once you are logged in, you will be navigated to the [welcome page](https://platform.hiro.so/welcome), where you are required to respond if you want to opt-in to receive updates from our developers. You can choose *Yes, count me in* or *skip*.

![Opt for updates](images/opt-for-updates.png)

Now, you will be prompted to *create a project* or *import from GitHub*.

![create or import a project](images/create-or-import-project.png)


An example workflow of the steps required to create a new project is described below.

## Create new Project

To create a new project, you can start with a *Blank project* or use one of the examples displayed in the project modal - Hello world, Ordyswap, Clarity bitcoin, Counter, Fungible token, Lightning swaps, NFT marketplace, Non-fungible token. You can also refer to the examples in the [Clarity examples](https://github.com/hirosystems/clarity-examples/tree/main/examples) to view the source code.

![Create new project](images/create-new-project.jpeg)

Once you select a new project from the list, the selected example project will be automatically cloned and displayed on the [projects](https://platform.hiro.so) page. Below is the screenshot of the *Hello world* project.

![Hello world project](images/hello-world-project.png)

Now, you can view your projects on the [projects page](https://platform.hiro.so). Select the project to review the list of contracts in them.

## Import Project from GitHub

When you **Import from GitHub**, there will be a modal displayed on the right to enter the GitHub URL of your project.

![Import from GitHub](images/import-from-github.jpeg)

Once you enter the URL of your project, select *clone* to clone your project into the Hiro platform.

:::note

The maximum project size allowed for imports is 50 MB.

:::

If you have an existing project but don't have clarity contracts in it, you can still clone the project and add clarity contracts by referring to our [clarity contract examples](contract-examples.md).

Your cloned project is now displayed on the [projects page](https://platform.hiro.so).

After your import, your project shows a list of Clarity contracts ending with `.clar` extension, as shown below. 

![Import Clarinet project from GitHub](images/import-clarinet-project.png)
