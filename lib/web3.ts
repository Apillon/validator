import Web3 from 'web3'

declare global {
  interface Window { ethereum: any; }
}

/**
 * Class for working with `web3` library.
 */
export class Web3Helper {
  public web3: Web3 | undefined;
  public contract: string = '';

  /**
   * Tries to connect to metamask RPC.
   */
  connect (): boolean {
    if (typeof window.ethereum !== 'undefined') {
      this.web3 = new Web3(window.ethereum)
      return true
    }
    return false
  }

  /**
   * Reads transaction data and parses it. The data stored on the blockchain is the appId, block height and digest data.
   * @param txId Transaction ID for the anchor.
   */
  async readTxData (txId: string): Promise<any> {
    if (typeof this.web3 !== 'undefined') {
      const transaction = await this.web3.eth.getTransaction(txId)
      if (transaction !== null) {
        return this.web3.eth.abi.decodeParameters(['string', 'uint256', 'string'], transaction.input.substr(10))
      }
    }
    return null
  }
}
