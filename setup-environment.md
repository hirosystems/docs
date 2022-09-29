---
title: Setup Environment
---

To setup the development environment for this repository, follow these steps:

> **Prerequisites**:
>
> - Node v16.x.x is recommended (Node v17 may run into [issues](https://github.com/hirosystems/stacks.js/issues/1176) that can be [worked around](https://github.com/webpack/webpack/issues/14532#issuecomment-947012063))

1. Clone this package.
2. Run `npm install` to install dependencies
3. Run `npm run bootstrap` to [bootstrap](https://github.com/lerna/lerna/tree/main/commands/bootstrap) project
4. Run `npm run build` to build packages
5. Run `npm run test` to run tests
6. 🚀

> Some tests may contain logging of errors and warnings.
> This should not be confused with failing tests.
> Make sure the last lines of `npm run test` show `lerna success - @stacks/...` for every package.
