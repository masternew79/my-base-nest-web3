import axios from 'axios';
import { BSC_API_KEY, BSC_TESTNET } from 'src/constants';

interface FetchTransactionParams {
  chainId: number;
  address: string;
  startBlock: string;
}

const DOMAIN_BSC_TESTNET = 'https://api-testnet.bscscan.com/api';
const DOMAIN_BSC_MAINNET = 'https://api.bscscan.com/api';

export class BscScan {
  static async fetchTransactions({
    chainId,
    address,
    startBlock,
  }: FetchTransactionParams) {
    const url =
      chainId == BSC_TESTNET ? DOMAIN_BSC_TESTNET : DOMAIN_BSC_MAINNET;
    try {
      const response = await axios.get(url, {
        params: {
          module: 'account',
          address,
          apikey: BSC_API_KEY,
          action: 'txlist',
          sort: 'asc',
          startblock: startBlock,
        },
      });

      if (response.data.status == 1) {
        return response.data.result;
      } else {
        // console.log('Error fetchTransactions:', response.data)
        return [];
      }
    } catch (error) {
      console.log('Request error:', error);
      return [];
    }
  }
}
