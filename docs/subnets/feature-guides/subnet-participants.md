---
title: Subnet Participants
---

This guide outlines the potential participants required to run a subnet. The participants are classified into two categories:

- The **primary participants** need to agree on trust parameters and incentives to launch a subnet
- The **secondary participants** listed here are meant to illustrate different parties involved when using/interacting with a subnet on Stacks

:::note

_Hiro does not intend to participate in running a subnet on Stacks mainnet._
:::

## Primary Participants

The following are the required entities to run a subnet.

### Miners

- The initial version of subnets uses a Byzantine Fault Tolerance (BFT) consensus mechanism, and the miners are a Federated pool and fully trusted.
- Miners have arbitrary control over STX deposited on the subnets. A minimum of three miners will be required for the subnet’s BFT consensus to materialize and support a 2n/3 majority
- Miners are motivated by subnet transaction fees. The supporting applications and the use case will set the subnet fees
- Miners will require specific hardware/software to validate and process subnet transactions. Miners may include the supporting application, use case, and facilitator or none of these

To understand the resource recommendation for miner, refer to the [miner resource recommendation document](https://github.com/hirosystems/stacks-subnets/blob/develop/docs/miner-resource-recommendation.md)

**Key Activities**

- Miners are responsible for approving and signing transactions and submitting them to the Stacks chain for finality
- Miners must agree to subnet parameters and incentives. Example: transaction fees, duration, performance requirements

### Supporting Application (Example: NFT Marketplace)

This application supports subnets and owns the user experience. For an NFT use case, the supporting application might be an NFT marketplace. For a DeFi use case, the supporting application might be an exchange, and it may be independent of miners or elect to participate as a miner.

**Key Activities**

- Own user experience for people who want to use a subnet as an application, specifically support connecting a Stacks Wallet to a subnet and minting and trading on a subnet
- Must agree to subnet parameters and incentives—for example, transaction fees, duration, and performance requirements

### Supporting UseCase (Example: NFT Collection Mint)

- The supporting use case refers to the event that drives people to use a subnet, for example, a mint for a popular NFT collection
- The supporting use case includes any other parties involved with the use case. In the example above, it could be the artist for a mint collection. The supporting application may be independent of miners

**Key Activities**

Must agree to subnet parameters and incentives—for example, transaction fees, duration, and performance requirements.

## Secondary Participants

These participants use a subnet and do not need to agree to the parameters and incentives of a subnet.

### Wallets

Users interact with applications using wallets, so subnet support is crucial.

**Key Activities**

- Own user experience for people who want to use a subnet via a wallet
- Deposit of STX from Stacks main chain to a subnet
- Connect to subnets for mints and transfers
- Support withdrawals of STX and NFTs from subnet to Stacks main chain
- Display subnet address balances

### End Users

- Users interact with subnets to experience faster throughput and lower latency for specific use cases (DeFi trades or purchasing or trading NFTs)
- Users interact primarily with wallets and supporting applications to complete the specific use case (NFT mint)
