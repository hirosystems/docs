import { Recipe } from "@/types/recipes";

export const recipes: Recipe[] = [
  {
    id: "create-random-number",
    title: "Create a random number in Clarity using block-height",
    description:
      "Create a random number based on a block-height using the buff-to-uint-be function in Clarity.",
    type: "clarity",
    date: "2024.02.28",
    tags: ["clarity"],
    files: [
      {
        name: "random.clar",
        path: "contracts/random.clar",
        content: `(define-constant ERR_FAIL (err u1000))
        
;; !hover random
(define-read-only (read-rnd (block uint))
  (ok (buff-to-uint-be (unwrap-panic (as-max-len? (unwrap-panic (slice? (unwrap! (get-block-info? vrf-seed block) ERR_FAIL) u16 u32)) u16))))
)`,
      },
    ],
  },
  {
    id: "create-a-multisig-address-using-principal-construct",
    title: "Create a multisig address using principal-construct",
    description:
      "Create a multisig address using the principal-construct function in Clarity.",
    type: "clarity",
    date: "2024.02.28",
    tags: ["clarity"],
    files: [
      {
        name: "multisig.clar",
        path: "contracts/multisig.clar",
        content: `(define-read-only (pubkeys-to-principal (pubkeys (list 128 (buff 33))) (m uint))
  (unwrap-panic (principal-construct?
    (if is-in-mainnet 0x14 0x15) ;; address version 
    (pubkeys-to-hash pubkeys m)
  ))
)`,
      },
    ],
  },
  {
    id: "get-tenure-height-for-a-block",
    title: "Get Tenure Height for a Block",
    description:
      "Get the tenure height for a specific block height using Clarity.",
    type: "clarity",
    date: "2024.02.28",
    tags: ["clarity"],
    files: [
      {
        name: "get-tenure-for-block.clar",
        path: "contracts/get-tenure-for-block.clar",
        content: `(define-read-only (get-tenure-height (block uint))
  (ok
    (at-block
      (unwrap!
        ;; !hover get-stacks-block-info
        (get-stacks-block-info? id-header-hash block)
        ;; !hover error
        (err u404)
      )
      ;; !hover tenure-height
      tenure-height
    )
  )
)`,
        snippet: `(print (ok (at-block (unwrap! (get-stacks-block-info? id-header-hash (- stacks-block-height u1)) (err u404)) tenure-height)))`,
      },
    ],
  },
];
