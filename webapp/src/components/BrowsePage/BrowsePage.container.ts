import { connect } from 'react-redux'

import { RootState } from '../../modules/reducer'
import {
  getIsFullscreen,
  getVendor,
  getPathname
} from '../../modules/routing/selectors'
import { MapStateProps } from './BrowsePage.types'
import BrowsePage from './BrowsePage'

const mapState = (state: RootState): MapStateProps => ({
  vendor: getVendor(state),
  isFullscreen: getIsFullscreen(state),
  pathname: getPathname(state)
})

const mapDispatch = () => ({})

export default connect(mapState, mapDispatch)(BrowsePage)
