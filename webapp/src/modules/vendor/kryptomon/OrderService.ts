import { Address } from 'web3x-es/address'
import { toWei } from 'web3x-es/utils'
import { ContractName, getContract } from '@kmon/transactions'
import { Wallet } from '@kmon/dapps/dist/modules/wallet/types'
import { Marketplace } from '../../../contracts/Marketplace'
import { ContractFactory } from '../../contract/ContractFactory'
import { NFT } from '../../nft/types'
import { Order, OrderStatus } from '../../order/types'
import { orderAPI } from './order/api'
import { VendorName } from '../types'
import { OrderService as OrderServiceInterface } from '../services'
import { sendTransaction } from '../../wallet/utils'

export class OrderService
  implements OrderServiceInterface<VendorName.KRYPTOMON> {
  async fetchByNFT(nft: NFT, status?: OrderStatus) {
    const orders = await orderAPI.fetchByNFT(
      nft.contractAddress,
      nft.tokenId,
      status
    )
    return orders as Order[]
  }

  async create(
    wallet: Wallet | null,
    nft: NFT,
    price: number,
    paymentToken: string,
    expiresAt: number
  ) {
    const contractData = getContract(ContractName.Marketplace, nft.chainId)
    const marketplace = await this.getMarketplaceContract(contractData.address)

    if (!wallet) {
      throw new Error('Invalid address. Wallet must be connected.')
    }
    const from = Address.fromString(wallet.address)

    const createOrder = marketplace.methods.createOrder(
      Address.fromString(nft.contractAddress),
      nft.tokenId,
      toWei(price.toString(), 'ether'),
      Address.fromString(paymentToken),
      expiresAt
    )

    return sendTransaction(createOrder, contractData, from)
  }

  async execute(
    wallet: Wallet | null,
    nft: NFT,
    order: Order,
    paymentToken: string,
    fingerprint?: string
  ) {
    const contractData = getContract(ContractName.Marketplace, nft.chainId)
    const marketplace = await this.getMarketplaceContract(contractData.address)
    const { price } = order

    if (!wallet) {
      throw new Error('Invalid address. Wallet must be connected.')
    }
    const from = Address.fromString(wallet.address)

    if (fingerprint) {
      return marketplace.methods
        .safeExecuteOrder(
          Address.fromString(nft.contractAddress),
          nft.tokenId,
          price,
          Address.fromString(paymentToken),
          fingerprint
        )
        .send({ from })
        .getTxHash()
    } else {
      const executeOrder = marketplace.methods.executeOrder(
        Address.fromString(nft.contractAddress),
        nft.tokenId,
        price,
        Address.fromString(paymentToken)
      )
      if (order.paymentToken === Address.ZERO.toString())
        return sendTransaction(executeOrder, contractData, from, Number(price))
      return sendTransaction(executeOrder, contractData, from)
    }
  }

  async cancel(wallet: Wallet | null, nft: NFT) {
    const contractData = getContract(ContractName.Marketplace, nft.chainId)
    const marketplace = await this.getMarketplaceContract(contractData.address)

    if (!wallet) {
      throw new Error('Invalid address. Wallet must be connected.')
    }

    const from = Address.fromString(wallet.address)
    const cancelOrder = marketplace.methods.cancelOrder(
      Address.fromString(nft.contractAddress),
      nft.tokenId
    )

    return sendTransaction(cancelOrder, contractData, from)
  }

  canSell() {
    return true
  }

  private getMarketplaceContract(address: string) {
    return ContractFactory.build(Marketplace, address)
  }
}
