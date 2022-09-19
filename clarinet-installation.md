---
id: clarinet
title: Clarinet Installation
---

# Installation

Hiro has developed Clarinet to be environment-agnostic, meaning you may install Clarinet in whatever environment you prefer.
You may choose to install Clarinet in any of the following environments:

- macOS
- Windows
- pre-built binary
- source from Cargo

**Note** There is no difference in Clarinet functionality based on the environment you select.

## Install on macOS (Homebrew)

To install Clarinet using macOs, you must first have Homebrew installed on your system. If you do not already have Homebrew already installed, 
please refer to the [Homebrew](https://brew.sh/)documentation for detailed information on how to install Homebrew.

Once you have Homebrew installed, run the following command shown below in your terminal.

```bash
brew install clarinet
```

## Install on Windows

The easiest way to install Clarinet on Windows is to use the MSI installer, 
which you can download from the [Hiro releases page](https://github.com/hirosystems/clarinet/releases).

You may also install Clarinet on Winget. This is the package manager that Microsoft created, which includes in the latest Windows updates.
Simply enter the command below.

```powershell
winget install clarinet
```

## Install from a pre-built binary

If you would like to install Clarinet from pre-built binaries, you must first download the latest release from the 
[Hiro releases page](https://github.com/hirosystems/clarinet/releases). When you have downloaded the latest release,
Uuzip the binary and then copy it to a location that is already in your path, such as `/usr/local/bin` using the command shwon below.

```sh
# note: you can change the v0.27.0 with version that are available in the releases page.
wget -nv https://github.com/hirosystems/clarinet/releases/download/v0.27.0/clarinet-linux-x64-glibc.tar.gz -O clarinet-linux-x64.tar.gz
tar -xf clarinet-linux-x64.tar.gz
chmod +x ./clarinet
mv ./clarinet /usr/local/bin
```

**Note** If you are using macOS, you may receive security errors when trying to run the pre-compiled binary. 
You can resolve the security warning by using the command below.

```sh
xattr -d com.apple.quarantine /path/to/downloaded/clarinet/binary
```

## Install from source using Cargo

You may also install Clarinet using Cargo. If you choose this option, please be aware that you must first intall Rust.
For more information on installing Rust, please see the [Install Rust](https://www.rust-lang.org/tools/install) page for access 
to `cargo`, the Rust package manager.

If you are using Debian or Ubuntu-based distributions, you must also install the following package to build Clarinet:
```bash
sudo apt install build-essential pkg-config libssl-dev
```
### Build Clarinet

Once you have installed Clarinet using Cargo, you can build Clarinet from source using Cargo with the following commands:

```bash
git clone https://github.com/hirosystems/clarinet.git --recursive
cd clarinet
cargo clarinet-install
```

By default, you will be in our development branch, `develop`, with code that has not yet been released.

- If you plan to submit any changes to the code, then this is the right branch for you. 
- If you would prefer to have the latest stable version, then switch to the main branch by entering the command below.

```bash
git checkout main
```

If you have previously checked out the source, ensure you have the latest code (including submodules) before building using this command:

```
git pull
git submodule update --recursive
```
