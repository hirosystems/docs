---
title: FAQ
---

FAQs: Post-Conditions (Mode) — in general
→ any supplied post-conditions are always verified, regardless of "mode" (and abort the tx if any supplied PC evaluates to false)
→ the "mode" (allow/deny) only applies to any asset (stx/ft/nft) transfer that is not mentioned in the post-conditions (can be thought of as "ALLOW-additional-asset-transfer" or "DENY-additional-asset-transfer")

e.g. if in deny mode, an additional asset transfer (not covered by PCs) will abort the tx
e.g. if in deny mode without PCs a tx will only fail due to PCs if an asset is transferred 

post-conditions are less a part of clarity (the language), but more a part of transactions.
users could send the otherwise-identical transaction (e.g. contract-call, executing a function on the blockchain) with OR without different post-conditions, in allow OR deny mode.
the PCs are managed by the user/wallet/app that's creating the tx; so they are a bit different from the other "safety" features of clarity (e.g. asserts, try, https://book.clarity-lang.org/ch06-00-control-flow.html) 


