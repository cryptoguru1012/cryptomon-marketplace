import React from 'react'
import { t } from '@kmon/dapps/dist/modules/translation/utils'
import { Container, Header } from '@kmon/ui'
import { getNFTName } from '../../../modules/nft/utils'
import { PageHeader } from '../../PageHeader'
import { NFTImage } from '../../NFTImage'
import { Row } from '../../Layout/Row'
import { Column } from '../../Layout/Column'
import { Title } from '../Title'
import { Owner } from '../Owner'
import { Badge } from '../Badge'
import { OrderDetails } from '../OrderDetails'
import { Actions } from '../Actions'
import { Bids } from '../Bids'
import { TransactionHistory } from '../TransactionHistory'
import { Props } from './ENSDetail.types'

const ENSDetail = (props: Props) => {
  const { nft } = props
  return (
    <>
      <PageHeader>
        <NFTImage nft={nft} showMonospace />
      </PageHeader>
      <Container className="ENSDetail">
        <Title
          left={
            <Header size="large">
              <div className="text">
                {getNFTName(nft)}
                <Badge color="#37333d">{t('global.ens')}</Badge>
              </div>
            </Header>
          }
          right={<Owner nft={nft} />}
        />
        <Row>
          <Column align="left" grow={true}>
            <OrderDetails nft={nft} />
          </Column>
          <Column align="right">
            <Actions nft={nft} />
          </Column>
        </Row>
        <Bids nft={nft} />
        <TransactionHistory nft={nft} />
      </Container>
    </>
  )
}

export default React.memo(ENSDetail)
