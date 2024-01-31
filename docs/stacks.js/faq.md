---
sidebar_label: FAQs
---

# Stacks.js FAQs

#### What are Post Conditions? How do Post Conditions work?

In computer programming, a post-condition is a condition (or a predicate) that must always be true just after the execution of some section of code or after an operation. And on Stacks, transactions are secured by post-conditions. Thus, if a post-condition check fails on a Clarity smart contract then the entire transaction is reverted.

In addition, the Stacks blockchain supports an "allow" or "deny" mode for evaluating post-conditions: in "allow" mode, other asset transfers not covered by the post-conditions are permitted, but in "deny" mode, no other asset transfers are permitted besides those named in the post-conditions.

Post-conditions are less a part of Clarity (the language), but more a part of transactions.
Users could send the otherwise-identical transaction (Example: contract-call, executing a function on the blockchain) with OR without different post-conditions, in allow OR deny mode.
The PCs are managed by the user/wallet/app that's creating the tx; so they are a bit different from the other "safety" features of clarity (Example: asserts, try, https://book.clarity-lang.org/ch06-00-control-flow.html)

#### How to fix the BigInt support when using Stacks.js?

BigInt support is available in most modern browsers, but some bundlers try to optimize them incorrectly. If you are targeting browsers that are too outdated, building an application with Stacks.js dependencies might fail.
To solve this set your project `browserslist` to the following [package.json](https://github.com/hirosystems/stacks.js-starters/blob/efb93261b59494f4eb34a7cb5db5d82a84bd3b7c/templates/template-react/package.json#L34-L40).
