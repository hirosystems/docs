[//]: # (THIS IS AN AUTOMATICALLY GENERATED FILE, DO NOT EDIT BY HAND)

### announce

**Group:** Peer Services

Broadcast a message on the blockchain for subscribers to read.  The `MESSAGE_HASH` argument must be the hash of a previously-announced zone file.  The `OWNER_KEY` used to sign the transaction must correspond to the Blockstack ID to which other users have already subscribed.  `OWNER_KEY` can be a single private key or a serialized multisig private key bundle.

If this command succeeds, it will print a transaction ID.  The rest of the Blockstack peer network will process it once the transaction reaches 7 confirmations.

Examples:
```console
    $ # Tip: You can obtain the owner key with the get_owner_keys command
    $ export OWNER_KEY="136ff26efa5db6f06b28f9c8c7a0216a1a52598045162abfe435d13036154a1b01"
    $ stx announce 737c631c7c5d911c6617993c21fba731363f1cfe "$OWNER_KEY"
    d51749aeec2803e91a2f8bdec8d3e413491fd816b4962372b214ab74acb0bba8

    $ export OWNER_KEY="2,136ff26efa5db6f06b28f9c8c7a0216a1a52598045162abfe435d13036154a1b01,1885cba486a42960499d1f137ef3a475725ceb11f45d74631f9928280196f67401,2418981c7f3a91d4467a65a518e14fafa30e07e6879c11fab7106ea72b49a7cb01"
    $ stx announce 737c631c7c5d911c6617993c21fba731363f1cfe "$OWNER_KEY"
    8136a1114098893b28a693e8d84451abf99ee37ef8766f4bc59808eed76968c9
```



| Name | Type | Value |
|-|-|-|
| `message_hash` | `string` | `zonefile_hash` |
| `owner_key` | `string` | `private_key` |

### authenticator

**Group:** Authentication

Run an authentication endpoint for the set of names owned by the given backup phrase.  Send applications the given Gaia hub URL on sign-in, so the application will use it to read/write user data.

You can supply your encrypted backup phrase instead of the raw backup phrase.  If so, then you will be prompted for your password before any authentication takes place.

Example:
```console
    $ export BACKUP_PHRASE="oak indicate inside poet please share dinner monitor glow hire source perfect"
    $ export APP_GAIA_HUB="https://1.2.3.4"
    $ export PROFILE_GAIA_HUB="https://hub.blockstack.org"
    $ stx authenticator "$APP_GAIA_HUB" "$BACKUP_PHRASE" "$PROFILE_GAIA_HUB" 8888
    Press Ctrl+C to exit
    Authentication server started on 8888
```


| Name | Type | Value |
|-|-|-|
| `app_gaia_hub` | `string` | `url` |
| `backup_phrase` | `string` | `12_words_or_ciphertext` |
| `profile_gaia_hub` | `string` | `url` |
| `port` | `string` | `portnum` |

### balance

**Group:** Account Management

Query the balance of an account.  Returns the balances of each kind of token that the account owns.  The balances will be in the *smallest possible units* of the token (i.e. satoshis for BTC, microStacks for Stacks, etc.).

Example:
```console
    $ stx balance 16pm276FpJYpm7Dv3GEaRqTVvGPTdceoY4
    {
      "BTC": "123456"
      "STACKS": "123456"
    }
    $ stx balance SPZY1V53Z4TVRHHW9Z7SFG8CZNRAG7BD8WJ6SXD0
    {
      "BTC": "123456"
      "STACKS": "123456"
    }```


| Name | Type | Value |
|-|-|-|
| `address` | `string` | `address` |

### can_stack

**Group:** Account Management

Check if specified account can stack a number of Stacks tokens for given number of cycles.

Example:
```console
    $ stx can_stack 10000000 20 16pm276FpJYpm7Dv3GEaRqTVvGPTdceoY4 SPZY1V53Z4TVRHHW9Z7SFG8CZNRAG7BD8WJ6SXD0
    {
      "eligible": true
    }
```


| Name | Type | Value |
|-|-|-|
| `amount` | `string` | `integer` |
| `cycles` | `string` | `integer` |
| `pox_address` | `string` | `address` |
| `stx_address` | `string` | `address` |

### call_contract_func

**Group:** Account Management

Call a function in a deployed Clarity smart contract.

If the command succeeds, it prints out a transaction ID.
Example:
```console
    $ export PAYMENT="bfeffdf57f29b0cc1fab9ea197bb1413da2561fe4b83e962c7f02fbbe2b1cd5401"
    $ stx call_contract_func SPBMRFRPPGCDE3F384WCJPK8PQJGZ8K9QKK7F59X contract_name      contract_function 1 0 "$PAYMENT"
     {
       txid: '0x2e33ad647a9cedacb718ce247967dc705bc0c878db899fdba5eae2437c6fa1e1',       transaction: 'https://explorer.hiro.so/txid/0x2e33ad647a9cedacb718ce247967dc705bc0c878db899fdba5eae2437c6fa1e1'     }
```



| Name | Type | Value |
|-|-|-|
| `contract_address` | `string` | `address` |
| `contract_name` | `string` | `string` |
| `function_name` | `string` | `string` |
| `fee` | `string` | `integer` |
| `nonce` | `string` | `integer` |
| `payment_key` | `string` | `private_key` |

### call_read_only_contract_func

**Group:** Account Management

Call a read-only function in a deployed Clarity smart contract.

If the command succeeds, it prints out a Clarity value.
Example:
```console
    $ stx call_read_only_contract_func SPBMRFRPPGCDE3F384WCJPK8PQJGZ8K9QKK7F59X contract_name     contract_function SPBMRFRPPGCDE3F384WCJPK8PQJGZ8K9QKK7F59X
     {
       txid: '0x2e33ad647a9cedacb718ce247967dc705bc0c878db899fdba5eae2437c6fa1e1',       transaction: 'https://explorer.hiro.so/txid/0x2e33ad647a9cedacb718ce247967dc705bc0c878db899fdba5eae2437c6fa1e1'     }
```



| Name | Type | Value |
|-|-|-|
| `contract_address` | `string` | `address` |
| `contract_name` | `string` | `string` |
| `function_name` | `string` | `string` |
| `sender_address` | `string` | `address` |

### decode_cv

**Group:** Utilities

Decode a serialized Clarity value.

Example:

```console
    $ stx decode_cv 0x050011deadbeef11ababffff11deadbeef11ababffff
    S08XXBDYXW8TQAZZZW8XXBDYXW8TQAZZZZ88551S
    $ stx decode_cv --format json SPA2MZWV9N67TBYVWTE0PSSKMJ2F6YXW7CBE6YPW
    {"type":"principal","value":"S08XXBDYXW8TQAZZZW8XXBDYXW8TQAZZZZ88551S"}
    $ echo 0x050011deadbeef11ababffff11deadbeef11ababffff | stx decode_cv -
    S08XXBDYXW8TQAZZZW8XXBDYXW8TQAZZZZ88551S
```


| Name | Type | Value |
|-|-|-|
| `clarity_value` | `string` | `string` |
| `format` | `string` | `format` |

### convert_address

**Group:** Account Management

Convert a Bitcoin address to a Stacks address and vice versa.

Example:

```console
    $ stx convert_address 12qdRgXxgNBNPnDeEChy3fYTbSHQ8nfZfD
    {
      "mainnet": {
        "STACKS": "SPA2MZWV9N67TBYVWTE0PSSKMJ2F6YXW7CBE6YPW",
        "BTC": "12qdRgXxgNBNPnDeEChy3fYTbSHQ8nfZfD"
      }
    }
    $ stx convert_address SPA2MZWV9N67TBYVWTE0PSSKMJ2F6YXW7CBE6YPW
    {
      "mainnet": {
        "STACKS": "SPA2MZWV9N67TBYVWTE0PSSKMJ2F6YXW7CBE6YPW",
        "BTC": "12qdRgXxgNBNPnDeEChy3fYTbSHQ8nfZfD"
      }
    }
    $ stx convert_address SPA2MZWV9N67TBYVWTE0PSSKMJ2F6YXW7CBE6YPW -t
    {
      "mainnet": {
        "STACKS": "SPA2MZWV9N67TBYVWTE0PSSKMJ2F6YXW7CBE6YPW",
        "BTC": "12qdRgXxgNBNPnDeEChy3fYTbSHQ8nfZfD"
      },
      "testnet": {
        "STACKS": "STA2MZWV9N67TBYVWTE0PSSKMJ2F6YXW7DX96QAM",
        "BTC": "mhMaijcwVPcdAthFwmgLsaknTRt72GqQYo"
      }
    }
    $ stx convert_address STA2MZWV9N67TBYVWTE0PSSKMJ2F6YXW7DX96QAM
    {
      "mainnet": {
        "STACKS": "SPA2MZWV9N67TBYVWTE0PSSKMJ2F6YXW7CBE6YPW",
        "BTC": "12qdRgXxgNBNPnDeEChy3fYTbSHQ8nfZfD"
      },
      "testnet": {
        "STACKS": "STA2MZWV9N67TBYVWTE0PSSKMJ2F6YXW7DX96QAM",
        "BTC": "mhMaijcwVPcdAthFwmgLsaknTRt72GqQYo"
      }
    }
```


| Name | Type | Value |
|-|-|-|
| `address` | `string` | `address` |

### decrypt_keychain

**Group:** Key Management

Decrypt an encrypted backup phrase with a password.  Decrypts to a 12-word backup phrase if done correctly.  The password will be prompted if not given.

Example:

```console
    $ # password is "asdf"
    $ stx decrypt_keychain "bfMDtOucUGcJXjZo6vkrZWgEzue9fzPsZ7A6Pl4LQuxLI1xsVF0VPgBkMsnSLCmYS5YHh7R3mNtMmX45Bq9sNGPfPsseQMR0fD9XaHi+tBg=
    Enter password:
    section amount spend resemble spray verify night immune tattoo best emotion parrot
```


| Name | Type | Value |
|-|-|-|
| `encrypted_backup_phrase` | `string` | `encrypted_backup_phrase` |
| `password` | `string` | `password` |

### deploy_contract

**Group:** Account Management

Deploys a Clarity smart contract on the network.

If the command succeeds, it prints out a transaction ID.
Example:
```console
    $ export PAYMENT="bfeffdf57f29b0cc1fab9ea197bb1413da2561fe4b83e962c7f02fbbe2b1cd5401"
    $ stx deploy_contract ./my_contract.clar my_contract 1 0 "$PAYMENT"
     {
       txid: '0x2e33ad647a9cedacb718ce247967dc705bc0c878db899fdba5eae2437c6fa1e1',       transaction: 'https://explorer.hiro.so/txid/0x2e33ad647a9cedacb718ce247967dc705bc0c878db899fdba5eae2437c6fa1e1'     }
```



| Name | Type | Value |
|-|-|-|
| `source_file` | `string` | `path` |
| `contract_name` | `string` | `string` |
| `fee` | `string` | `integer` |
| `nonce` | `string` | `integer` |
| `payment_key` | `string` | `private_key` |

### docs

**Group:** CLI

Dump the documentation for all commands as JSON to standard out.

| Name | Type | Value |
|-|-|-|
| `format` | `string` | `output_format` |

### encrypt_keychain

**Group:** Key Management

Encrypt a 12-word backup phrase, which can be decrypted later with the `decrypt_backup_phrase` command.  The password will be prompted if not given.

Example:

```console
     $ # password is "asdf"
     $ stx encrypt_keychain "section amount spend resemble spray verify night immune tattoo best emotion parrot"
     Enter password:
     Enter password again:
     M+DnBHYb1fgw4N3oZ+5uTEAua5bAWkgTW/SjmmBhGGbJtjOtqVV+RrLJEJOgT35hBon4WKdGWye2vTdgqDo7+HIobwJwkQtN2YF9g3zPsKk=```


| Name | Type | Value |
|-|-|-|
| `backup_phrase` | `string` | `backup_phrase` |
| `password` | `string` | `password` |

### faucet

**Group:** Key Management

Encrypt a 12-word backup phrase, which can be decrypted later with the `decrypt_backup_phrase` command.  The password will be prompted if not given.

Example:

```console
     $ # password is "asdf"
     $ blockstack-cli encrypt_keychain "section amount spend resemble spray verify night immune tattoo best emotion parrot"
     Enter password:
     Enter password again:
     M+DnBHYb1fgw4N3oZ+5uTEAua5bAWkgTW/SjmmBhGGbJtjOtqVV+RrLJEJOgT35hBon4WKdGWye2vTdgqDo7+HIobwJwkQtN2YF9g3zPsKk=```


| Name | Type | Value |
|-|-|-|
| `address` | `string` | `address` |

### gaia_dump_bucket

**Group:** Gaia

Download the contents of a Gaia hub bucket to a given directory.  The `GAIA_HUB` argument must correspond to the *write* endpoint of the Gaia hub -- that is, you should be able to fetch `$GAIA_HUB/hub_info`.  If `DUMP_DIR` does not exist, it will be created.

Example:

```console
    $ export BACKUP_PHRASE="section amount spend resemble spray verify night immune tattoo best emotion parrot
    $ stx gaia_dump_bucket hello.id.blockstack https://sample.app https://hub.blockstack.org "$BACKUP_PHRASE" ./backups
    Download 3 files...
    Download hello_world to ./backups/hello_world
    Download dir/format to ./backups/dir\x2fformat
    Download /.dotfile to ./backups/\x2f.dotfile
    3
```


| Name | Type | Value |
|-|-|-|
| `name_or_id_address` | `string` | `name_or_id_address` |
| `app_origin` | `string` | `url` |
| `gaia_hub` | `string` | `url` |
| `backup_phrase` | `string` | `12_words_or_ciphertext` |
| `dump_dir` | `string` | `path` |

### gaia_getfile

**Group:** Gaia

Get a file from another user's Gaia hub.  Prints the file data to stdout.  If you want to read an encrypted file, and/or verify a signed file, then you must pass an app private key, and pass 1 for `DECRYPT` and/or `VERIFY`.  If the file is encrypted, and you do not pass an app private key, then this command downloads the ciphertext.  If the file is signed, and you want to download its data and its signature, then you must run this command twice -- once to get the file contents at `FILENAME`, and once to get the signature (whose name will be `FILENAME`.sig).

Gaia is a key-value store, so it does not have any built-in notion of directories.  However, most underlying storage systems do -- directory separators in the name of a file in Gaia may be internally treated as first-class directories (it depends on the Gaia hub's driver).As such, repeated directory separators will be treated as a single directory separator by this command.  For example, the file name `a/b.txt`, `/a/b.txt`, and `///a////b.txt` will be treated as identical.

Example without encryption:

```console
    $ # Get an unencrypted, unsigned file
    $ stx gaia_getfile ryan.id http://public.ykliao.com statuses.json
    [{"id":0,"text":"Hello, Blockstack!","created_at":1515786983492}]

Example with encryption:

    $ # Get an encrypted file without decrypting
    $ stx gaia_getfile ryan.id https://app.graphitedocs.com documentscollection.json
        $ # Get an encrypted file, and decrypt it
    $ # Tip: You can obtain the app key with the get_app_keys command
    $ export APP_KEY="3ac770e8c3d88b1003bf4a0a148ceb920a6172bdade8e0325a1ed1480ab4fb19"
    $ stx gaia_getfile ryan.id https://app.graphitedocs.com documentscollection.json "$APP_KEY" 1 0
```


| Name | Type | Value |
|-|-|-|
| `blockstack_id` | `string` | `blockstack_id` |
| `app_origin` | `string` | `url` |
| `filename` | `string` | `filename` |
| `app_private_key` | `string` | `private_key` |
| `decrypt` | `string` | `boolean` |
| `verify` | `string` | `boolean` |

### gaia_putfile

**Group:** Gaia

Put a file into a given Gaia hub, authenticating with the given app private key.  Optionally encrypt and/or sign the data with the given app private key.  If the file is successfully stored, this command prints out the URLs at which it can be fetched.

Gaia is a key-value store, so it does not have any built-in notion of directories.  However, most underlying storage systems do -- directory separators in the name of a file in Gaia may be internally treated as first-class directories (it depends on the Gaia hub's driver).As such, repeated directory separators will be treated as a single directory separator by this command.  For example, the file name `a/b.txt`, `/a/b.txt`, and `///a////b.txt` will be treated as identical.

Example:

```console
    $ # Store 4 versions of a file: plaintext, encrypted, signed, and encrypted+signed
    $ # Tip: You can obtain the app key with the get_app_keys command.
    $ export APP_KEY="3ac770e8c3d88b1003bf4a0a148ceb920a6172bdade8e0325a1ed1480ab4fb19"
    $ stx gaia_putfile https://hub.blockstack.org "$APP_KEY" /path/to/file.txt file.txt
    {
       "urls": "https://gaia.blockstack.org/hub/19KAzYp4kSKozeAGMUsnuqkEGdgQQLEvwo/file.txt"
    }
    $ stx gaia_putfile https://hub.blockstack.org "$APP_KEY" /path/to/file.txt file-encrypted.txt 1
    {
       "urls": "https://gaia.blockstack.org/hub/19KAzYp4kSKozeAGMUsnuqkEGdgQQLEvwo/file-encrypted.txt"
    }
    $ stx gaia_putfile https://hub.blockstack.org "$APP_KEY" /path/to/file.txt file-signed.txt 0 1
    {
       "urls": "https://gaia.blockstack.org/hub/19KAzYp4kSKozeAGMUsnuqkEGdgQQLEvwo/file-signed.txt"
    }
    $ stx gaia_putfile https://hub.blockstack.org "$APP_KEY" /path/to/file.txt file-encrypted-signed.txt 1 1
    {
       "urls": "https://gaia.blockstack.org/hub/19KAzYp4kSKozeAGMUsnuqkEGdgQQLEvwo/file-encrypted-signed.txt"
    }
```


| Name | Type | Value |
|-|-|-|
| `gaia_hub` | `string` | `url` |
| `app_private_key` | `string` | `private_key` |
| `data_path` | `string` | `path` |
| `gaia_filename` | `string` | `filename` |
| `encrypt` | `string` | `boolean` |
| `sign` | `string` | `boolean` |

### gaia_deletefile

**Group:** Gaia

Delete a file in a Gaia hub, as well as its signature metadata (which is stored in a separate file).
Example:

```console
    $ # Tip: You can obtain the app key with the get_app_keys command.
    $ export APP_KEY="3ac770e8c3d88b1003bf4a0a148ceb920a6172bdade8e0325a1ed1480ab4fb19"
    $ stx gaia_deletefile https://hub.blockstack.org "$APP_KEY" file.txt false
    ok```


| Name | Type | Value |
|-|-|-|
| `gaia_hub` | `string` | `url` |
| `app_private_key` | `string` | `private_key` |
| `gaia_filename` | `string` | `filename` |
| `was_signed` | `string` | `boolean` |

### gaia_listfiles

**Group:** Gaia

List all the files in a Gaia hub bucket.  You must have the private key for the bucket in order to list its contents.  The command prints each file name on its own line, and when finished, it prints the number of files listed.

Example:

```console
    $ # Tip: You can obtain the app key with the get_app_keys command.
    $ export APP_KEY="3ac770e8c3d88b1003bf4a0a148ceb920a6172bdade8e0325a1ed1480ab4fb19"
    $ stx gaia_listfiles "https://hub.blockstack.org" "$APP_KEY"
    hello_world
    dir/format
    /.dotfile
    3
```


| Name | Type | Value |
|-|-|-|
| `gaia_hub` | `string` | `url` |
| `app_private_key` | `string` | `private_key` |

### gaia_restore_bucket

**Group:** Gaia

Upload the contents of a previously-dumped Gaia bucket to a new Gaia hub.  The `GAIA_HUB` argument must correspond to the *write* endpoint of the Gaia hub -- that is, you should be able to fetch `$GAIA_HUB/hub_info`.  `DUMP_DIR` must contain the file contents created by a previous successful run of the gaia_dump_bucket command, and both `NAME_OR_ID_ADDRESS` and `APP_ORIGIN` must be the same as they were when it was run.

Example:

```console
    $ export BACKUP_PHRASE="section amount spend resemble spray verify night immune tattoo best emotion parrot"
    $ stx gaia_restore_bucket hello.id.blockstack https://sample.app https://new.gaia.hub "$BACKUP_PHRASE" ./backups
    Uploaded ./backups/hello_world to https://new.gaia.hub/hub/1Lr8ggSgdmfcb4764woYutUfFqQMjEoKHc/hello_world
    Uploaded ./backups/dir\x2fformat to https://new.gaia.hub/hub/1Lr8ggSgdmfcb4764woYutUfFqQMjEoKHc/dir/format
    Uploaded ./backups/\x2f.dotfile to https://new.gaia.hub/hub/1Lr8ggSgdmfcb4764woYutUfFqQMjEoKHc//.dotfile
    3
```


| Name | Type | Value |
|-|-|-|
| `name_or_id_address` | `string` | `name_or_id_address` |
| `app_origin` | `string` | `url` |
| `gaia_hub` | `string` | `url` |
| `backup_phrase` | `string` | `12_words_or_ciphertext` |
| `dump_dir` | `string` | `path` |

### gaia_sethub

**Group:** Gaia

Set the Gaia hub for a particular application for a Blockstack ID.  If the command succeeds, the URLs to your updated profile will be printed and your profile will contain an entry in its "apps" key that links the given `APP_ORIGIN` to the given `APP_GAIA_HUB`.

NOTE: Both `OWNER_GAIA_HUB` and `APP_GAIA_HUB` must be the *write* endpoints of their respective Gaia hubs.

Your 12-word phrase (in either raw or encrypted form) is required to re-sign and store your profile and to generate an app-specific key and Gaia bucket.  If you give the encrypted backup phrase, you will be prompted for a password.

Example:

```console
    $ export BACKUP_PHRASE="soap fog wealth upon actual blossom neither timber phone exile monkey vocal"
    $ stx gaia_sethub hello_world.id https://hub.blockstack.org https://my.cool.app https://my.app.gaia.hub "$BACKUP_PHRASE"
    {
      "profileUrls": {
        "error": null,
        "dataUrls": [
          "https://gaia.blockstack.org/hub/1ArdkA2oLaKnbNbLccBaFhEV4pYju8hJ82/profile.json"
        ]
      }
    }
    
    $ # You can check the new apps entry with curl and jq as follows:
    $ curl -sL https://gaia.blockstack.org/hub/1ArdkA2oLaKnbNbLccBaFhEV4pYju8hJ82/profile.json | jq ".[0].decodedToken.payload.claim.apps"
    {
      "https://my.cool.app": "https://my.app.gaia.hub/hub/1EqzyQLJ15KG1WQmi5cf1HtmSeqS1Wb8tY/"
    }
```



| Name | Type | Value |
|-|-|-|
| `blockstack_id` | `string` | `blockstack_id` |
| `owner_gaia_hub` | `string` | `url` |
| `app_origin` | `string` | `url` |
| `app_gaia_hub` | `string` | `url` |
| `backup_phrase` | `string` | `12_words_or_ciphertext` |

### get_account_history

**Group:** Account Management

Query the history of account debits and credits over a given block range.  Returns the history one page at a time.  An empty result indicates that the page number has exceeded the number of historic operations in the given block range.

Example:

```console
    $ stx get_account_history SP2H7VMY13ESQDAD5808QEY1EMGESMHZWBJRTN2YA 0
    [
      {
        "address": "SP2H7VMY13ESQDAD5808QEY1EMGESMHZWBJRTN2YA",
        "block_id": 56789
        "credit_value": "100000000000",
        "debit_value": "0",
        "lock_transfer_block_id": 0,
        "txid": "0e5db84d94adff5b771262b9df015164703b39bb4a70bf499a1602b858a0a5a1",
        "type": "STACKS",
        "vtxindex": 0
      },
      {
        "address": "SP2H7VMY13ESQDAD5808QEY1EMGESMHZWBJRTN2YA",
        "block_id": 56790,
        "credit_value": "100000000000",
        "debit_value": "64000000000",
        "lock_transfer_block_id": 0,
        "txid": "5a0c67144626f7bd4514e4de3f3bbf251383ca13887444f326bac4bc8b8060ee",
        "type": "STACKS",
        "vtxindex": 1
      },
      {
        "address": "SP2H7VMY13ESQDAD5808QEY1EMGESMHZWBJRTN2YA",
        "block_id": 56791,
        "credit_value": "100000000000",
        "debit_value": "70400000000",
        "lock_transfer_block_id": 0,
        "txid": "e54c271d6a9feb4d1859d32bc99ffd713493282adef5b4fbf50bca9e33fc0ecc",
        "type": "STACKS",
        "vtxindex": 2
      },
      {
        "address": "SP2H7VMY13ESQDAD5808QEY1EMGESMHZWBJRTN2YA",
        "block_id": 56792,
        "credit_value": "100000000000",
        "debit_value": "76800000000",
        "lock_transfer_block_id": 0,
        "txid": "06e0d313261baefec1e59783e256ab487e17e0e776e2fdab0920cc624537e3c8",
        "type": "STACKS",
        "vtxindex": 3
      }
    ]
```



| Name | Type | Value |
|-|-|-|
| `address` | `string` | `address` |
| `page` | `string` | `integer` |

### get_account_at

**Group:** Account Management

Query the list of token debits and credits on a given address that occurred at a particular block height.  Does not include BTC debits and credits; only Stacks.

Example

```console
    $ stx -t get_account_at SP2NTAQFECYGSTE1W47P71FG21H8F00KZZWFGEVKQ 56789
    [
      {
        "debit_value": "0",
        "block_id": 56789
        "lock_transfer_block_id": 0,
        "txid": "291817c78a865c1f72938695218a48174265b2358e89b9448edc89ceefd66aa0",
        "address": "SP2NTAQFECYGSTE1W47P71FG21H8F00KZZWFGEVKQ",
        "credit_value": "1000000000000000000",
        "type": "STACKS",
        "vtxindex": 0
      }
    ]
```



| Name | Type | Value |
|-|-|-|
| `address` | `string` | `address` |
| `blocknumber` | `string` | `integer` |

### get_address

**Group:** Key Management

Get the address of a private key or multisig private key bundle.  Gives the BTC and STACKS addresses

Example:

```console
    $ stx get_address f5185b9ca93bdcb5753fded3b097dab8547a8b47d2be578412d0687a9a0184cb01
    {
      "BTC": "1JFhWyVPpZQjbPcXFtpGtTmU22u4fhBVmq",
      "STACKS": "SP2YM3J4KQK09V670TD6ZZ1XYNYCNGCWCVVKSDFWQ"
    }
    $ stx get_address 1,f5185b9ca93bdcb5753fded3b097dab8547a8b47d2be578412d0687a9a0184cb01,ff2ff4f4e7f8a1979ffad4fc869def1657fd5d48fc9cf40c1924725ead60942c01
    {
      "BTC": "363pKBhc5ipDws1k5181KFf6RSxhBZ7e3p",
      "STACKS": "SMQWZ30EXVG6XEC1K4QTDP16C1CAWSK1JSWMS0QN"
    }
```


| Name | Type | Value |
|-|-|-|
| `private_key` | `string` | `private_key` |

### get_blockchain_record

**Group:** Querying Blockstack IDs

Get the low-level blockchain-hosted state for a Blockstack ID.  This command is used mainly for debugging and diagnostics.  You should not rely on it to be stable.

| Name | Type | Value |
|-|-|-|
| `blockstack_id` | `string` | `blockstack_id` |

### get_blockchain_history

**Group:** Querying Blockstack IDs

Get the low-level blockchain-hosted history of operations on a Blockstack ID.  This command is used mainly for debugging and diagnostics, and is not guaranteed to be stable across releases.

| Name | Type | Value |
|-|-|-|
| `blockstack_id` | `string` | `blockstack_id` |
| `page` | `string` | `page_number` |

### get_confirmations

**Group:** Peer Services

Get the block height and number of confirmations for a transaction.

Example:

```console
    $ stx get_confirmations e41ce043ab64fd5a5fd382fba21acba8c1f46cbb1d7c08771ada858ce7d29eea
    {
      "blockHeight": 567890,
      "confirmations": 7,
    }
```



| Name | Type | Value |
|-|-|-|
| `txid` | `string` | `transaction_id` |

### get_namespace_blockchain_record

**Group:** Namespace Operations

Get the low-level blockchain-hosted state for a Blockstack namespace.  This command is used mainly for debugging and diagnostics, and is not guaranteed to be stable across releases.

| Name | Type | Value |
|-|-|-|
| `namespace_id` | `string` | `namespace_id` |

### get_app_keys

**Group:** Key Management

Get the application private key from a 12- or 24-word Secret Key and an index of the enumerated associated accounts.  This is the private key used to sign data in Gaia, and its address is the Gaia bucket address.  If you provide your encrypted backup phrase, you will be asked to decrypt it.  
Example:

```console
    $ export BACKUP_PHRASE="one race buffalo dynamic icon drip width lake extra forest fee kit"
    $ stx get_app_keys "$BACKUP_PHRASE" 1 https://my.cool.dapp
    {
      "keyInfo": {
        "privateKey": "TODO",
        "address": "TODO"
      },
    }
```


| Name | Type | Value |
|-|-|-|
| `backup_phrase` | `string` | `12_words_or_ciphertext` |
| `index` | `string` | `integer` |
| `app_origin` | `string` | `url` |

### get_owner_keys

**Group:** Key Management

Get the list of owner private keys and ID-addresses from a 12-word backup phrase.  Pass non-zero values for INDEX to generate the sequence of ID-addresses that can be used to own Blockstack IDs.  If you provide an encrypted 12-word backup phrase, you will be asked for your password to decrypt it.

Example:

```console
    $ # get the first 3 owner keys and addresses for a backup phrase
    $ export BACKUP_PHRASE="soap fog wealth upon actual blossom neither timber phone exile monkey vocal"
    $ stx get_owner_keys "$BACKUP_PHRASE" 3
    [
      {
        "privateKey": "14b0811d5cd3486d47279d8f3a97008647c64586b121e99862c18863e2a4183501",
        "version": "v0.10-current",
        "index": 0,
        "idAddress": "ID-1ArdkA2oLaKnbNbLccBaFhEV4pYju8hJ82"
      },
      {
        "privateKey": "1b3572d8dd6866828281ac6cf135f04153210c1f9b123743eccb795fd3095e4901",
        "version": "v0.10-current",
        "index": 1,
        "idAddress": "ID-18pR3UpD1KFrnk88a3MGZmG2dLuZmbJZ25"
      },
      {
        "privateKey": "b19b6d62356db96d570fb5f08b78f0aa7f384525ba3bdcb96fbde29b8e11710d01",
        "version": "v0.10-current",
        "index": 2,
        "idAddress": "ID-1Gx4s7ggkjENw3wSY6bNd1CwoQKk857AqN"
      }
    ]
```



| Name | Type | Value |
|-|-|-|
| `backup_phrase` | `string` | `12_words_or_ciphertext` |
| `index` | `string` | `integer` |

### get_payment_key

**Group:** Key Management

Get the payment private key from a 12-word backup phrase.  If you provide an encrypted backup phrase, you will be asked for your password to decrypt it.  This command will tell you your Bitcoin and Stacks token addresses as well.

Example

```console
    $ stx get_payment_key "soap fog wealth upon actual blossom neither timber phone exile monkey vocal"
    [
      {
        "privateKey": "4023435e33da4aff0775f33e7b258f257fb20ecff039c919b5782313ab73afb401",
        "address": {
          "BTC": "1ybaP1gaRwRSWRE4f8JXo2W8fiTZmA4rV",
          "STACKS": "SP5B89ZJAQHBRXVYP15YB5PAY5E24FEW9K4Q63PE"
        },
        "index": 0
      }
    ]
```



| Name | Type | Value |
|-|-|-|
| `backup_phrase` | `string` | `12_words_or_ciphertext` |

### get_stacks_wallet_key

**Group:** Key Management

Get the payment private key from a 24-word backup phrase used by the Stacks wallet.  If you provide an encrypted backup phrase, you will be asked for your password to decrypt it.  This command will tell you your Bitcoin and Stacks token addresses as well.

Example

```console
    $ stx get_stacks_wallet_key "toast canal educate tissue express melody produce later gospel victory meadow outdoor hollow catch liberty annual gasp hat hello april equip thank neck cruise"
    [
      {
        "privateKey": "a25cea8d310ce656c6d427068c77bad58327334f73e39c296508b06589bc4fa201",
        "address": {
          "BTC": "1ATAW6TAbTCKgU3xPgAcWQwjW9Q26Eambx",
          "STACKS": "SP1KTQR7CTQNA20SV2VNTF9YABMR6RJERSES3KC6Z"
        },
        "index": 0
      }
    ]
```



| Name | Type | Value |
|-|-|-|
| `backup_phrase` | `string` | `24_words_or_ciphertext` |
| `derivation_path` | `string` | `custom_derivation_path_string` |

### migrate_subdomains

**Group:** Blockstack ID Management

Enable users to transfer subdomains currently owned by any data-key 
addresses, to the wallet-key address of the account. Data-key addresses 
owning addresses is a remnant of the Blockstack Connect interface. 
Currently, the web wallet extension shows usernames owned by the 
wallet-key address of an account.

This command performs these steps in sequence: 
1. Detects whether there are any subdomains owned by data-key addresses
2. Prompts the user to confirm whether they want to migrate the each 
   owned subdomain to the corresponding wallet-key addresses for the 
   resepective wallet account
3. Alerts the user to any subdomains that can't be migrated to these 
   wallet-key addresses given collision with existing usernames owned 
   by them
4. Initiates a request to the subdomain registrar using the /transfer
   endpoint
5. Displays a message indicating how long the user will have to wait 
   until request is likely fulfilled
6. Informs user that no subdomains are pending migration if the command 
   is executed again

Example

```console
    $ stx migrate_subdomains "toast canal educate tissue express melody produce later gospel victory meadow outdoor hollow catch liberty annual gasp hat hello april equip thank neck cruise" https://registrar.stacks.co
```



| Name | Type | Value |
|-|-|-|
| `backup_phrase` | `string` | `24_words_or_ciphertext` |
| `registrar_url` | `string` | `url` |

### get_zonefile

**Group:** Peer Services

Get a zone file by hash.

Example:

```console
    $ stx get_zonefile ee77ad484b7b229f09461e4c2b6d3bd3e152ba95
    $ORIGIN ryanshea.id
    $TTL 3600
    _http._tcp URI 10 1 "https://gaia.blockstack.org/hub/15BcxePn59Y6mYD2fRLCLCaaHScefqW2No/1/profile.json"
```



| Name | Type | Value |
|-|-|-|
| `zonefile_hash` | `string` | `zonefile_hash` |

### help

**Group:** CLI

Get the usage string for a CLI command

| Name | Type | Value |
|-|-|-|
| `command` | `string` | `command` |

### lookup

**Group:** Querying Blockstack IDs

Get and authenticate the profile and zone file for a Blockstack ID.

Example:

```console
    $ stx lookup example.id
```



| Name | Type | Value |
|-|-|-|
| `blockstack_id` | `string` | `blockstack_id` |

### names

**Group:** Querying Blockstack IDs

Get the list of Blockstack IDs owned by an ID-address.

Example:

```console
    $ stx names ID-1FpBChfzHG3TdQQRKWAipbLragCUArueG9
```



| Name | Type | Value |
|-|-|-|
| `id_address` | `string` | `id-address` |

### make_keychain

**Group:** Key Management

Generate the owner and payment private keys, optionally from a given 12-word backup phrase.  If no backup phrase is given, a new one will be generated.  If you provide your encrypted backup phrase, you will be asked to decrypt it.

Example:

```console
    $ stx make_keychain
    {
      "mnemonic": "apart spin rich leader siren foil dish sausage fee pipe ethics bundle",
      "keyInfo": {
        "privateKey": "25899fab1b9b95cc2d1692529f00fb788e85664df3d14db1a660f33c5f96d8ab01"
        "address": "SP3RBZ4TZ3EK22SZRKGFZYBCKD7WQ5B8FFS0AYVF7"
        "btcAddress": "1Nwxfx7VoYAg2mEN35dTRw4H7gte8ajFki"
        "wif": "KxUgLbeVeFZEUUQpc3ncYn5KFB3WH5MVRv3SJ2g5yPwkrXs3QRaP"
        "index": 0,
      }
    }
```



| Name | Type | Value |
|-|-|-|
| `backup_phrase` | `string` | `12_words_or_ciphertext` |
| `derivation_path` | `string` | `custom_derivation_path_string` |

### make_zonefile

**Group:** Peer Services

Generate a zone file for a Blockstack ID with the given profile URL.  If you know the ID-address for the Blockstack ID, the profile URL usually takes the form of:

     `{GAIA_URL_PREFIX}/{ADDRESS}/profile.json`

where `{GAIA_URL_PREFIX}` is the *read* endpoint of your Gaia hub (e.g. https://gaia.blockstack.org/hub) and `{ADDRESS}` is the base58check part of your ID-address (i.e. the string following 'ID-').

Example:

```console
     $ stx make_zonefile example.id ID-1ArdkA2oLaKnbNbLccBaFhEV4pYju8hJ82 https://my.gaia.hub/hub
     $ORIGIN example.id
     $TTL 3600
     _http._tcp      IN      URI     10      1       "https://my.gaia.hub/hub/1ArdkA2oLaKnbNbLccBaFhEV4pYju8hJ82/profile.json"
```



| Name | Type | Value |
|-|-|-|
| `blockstack_id` | `string` | `blockstack_id` |
| `id_address` | `string` | `ID-address` |
| `gaia_url_prefix` | `string` | `url` |
| `resolver_url` | `string` | `url` |

### name_import

**Group:** Namespace Operations

Import a name into a namespace you revealed.  The `REVEAL_KEY` must be the same as the key that revealed the namespace.  You can only import a name into a namespace if the namespace has not yet been launched (i.e. via `namespace_ready`), and if the namespace was revealed less than a year ago (52595 blocks ago).

A zone file will be generated for this name automatically, if "ZONEFILE" is not given.  By default, the zone file will have a URL to the name owner's profile prefixed by `GAIA_URL_PREFIX`.  If you know the *write* endpoint for the name owner's Gaia hub, you can find out the `GAIA_URL_PREFIX` to use with `curl $GAIA_HUB/hub_info`".

If you specify an argument for `ZONEFILE`, then the `GAIA_URL_PREFIX` argument is ignored in favor of your custom zone file on disk.

If you specify a valid zone file hash for `ZONEFILE_HASH` then it will be used in favor of both `ZONEFILE` and `GAIA_URL_PREFIX`.  The zone file hash will be incorporated directly into the name-import transaction.

This command prints out a transaction ID if it succeeds, and it replicates the zone file (if given) to a transaction broadcaster (you can choose which one with -T).  The zone file will be automatically broadcast to the Blockstack peer network when the transaction confirms.  Alternatively, you can do so yourself with the `zonefile_push` command.

Example:

```console
    $ export REVEAL_KEY="bfeffdf57f29b0cc1fab9ea197bb1413da2561fe4b83e962c7f02fbbe2b1cd5401"
    $ export ID_ADDRESS="ID-18e1bqU7B5qUPY3zJgMLxDnexyStTeSnvV"
    $ stx name_import example.id "$ID_ADDRESS" https://gaia.blockstack.org/hub "$REVEAL_KEY"
    f726309cea7a9db364307466dc0e0e759d5c0d6bad1405e2fd970740adc7dc45
```



| Name | Type | Value |
|-|-|-|
| `blockstack_id` | `string` | `blockstack_id` |
| `id_address` | `string` | `id-address` |
| `gaia_url_prefix` | `string` | `url` |
| `reveal_key` | `string` | `private_key` |
| `zonefile` | `string` | `path` |
| `zonefile_hash` | `string` | `zonefile_hash` |

### namespace_preorder

**Group:** Namespace Operations

Preorder a namespace.  This is the first of three steps to creating a namespace.  Once this transaction is confirmed, you will need to use the `namespace_reveal` command to reveal the namespace (within 24 hours, or 144 blocks).

| Name | Type | Value |
|-|-|-|
| `namespace_id` | `string` | `namespace_id` |
| `reveal_address` | `string` | `address` |
| `payment_key` | `string` | `private_key` |

### namespace_reveal

**Group:** Namespace Operations

Reveal a preordered namespace, and set the price curve and payment options.  This is the second of three steps required to create a namespace, and must be done shortly after the associated `namespace_preorder` command.

| Name | Type | Value |
|-|-|-|
| `namespace_id` | `string` | `namespace_id` |
| `reveal_address` | `string` | `address` |
| `version` | `string` | `2-byte-integer` |
| `lifetime` | `string` | `4-byte-integer` |
| `coefficient` | `string` | `1-byte-integer` |
| `base` | `string` | `1-byte-integer` |
| `price_buckets` | `string` | `csv-of-16-nybbles` |
| `nonalpha_discount` | `string` | `nybble` |
| `no_vowel_discount` | `string` | `nybble` |
| `payment_key` | `string` | `private_key` |

### namespace_ready

**Group:** Namespace Operations

Launch a revealed namespace.  This is the third and final step of creating a namespace.  Once launched, you will not be able to import names anymore.

| Name | Type | Value |
|-|-|-|
| `namespace_id` | `string` | `namespace_id` |
| `reveal_key` | `string` | `private_key` |

### price

**Group:** Querying Blockstack IDs

Get the price of an on-chain Blockstack ID.  Its namespace must already exist.

Example:

```console
    $ stx price example.id
    {
      "units": "BTC",
      "amount": "5500"
    }
```



| Name | Type | Value |
|-|-|-|
| `blockstack_id` | `string` | `blockstack_id` |

### price_namespace

**Group:** Namespace Operations

Get the price of a namespace.

Example:

```console
    $ # get the price of the .hello namespace
    $ stx price_namespace hello
    {
      "units": "BTC",
      "amount": "40000000"
    }
```



| Name | Type | Value |
|-|-|-|
| `namespace_id` | `string` | `namespace_id` |

### profile_sign

**Group:** Profiles

Sign a profile on disk with a given owner private key.  Print out the signed profile JWT.

Example:

```console
    $ # Tip: you can get the owner key from your 12-word backup phrase using the get_owner_keys command
    $ stx profile_sign /path/to/profile.json 0ffd299af9c257173be8486ef54a4dd1373407d0629ca25ca68ff24a76be09fb01
```



| Name | Type | Value |
|-|-|-|
| `profile` | `string` | `path` |
| `owner_key` | `string` | `private_key` |

### profile_store

**Group:** Profiles

Store a profile on disk to a Gaia hub.  `USER_ID` can be either a Blockstack ID or an ID-address.  The `GAIA_HUB` argument must be the *write* endpoint for the user's Gaia hub (e.g. https://hub.blockstack.org).  You can verify this by ensuring that you can run `curl "$GAIA_HUB/hub_info"` successfully.

| Name | Type | Value |
|-|-|-|
| `user_id` | `string` | `name-or-id-address` |
| `profile` | `string` | `path` |
| `owner_key` | `string` | `private_key` |
| `gaia_hub` | `string` | `url` |

### profile_verify

**Group:** Profiles

Verify a JWT encoding a profile on disk using an ID-address.  Prints out the contained profile on success.

Example:

```console
    $ # get the raw profile JWT
    $ curl -sL https://raw.githubusercontent.com/jcnelson/profile/master/judecn.id > /tmp/judecn.id.jwt
    $ # Tip: you can get the ID-address for a name with the "whois" command
    $ stx profile_verify /tmp/judecn.id.jwt ID-16EMaNw3pkn3v6f2BgnSSs53zAKH4Q8YJg
```



| Name | Type | Value |
|-|-|-|
| `profile` | `string` | `path` |
| `id_address` | `string` | `id-address` |

### renew

**Group:** Blockstack ID Management

Renew a name.  Optionally transfer it to a new owner address (`NEW_ID_ADDRESS`), and optionally load up and give it a new zone file on disk (`ZONEFILE`).  If the command succeeds, it prints out a transaction ID.  You can use with the `get_confirmations` command to track its confirmations on the underlying blockchain -- once it reaches 7 confirmations, the rest of the Blockstack peer network will process it.

If you create a new zonefile for your name, you will need to later use `zonefile_push` to replicate the zone file to the Blockstack peer network once the transaction reaches 7 confirmations.

Example:

```console
    $ # Tip: you can get your owner key from your backup phrase with "get_owner_keys".
    $ # Tip: you can get your payment key from your backup phrase with "get_payment_key".
    $ export OWNER="136ff26efa5db6f06b28f9c8c7a0216a1a52598045162abfe435d13036154a1b01"
    $ export PAYMENT="bfeffdf57f29b0cc1fab9ea197bb1413da2561fe4b83e962c7f02fbbe2b1cd5401"
    $ stx renew hello_world.id "$OWNER" "$PAYMENT"
    3d8945ce76d4261678d76592b472ed639a10d4298f9d730af4edbbc3ec02882e

    $ # Renew with a new owner
    $ export NEW_OWNER="ID-141BcmFVbEuuMb7Bd6umXyV6ZD1WYomYDE"
    $ stx renew hello_world.id "$OWNER" "$PAYMENT" "$NEW_OWNER"
    33865625ef3f1b607111c0dfba9e58604927173bd2e299a343e19aa6d2cfb263

    $ # Renew with a new zone file.
    $ # Tip: you can create a new zonefile with the "make_zonefile" command.
    $ export ZONEFILE_PATH="/path/to/new/zonefile.txt"
    $ stx renew hello_world.id "$OWNER" "$PAYMENT" --zonefile "$ZONEFILE_PATH"
    e41ce043ab64fd5a5fd382fba21acba8c1f46cbb1d7c08771ada858ce7d29eea
    $ # wait 7 confirmations
    $ stx get_confirmations e41ce043ab64fd5a5fd382fba21acba8c1f46cbb1d7c08771ada858ce7d29eea
    {
      "blockHeight": 567890,
      "confirmations": 7,
    }
    $ stx -H https://api.hiro.so zonefile_push "$ZONEFILE_PATH"
    [
      "https://api.hiro.so"
    ]
```



| Name | Type | Value |
|-|-|-|
| `blockstack_id` | `string` | `on-chain-blockstack_id` |
| `owner_key` | `string` | `private_key` |
| `payment_key` | `string` | `private_key` |
| `new_id_address` | `string` | `id-address` |
| `zonefile` | `string` | `path` |
| `zonefile_hash` | `string` | `zonefile_hash` |

### register

**Group:** Blockstack ID Management

If you are trying to register a name for a *private key*, use this command.

Register a name to a single name-owning private key.  After successfully running this command, and after waiting a couple hours, your name will be ready to use and will resolve to a signed empty profile hosted on the given Gaia hub (`GAIA_HUB`).

Behind the scenes, this will generate and send two transactions and generate and replicate a zone file with the given Gaia hub URL (`GAIA_HUB`).  Note that the `GAIA_HUB` argument must correspond to the *write* endpoint of the Gaia hub (i.e. you should be able to run 'curl "$GAIA_HUB/hub_info"' and get back data).  If you are using Blockstack PBC's default Gaia hub, pass "https://hub.blockstack.org" for this argument.

By default, this command generates a zone file automatically that points to the Gaia hub's read endpoint (which is queried on-the-fly from `GAIA_HUB`).  If you instead want to have a custom zone file for this name, you can specify a path to it on disk with the `ZONEFILE` argument.

If this command completes successfully, your name will be ready to use once both transactions have 7+ confirmations.  You can use the `get_confirmations` command to track the confirmations on the transaction IDs returned by this command.

WARNING: You should *NOT* use the payment private key (`PAYMENT_KEY`) while the name is being confirmed.  If you do so, you could double-spend one of the pending transactions and lose your name.

Example:

```console
    $ export OWNER="136ff26efa5db6f06b28f9c8c7a0216a1a52598045162abfe435d13036154a1b01"
    $ stx register example.id "$OWNER" salt zonfile```



| Name | Type | Value |
|-|-|-|
| `fully-qualified-name` | `string` | `on-chain-fully-qualified-name` |
| `owner_key` | `string` | `private_key` |
| `salt` | `string` | `text` |
| `zonefile` | `string` | `path` |

### register_addr

**Group:** Blockstack ID Management

If you are trying to register a name for an *ID-address*, use this command.

Register a name to someone's ID-address.  After successfully running this command and waiting a couple of hours, the name will be registered on-chain and have a zone file with a URL to where the owner's profile should be.  This command does NOT generate, sign, or replicate a profile for the name---the name owner will need to do this separately, once the name is registered.

Behind the scenes, this command will generate two transactions, and generate and replicate a zone file with the given Gaia hub read URL (`GAIA_URL_PREFIX`).  Note that the `GAIA_URL_PREFIX` argument must correspond to the *read* endpoint of the Gaia hub (e.g. if you are using Blockstack PBC's default Gaia hub, this is "https://gaia.blockstack.org/hub"). If you know the *write* endpoint of the name owner's Gaia hub, you can find the right value for `GAIA_URL_PREFIX` by running "curl $GAIA_HUB/hub_info".

No profile will be generated or uploaded by this command.  Instead, this command generates a zone file that will include the URL to a profile based on the `GAIA_URL_PREFIX` argument.

The zone file will be generated automatically from the `GAIA_URL_PREFIX` argument.  If you need to use a custom zone file, you can pass the path to it on disk via the `ZONEFILE` argument.

If this command completes successfully, the name will be ready to use in a couple of hours---that is, once both transactions have 7+ confirmations. You can use the `get_confirmations` command to track the confirmations.

WARNING: You should *NOT* use the payment private key (`PAYMENT_KEY`) while the name is being confirmed.  If you do so, you could double-spend one of the pending transactions and lose the name.

Example:

```console
    $ export ID_ADDRESS="ID-18e1bqU7B5qUPY3zJgMLxDnexyStTeSnvV"
    $ export PAYMENT="bfeffdf57f29b0cc1fab9ea197bb1413da2561fe4b83e962c7f02fbbe2b1cd5401"
    $ stx register_addr example.id "$ID_ADDRESS" "$PAYMENT" https://gaia.blockstack.org/hub
```


| Name | Type | Value |
|-|-|-|
| `blockstack_id` | `string` | `blockstack_id` |
| `id-address` | `string` | `id-address` |
| `payment_key` | `string` | `private_key` |
| `gaia_url_prefix` | `string` | `url` |
| `zonefile` | `string` | `path` |

### revoke

**Group:** Blockstack ID Management

Revoke a name.  This renders it unusable until it expires (if ever).  This command prints out the transaction ID if it succeeds.  Once the transaction confirms, the name will be revoked by each node in the peer network.  This command only works for on-chain names, not subdomains.

Example:

```console
    $ # Tip: you can get your owner and payment keys from your 12-word backup phrase using the get_owner_keys and get_payment_key commands.
    $ export OWNER="6e50431b955fe73f079469b24f06480aee44e4519282686433195b3c4b5336ef01"
    $ export PAYMENT="bfeffdf57f29b0cc1fab9ea197bb1413da2561fe4b83e962c7f02fbbe2b1cd5401"
    $ stx revoke example.id "$OWNER" "$PAYMENT"
    233b559c97891affa010567bd582110508d0236b4e3f88d3b1d0731629e030b0
```



| Name | Type | Value |
|-|-|-|
| `blockstack_id` | `string` | `on-chain-blockstack_id` |
| `owner_key` | `string` | `private_key` |
| `payment_key` | `string` | `private_key` |

### send_btc

**Group:** Account Management

Send some Bitcoin (in satoshis) from a payment key to an address.  Up to the given amount will be spent, but likely less---the actual amount sent will be the amount given, minus the transaction fee.  For example, if you want to send 10000 satoshis but the transaction fee is 2000 satoshis, then the resulting transaction will send 8000 satoshis to the given address.  This is to ensure that this command does not *over*-spend your Bitcoin.  If you want to check the amount before spending, pass the `-x` flag to see the raw transaction.

If the command succeeds, it prints out the transaction ID.  You can track its confirmations with the `get_confirmations` command.

Example:

```console
    $ export PAYMENT="bfeffdf57f29b0cc1fab9ea197bb1413da2561fe4b83e962c7f02fbbe2b1cd5401"
    $ stx send_btc 18qTSE5PPQmypwKKej7QX5Db2XAttgYeA1 123456 "$PAYMENT"
    c7e239fd24da30e36e011e6bc7db153574a5b40a3a8dc3b727adb54ad038acc5
```



| Name | Type | Value |
|-|-|-|
| `recipient_address` | `string` | `address` |
| `amount` | `string` | `satoshis` |
| `payment_key` | `string` | `private_key` |

### send_tokens

**Group:** Account Management

Send a particular type of tokens to the given `ADDRESS`.  Right now, only supported `TOKEN-TYPE` is `STACKS`.  Optionally include a memo string (`MEMO`) up to 34 characters long.

If the command succeeds, it prints out a transaction ID.  You can track the confirmations on the transaction via the `get_confirmations` command.  Once the transaction has 7 confirmations, the Blockstack peer network will have processed it, and your payment key balance and recipient balance will be updated.

Example:

```console
    $ # check balances of sender and recipient before sending.
    $ # address of the key below is SP2SC16ASH76GX549PT7J5WQZA4GHMFBKYMBQFF9V
    $ export PAYMENT="bfeffdf57f29b0cc1fab9ea197bb1413da2561fe4b83e962c7f02fbbe2b1cd5401"
    $ stx balance SP2SC16ASH76GX549PT7J5WQZA4GHMFBKYMBQFF9V
    {
      "STACKS": "10000000"
    }
    $ stx balance SP1P10PS2T517S4SQGZT5WNX8R00G1ECTRKYCPMHY
    {
      "STACKS": "0"
    }

    $ # send tokens
    $ stx send_tokens SP1P10PS2T517S4SQGZT5WNX8R00G1ECTRKYCPMHY 12345 1 0 "$PAYMENT"
     {
       txid: '0x2e33ad647a9cedacb718ce247967dc705bc0c878db899fdba5eae2437c6fa1e1',       transaction: 'https://explorer.hiro.so/txid/0x2e33ad647a9cedacb718ce247967dc705bc0c878db899fdba5eae2437c6fa1e1'     }
    a9d387a925fb0ba7a725fb1e11f2c3f1647473699dd5a147c312e6453d233456

    $ # wait for transaction to be confirmed

    $ stx balance SP2SC16ASH76GX549PT7J5WQZA4GHMFBKYMBQFF9V
    {
      "STACKS": "9987655"
    }
    $ stx balance SP1P10PS2T517S4SQGZT5WNX8R00G1ECTRKYCPMHY
    {
      "STACKS": "12345"
    }
```



| Name | Type | Value |
|-|-|-|
| `address` | `string` | `address` |
| `amount` | `string` | `integer` |
| `fee` | `string` | `integer` |
| `nonce` | `string` | `integer` |
| `payment_key` | `string` | `private_key` |
| `memo` | `string` | `string` |

### stack

**Group:** Account Management

Stack the specified number of Stacks tokens for given number of cycles.

Example:

```console
    $ stx stack 10000000 20 16pm276FpJYpm7Dv3GEaRqTVvGPTdceoY4 136ff26efa5db6f06b28f9c8c7a0216a1a52598045162abfe435d13036154a1b01
     {
       txid: '0x2e33ad647a9cedacb718ce247967dc705bc0c878db899fdba5eae2437c6fa1e1',       transaction: 'https://explorer.hiro.so/txid/0x2e33ad647a9cedacb718ce247967dc705bc0c878db899fdba5eae2437c6fa1e1'     }
```


| Name | Type | Value |
|-|-|-|
| `amount` | `string` | `integer` |
| `cycles` | `string` | `integer` |
| `pox_address` | `string` | `integer` |
| `private_key` | `string` | `private_key` |
| `fee` | `string` | `integer` |
| `nonce` | `string` | `integer` |

### stacking_status

**Group:** Account Management

Get stacking status for specified address.

Example:

```console
    $ stx stacking_status SPZY1V53Z4TVRHHW9Z7SFG8CZNRAG7BD8WJ6SXD0
```


| Name | Type | Value |
|-|-|-|
| `pox_address` | `string` | `integer` |

### transfer

**Group:** Blockstack ID Management

Transfer a Blockstack ID to a new address (`NEW_ID_ADDRESS`).  Optionally preserve its zone file (`KEEP_ZONEFILE`).  If the command succeeds, it will print a transaction ID.  Once the transaction reaches 7 confirmations, the Blockstack peer network will transfer the Blockstack ID to the new ID-address.  You can track the transaction's confirmations with the `get_confirmations` command.

NOTE: This command only works for on-chain Blockstack IDs.  It does not yet work for subdomains.

An ID-address can only own up to 25 Blockstack IDs.  In practice, you should generate a new owner key and ID-address for each name you receive (via the `get_owner_keys` command).

Example:

```console
    $ # Tip: you can get your owner key from your backup phrase with "get_owner_keys".
    $ # Tip: you can get your payment key from your backup phrase with "get_payment_key".
    $ export OWNER="136ff26efa5db6f06b28f9c8c7a0216a1a52598045162abfe435d13036154a1b01"
    $ export PAYMENT="bfeffdf57f29b0cc1fab9ea197bb1413da2561fe4b83e962c7f02fbbe2b1cd5401"
    $ stx transfer example.id ID-1HJA1AJvWef21XbQVL2AcTv71b6JHGPfDX true "$OWNER" "$PAYMENT"
    e09dc158e586d0c09dbcdcba917ec394e6c6ac2b9c91c4b55f32f5973e4f08fc
```



| Name | Type | Value |
|-|-|-|
| `blockstack_id` | `string` | `on-chain-blockstack_id` |
| `new_id_address` | `string` | `id-address` |
| `keep_zonefile` | `string` | `true-or-false` |
| `owner_key` | `string` | `private_key` |
| `payment_key` | `string` | `private_key` |

### tx_preorder

**Group:** Blockstack ID Management

Generate and send `NAME_PREORDER` transaction, for a Blockstack ID to be owned by a given `ID_ADDRESS`.  The name cost will be paid for by the gven `PAYMENT_KEY`.  The ID-address should be a never-before-seen address, since it will be used as a salt when generating the name preorder hash.

This is a low-level command that only experienced Blockstack developers should use.  If you just want to register a name, use the "register" command.

Example:

```console
    $ export PAYMENT="136ff26efa5db6f06b28f9c8c7a0216a1a52598045162abfe435d13036154a1b01"
    $ stx tx_preorder example.id "$PAYMENT" salt 100
```



| Name | Type | Value |
|-|-|-|
| `fully-qualified-name` | `string` | `on-chain-fully-qualified-name` |
| `payment_key` | `string` | `private_key` |
| `salt` | `string` | `text` |
| `stx_to_burn` | `string` | `number` |

### tx_register

**Group:** Blockstack ID Management

Generate and send a NAME_REGISTRATION transaction, assigning the given `BLOCKSTACK_ID` to the given `ID_ADDRESS`.  Optionally pair the Blockstack ID with a zone file (`ZONEFILE`) or the hash of the zone file (`ZONEFILE_HASH`).  You will need to push the zone file to the peer network after the transaction confirms (i.e. with `zonefile_push`).

This is a low-level command that only experienced Blockstack developers should use.  If you just want to register a name, you should use the `register` command.

| Name | Type | Value |
|-|-|-|
| `blockstack_id` | `string` | `on-chain-blockstack_id` |
| `id_address` | `string` | `id-address` |
| `payment_key` | `string` | `private_key` |
| `zonefile` | `string` | `path` |
| `zonefile_hash` | `string` | `zoenfile_hash` |

### update

**Group:** Blockstack ID Management

Update the zonefile for an on-chain Blockstack ID.  You can generate a well-formed zone file using the `make_zonefile` command, or you can supply your own.  Zone files can be up to 40Kb.  Alternatively, if you only want to announce the hash of a zone file (or any arbitrary 20-byte hex string), you can do so by passing a value for `ZONEFILE_HASH`.  If `ZONEFILE_HASH` is given, then the value for `ZONEFILE` will be ignored.

If this command succeeds, it prints out a transaction ID.  Once the transaction has 7 confirmations, the Blockstack peer network will set the name's zone file hash to the `RIPEMD160`(SHA256) hash of the given zone file (or it will simply set it to the hash given in `ZONEFILE_HASH`).

Once the transaction confirms, you will need to replicate the zone file to the Blockstack peer network.  This can be done with the `zonefile_push` command.  Until you do so, no Blockstack clients will be able to obtain the zone file announced by this command.

Example:

```console
    $ # Tip: you can get your owner and payment keys from your 12-word backup phrase using the get_owner_keys and get_payment_key commands.
    $ export OWNER="6e50431b955fe73f079469b24f06480aee44e4519282686433195b3c4b5336ef01"
    $ export PAYMENT="bfeffdf57f29b0cc1fab9ea197bb1413da2561fe4b83e962c7f02fbbe2b1cd5401"
    $ # make a new zone file
    $ stx make_zonefile example.id ID-1ArdkA2oLaKnbNbLccBaFhEV4pYju8hJ82 https://my.gaia.hub/hub > /tmp/zonefile.txt
    
    $ # update the name to reference this new zone file
    $ stx update example.id /tmp/zonefile.txt "$OWNER" "$PAYMENT"
    8e94a5b6647276727a343713d3213d587836e1322b1e38bc158406f5f8ebe3fd
    
    $ # check confirmations
    $ stx get_confirmations e41ce043ab64fd5a5fd382fba21acba8c1f46cbb1d7c08771ada858ce7d29eea
    {
      "blockHeight": 567890,
      "confirmations": 7,
    }
    
    $ # send out the new zone file to a Blockstack peer
    $ stx -H https://api.hiro.so zonefile_push /tmp/zonefile.txt
    [
      "https://api.hiro.so"
    ]
```



| Name | Type | Value |
|-|-|-|
| `blockstack_id` | `string` | `on-chain-blockstack_id` |
| `zonefile` | `string` | `path` |
| `owner_key` | `string` | `private_key` |
| `payment_key` | `string` | `private_key` |
| `zonefile_hash` | `string` | `zonefile_hash` |

### whois

**Group:** Querying Blockstack IDs

Look up the zone file and owner of a Blockstack ID.  Works with both on-chain and off-chain names.

Example:

```console
    $ stx whois example.id
    {
      "address": "1ArdkA2oLaKnbNbLccBaFhEV4pYju8hJ82",
      "block_renewed_at": 567890,
      "blockchain": "bitcoin",
      "expire_block": 687010,
      "grace_period": false,
      "last_transaction_height": "567891",
      "last_txid": "a564aa482ee43eb2bdfb016e01ea3b950bab0cfa39eace627d632e73c7c93e48",
      "owner_script": "76a9146c1c2fc3cf74d900c51e9b5628205130d7b98ae488ac",
      "renewal_deadline": 692010,
      "resolver": null,
      "status": "registered",
      "zonefile": "$ORIGIN example.id\n$TTL 3600\n_http._tcp URI 10 1 \"https://gaia.blockstack.org/hub/1ArdkA2oLaKnbNbLccBaFhEV4pYju8hJ82/profile.json\"\n",
      "zonefile_hash": "ae4ee8e7f30aa890468164e667e2c203266f726e"
    }
```



| Name | Type | Value |
|-|-|-|
| `blockstack_id` | `string` | `blockstack_id` |

### zonefile_push

**Group:** Peer Services

Push a zone file on disk to the Blockstack peer network.  The zone file must correspond to a zone file hash that has already been announced.  That is, you use this command in conjunction with the `register`, `update`, `renew`, or `name_import` commands.

Example:

```console
    $ stx -H https://api.hiro.so zonefile_push /path/to/zonefile.txt
    [
      "https://api.hiro.so"
    ]
```



| Name | Type | Value |
|-|-|-|
| `zonefile` | `string` | `path` |

### get_did_configuration

**Group:** DID

Creates a DID configuration for the given blockstack id and domain to create a link between both.The specification is define by the Decentralized Identity Foundation at https://identity.foundation/specs/did-configuration/
The DID configuration should be placed in the json file ".well_known/did_configuration"
Example:

```console
    $ # Tip: you can get your owner keys from your 12-word backup phrase using the get_owner_keys command.
    $ export PRIVATE_OWNER_KEY="6e50431b955fe73f079469b24f06480aee44e4519282686433195b3c4b5336ef01"
    $ stx get_did_configuration public_profile_for_testing.id.blockstack helloblockstack.com PRIVATE_OWNER_KEY
    {
       "entries": [
          {
            "did": "did:stack:v0:SewTRvPZUEQGdr45QvEnVMGHZBhx3FT1Jj-0",
            "jwt": "eyJ0eXAiOiJKV1QiL...."
          }
       ]
    }

The decoded content of the jwt above is 
    {
       "header": {
          "typ": "JWT", "alg": "ES256K"
       },
       "payload": {
           "iss": "did:stack:v0:SewTRvPZUEQGdr45QvEnVMGHZBhx3FT1Jj-0",
           "domain": "helloblockstack.com",
           "exp": "2020-12-07T13:05:28.375Z"
       },
       "signature": "NDY7ISzgAHKcZDvbxzTxQdVnf6xWMZ46w5vHcDpNx_1Fsyip0M6E6GMq_2YZ-gUcwmwlo8Ag9jgnfOkaBIFpoQ"
    }
```



| Name | Type | Value |
|-|-|-|
| `blockstack_id` | `string` | `blockstack_id` |
| `domain` | `string` | `domain` |
| `owner_key` | `string` | `private_key` |

