---
id: clarinet
title: Setting up a local development environment
---

[Clarinet][] is a local Clarity runtime packaged as a command-line application. It's designed to facilitate rapid smart contract development, testing, and deployment. 

Clarinet consists of two components:

- Clarity REPL
- Testing harness.

When these components are used together, they allow you to rapidly develop and test a Clarity smart contract, without the need to deploy the contract
to a local mocknet or testnet.

When developing a new smart contract using local Clarity REPL, you can exercise a contract without the need to wait for block times in a live blockchain.
Clarinet allows you to instantly initialize wallets and populate them with tokens, which helps to interactively or programmatically
test the behavior of the smart contract. Blocks are mined instantly, so you can control the number of blocks that are mined between testing transactions.

The Clarinet tool is used for developing smart contracts using a larger development strategy that involves:

- Building and testing the contract locally.
- Deploying the final draft contract to a testnet environment.
- Testing on a live blockchain.
- Deploying the final contract to the mainnet.

When developing smart contracts, you can also use the [Clarity Visual Studio Code plugin][].

## Installing Clarinet

Clarinet is available in the Homebrew and Winget package managers. It is recommended to install the Clarinet tool from package manager.

### Installing from Homebrew (MacOS and Linux)

Install Clarinet from Homebrew with the command:

```sh
brew install clarinet
```

### Installing from winget (Windows)

With the winget package manager installed, use the following command:

```sh
winget install clarinet
```

### Installing from a binary release

