---
id: clarinet
title: Contribute to Clarinet
---

## Contributing to Clarinet

We welcome contributions to Clarinet! The following sections provide information on how to contribute.

### Prerequisites

- rust (>=1.52.0)
- cargo (>=1.52.0)
- node (>=v14.16.0) - Used for git commit hook
- npm (>=7.18.0) - Used for git commit hook

### Guide

This repo follows the [Conventional Commit](https://www.conventionalcommits.org/en/v1.0.0/#summary) spec 
when writing commit messages.

It is important any pull requests submitted have commit messages which follow this standard.

To start contributing to Clarinet:

1. Fork this repo and clone the fork locally.
2. Create a new branch
   ```bash
   git checkout -b <my-branch>
   ```
3. Run `npm i` in the local repo to install and initialize `husky` and `commitlint`.

   ```bash
   npm i
   ```

4. These tools will be used in a git commit hook to lint and validate your commit message. 
5. If the message is invalid, `commitlint` will alert you to try again and fix it.

Bad message:

```bash
$ git commit -m "bad message"
$ ⧗   input: bad message
$ ✖   subject may not be empty [subject-empty]
$ ✖   type may not be empty [type-empty]
$
$ ✖   found 2 problems, 0 warnings
$ ⓘ   Get help: https://github.com/conventional-changelog/commitlint/#what-is-commitlint
$
$ husky - commit-msg hook exited with code 1 (error)
```

Good message:

```bash
$ git commit -m "fix: added missing dependency"
$ [my-branch 4c028af] fix: added missing dependency
$ 1 file changed, 50 insertions(+)
```

1. After making your changes, ensure the following:
   1. `cargo build` runs successfully
   1. `cargo test` runs successfully
   1. You've formatted your code with `cargo fmt --all --`
   1. All functional tests in the `examples` directory pass.
      ```bash
      for testdir in $(ls examples); do
          pushd examples/${testdir}
              ../../target/debug/clarinet test .
          popd
      done
      ```
1. Submit a pull request against the `develop` branch for review.
