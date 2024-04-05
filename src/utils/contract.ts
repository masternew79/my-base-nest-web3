import { BSC_TESTNET } from 'src/constants';
import { AbiItem } from 'web3-utils';
import { Web3 } from './web3';
import AIHomeDAOAbi from '../constants/abis/aihome-dao.json';
import AIHomeMemberAbi from '../constants/abis/aihome-member.json';
import WithDrawAbi from '../constants/abis/withdraw-profit.json';
import { ADDRESSES } from 'src/constants/addressess';

interface GetContractParams {
  abi?: AbiItem[];
  address?: string;
  chainId: number;
  providerType: ProviderType;
}

export enum ProviderType {
  HTTP = 'HTTP',
  WS = 'WS',
}

export class Contract {
  public static getContract({
    abi,
    chainId,
    address,
    providerType,
  }: GetContractParams) {
    const web3 =
      providerType == ProviderType.WS
        ? Web3.wsProvider(chainId)
        : Web3.httpProvider(chainId);

    const contract = new web3.eth.Contract(abi, address);

    return contract;
  }
  public static getAIHomeDAOContract({
    chainId,
    providerType,
  }: GetContractParams) {
    const contract = Contract.getContract({
      abi: AIHomeDAOAbi as AbiItem[],
      chainId,
      address: ADDRESSES.AIHomeDAO[chainId],
      providerType,
    });

    return contract;
  }

  public static getAIHomeMemberContract({
    chainId,
    providerType,
  }: GetContractParams) {
    const contract = Contract.getContract({
      abi: AIHomeMemberAbi as AbiItem[],
      chainId,
      address: ADDRESSES.AIHomeMember[chainId],
      providerType,
    });

    return contract;
  }

  public static getWithdrawProfitContract({
    chainId,
    providerType,
  }: GetContractParams) {
    const contract = Contract.getContract({
      abi: WithDrawAbi as AbiItem[],
      chainId,
      address: ADDRESSES.WithdrawProfit[chainId],
      providerType,
    });

    return contract;
  }
}