You can download a release from the [Clarinet repository](https://github.com/hirosystems/clarinet/releases/latest).

#### Windows

Download the Windows installer, _clarinet-windows-x64.msi_. Once downloaded, run the installer, and it will install the clarinet binary and add it to your Path, allowing it to be easily used from the shell, and discovered by VS Code. If you have any shells open already, you will need to restart them to get the updated Path, allowing you to run `clarinet`.

#### MacOS / Linux
Unzip the binary, then copy it to a location that is already in your path, such as `/usr/local/bin`.

```sh
unzip clarinet-linux-x64.zip -d .
chmod +x ./clarinet
mv ./clarinet /usr/local/bin
```

If you are using MacOS, you may get security warnings when trying to run the precompiled binary. You can resolve the
security warning with the command:

```sh
xattr -d com.apple.quarantine /path/to/downloaded/clarinet
```

### Installing from source

Follow the [procedure](https://github.com/hirosystems/clarinet#install-from-source-using-cargo) outlined in the Clarinet
repository to install from source.

## Developing a Clarity smart contract

Once you have installed Clarinet, you can begin a new Clarinet project with the command:

```sh
clarinet new my-project && cd my-project
```

This command creates a new directory and populates it with boilerplate configuration and testing files. The `toml` files
located in the `settings` directory control the Clarinet environment. For example, the `Devnet.toml` file contains
definitions for wallets in the local REPL environment, and their starting balances (in STX).

```toml
...
[accounts.deployer]
mnemonic = "fetch outside black test wash cover just actual execute nice door want airport betray quantum stamp fish act pen trust portion fatigue scissors vague"
balance = 1_000_000

[accounts.wallet_1]
mnemonic = "spoil sock coyote include verify comic jacket gain beauty tank flush victory illness edge reveal shallow plug hobby usual juice harsh pact wreck eight"
balance = 1_000_000

[accounts.wallet_2]
mnemonic = "arrange scale orient half ugly kid bike twin magnet joke hurt fiber ethics super receive version wreck media fluid much abstract reward street alter"
balance = 1_000_000
...
```

You can create a new contract in the project with the command:

```sh
clarinet contract new my-contract
```

This command creates a new `my-contract.clar` file in the `contracts` directory, and a `my-contract_test.ts` in the
`tests` directory. Additionally, it adds the contract to the `Clarinet.toml` configuration file.

```toml
[contracts.my-contract]
path = "contracts/my-contract.clar"
```

At this point, you can begin editing your smart contract in the `contracts` directory. At any point while you are
developing, you can use the command `clarinet check` to check the syntax of your smart contract.

For a more in-depth overview of developing with Clarinet, review this comprehensive walkthrough video.

<br /><iframe width="560" height="315" src="https://www.youtube.com/embed/zERDftjl6k8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Testing with Clarinet

Clarinet provides several powerful methods to test and interact with your smart contracts. As mentioned in the previous
section, you can always check your Clarity syntax using the `clarinet check` command. This validates any smart contracts
you are currently developing in the active project.

There are two tools in Clarinet you can use to test smart contracts: the [console][], an interactive Clarity REPL, and
the [test harness][], a testing framework written in Typescript.

### Testing with the console

The Clarinet console is an interactive Clarity REPL that runs in-memory. Any contracts configured in the current project
are automatically loaded into memory. Additionally, wallets defined in the `settings/Devnet.toml` file are
initialized with STX tokens for testing purposes. When the console runs, it provides a summary of the deployed
contracts, their public functions, as well as wallet addresses and balances.

```
clarity-repl v0.11.0
Enter "::help" for usage hints.
Connected to a transient in-memory database.
Initialized contracts
+-------------------------------------------------------+-------------------------+
| Contract identifier                                   | Public functions        |
+-------------------------------------------------------+-------------------------+
| ST1HTBVD3JG9C05J7HBJTHGR0GGW7KXW28M5JS8QE.my-contract | (echo-number (val int)) |
|                                                       | (say-hi)                |
+-------------------------------------------------------+-------------------------+

Initialized balances
+------------------------------------------------------+---------+
| Address                                              | STX     |
+------------------------------------------------------+---------+
| ST1HTBVD3JG9C05J7HBJTHGR0GGW7KXW28M5JS8QE (deployer) | 1000000 |
+------------------------------------------------------+---------+
| ST1J4G6RR643BCG8G8SR6M2D9Z9KXT2NJDRK3FBTK (wallet_1) | 1000000 |
+------------------------------------------------------+---------+
...
```

You can use the `::help` command for valid console commands.

```
>> ::help
::help                            Display help
::list_functions                  Display all the native functions available in Clarity
::describe_function <function>    Display documentation for a given native function fn-name
::mint_stx <principal> <amount>   Mint STX balance for a given principal
::set_tx_sender <principal>       Set tx-sender variable to principal
::get_assets_maps                 Get assets maps for active accounts
::get_costs <expr>                Display the cost analysis
::get_contracts                   Get contracts
::get_block_height                Get current block height
::advance_chain_tip <count>       Simulate mining of <count> blocks
```

The console commands control the state of the REPL chain, and let you get information about it and advance the chain
tip. Additionally, you can enter Clarity commands into the console and observe the result of the command. The
`::list_functions` console command prints a cheat sheet of Clarity commands. For example, in the example contract,
you could use the REPL to call the `echo-number` function in the contract with the following command:

```
>> (contract-call? .my-contract echo-number 42)
(ok 42)
```

Note that by default commands are always executed as the `deployer` address, which means you can use the shorthand
`.my-contract` without specifying a full address to the contract. If you changed the transaction address with the
`::set_tx_sender` command, you would need to provide the full address to the contract in the contract call
(`ST1HTBVD3JG9C05J7HBJTHGR0GGW7KXW28M5JS8QE.my-contract`).

You can refer to the [Clarity language reference][] for a complete overview of all Clarity functions.

### Testing with the test harness

The test harness is a Deno testing library that can simulate the blockchain, exercise functions of the contract, and
make testing assertions about the state of the contract or chain.

You can run any tests configured in the `tests` directory with the command:

```sh
clarinet test
```

When you create a new contract, a test suite is automatically created for it. You can populate the test suite with
unit tests as you develop the contract.

An example unit test for the `echo-number` function is provided below:

```ts
...
Clarinet.test({
  name: 'the echo-number function returns the input value ok',
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const testNum = '42';
    let deployerWallet = accounts.get('deployer')!;
    let block = chain.mineBlock([
      Tx.contractCall(
        `${deployerWallet.address}.my-contract`,
        'echo-number',
        [testNum],
        deployerWallet.address,
      ),
    ]);
    assertEquals(block.receipts.length, 1); // assert that the block received a single tx
    assertEquals(block.receipts[0].result, `(ok ${testNum})`); // assert that the result of the tx was ok and the input number
    assertEquals(block.height, 2); // assert that only a single block was mined
  },
});
```

For more information on assertions, review [asserts][] in the Deno standard library. For more information on the
available Clarity calls in Deno, review the [Deno Clarinet library][].

## Additional reading

- [Clarinet README](https://github.com/hirosystems/clarinet#clarinet)

[clarinet]: https://github.com/hirosystems/clarinet
[console]: #testing-with-the-console
[test harness]: #testing-with-the-test-harness
[clarity language reference]: https://docs.stacks.co/references/language-functions
[asserts]: https://deno.land/std@0.90.0/testing/asserts.ts
[deno clarinet library]: https://github.com/hirosystems/clarinet/blob/develop/components/clarinet-deno/index.ts
[clarity visual studio code plugin]: https://marketplace.visualstudio.com/items?itemName=HiroSystems.clarity-lsp
