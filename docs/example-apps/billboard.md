---
id: billboard
title: Billboard app
---

This example app demonstrates the integration between a simple web app and a Clarity smart contract. Using the [DevNet](/smart-contracts/devnet), a local version of the Stacks blockchain is used as a development and integration environment for the full stack app. This app builds a frontend to the [Billboard smart contract](/tutorials/clarity-billboard), and demonstrates the use of the [Stacks API](/api) in React. The full source of the app is provided and is completely open source for you to modify. This page is a case study highlighting important code snippets and design patterns to help you develop your own Stacks app, as well as use the DevNet feature to integrate your frontend and backend without deploying to a live testnet.

This app showcases the following features of Stacks and Clarinet:

- Running a local Stacks blockchain (DevNet)
- Storing values in a Clarity smart contract
- Accessing values in a smart contract from the [Stacks API](/api)
- Issuing a contract transaction with [Stacks.js](/references#frontend-development)

The source for the billboard app is available on [GitHub](https://github.com/pgray-hiro/stacks-billboard). This page assumes that you have familiarity with [React](https://reactjs.org).

## Billboard overview

Billboard is a simple Stacks app that uses a Clarity smart contract to store a message on the Stacks blockchain. A web frontend built with React and Stacks.js then accesses and displays the message. The smart contract backend also has methods for updating the message through a small STX payment. The cost to update the message increases with each update.

![Billboard interface](/img/billboard-interface.png)

The billboard app is provided as a simple demonstration of a full stack Stacks web app, and an example of the architecture of a Stacks app. You can use the billboard app as a base for your own Stacks app, or review the code to learn more about how to structure your own full stack Stacks app.

### Quickstart

If you are interested in running the billboard app locally, you can follow the instructions in the [GitHub README](https://github.com/pgray-hiro/stacks-billboard#readme). You should have Clarinet installed locally, and Node.js 12+ (Node 14 recommended).

## Review billboard contract

The backend of the billboard app is a Clarity smart contract. The billboard contract stores the billboard message, and defines the functions for updating the message. For a complete overview of how to develop the billboard contract, review the [billboard tutorial](/tutorials/clarity-billboard).

The Clarity smart contract for this app is located at `/contracts/billboard.clar`. It defines 3 functions, `get-price`, `get-message`, and `set-message`. This example app only demonstrates the interaction with the latter two functions, however you could extend the app to get the message price using the same general design for interacting with the `get-message` function.

```lisp title="/contracts/billboard.clar"
;; billboard contract

;; error consts
(define-constant ERR_STX_TRANSFER   u0)

;; data vars
(define-data-var billboard-message (string-utf8 500) u"Hello, world!")
(define-data-var price uint u100)

;; public functions
(define-read-only (get-price)
    (var-get price)
)

(define-read-only (get-message)
    (var-get billboard-message)
)

(define-public (set-message (message (string-utf8 500)))
    (let ((cur-price (var-get price))
          (new-price (+ u10 cur-price)))

        ;; pay the contract
        (unwrap! (stx-transfer? cur-price tx-sender (as-contract tx-sender)) (err ERR_STX_TRANSFER))

	;; update the billboard's message
        (var-set billboard-message message)

        ;; update the price of setting a message
        (var-set price new-price)

        ;; return the updated price
	(ok new-price)
    )
)
```

## Running a local Stacks blockchain

The billboard project demonstrates a powerful feature of Clarinet: the Stacks local DevNet. DevNet allows you to run a local Stacks blockchain with the full PoX consensus mechanism (and simulated stacking) active. To accomplish this, Clarinet orchestrates a suite of Docker containers that run a mock Bitcoin node, a Stacks node, a Stacks API node, and a local instance of the Stacks explorer. You may also choose to enable a local instance of the Bitcoin explorer.

In a terminal window, from the root of the billboard project repository, run `clarinet integrate` to bring up the local DevNet. The DevNet interface window displays a summary of the DevNet and a block explorer. It takes several minutes for the local DevNet to launch. When the DevNet has launched, the `bitcoin-node`, `stacks-node`, `stacks-api-node`, and `stacks-explorer` containers will all have green status.

:::tip

To avoid errors, it is recommended that you bring up the local DevNet and allow it to reach healthy status before running the React frontend. If you launch the React project before the DevNet, you'll receive API errors until the DevNet is fully booted.

:::

### DevNet configuration

DevNet is a highly configurable instance of the Stacks blockchain. You can configure many of the properties of the DevNet through modifying values in the `settings/DevNet.toml` file. When you create a new project with Clarinet, this file is populated with sensible default vales for the local blockchain. If you would like to [change any of the default values](/smart-contracts/devnet#blockchain-configuration), uncomment the line containing the configuration parameter, and change the value to your intended configuration.

The DevNet configuration file also contains [definitions for predefined wallets](/smart-contracts/devnet#accounts-configuration) in the local chain. These wallets are pre-populated with STX tokens, and can be used for testing and integration. The configuration file provides the seed phrase and private key for each wallet as well.

## Running the billboard frontend

Once the local DevNet is healthy, you can run the billboard frontend from a separate terminal with the command `yarn dev` from the root of the billboard repository. This command launches the local frontend and opens a web browser to the appropriate local URL.

The following sections highlight important parts of the billboard frontend app.

### Interacting with the Stacks API

The billboard frontend uses the [transactions](https://blockstack.github.io/stacks.js/modules/transactions.html) module of Stacks.js to interact with the [Stacks API](/api) and read values from the backend smart contract. This is accomplished by creating a network object in Stacks.js, serializing a request using Stacks.js, and then sending the request to the appropriate endpoint using the network object.

Note that commonly used objects such as the network and smart contract API are created as React hooks, a design choice that allows them to be shared between React components and is friendly to the React component lifecycle.

```js title="./src/common/hooks/use-network.ts"
import { StacksMocknet, StacksTestnet } from "@stacks/network";

import { devnet, STACKS_API_URL } from "@common/constants";

export const useNetwork = () => {
  const network = devnet
    ? new StacksMocknet({ url: STACKS_API_URL })
    : new StacksTestnet({ url: STACKS_API_URL });
  return network;
};
```

The `use-network` hook provides a Stacks network object that can be used in a React component. The hook reads an environment variable to determine if the app is running in a local development environment or a live blockchain, and updates the network according to that state.

```js title="./src/common/hooks/use-smart-contract-api.ts"
import {
  Configuration,
  SmartContractsApi,
} from "@stacks/blockchain-api-client";

import { useNetwork } from "@common/hooks/use-network";

export const useSmartContractApi = () => {
  const network = useNetwork();
  const config = new Configuration({ basePath: network.coreApiUrl });
  return new SmartContractsApi(config);
};
```

The `use-smart-contract-api` hook provides an object for interacting with the smart contracts API that can be used in a React component. This hook uses the network object provided by the `use-network` hook, as well as the `SmartContractsApi` object from the Stacks blockchain API client to export a fully configured object for use in the billboard hook.

#### Reading the billboard message from the contract

The `use-billboard` React hook provides the business logic of reading the billboard message value from the smart contract and exporting it for use in the billboard React component. The hook imports the smart contract API object from the `use-smart-contract-api` hook, and the address of the contract from the `use-billboard-contract` hook. The `use-billboard` hook then constructs an API call to the read-only function API, and updates the app state with the retrieved value. If an error occurs, the hook provides the error message in the app state as well.

```js title="./src/common/hooks/use-billboard.ts"
import { useCallback, useEffect, useState } from "react";
import { cvToString, hexToCV } from "@stacks/transactions";
import useInterval from "@use-it/interval";

import { useBillboardContract } from "@common/hooks/use-billboard-contract";
import { useSmartContractApi } from "@common/hooks/use-smart-contract-api";

export const useBillboard = () => {
  const client = useSmartContractApi();
  const [contractAddress, contractName] = useBillboardContract();
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const getMessage = useCallback(() => {
    const request = {
      contractAddress,
      contractName,
      functionName: "get-message",
      readOnlyFunctionArgs: {
        arguments: [],
        sender: contractAddress,
      },
    };

    client
      .callReadOnlyFunction(request)
      .then((response) => {
        setError("");

        if (response.okay && response.result) {
          const msg = cvToString(hexToCV(response.result)).slice(2, -1);
          setMessage(msg);
        }
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        setError(error.message);
      });
  }, [client, contractAddress, contractName]);

  // Run the getMessage function at load to get the message from the contract
  useEffect(getMessage, [getMessage]);

  // Poll the Stacks API every 30 seconds looking for changes
  useInterval(getMessage, 30000);

  return [message, loading, error];
};
```

For simplicity, the billboard uses interval polling every 30 seconds to update the value of the billboard message. Stacks.js also offers websocket connections for reading API endpoints in real time.

## Updating the billboard value

A small command line utility is provided to demonstrate creating a transaction to update the billboard value. While a production app might connect to the Hiro Web Wallet using the [connect](https://github.com/hirosystems/connect#readme) library, for simplicity this app does not incorporate the wallet. To make the contract call to change the billboard value, you can use the [`update-message.js` script](https://github.com/pgray-hiro/stacks-billboard/blob/main/update-message.js) in the root of the repository. You need the secret key for one of the wallets in your local DevNet, which can be found in the `DevNet.toml` file.

```toml title="/settings/DevNet.toml"
...
[accounts.wallet_1]
mnemonic = "sell invite acquire kitten bamboo drastic jelly vivid peace spawn twice guilt pave pen trash pretty park cube fragile unaware remain midnight betray rebuild"
balance = 100_000_000_000_000
# secret_key: 7287ba251d44a4d3fd9276c88ce34c5c52a038955511cccaf77e61068649c17801
# stx_address: ST1SJ3DTE5DN7X54YDH5D64R3BCB6A2AG2ZQ8YPD5
# btc_address: mr1iPkD9N3RJZZxXRk7xF9d36gffa6exNC
...
```

With the local DevNet running and the billboard frontend running, in a new terminal window, copy the value of the `secret_key`, and then update the message with the following command:

```sh
./update-message.js -k <secret_key> "My new message"
```

If the transaction was successful, the script echoes the message as output. A successful transaction should appear in the mempool summary of the DevNet interface.

Internally, the script forms a transaction and then submits it to the local DevNet API node using the [transactions](https://blockstack.github.io/stacks.js/modules/transactions.html) library.

```js title="./update-message.js"
...

// Create a Stacks testnet with the local node as the URL
const network = new StacksTestnet({ url: "http://localhost:3999" });

// Set transaction options, using command line arguments
// Note that postConditionMode must be set to 1, which corresponds to Allow
// Meaning that the transaction issuer does not care about the post conditions
const txOptions = {
  contractAddress: argv.a,
  contractName: argv.n,
  functionName: "set-message",
  functionArgs: [stringUtf8CV(argv._[0])],
  senderKey: argv.k,
  validateWithAbi: true,
  network,
  anchorMode: AnchorMode.Any,
  postConditionMode: 1,
};

// Create a transaction object, then broadcast it on our testnet created above
const transaction = makeContractCall(txOptions)
  .then((txn) => {
    broadcastTransaction(txn, network);
    console.log(argv._[0]);
  })
  .catch((err) => {
    console.log(err);
  });
```

:::note

This simple command-line script is provided as an additional demonstration of transactions, you could also update the message using the [Stacks CLI](/get-started/command-line-interface).

:::
