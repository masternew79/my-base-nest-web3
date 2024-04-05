import { Web3 } from 'src/utils/web3';
import { Contract, ProviderType } from './contract';

export async function signMessage({
  chainId,
  amount,
  address,
  timeout,
}: {
  chainId: number;
  amount: string;
  address: string;
  timeout: number;
}) {
  const private_key = process.env.PRIVATE_KEY_SIGN_MESSAGE;
  const web3 = Web3.httpProvider(chainId);
  const withdrawContract = Contract.getWithdrawProfitContract({
    chainId: chainId,
    providerType: ProviderType.HTTP,
  });
  const currentNonce = await withdrawContract.methods.nonce(address).call();
  const nonce = +currentNonce;
  console.log(
    'amount, address, timeout, nonce:',
    amount,
    address,
    timeout,
    nonce,
  );
  const hash = web3.utils.keccak256(
    web3.eth.abi.encodeParameters(
      ['uint256', 'address', 'uint256', 'uint256'],
      [amount, address, timeout, nonce],
    ),
  );
  const { v, r, s } = web3.eth.accounts.sign(hash, private_key);
  return {
    signature: {
      v: v,
      r: r,
      s: s,
    },
    nonce,
  };
}
