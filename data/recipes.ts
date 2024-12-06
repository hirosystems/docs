import { Recipe } from "@/types/recipes";

export const recipes: Recipe[] = [
  {
    id: "create-random-number",
    title: "Create a random number in Clarity using block-height",
    description:
      "Create a random number based on a block-height using the buff-to-uint-be function in Clarity.",
    date: "2024.02.28",
    tags: ["clarity"],
    files: [
      {
        name: "random.clar",
        path: "contracts/random.clar",
        type: "clarity",
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
    date: "2024.02.28",
    tags: ["clarity"],
    files: [
      {
        name: "multisig.clar",
        path: "contracts/multisig.clar",
        type: "clarity",
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
    title: "Get tenure height for a block",
    description:
      "Get the tenure height for a specific block height using Clarity.",
    date: "2024.02.28",
    tags: ["clarity"],
    files: [
      {
        name: "get-tenure-for-block.clar",
        path: "contracts/get-tenure-for-block.clar",
        type: "clarity",
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
      },
    ],
  },
  {
    id: "fetch-testnet-bitcoin-on-regtest",
    title: "Fetch tBTC on regtest",
    description: "How to fetch tBTC on regtest.",
    date: "2024.02.28",
    tags: ["bitcoin"],
    files: [
      {
        name: "fetch-tbtc-on-regtest.ts",
        path: "scripts/fetch-tbtc-on-regtest.ts",
        type: "typescript",
        content: `import fetch from 'node-fetch';

const url = 'https://api.testnet.hiro.so/extended/v1/faucets/btc';
const fetchTestnetBTC = async (address: string) => {
  const response = await fetch(\`\${url}?address=\${address}\`, {
    method: 'POST',
  });
  const data = await response.json();
  return data;
};

// Example usage
const address = 'bcrt1q728h29ejjttmkupwdkyu2x4zcmkuc3q29gvwaa';
fetchTestnetBTC(address)
  .then(console.log)
  .catch(console.error);`,
      },
      {
        name: "fetch-tbtc-on-regtest.sh",
        path: "scripts/fetch-tbtc-on-regtest.sh",
        type: "bash",
        content: `curl -X POST \
  "https://api.testnet.hiro.so/extended/v1/faucets/btc?address=bcrt1q728h29ejjttmkupwdkyu2x4zcmkuc3q29gvwaa"`,
      },
    ],
  },
  {
    id: "clarity-bitcoin",
    title: "Prepare btc data for Clarity verification",
    description: "How to prepare btc data for Clarity verification.",
    date: "2024.02.28",
    tags: ["clarity", "bitcoin"],
    files: [
      {
        name: "prepare-btc-data.ts",
        path: "scripts/prepare-btc-data.ts",
        type: "typescript",
        content: `import mempoolJS from "@mempool/mempool.js";
import { Transaction } from "bitcoinjs-lib";
import {
  callReadOnlyFunction,
  bufferCV,
  uintCV,
  tupleCV,
  listCV,
  cvToString,
} from "@stacks/transactions";
import { StacksMainnet } from "@stacks/network";
import { hexToBytes } from "@stacks/common";

const {
  bitcoin: { transactions, blocks },
} = await mempoolJS({
  hostname: "mempool.space",
});

// !hover get-tx-hex
const getTxHex = async (txid) => {
  // !hover get-tx-hex
  const txHex = await transactions.getTxHex({ txid });
  // !hover get-tx-hex
  return txHex;
// !hover get-tx-hex
};

// !hover get-tx-merkle-proof
const getTxMerkleProof = async (txid) => {
  // !hover get-tx-merkle-proof
  const { block_height, merkle, pos } = await transactions.getTxMerkleProof({
    // !hover get-tx-merkle-proof
    txid,
  // !hover get-tx-merkle-proof
  });
  // !hover get-tx-merkle-proof
  return { block_height, merkle, pos };
// !hover get-tx-merkle-proof
};

// !hover get-blk-header
const getBlkHeader = async (height) => {
  // !hover get-blk-header
  let blockHash = await blocks.getBlockHeight({ height });
  // !hover get-blk-header
  const blockHeader = await blocks.getBlockHeader({ hash: blockHash });
  // !hover get-blk-header
  return { blockHash, blockHeader };
// !hover get-blk-header
};

const removeWitnessData = (txHex) => {
  const tx = Transaction.fromHex(txHex);
  if (!tx.hasWitnesses()) return txHex;

  const newTx = new Transaction();
  newTx.version = tx.version;
  tx.ins.forEach((input) =>
    newTx.addInput(input.hash, input.index, input.sequence, input.script)
  );
  tx.outs.forEach((output) => newTx.addOutput(output.script, output.value));
  newTx.locktime = tx.locktime;

  return newTx.toHex();
};


const mainnetAddress = "SP2K8BC0PE000000000000000000000000000000000000000";
const mainnet = new StacksMainnet();

// From read-only function of below clarity-bitcoin implementation contract:
const contractAddress = "SP2PABAF9FTAJYNFZH93XENAJ8FVY99RRM50D2JG9";
const contractName = "clarity-bitcoin-lib-v5";
const functionName = "was-tx-mined-compact";

// fetching btc tx details. You can replace this with any bitcoin transaction id.
let txid = "7ad7414063ab0f7ce7d5b1b6b4a87091094bd0e9be0e6a44925a48e1eb2ca51c";

// fetching and returning non-witness tx hex
let fullTxHex = await getTxHex(txid);
let txHex = removeWitnessData(fullTxHex);

let { block_height, merkle, pos } = await getTxMerkleProof(txid);

let { blockHeader } = await getBlkHeader(block_height);

let txIndex = pos;
let hashes = merkle.map((hash) => bufferCV(hexToBytes(hash).reverse()));
let treeDepth = merkle.length;

let functionArgs = [
  // (height)
  uintCV(block_height),
  // (tx)
  bufferCV(Buffer.from(txHex, "hex")),
  // (header)
  bufferCV(Buffer.from(blockHeader, "hex")),
  // (proof)
  tupleCV({
    "tx-index": uintCV(txIndex),
    hashes: listCV(hashes),
    "tree-depth": uintCV(treeDepth),
  }),
];

let result = await callReadOnlyFunction({
  contractAddress,
  contractName,
  functionName,
  functionArgs,
  network: mainnet,
  // this could be any principal address
  senderAddress: mainnetAddress,
});

console.log(cvToString(result));`,
      },
    ],
  },
];
