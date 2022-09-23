# Introduction

The stacks-node consists of its own minimal set of HTTP endpoints, referred to as Remote Procedure Call (RPC) endpoints.

The stacks-blockchain-api enables clients to access these endpoints by proxying these clients through to a load-balanced pool of stacks-nodes.

For more information on these RPC endpoints, please refer to the [RPC Endpoints](https://github.com/blockstack/stacks-blockchain/blob/master/docs/rpc-endpoints.md) page. 

## Common RPC Endpoints

Some common RPC endpoints are:

`POST /v2/transactions` - broadcasts a transaction.
`GET /v2/pox` - retrieves current PoX-relevant information.
`POST /v2/contracts/call-read/<contract>/<function>` - evaluates and returns the result of calling a Clarity function.
`POST /v2/fees/transaction` - evaluates a given transaction and returns transaction fee estimation data.
`GET /v2/accounts/<address>` - used to retrieve the current nonce required for creating transactions.

The endpoints implemented by stacks-blockchain-api provide data that the stacks-node due to various constraints. Typically, this is either data that the stacks-node does not persist, or data that it cannot efficiently serve to many clients. For example, the stacks-node can return the current STX balance of an account, but it can't return a history of account transactions.

## Rosetta Integration

The Stacks Blockchain API also implements the Rosetta spec developed by Coinbase -- "an open standard designed to simplify blockchain deployment and interaction."

For information on the Rosetta Coinbase integration, refer to the [Rosetta API](https://www.rosetta-api.org/) page.

## Blockchain Naming System (BNS) Integration

The Stacks Blockchain API also implements the BNS (Blockchain Naming System) endpoints.

For information on how the Stacks Blockchain API implements Blockchain Naming System, please refer to the [BNS Reference](https://docs.stacks.co/build-apps/references/bns) page.

For more information on Express.js routes, please refer to the `/src/api/routes`.

## Event Observer

The Stacks Blockchain API creates an "event observer" HTTP server which listens for events from a stacks-node "event emitter"

These events are HTTP `POST` requests that consists of elements such as: blocks, transactions, and byproducts of executed transactions. Transaction "byproducts" are items like asset transfers, smart-contract log data, execution cost data.

The Stacks Blockchain API processes and stores these items as relational data in postgres. To review the "event observer" code, see `/src/event-stream`.

**Note** All HTTP endpoints and responses are defined in the OpenAPI and JSON schemas. For more information on the OpenAPI schema, refer to the [OpenAPI](/docs/openapi.yaml) specification. These schemas are used to auto-generate the Hiro API documentation(https://hirosystems.github.io/stacks-blockchain-api/) pages.

The JSON schemas are converted into typescript interfaces, which are used internally by the db controller module to transform SQL query results into the correct object shapes. Also, the OpenAPI and JSON schemas are used to generate a standalone @stacks/blockchain-api-client.

The easiest and quickest way for you to develop in this repository is to use the Visual Studio Code (VS Code) debugger, which uses docker-compose to set up a stacks-node and postgres instance. Alternatively, you can run `npm run dev:integrated` which performs the same task, but without using a debugging tool.
