---
title: Roadmap
---

We're working hard on `v7` of Stacks.js. This version will bring a lot of improvements, new features, but also some breaking changes. Explore what we're working on below.

:::note Try it out now
Want to use these latest `next` features? Install the canary version of the packages, e.g.

```
npm install @stacks/transactions@next
```

:::

<br/>

> **Have an idea?** Please let us know on [Discord #stacks-js](https://stacks.chat) or open an issue on [Github](https://github.com/hirosystems/stacks.js/issues/new/choose).

### Breaking changes

- **Getting rid of the network class** <input type="checkbox" checked /><br/> Instead, Stacks networks are now static objects, which are easier to handle. Also, the fetching logic is separated from the network object.
- **Changing internal Clarity representation** <input type="checkbox" checked /><br/> Clarity values in JS are hard to inspect. This will now be easier using easy to construct and debug objects.
- **Changing internal Post Conditions representation** <input type="checkbox" checked /><br/> Post conditions are now easier to inspect as well.
- **Defaulting to hex** <input type="checkbox" checked /><br/> In a lot of places Stacks.js defaults to bytes/Uint8Arrays. This is now updated to default to hex strings, which should be enough for most users. For advanced users, the bytes are still available as new methods.
- **Simplifying addressess & tokens** <input type="checkbox" /><br/> Addresses and tokens can be confusing. We would prefer to always have a single string representation for addresses and tokens.
- **Removing Triplesec** <input type="checkbox" /><br/> Triplesec has been a legacy mnemonic encryption options for a while. We will remove it to get rid of a dependency on a library that is no longer actively maintained.
- **Remove legacy Blockstack authentication** <input type="checkbox" /><br/> The Blockstack authentication is no longer maintained and will be removed from Stacks.js (mainly CLI).

#### **Deprecations**

- **Remove wallet-sdk "restoring" and "config" features** <input type="checkbox" /><br/> These concepts have lead to confusion and have been avoided by wallets. Wallets will not store additional information on Gaia and will not "restore"/detect which accounts have previously been used.

### New Features

- **Adding a maintained `StacksApiClient`** <input type="checkbox" checked /><br/> So far, we only had auto-generated wrappers for the API. Now we will provide a maintained client that is easier to use with post-processing of information (e.g. clarity values) to make them easier to use.
