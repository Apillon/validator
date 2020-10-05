# validator

Authtrail validator for manual verification of Authtrail data with public anchors on Ethereum.

## Hashing

The hash site calculates the SHA256 hash value of data or document that can be used as leaves in the Merkle tree. The leaves are sorted by hash value number.

## Validation

The root site verifies the hash to the Merkle proof and the chain of blocks from the block where the data exists up to the first anchor.

The resulting hash can then be directly compared to the value stored on the public ledger.

The public anchor can either be copied from a public explorer, deep verify data or one can connect to Ethereum RPC using Metamask and read the anchor directly from Ethereum smart contract.

![Authtrail](./static/Authtrail.png)

## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```
