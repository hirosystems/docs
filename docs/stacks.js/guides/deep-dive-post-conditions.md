---
toc_max_heading_level: 2
---

# Deep Dive Post-Conditions

In Stacks, transactions can have "post-conditions".
These are an additional security to ensure the transaction was executed as expected, without having the user needing to know the code of a smart contract.

Post-conditions can be used on contract calls and FT/NFT transfers.
Adding post-conditions to a transaction can ensure that:

- STX tokens were transferred from an address
- FTs/NFTs we transferred from an address

### Caveats

Post-conditions aren't perfect!
They can't say anything about the end-state after a transaction.
So, they can't guarantee the receival of FTs/NFTs, since they only check for sending.

## Post-Condition Modes

**All given post-conditions will always be checked.**
However, in addition to the post-conditions itself, we can also specify a "mode" for the transaction to verify other asset transfers.
The mode can be either `Allow` or `Deny`.

- `Allow` means that the transaction can transfer any asset (assuming no conflicting post-conditions).
- `Deny` means the transaction will fail if any asset transfers (not specified in the post-conditions) are attempted.

Think of the mode as "allow/deny transfer of unspecified assets".

With Stacks.js we can set the mode via an exported enums from `@stacks/transactions`.

```ts
import { PostConditionMode } from '@stacks/transactions';

const tx = await makeContractCall({
  // ...
  postConditionMode: PostConditionMode.Allow,
  // OR
  postConditionMode: PostConditionMode.Deny,
  // ...
});
```

## Constructing Post-Conditions

The easiest way to construct a post-condition in Stacks.js is to use the `Pc` helpers.
This is a builder inspired by BDD (Behavior Driven Development).

Start with the `Pc.address` initializer to specify the address of the principal that will be verified in the post-condition.
Then auto-complete the rest of the post-condition.

### Methods

Builder initializer

- `Pc.principal(address: string)` to initialize the principal that will be verified in the post-condition

STX/FT transfer methods

- `.willSendEq(amount: number)` to specify the **exact** amount to be sent
- `.willSendGte(amount: number)` to specify the **greater than or equal** amount to be sent
- `.willSendGt(amount: number)` to specify the **greater than** amount to be sent
- `.willSendLte(amount: number)` to specify the **less than or equal** amount to be sent
- `.willSendLt(amount: number)` to specify the **less than** amount to be sent

* `.ustx()` to specify uSTX as the FT asset _(ends the builder)_
* `.ft(contract: string, tokenName: string)` to specify a specific FT asset _(ends the builder)_

NFT transfer methods

- `.willSendAsset()` to specify an asset **should be sent**
- `.willNotSendAsset()` to specify an asset **should not be sent**

* `.nft(asset: string, assetId: ClarityValue)` to specify a specific NFT asset _(ends the builder)_

#### Legacy methods/enums

The builder methods construct the same representation as the legacy methods and can be used interchangeably.

- [`createSTXPostCondition`](https://stacks.js.org/functions/_stacks_transactions.createSTXPostCondition) Builder method
- [`createFungiblePostCondition`](https://stacks.js.org/functions/_stacks_transactions.createFungiblePostCondition) Builder method
- [`createNonFungiblePostCondition`](https://stacks.js.org/functions/_stacks_transactions.createNonFungiblePostCondition) Builder method
- [`FungibleConditionCode`](https://stacks.js.org/enums/_stacks_transactions.FungibleConditionCode) Enum
- [`NonFungibleConditionCode`](https://stacks.js.org/enums/_stacks_transactions.NonFungibleConditionCode) Enum

### Examples

#### Amount uSTX Sent

With Stacks.js, we can construct a post-condition for a certain amount of uSTX to be sent.

```ts
import { Pc } from '@stacks/transactions';

const postCondition = Pc.principal('STB44HYPYAT2BB2QE513NSP81HTMYWBJP02HPGK6')
  .willSendEq(1000)
  .ustx();

// Equivalent to:
// createSTXPostCondition(
//   "STB44HYPYAT2BB2QE513NSP81HTMYWBJP02HPGK6",
//   FungibleConditionCode.Equal,
//   1000
// );
```

#### Amount FT Sent

With Stacks.js, we can construct a post-condition for a certain amount of a specific FT to be sent.

```ts
import { Pc } from '@stacks/transactions';

const postCondition = Pc.principal('STB44HYPYAT2BB2QE513NSP81HTMYWBJP02HPGK6.token-ft')
  .willSendGte(500)
  .ft('STB44HYPYAT2BB2QE513NSP81HTMYWBJP02HPGK6.token-ft', 'token');

// Equivalent to:
// createFungiblePostCondition(
//   "STB44HYPYAT2BB2QE513NSP81HTMYWBJP02HPGK6.token-ft",
//   FungibleConditionCode.GreaterEqual,
//   500,
//   "STB44HYPYAT2BB2QE513NSP81HTMYWBJP02HPGK6.token-ft::token"
// );
```

#### Amount NFT Sent

With Stacks.js, we can construct a post-condition for sending / not-sending a specific NFT instance.

```ts
import { Pc } from '@stacks/transactions';

const postCondition = Pc.principal('STB44HYPYAT2BB2QE513NSP81HTMYWBJP02HPGK6')
  .willNotSendAsset()
  .nft('STB44HYPYAT2BB2QE513NSP81HTMYWBJP02HPGK6.token-nft::token', Cl.uint(12));

// Equivalent to:
// createNonFungiblePostCondition(
//   "STB44HYPYAT2BB2QE513NSP81HTMYWBJP02HPGK6",
//   NonFungibleConditionCode.DoesNotSend,
//   "STB44HYPYAT2BB2QE513NSP81HTMYWBJP02HPGK6.token-nft::token",
//   Cl.uint(12)
// );
```
