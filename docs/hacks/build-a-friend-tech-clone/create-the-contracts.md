---
title: Create the contracts
---

# Exploring Friend.tech's Key-Driven Clarity Contract

## Introduction

The Friend.tech contract is designed to manage digital "Keys," representing ownership in a social network. Let's break down the key functions and their roles.

### Setting the Stage: The Contract Setup

The contract begins by defining the owner and setting up variables for fee management. These are essential for maintaining the contract's economics and governance.

#### Contract Owner and Fee Variables

```clarity
(define-constant contractOwner tx-sender)
(define-data-var protocolFeeDestination principal tx-sender)
(define-data-var protocolFeePercent uint u0)
(define-data-var subjectFeePercent uint u0)
```

Here, contractOwner is set to the transaction sender, establishing who controls the contract. The fee variables (protocolFeeDestination, protocolFeePercent, subjectFeePercent) determine where fees are sent and their percentages.

### Creating and Managing Ownership

Creating and Buying Keys:

```clarity
(define-public (buy-keys (subject principal) (amount uint))
    (let (
        (supply (default-to u0 (map-get? keysSupply { subject: subject })))
        (price (get-price supply amount))
        (protocol-fee (/ (* price (var-get protocolFeePercent)) u1000000))
        (subject-fee (/ (* price (var-get subjectFeePercent)) u1000000))
        (total-price (+ price protocol-fee subject-fee))
    )
    (if (or (> supply u0) (is-eq tx-sender subject))
        (begin
            (match (stx-transfer? total-price tx-sender (as-contract tx-sender))
                success
                (begin
                    (map-set keysBalance { subject: subject, holder: tx-sender }
                        (+ (default-to u0 (map-get? keysBalance { subject: subject, holder: tx-sender })) amount))
                    (map-set keysSupply { subject: subject } (+ supply amount))
                    (ok true))
                error
                (err u2))
        )
        (err u1))))
```

This function allows influencers (or subjects) to create their first keys, initiating their presence in the contract. The key price is calculated based on supply and demand, and the transaction only succeeds if the subject is creating the initial keys or if there are already keys in circulation.

Selling Keys:

```clarity
(define-public (sell-keys (subject principal) (amount uint))
    (let (
        (balance (default-to u0 (map-get? keysBalance { subject: subject, holder: tx-sender })))
        (supply (default-to u0 (map-get? keysSupply { subject: subject })))
        (price (get-price supply amount))
        (protocol-fee (/ (* price (var-get protocolFeePercent)) u1000000))
        (subject-fee (/ (* price (var-get subjectFeePercent)) u1000000))
        (total-price (- price protocol-fee subject-fee))
        (recipient tx-sender)
    )
    (if (and (>= balance amount) (or (> supply u0) (is-eq tx-sender subject)))
        (begin
            (match (as-contract (stx-transfer? total-price tx-sender recipient))
                success
                (begin
                    (map-set keysBalance { subject: subject, holder: tx-sender } (- balance amount))
                    (map-set keysSupply { subject: subject } (- supply amount))
                    (ok true))
                error
                (err u2))
        )
        (err u1))))
```

Here, selling keys is made possible for influencers. The function checks if the seller owns enough keys and if they are authorized to sell, ensuring a secure and fair transaction process.

### Calculating Key Prices

```clarity
(define-read-only (get-price (supply uint) (amount uint))
    (let (
        (base-price u10)
        (price-change-factor u100)
        (adjusted-supply (+ supply amount))
    )
    (+ base-price (* amount (/ (* adjusted-supply adjusted-supply) price-change-factor)))))

```

The get-price function is central to the contract. It calculates the price of keys using a formula that accounts for the current supply and the amount being bought or sold. This dynamic pricing ensures that the value of keys reflects their market demand.

## Challenges

- **Buy Keys**: Implement a feature that allows users to buy keys. This will involve calling a smart contract function that handles the purchase.
- **Sell Keys**: Implement a feature that allows users to sell keys. This will involve calling a smart contract function that handles the sale.
- **Access Control**: Implement a feature that restricts access to certain chatrooms based on whether the user is a key holder. This will involve checking the isKeyHolder state before rendering the chatroom.
- **Create Chatrooms**: Implement a feature that allows users to create new chatrooms. This might involve deploying a new smart contract for each chatroom.
