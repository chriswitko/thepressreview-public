import React, { Component } from 'react'
import { compose } from 'recompose'
import Layout from '../../components/layout'
import Panel from '../../components/panel'
import H1 from '../../components/h1'
import H4 from '../../components/h4'
import Space from '../../components/space'
import Card from '../../components/card'
import Link from '../../components/link'
import { withLocale } from '../../components/withLocale'
import { withUser } from '../../components/withUser'
import withAuth from '../../components/withAuth'
import { withCard } from '../../components/withCard'
import NProgress from 'nprogress'
import { ReadersApi } from '../../utils/api'
import { redirect } from '../../utils'

class PageCard extends Component {
  constructor (props) {
    super(props)

    this.onSubmit = this.onSubmit.bind(this)
  }

  onSubmit () {
    const card = {
      cc_number: this.props.cc_number,
      cc_exp_month: this.props.cc_exp_month,
      cc_exp_year: this.props.cc_exp_year,
      cc_cvv: this.props.cc_cvv,
      cc_zip: this.props.cc_zip
    }
    NProgress.start()
    ReadersApi.updateCard(card, this.props.token).then((res) => {
      NProgress.done()
      redirect({}, '/account/billing?card_success=true')
    }).catch(err => {
      console.log('err', err)
      NProgress.done()
      redirect({}, '/account/billing?card_error=true')
    })
  }

  render () {
    return (
      <div>
        <Layout {...this.props}>
          <div className='mainPage'>
            <Panel alignCenter>
              <div>
                <Link href='/account/billing'>← Back to Settings</Link>
                <H1 alignCenter>Update your credit card</H1>
                <H4 alignCenter>Changes to your credit card will be effective immediately. All future charges will be charged to this card. Thanks for updating your billing info.</H4>
              </div>
            </Panel>
            <Space />
            <Card t={this.props.t} handleInputChange={this.props.handleInputChange} onSubmit={this.onSubmit} />
          </div>
        </Layout>
      </div>
    )
  }
}

export default compose(
  withLocale,
  withUser,
  withAuth('/settings'),
  withCard
)(PageCard)

// export default withCard(withAuth('/settings')(withUser(withLocale(PageCard))))
