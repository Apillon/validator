/**
 * Merkle tree proof definition included in verification.
 */
export interface Proof {
  /**
   * Position of the node in the tree structure.
   */
  position: string,

  /**
   * Data hash of the node.
   */
  data: string
}
