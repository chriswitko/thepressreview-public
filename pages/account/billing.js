import React, { Component } from 'react'
import { compose } from 'recompose'
import Layout from '../../components/layout'
import Panel from '../../components/panel'
import Inside from '../../components/inside'
import H1 from '../../components/h1'
import H3 from '../../components/h3'
import H4 from '../../components/h4'
import LinkList from '../../components/linkList'
import LinkListItem from '../../components/linkListItem'
import Space from '../../components/space'
import Note from '../../components/note'
import Alert from '../../components/alert'
import Link from '../../components/link'
import { redirect } from '../../utils'
import { withLocale } from '../../components/withLocale'
import { withUser } from '../../components/withUser'
import withAuth from '../../components/withAuth'
import NProgress from 'nprogress'
import { ReadersApi } from '../../utils/api'

class PageBilling extends Component {
  static async getInitialProps ({ query: { card_error, card_success } }) {
    return {
      card_error,
      card_success
    }
  }

  constructor (props) {
    super(props)

    this.onLogout = this.onLogout.bind(this)
    this.onRemoveCard = this.onRemoveCard.bind(this)
  }

  onLogout () {
    redirect({}, '/logout', true)
  }

  onRemoveCard () {
    NProgress.start()
    ReadersApi.removeCard({}, this.props.token).then((res) => {
      NProgress.done()
      redirect({}, '/account/billing', true)
    }).catch(err => {
      console.log('err', err)
      NProgress.done()
    })
  }

  render () {
    const { user = {} } = this.props
    return (
      <div>
        <Layout {...this.props}>
          <div className='mainPage'>
            <Panel alignCenter>
              <div>
                <Link href='/settings'>← Back to Settings</Link>
                <H1 alignCenter>Billing &amp; Invoices</H1>
                <H4 alignCenter>We use Stripe to process all payments. We don't store any pieces of information about your credit card.</H4>
              </div>
            </Panel>
            <Space />
            {this.props.card_error ? (
              <Space>
                <Panel alignCenter>
                  <Alert danger fullWidth>Sorry. We had a problem to process your Credit Card information. Please double-check all details and try again.</Alert>
                </Panel>
              </Space>
            ) : ''}
            {this.props.card_success ? (
              <Space>
                <Panel alignCenter>
                  <Alert success fullWidth>Your Credit Card added to your account. Thank You.</Alert>
                </Panel>
              </Space>
            ) : ''}
            <Panel>
              <Inside fullWidth>
                <H3>Your Credit Card</H3>
                <Space sm />
                <LinkList>
                  <LinkListItem>
                    {user.stripe_cc_id ? (
                      <div>
                        <Note>{user.stripe_cc_brand}: XXXX-XXXX-XXXX-{user.stripe_cc_last4}</Note> &mdash; <Link href='/account/card'>Update your Credit Card</Link>
                      </div>
                    ) : <Link href='/account/card'>Add a Credit Card</Link>}
                  </LinkListItem>
                  {user.stripe_cc_id ? (
                    <LinkListItem>
                      <Link reload extClick={this.onRemoveCard}>{user.plan !== 'free' ? 'Cancel my subscription & remove this card' : 'Remove this card'}</Link>
                    </LinkListItem>
                  ) : ''}
                </LinkList>
                <Space />
                <H3>Billing Notes</H3>
                <Space sm />
                <LinkList>
                  <LinkListItem>
                    <Note>chris.witko@gmail.com</Note> &mdash; <Link href='/account/notes'>Change who gets invoice emails</Link>
                    <Space sm />
                    <Note><small>Note: You can add a company address or other billing notes to invoices too.</small></Note>
                  </LinkListItem>
                </LinkList>
                {user.plan === 'premium' ? (
                  <div>
                    <Space />
                    <H3>Plan</H3>
                    <LinkList>
                      <LinkListItem>
                        <Note>Premium</Note> &mdash; <Link href='/account/plan'>Manage your plan</Link>
                      </LinkListItem>
                    </LinkList>
                  </div>
                ) : ''}
              </Inside>
            </Panel>
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
)(PageBilling)
