# Hiro developer documentation

This repository holds the source for the Hiro developer documentation website, which is deployed at [docs.hiro.so](https://docs.hiro.so). This website is built using [Docusaurus](https://docusaurus.io/).

## Installation

Use the following command to install local build and development dependencies.

```sh
yarn
```

## Local Development

The following command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server. Make sure that you have [installed dependencies](#installation) before doing local development.

```sh
yarn start
```

## Build

The following command will build the final static website into the `build` directory.

```sh
yarn build
```

### Deployment

This website is configured to deploy automatically on PR merge using [Vercel](https://www.vercel.com).
