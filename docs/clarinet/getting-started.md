---
# The default id is the same as the one being defined below. so not needed
title: Get started with Clarinet
---

# Getting started with Clarinet

Before creating your project, make sure that you have installed and built clarinet by referring to [how-to install and build Clarinet](how-to-guides/how-to-install-clarinet.md).

Now that you have installed and built Clarinet, you can create a new project and then populate the project with smart contracts.

Clarinet also provides tools for interacting with your contracts in a Read, Evaluate, Print, Loop (REPL) console, and perform automated testing of contracts.

## Setup shell completions

Clarinet already has many different commands built in, therefore, you may find it useful to enable tab-completion in your shell. 
You can use `clarinet` to generate the shell completion scripts for many common shells using the command shown below.

```sh
clarinet completions (bash|elvish|fish|powershell|zsh)
```

After generating the file, please refer to the documentation for your shell to determine where this 
file should be moved to, and what other steps may be necessary to enable tab-completion for `clarinet`.
