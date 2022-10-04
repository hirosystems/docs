---
title: Developer Resources
---

# Contributing to Clarinet

We welcome contributions to Clarinet! The following sections provide information on how to contribute to our product.

## Prerequisites

- rust (>=1.52.0)
- cargo (>=1.52.0)
- node (>=v14.16.0) - Used for git commit hook
- npm (>=7.18.0) - Used for git commit hook

### Guide

The [Clarinet repository](https://github.com/hirosystems/clarinet)  follows the [Conventional Commit](https://www.conventionalcommits.org/en/v1.0.0/#summary) specification when writing commit messages.

**Note** It is important any pull requests submitted have commit messages that follow this standard.

To start contributing to Clarinet:

1. Fork the [repository](https://github.com/hirosystems/clarinet) and clone the fork locally.
2. Create a new branch
   ```bash
   git checkout -b <my-branch>
   ```
3. Run `npm i` in the local repository to install and initialize `husky` and `commitlint`.

   ```bash
   npm i
   ```

4. These tools will be used in a git commit hook to lint and validate your commit message. 
5. If the message is invalid, `commitlint` will alert you to try again and fix it.

Here is an example of a "good" commit message.

```bash
$ git commit -m "fix: added missing dependency"
$ [my-branch 4c028af] fix: added missing dependency
$ 1 file changed, 50 insertions(+)
```

1. After making your changes, ensure the following:
   1. `cargo build` runs successfully
   1. `cargo test` runs successfully
   1. You have formatted your code with `cargo fmt --all --`
   1. All functional tests in the `examples` directory pass.
      ```bash
      for testdir in $(ls examples); do
          pushd examples/${testdir}
              ../../target/debug/clarinet test .
          popd
      done
      ```
1. Submit a pull request against the `develop` branch for review.


For more information, refer to the following links.

- [Meet four new features in Clarinet](https://www.hiro.so/blog/meet-4-new-features-in-clarinet)
- [Clarinet Roadmap](https://www.hiro.so/blog/clarinet-roadmap-looking-to-the-future)
- [New safety checks in Clarinet](https://www.hiro.so/blog/new-safety-checks-in-clarinet)
- [Taking clarity development to the next level](https://www.hiro.so/blog/clarinet-taking-clarity-development-next-level)
