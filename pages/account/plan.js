import React, { Component } from 'react'
import Layout from '../../components/layout'
import Panel from '../../components/panel'
import Inside from '../../components/inside'
import H1 from '../../components/h1'
import H3 from '../../components/h3'
import H4 from '../../components/h4'
import ButtonSubmit from '../../components/buttonSubmit'
import Space from '../../components/space'
import Note from '../../components/note'
import Link from '../../components/link'
import Alert from '../../components/alert'
import { withLocale } from '../../components/withLocale'
import { withUser } from '../../components/withUser'
import withAuth from '../../components/withAuth'
import { redirect } from '../../utils'
import NProgress from 'nprogress'
import { ReadersApi } from '../../utils/api'

class PageAccountPlan extends Component {
  static async getInitialProps ({ query: { redeem_error, redeem_success, upgrade_error, upgrade_success, card_error, card_success } }) {
    return {
      redeem_error,
      redeem_success,
      upgrade_error,
      upgrade_success,
      card_error,
      card_success
    }
  }

  constructor (props) {
    super(props)

    this.onSelectPlan = this.onSelectPlan.bind(this)
  }

  setFreePlan () {
    NProgress.start()
    ReadersApi.upgrade({
      plan: 'free'
    }, this.props.token).then((res) => {
      NProgress.done()
      redirect({}, '/account/plan', true)
    }).catch(err => {
      console.log('err', err)
      NProgress.done()
    })
  }

  onSelectPlan (plan) {
    if (plan === 'free') {
      this.setFreePlan()
    } else {
      redirect({}, `/account/buy?plan=${plan}`)
    }
  }

  render () {
    const { user } = this.props

    return (
      <div>
        <Layout {...this.props}>
          <div className='mainPage'>
            <Panel alignCenter>
              <div>
                <Link href='/settings'>← Back to Settings</Link>
                <H1 alignCenter>Let's upgrade + get more!</H1>
              </div>
            </Panel>
            <Panel>
              <H4 alignCenter>Pick a package below and make your newsletter even better.</H4>
            </Panel>
            <Space />
            {this.props.card_error ? (
              <Space>
                <Panel alignCenter>
                  <Alert danger medium>Sorry. We could not process your card. Please try again.</Alert>
                </Panel>
              </Space>
            ) : ''}
            {this.props.card_success ? (
              <Space>
                <Panel alignCenter>
                  <Alert success medium>Congratulations. Your card added.</Alert>
                </Panel>
              </Space>
            ) : ''}
            {this.props.redeem_error ? (
              <Space>
                <Panel alignCenter>
                  <Alert danger medium>Sorry. Your promo code has expired.</Alert>
                </Panel>
              </Space>
            ) : ''}
            {this.props.redeem_success ? (
              <Space>
                <Panel alignCenter>
                  <Alert success medium>Congratulations. Your promo code is applied.</Alert>
                </Panel>
              </Space>
            ) : ''}
            {this.props.upgrade_error ? (
              <Space>
                <Panel alignCenter>
                  <Alert danger medium>Sorry. We have problems to process your order. Please try again.</Alert>
                </Panel>
              </Space>
            ) : ''}
            {this.props.upgrade_success ? (
              <Space>
                <Panel alignCenter>
                  <Alert success medium>Congratulations. Your order processed.</Alert>
                </Panel>
              </Space>
            ) : ''}
            <Panel>
              <Inside alignCenter>
                <H3 alignCenter>FREE</H3>
                <H3 alignCenter>&nbsp;</H3>
                <Space />
                <ButtonSubmit disabled={user.plan === 'free'} onClick={() => this.onSelectPlan('free')}>{user.plan === 'free' ? 'Current' : 'Choose'}</ButtonSubmit>
              </Inside>
              <Space horizontal />
              <Inside alignCenter>
                <H3 alignCenter>PREMIUM</H3>
                {user.redeem_code ? <H3 alignCenter>&nbsp;</H3> : <H3 alignCenter>$5.95 / month</H3>}
                <Space />
                <ButtonSubmit disabled={user.plan === 'premium'} onClick={() => this.onSelectPlan('premium')}>{user.plan === 'premium' ? 'Current' : 'Choose'}</ButtonSubmit>
              </Inside>
            </Panel>
            <Space />
            <Panel alignCenter>
              <H4 alignCenter>
                Get more from PREMIUM?
                <br /><br />
                &#10004; Unlimited number of times<br />
                &#10004; View in browser <Note>(30-day archive)</Note><br />
                &#10004; Premium articles <Note>(coming soon)</Note><br />
                &#10004; Beta Features
              </H4>
            </Panel>
            {user.plan === 'free' ? (
              <div>
                <Space />
                <Panel alignCenter>
                  Have a promo code?&nbsp;&mdash;&nbsp;<Link href='/account/redeem'>Redeem here</Link>
                </Panel>
              </div>
            ) : ''}
          </div>
        </Layout>
      </div>
    )
  }
}

export default withAuth('/account/plan')(withUser(withLocale(PageAccountPlan)))
