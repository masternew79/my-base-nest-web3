import web3 from 'web3';

export class Web3 {
  static httpProvider(chainId: number) {
    if (chainId == +process.env.BSC_CHAIN_ID_MAINNET) {
      return new web3(
        new web3.providers.HttpProvider(process.env.BSC_HTTP_PROVIDER_MAINNET),
      );
    } else {
      return new web3(
        new web3.providers.HttpProvider(process.env.BSC_HTTP_PROVIDER_TESTNET),
      );
    }
  }

  static wsProvider(chainId: number) {
    const options = {
      timeout: 30000,
      clientConfig: {
        // Useful to keep a connection alive
        keepalive: true,
        keepaliveInterval: 60000, // ms
      },

      // Enable auto reconnection
      reconnect: {
        auto: true,
        delay: 5000, // ms
        maxAttempts: 5,
        onTimeout: false,
      },
    };

    if (chainId === +process.env.BSC_CHAIN_ID_MAINNET) {
      return new web3(
        new web3.providers.WebsocketProvider(
          process.env.BSC_WS_PROVIDER_MAINNET,
          options,
        ),
      );
    } else {
      return new web3(
        new web3.providers.WebsocketProvider(
          process.env.BSC_WS_PROVIDER_TESTNET,
          options,
        ),
      );
    }
  }

  static async getTransactionReceipt(txHash: string, chainId: number) {
    const web3 = Web3.httpProvider(chainId);

    try {
      return await web3.eth.getTransactionReceipt(txHash);
    } catch (error) {
      console.log('Error getTransactionReceipt:', error);
      return null;
    }
  }

  static async getTransaction(txHash: string, chainId: number) {
    try {
      const web3 = Web3.httpProvider(chainId);
      return await web3.eth.getTransaction(txHash);
    } catch (error) {
      console.log('Error getTransaction:', error);
      return null;
    }
  }

  static async getBlockNumber(chainId: number) {
    try {
      const web3 = Web3.httpProvider(chainId);
      return await web3.eth.getBlockNumber();
    } catch (error) {
      console.log('Error getBlock:', error);
      return null;
    }
  }

  static async getBlock(blockNumber: number, chainId: number) {
    try {
      const web3 = Web3.httpProvider(chainId);
      return await web3.eth.getBlock(blockNumber);
    } catch (error) {
      console.log('Error getBlock:', error);
      return null;
    }
  }

  static fromWei(weiNumber: string) {
    return +web3.utils.fromWei(weiNumber);
  }

  static toWei(number: number) {
    return web3.utils.toWei(number + '');
  }
}
