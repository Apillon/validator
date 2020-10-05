/**
 * Block structure definition included in verification.
 */
export interface Block {
  /**
   * Block height.
   */
  blockHeight: Number;

  /**
   * Previous block hash.
   */
  prevBlockHash: string;

  /**
   * Merkle tree root hash.
   */
  merkleRoot: string;
}
