---
title: Troubleshooting
---

## Common Pitfall: Polyfilling Buffer

Stacks.js uses Buffers that require a polyfill in the browser. @stacks/common exports the right 'Buffer.'
At the start of our app (main.js, index.js), we need to set a global Buffer on the window object. 
Note that TypeScript might complain about the global buffer.

**Examples**:

- [template-vue](https://github.com/hirosystems/stacks.js-starters/blob/efb93261b59494f4eb34a7cb5db5d82a84bd3b7c/templates/template-vue/src/main.js#L6)

- [template-react](https://github.com/hirosystems/stacks.js-starters/blob/efb93261b59494f4eb34a7cb5db5d82a84bd3b7c/templates/template-react/src/index.js#L11)

- [template-nextjs](https://github.com/hirosystems/stacks.js-starters/blob/efb93261b59494f4eb34a7cb5db5d82a84bd3b7c/templates/template-nextjs/pages/_app.js#L8)
  
- [template-demo](https://github.com/hirosystems/stacks.js-starters/blob/efb93261b59494f4eb34a7cb5db5d82a84bd3b7c/templates/template-demo/src/index.js#L11)
  
- [template-angular](https://github.com/hirosystems/stacks.js-starters/blob/efb93261b59494f4eb34a7cb5db5d82a84bd3b7c/templates/template-angular/src/main.ts#L9)


## Common Pitfall: regenerator-runtime

If using @stacks/connect with vite, rollup, svelte, or vue, a package `regenerator-runtime` needs to be manually added to build the project successfully.

`npm install --save-dev regenerator-runtime.`
