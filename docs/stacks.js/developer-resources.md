---
title: Developer Resources
---

## Common Pitfall: Polyfilling Buffer
Stacks.js uses Buffers, which require a polyfill in the browser. The correct `Buffer` object is exported by @stacks/common.
Somewhere at the start of our app (main.js, index.js) we need to set a global Buffer on the window object. This can be done in different ways as shown in the examples below (TypeScript might complain about it).

Example - 1 : [Main.js](https://github.com/hirosystems/stacks.js-starters/blob/efb93261b59494f4eb34a7cb5db5d82a84bd3b7c/templates/template-vue/src/main.js#L6)

Example - 2 : [index.js](https://github.com/hirosystems/stacks.js-starters/blob/efb93261b59494f4eb34a7cb5db5d82a84bd3b7c/templates/template-react/src/index.js#L11)

Example - 3 : [_app.js](https://github.com/hirosystems/stacks.js-starters/blob/efb93261b59494f4eb34a7cb5db5d82a84bd3b7c/templates/template-nextjs/pages/_app.js#L8)

Example - 4 : [index.js](https://github.com/hirosystems/stacks.js-starters/blob/efb93261b59494f4eb34a7cb5db5d82a84bd3b7c/templates/template-demo/src/index.js#L11)

Example - 5 : [main.ts](https://github.com/hirosystems/stacks.js-starters/blob/efb93261b59494f4eb34a7cb5db5d82a84bd3b7c/templates/template-angular/src/main.ts#L9)

## Common Pitfall: regenerator-runtime
If using @stacks/connect with vite, rollup, svelte, or vue a package `regenerator-runtime` needs to be manually added to successfully build the project.

(Hopefully fixed soon)

## Common Pitfall: BigInt doesn’t work \ BigInt doesn’t support X
BigInt’s work in all modern browsers, but some bundlers try to optimize them incorrectly. If you are targeting browsers that are too outdated, BigInts might fail.
To solve this set your project `browserslist` to the following: https://github.com/hirosystems/stacks.js-starters/blob/efb93261b59494f4eb34a7cb5db5d82a84bd3b7c/templates/template-react/package.json#L34-L40


