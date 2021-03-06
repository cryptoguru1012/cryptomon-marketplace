import React from 'react'
import { Header } from '@kmon/ui'
import { t } from '@kmon/dapps/dist/modules/translation/utils'

import { Row } from '../../Layout/Row'
import './Highlights.css'

const Highlights = (props: { children: React.ReactNode }) => {
  return (
    <div className="Highlights">
      <Header sub>{t('highlights.title')}</Header>
      <Row>{props.children}</Row>
    </div>
  )
}

export default React.memo(Highlights)
