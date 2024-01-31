---
title: Getting started
---

The Token metadata API is a microservice with hard dependencies on other Stacks blockchain components. Before you start, you'll need to have access to the following:

1. A fully synchronized [Stacks node](https://github.com/stacks-network/stacks-blockchain)
2. A fully synchronized instance of the [Stacks Blockchain API](https://github.com/hirosystems/stacks-blockchain-api) running in `default` or `write-only` mode, with its Postgres database exposed for new connections. A read-only DB replica is also acceptable
3. A local writeable Postgres database for token metadata storage

## Run service

This section helps you to initiate the service by following the steps below.

1. Clone the repository by using the following command:

    `git clone https://github.com/hirosystems/token-metadata-api.git`

1. Create a `.env` file and specify the appropriate values to configure access to the Stacks API database, the Token metadata API local database, and the Stacks node RPC interface. See [`env.ts`](https://github.com/hirosystems/token-metadata-api/tree/master/src/env.ts) for all available configuration options.

2. Build the app (NodeJS v18+ is required)

    ```
    npm install
    npm run build
    ```

3. Start the service

    ```
    npm run start
    ```
