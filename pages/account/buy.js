import React, { Component } from 'react'
import { compose } from 'recompose'
import Layout from '../../components/layout'
import Panel from '../../components/panel'
import H1 from '../../components/h1'
import Card from '../../components/card'
import Link from '../../components/link'
import Note from '../../components/note'
import Inside from '../../components/inside'
import Space from '../../components/space'
import Label from '../../components/label'
import Row from '../../components/row'
import Column from '../../components/column'
import Select from '../../components/select'
import ButtonSubmit from '../../components/buttonSubmit'
import { withLocale } from '../../components/withLocale'
import { withUser } from '../../components/withUser'
import withAuth from '../../components/withAuth'
import { withCard } from '../../components/withCard'
import NProgress from 'nprogress'
import { ReadersApi } from '../../utils/api'
import { countries } from '../../utils/data'
import { redirect } from '../../utils'

class PageBuy extends Component {
  static async getInitialProps ({ query: { plan, country = 'GB' } }) {
    return {
      price: 5.95,
      plan,
      country
    }
  }

  async componentDidMount () {
    this.setState({
      loadingTax: true
    })
    const tax = await ReadersApi.testTax({
      price: this.state.price,
      country: this.state.country,
      vat_number: this.props.user.vat_id
    })

    this.setState({
      loadingTax: false,
      price: parseFloat(tax.price).toPrecision(3),
      vat_rate: tax.vat_rate,
      vat_total: parseFloat(tax.vat_total).toPrecision(3),
      total: parseFloat(tax.total).toPrecision(3)
    })
  }

  constructor (props) {
    super(props)

    this.state = {
      loadingTax: true,
      vat_id: props.user.vat_id,
      plan: props.plan || 'premium',
      country: props.country,
      price: props.price,
      total: props.total,
      vat_rate: props.vat_rate,
      vat_total: props.vat_total
    }

    this.onBuy = this.onBuy.bind(this)
    this.onSave = this.onSave.bind(this)
    this.handleCountryChange = this.handleCountryChange.bind(this)
  }

  onBuy () {
    const subscription = {
      cc_number: this.props.cc_number,
      cc_exp_month: this.props.cc_exp_month,
      cc_exp_year: this.props.cc_exp_year,
      cc_cvv: this.props.cc_cvv,
      cc_zip: this.props.cc_zip,
      country: this.state.country,
      plan: this.state.plan
    }
    NProgress.start()
    ReadersApi.upgrade(subscription, this.props.token).then((res) => {
      NProgress.done()
      redirect({}, '/account/plan?upgrade_success=true', true)
    }).catch(err => {
      console.log('err', err)
      NProgress.done()
      redirect({}, '/account/plan?upgrade_error=true', true)
    })
  }

  onSave () {
    const subscription = {
      cc_number: this.props.cc_number,
      cc_exp_month: this.props.cc_exp_month,
      cc_exp_year: this.props.cc_exp_year,
      cc_cvv: this.props.cc_cvv,
      cc_zip: this.props.cc_zip
    }
    NProgress.start()
    ReadersApi.updateCard(subscription, this.props.token).then((res) => {
      NProgress.done()
      redirect({}, '/account/plan?card_success=true', true)
    }).catch(err => {
      console.log('err', err)
      NProgress.done()
      redirect({}, '/account/plan?card_error=true', true)
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

  handleCountryChange (event) {
    redirect({}, `/account/buy?plan=${this.state.plan}&country=${event.target.value}`, true)
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
                <H1 alignCenter>{user.stripe_cc_id ? 'Upgrade to Premium' : 'Add your credit card'}</H1>
              </div>
            </Panel>
            <div>
              {user.stripe_cc_id ? (
                <div>
                  <Panel>
                    <Inside small>
                      {this.state.loadingTax ? <p>Loading data....</p> : (
                        <div>
                          <Row>
                            <Column>
                              Premium
                            </Column>
                            <Column alignRight>
                              ${this.state.price}
                            </Column>
                          </Row>
                          <Row>
                            <Column>
                              VAT @ {this.state.vat_rate}%
                            </Column>
                            <Column alignRight>
                              ${this.state.vat_total}
                            </Column>
                          </Row>
                          {user.vat_id ? (
                            <Row>
                              <Column>
                                <Note><small>VAT ID</small></Note>
                              </Column>
                              <Column alignRight>
                                <Note><small>{user.vat_id}</small></Note>
                              </Column>
                            </Row>
                          ) : ''}
                          <Space sm />
                          <Row>
                            <Column>
                              <strong>Total</strong>
                            </Column>
                            <Column alignRight>
                              <strong>${this.state.total} / month</strong>
                            </Column>
                          </Row>
                          <Space />
                          <Space><Note>{user.stripe_cc_brand}: XXXX-XXXX-XXXX-{user.stripe_cc_last4}</Note> &mdash; <Link href='/account/card'>Update your card</Link></Space>
                          <Space>
                            <div>
                              <Label>
                                Country
                              </Label>
                              <Select name='country' value={this.state.country} onChange={this.handleCountryChange}>
                                {Object.keys(countries).map((value, key) => <option key={key} value={value}>{countries[value]}</option>)}
                              </Select>
                            </div>
                          </Space>
                          <Space>
                            <div>
                              <Note><small>If you wish to add or update your VAT ID please edit your <Link href='/billing/notes'>billing settings</Link>.</small></Note>
                            </div>
                          </Space>
                          <ButtonSubmit href='/settings' fullWidth onClick={this.onBuy}>Pay Now</ButtonSubmit>
                        </div>
                      )}
                    </Inside>
                  </Panel>
                </div>
              ) : <Card t={this.props.t} btnTitle='Save & Select Plan' handleInputChange={this.props.handleInputChange} onSubmit={this.onSave} />}
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
  withAuth('/settings'),
  withCard
)(PageBuy)
