---
title: Feature Guides
---

Importing & Polyfills

Most of the Stacks.js packages are released in multiple different forms.
These typically include:

- `commonjs` under `/dist`
- `esm` under `/dist/esm`
- `umd` (with all dependencies bundled and polyfilled for the browser) under `/dist/umd`

> The `@stacks/keychain` and `@stacks/wallet-sdk` include an additional `esm` bundle (with external dependecies bundled and polyfilled for the browser) under `/dist/polyfill`.

Build systems try to be smart and auto-detect the correct type.
But you can specify which type to import as follows:

```js
import { generateSecretKey } from '@stacks/wallet-sdk'; // auto-detect
import { generateSecretKey } from '@stacks/wallet-sdk/dist/polyfill'; // esm bundle (polyfilled)
// ...
const walletSdk = require('@stacks/wallet-sdk'); // auto-detect
const walletSdk = require('@stacks/wallet-sdk/dist'); // cjs bundle
const walletSdk = require('@stacks/wallet-sdk/dist/umd'); // umd bundle
// ...
```

For production builds it is recommended to configure the respective build system to optimize further.
For more fine-grained control, import using `esm` and configure your build system to polyfill any necessary dependencies.
You could also `alias` the packages to their `/dist/<TYPE>` alternative.
E.g., if you are already polyfilling in webpack, add a `resolve.alias` section [like this](https://github.com/janniks/stacks-wallet-web/blob/fea34ecfa667518ea9eecdf3b8161aa8e3fad1e3/webpack/webpack.config.base.js#L72-L82).

We are currently working to get rid of many dependencies to remove the need for complex configuration.
For now, if you are seeing problems, try the `/dist/umd` import.
Otherwise, [open a new issue](https://github.com/hirosystems/stacks.js/issues/new/choose) with details on your build setup.

