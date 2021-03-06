import { NFTCategory } from '@kmon/schemas'
import { t } from '@kmon/dapps/dist/modules/translation/utils'
import { Wallet } from '@kmon/dapps/dist/modules/wallet/types'
import { SortDirection, SortBy } from '../routing/types'
import { addressEquals } from '../wallet/utils'
import { NFT, NFTSortBy } from './types'

export function getNFTId(contractAddress: string, tokenId: string) {
  return contractAddress + '-' + tokenId
}

export function getNFTName(
  nft: Pick<NFT, 'vendor' | 'name' | 'category' | 'data'>
) {
  if (nft.name) {
    return nft.name
  }

  switch (nft.category) {
    case NFTCategory.KRYPTOMON:
      return t('global.kryptomon')

    case 'estate':
      return t('global.estate')

    case 'wearable':
      return t('global.wearable')

    case 'ens':
      return t('global.ens')

    case 'art':
      return t('global.art')

    default:
      return t('global.nft')
  }
}

export function getOrder(sortBy: SortBy) {
  let orderBy: NFTSortBy = NFTSortBy.CREATED_AT
  let orderDirection: SortDirection = SortDirection.DESC

  switch (sortBy) {
    case SortBy.NAME: {
      orderBy = NFTSortBy.NAME
      orderDirection = SortDirection.ASC
      break
    }
    case SortBy.NEWEST: {
      orderBy = NFTSortBy.CREATED_AT
      orderDirection = SortDirection.DESC
      break
    }
    case SortBy.RECENTLY_LISTED: {
      orderBy = NFTSortBy.ORDER_CREATED_AT
      orderDirection = SortDirection.DESC
      break
    }
    case SortBy.CHEAPEST: {
      orderBy = NFTSortBy.PRICE
      orderDirection = SortDirection.ASC
      break
    }
    case SortBy.DEAREST: {
      orderBy = NFTSortBy.PRICE
      orderDirection = SortDirection.DESC
      break
    }
  }

  return [orderBy, orderDirection] as const
}

export function getSortBy(orderBy: NFTSortBy, orderDirection?: SortDirection) {
  let sortBy: SortBy = SortBy.NEWEST

  switch (orderBy) {
    case NFTSortBy.NAME: {
      sortBy = SortBy.NAME
      break
    }
    case NFTSortBy.CREATED_AT: {
      sortBy = SortBy.NEWEST
      break
    }
    case NFTSortBy.ORDER_CREATED_AT: {
      sortBy = SortBy.RECENTLY_LISTED
      break
    }
    case NFTSortBy.PRICE: {
      if (orderDirection === SortDirection.ASC) sortBy = SortBy.CHEAPEST
      if (orderDirection === SortDirection.DESC) sortBy = SortBy.DEAREST
      break
    }
  }

  return sortBy
}

export function getNFT(
  contractAddress: string | null,
  tokenId: string | null,
  nfts: Record<string, NFT>
): NFT | null {
  if (!contractAddress || !tokenId) {
    return null
  }

  const nftId = getNFTId(contractAddress, tokenId)
  return nftId in nfts ? nfts[nftId] : null
}

export function isOwnedBy(nft: NFT, wallet: Wallet | null) {
  return addressEquals(wallet?.address, nft.owner)
}
