import { VendorName } from './types'

export const MAX_QUERY_SIZE = 1000
export const MAX_PAGE = 10000
export const PAGE_SIZE = 24

export function getMaxQuerySize(vendor: VendorName) {
  switch (vendor) {
    case VendorName.DECENTRALAND:
      return MAX_QUERY_SIZE
    case VendorName.SUPER_RARE:
      return MAX_QUERY_SIZE
    case VendorName.MAKERS_PLACE:
      return MAX_QUERY_SIZE
    case VendorName.KNOWN_ORIGIN:
      return MAX_QUERY_SIZE
    case VendorName.KRYPTOMON:
      return MAX_QUERY_SIZE
  }
}
