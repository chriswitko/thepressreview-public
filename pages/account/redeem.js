import React, { Component } from 'react'
import { compose } from 'recompose'
import Layout from '../../components/layout'
import Panel from '../../components/panel'
import H1 from '../../components/h1'
import Link from '../../components/link'
import Inside from '../../components/inside'
import Space from '../../components/space'
import Row from '../../components/row'
import Column from '../../components/column'
import Label from '../../components/label'
import Text from '../../components/text'
import ButtonSubmit from '../../components/buttonSubmit'
import { withLocale } from '../../components/withLocale'
import { withUser } from '../../components/withUser'
import withAuth from '../../components/withAuth'
import NProgress from 'nprogress'
import { ReadersApi } from '../../utils/api'
import { redirect } from '../../utils'

class PageBuy extends Component {
  constructor (props) {
    super(props)

    this.state = {
      redeem_code: ''
    }

    this.onRedeem = this.onRedeem.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  onRedeem () {
    NProgress.start()
    ReadersApi.upgrade({
      plan: 'premium',
      redeem_code: this.state.redeem_code
    }, this.props.token).then((res) => {
      NProgress.done()
      redirect({}, '/account/plan?redeem_success=true')
    }).catch(err => {
      console.log('err', err)
      NProgress.done()
      redirect({}, '/account/plan?redeem_error=true')
    })
  }

  handleInputChange (event) {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name

    this.setState({
      [name]: value
    })
  }

  render () {
    return (
      <div>
        <Layout {...this.props}>
          <div className='mainPage'>
            <Panel alignCenter>
              <div>
                <Link href='/settings'>← Back to Settings</Link>
                <H1 alignCenter>Redeem Code</H1>
              </div>
            </Panel>
            <div>
              <Panel>
                <Inside medium>
                  <Space>
                    <Row>
                      <div>
                        <img src='/images/qr_code.png' width='80' />
                      </div>
                      <div>&nbsp;&nbsp;</div>
                      <Column>
                        <div>
                          <Label>
                            Enter your code below
                          </Label>
                          <Text name='redeem_code' value={this.state.redeem_code} onChange={this.handleInputChange} />
                        </div>
                      </Column>
                    </Row>
                  </Space>
                  <ButtonSubmit fullWidth onClick={this.onRedeem}>Redeem</ButtonSubmit>
                </Inside>
              </Panel>
              <Space />
              <Panel>
                Any questions? Contact&nbsp;<Link href='mailto:inbox@thepressreview.com?subject=I have a question'>The Press Review Support</Link>, and we’ll help.
              </Panel>
            </div>
          </div>
        </Layout>
      </div>
    )
  }
}

export default compose(
  withLocale,
  withUser,
  withAuth('/settings')
)(PageBuy)
