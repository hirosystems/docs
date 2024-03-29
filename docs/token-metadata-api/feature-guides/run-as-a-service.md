---
# The default id is the same as the one defined below. so not needed
title: Token Metadata API as a Service
sidebar_label: Run as a service
custom_edit_url: null
---

### System requirements

The Token metadata API is a microservice with hard dependencies on other Stacks blockchain components. Before you start, you'll need to have access to the following:

1. A fully synchronized [Stacks node](https://github.com/stacks-network/stacks-blockchain)
1. A fully synchronized instance of the [Stacks Blockchain API](https://github.com/hirosystems/stacks-blockchain-api) running in `default` or `write-only` mode, with its Postgres database exposed for new connections. A read-only DB replica is also acceptable.
1. A local writeable Postgres database for token metadata storage

### Run service

This section helps you to initiate the service by following the steps below.

1. Clone the repository by using the following command:

`git clone https://github.com/hirosystems/token-metadata-api.git`

1. Create a `.env` file and specify the appropriate values to configure access to the Stacks API database, the Token metadata API local database, and the Stacks node RPC interface. See [`env.ts`](https://github.com/hirosystems/token-metadata-api/tree/master/src/env.ts) for all available configuration options.

2. Build the app (NodeJS v18+ is required)

```
npm install
npm run build
```

1. Start the service

```
npm run start
```

### Stop service

When shutting down, you should always prefer to send the `SIGINT` signal instead of `SIGKILL` so the service has time to finish any pending background work and all dependencies are gracefully disconnected.

### Using image cache service

The Token metadata API allows you to specify the path to a custom script that can pre-process every image URL detected by the service before it's inserted into the DB. This will enable you to serve CDN image URLs in your metadata responses instead of raw URLs, providing key advantages such as:

- Improves image load speed
- Increases reliability in case the original image becomes unavailable
- Protects original image hosts from [DDoS attacks](https://wikipedia.org/wiki/Denial-of-service_attack)
- Increases user privacy

An example IMGIX processor script is included in [`config/image-cache.js`](https://github.com/hirosystems/token-metadata-api/blob/master/config/image-cache.js).
You can customize the script path by altering the `METADATA_IMAGE_CACHE_PROCESSOR` environment variable.
