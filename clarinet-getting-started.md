---
id: clarinet
title: Getting Started With Clarinet
---

# Getting started with Clarinet

Now that you have installed and built Clarinet, you will want to begin by creating a new project and then populating the project with smart contracts. 

Clarinet also provides tools for interacting with your contracts in a REPL, and performing automated testing of contracts.

## Setup shell completions

Clarinet already has many different commands built in, therefore, you may find it useful to enable tab-completion in your shell. 
You can use `clarinet` to generate the shell completion scripts for many common shells using the command below.

```sh
clarinet completions (bash|elvish|fish|powershell|zsh)
```

After generating the file, please refer to the documentation for your shell to determine where this 
file should be moved, and what other steps may be necessary to enable tab-completion for `clarinet`.
