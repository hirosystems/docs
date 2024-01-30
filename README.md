# Hiro developer documentation

This repository holds the source for the Hiro developer documentation website, which is deployed at [docs.hiro.so](https://docs.hiro.so). This website is built using [Docusaurus](https://docusaurus.io/).


## Getting started

### Contribution Prerequisites

Before running Hiro Docs, ensure that you have the following tools installed:

1. Install [NodeJS](https://nodejs.dev/) that includes `npm`
1. Install [yarn](https://classic.yarnpkg.com/en/docs/install) by running `npm install --global yarn`

If you are using a mac, we highly recommend using [Homebrew](https://brew.sh/) to install these tools.

You should also be [familiar with Git](https://docs.github.com/en/get-started/quickstart/git-and-github-learning-resources).


### Installation

Use the following command to install local build and development dependencies.

```sh
yarn
```

### Local Development

The following command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server. Make sure that you have [installed dependencies](#installation) before doing local development.

```sh
yarn start
```

### Build

The following command will build the final static website into the `build` directory.

```sh
yarn build
```

## Deployment

This website is configured to deploy automatically on PR merge using [Vercel](https://www.vercel.com).
