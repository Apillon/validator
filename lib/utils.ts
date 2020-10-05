import { createHash, BinaryLike } from 'crypto'
import { Block, Proof } from '.'

/**
 * Returns a sha256 hash of the input data.
 * @param data Data to be hashed.
 */
export function sha256 (data: BinaryLike): Buffer {
  return createHash('sha256').update(data).digest()
}

/**
 * Calculates merkle tree root from the hash digest and proof array.
 * @param nodes Merkle tree proof used to verify the data hash digest.
 * @param hash Digest of the data used to verify.
 */
export function merkleRoot (nodes: Proof[], hash: string): string {
  try {
    let digest: Buffer
    if (hash.length === 44) {
      digest = Buffer.from(hash, 'base64')
    } else {
      digest = Buffer.from(hash, 'hex')
    }

    for (const n of nodes) {
      const nodeBuffer = Buffer.from(n.data, 'hex')
      switch (n.position) {
        case 'left': {
          const concat = Buffer.concat([nodeBuffer, digest])
          digest = sha256(concat)
          break
        }
        case 'right': {
          const concat = Buffer.concat([digest, nodeBuffer])
          digest = sha256(concat)
          break
        }
        default:
          break
      }
    }
    return digest.toString('hex')
  } catch (error) {
    console.log(error)
    return ''
  }
}

/**
 * Calculates the tip block hash that can be compared with the anchor on the public blockchain
 * @param blocks Array of blocks sorted by block height.
 * @param digest Merkle tree root hash included in the first block.
 */
export function blockHash (blocks: Block[], digest: string): string {
  try {
    const digestBuffer = Buffer.from(digest, 'hex')
    const prevHashBuffer = Buffer.from(blocks[0].prevBlockHash, 'hex')
    let blockHash = sha256(Buffer.concat([prevHashBuffer, digestBuffer]))

    // Loop through the block-chain and calculate block hashes.
    for (let i = 1; i < blocks.length; i++) {
      const hashBuffer = Buffer.from(blocks[i].merkleRoot, 'hex')
      blockHash = sha256(Buffer.concat([blockHash, hashBuffer]))
    }

    return blockHash.toString('hex')
  } catch (error) {
    console.log(error)
    return ''
  }
}

/**
 * Validate if input is in JSON format.
 * @param value Value to validate.
 */
export function validateJSON (value: any) {
  try {
    value = typeof value !== 'string'
      ? JSON.stringify(value)
      : value
    value = JSON.parse(value)
  } catch (e) {
    return false
  }
  return typeof value === 'object' && value !== null
}
