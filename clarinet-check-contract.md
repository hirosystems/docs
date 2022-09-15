---
id: clarinet
title: Check a Contract
---

# Check your contracts

Clarinet provides syntax and semantics checkers for Clarity. You can vaerify the Clarity code in your project is valid with the command:

```bash
$ clarinet check
```

This command uses the `Clarinet.toml` file to locate and analyze all of the contracts in the project.
If the Clarity code is valid, the command will indicate success:

```
✔ 2 contracts checked
```

The command may also report warnings that indicate that the code is valid, but there is something that you should pay attention to.
For example, the check-checker analysis described below will generate warnings. If there are errors in the code,
the output of the command will indicate the kind and location of the errors.

You can also perform syntax-check on a single file by using the following command.

```bash
$ clarinet check <path/to/file.clar>
```

If there are no syntax errors, the output of the command will be a success message.

```
✔ Syntax of contract successfully checked
```

Any syntactical errors in the Clarity code will be reported, but type-checking and other semantic checks are not performed.
This is because Clarinet is only looking at this one contract, and does not have the full context to perform a complete check.
