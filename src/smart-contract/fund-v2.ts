import {ethers} from 'ethers';
import * as fundV2Abi from './abi/fundV2.json';

export class FundV2 {
  constructor(private readonly rpcNodeUrl: string, private readonly privateKey: string) {}

  async deposit({
    collectionAddress,
    amount,
    slippage,
  }: {
    collectionAddress: string;
    amount: number;
    slippage: number;
  }): Promise<Record<string, unknown>> {
    try {
      const provider = new ethers.JsonRpcProvider(this.rpcNodeUrl);
      const signer = new ethers.Wallet(this.privateKey, provider);

      const contract = new ethers.Contract(collectionAddress, fundV2Abi, signer);

      const transaction = await contract.deposit(amount, slippage);

      const receipt = await transaction.wait();

      return {
        transaction,
        receipt,
      };
    } catch (e) {
      throw e;
    }
  }

  async withdraw({
    collectionAddress,
    amount,
    slippage,
  }: {
    collectionAddress: string;
    amount: number;
    slippage: number;
  }): Promise<Record<string, unknown>> {
    try {
      const provider = new ethers.JsonRpcProvider(this.rpcNodeUrl);
      const signer = new ethers.Wallet(this.privateKey, provider);

      const contract = new ethers.Contract(collectionAddress, fundV2Abi, signer);

      const transaction = await contract.withdraw(amount, slippage);
      const receipt = await transaction.wait();

      return {
        transaction,
        receipt,
      };
    } catch (e) {
      throw e;
    }
  }

  async rebalance({
    collectionAddress,
    toAddress,
    targets,
    slippage,
  }: {
    collectionAddress: string;
    toAddress: string[];
    targets: string[];
    slippage: number;
  }): Promise<Record<string, unknown>> {
    try {
      const provider = new ethers.JsonRpcProvider(this.rpcNodeUrl);
      const signer = new ethers.Wallet(this.privateKey, provider);

      const contract = new ethers.Contract(collectionAddress, fundV2Abi, signer);

      const transaction = await contract.Rebalance(toAddress, targets, slippage);
      const receipt = await transaction.wait();

      return {
        transaction,
        receipt,
      };
    } catch (e) {
      throw e;
    }
  }
}
