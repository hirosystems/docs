---
title: Build Stacks Explorer
custom_edit_url: null
---

The Stacks Explorer frontend user interface is built with [React](https://reactjs.org/), [next.js](https://github.com/vercel/next.js) and [@stacks/ui](https://github.com/hirosystems/ui).

Before you can run it on your machine locally, you must first clone the [Stacks Explorer](https://github.com/hirosystems/explorer) repository to obtain all of the necessary files and libraries needed.

# Project Dependencies

Once you have cloned the Stacks Explorer repositories, you will need to install the following project dependencies:

- [NodeJS](https://nodejs.dev/en/) that includes `npm`
- [PNPM](https://pnpm.io/installation/)
- [Homebrew](https://brew.sh/)

> **_NOTE:_**
>
> Although Homebrew is not required to install and operate the Stacks Explorer, it is highly recommended.

Open your terminal window, and make sure you are in the `/explorer` folder. Run the below command to install the dependencies:

`pnpm i`

After installing and configuring your environment, you can run the Stacks Explorer locally if you wish by running the followning `pnpm` command:

`pnpm dev`

## Building for Production

You may also build a production version of the Stacks Explorer. Simply run the following command:

`pnpm build`

> **_NOTE:_**
>
> Running `pnpm build` also run the default next.js build task.
