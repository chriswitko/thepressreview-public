import React, { Component } from 'react'
import Layout from '../components/layout'
import Panel from '../components/panel'
import H1 from '../components/h1'
import Space from '../components/space'
import Register from '../components/register'
import PeopleSaying from '../components/peopleSaying'
import Number from '../components/number'
import Highlight from '../components/highlight'
import { withLocale } from '../components/withLocale'
import { withUser } from '../components/withUser'
import { withRegister } from '../components/withRegister'
import Alert from '../components/alert'
import Link from '../components/link'
import cookie from 'react-cookies'

class Index extends Component {
  constructor (props) {
    super(props)

    this.state = {
      has_agreed: 'yes'
    }

    this.onCookieClose = this.onCookieClose.bind(this)
  }

  onCookieClose () {
    cookie.save('has_agreed', 'yes', { path: '/' })
    this.setState({
      has_agreed: 'yes'
    })
  }

  componentDidMount () {
    if (!cookie.load('has_agreed')) {
      this.setState({
        has_agreed: 'no'
      })
    }
  }

  render () {
    return (
      <div>
        {this.state.has_agreed === 'yes' ? '' : <Alert tip flash onClose={this.onCookieClose}>This website or its third party tools use cookies, which are necessary to its functioning and required to achieve the purposes illustrated in the <Link href='/privacy'>cookie policy</Link>. By closing this banner you agree to the use of cookies.</Alert>}
        <Layout {...this.props}>
          <div className='mainPage'>
            <Panel alignCenter>
              <div>
                <H1 alignCenter>We deliver <Highlight>news headlines</Highlight> to your inbox</H1>
              </div>
            </Panel>
            <Space />
            <Panel>
              <div>
                <div className='row' >
                  <div className='col-s'>
                    <Panel column>
                      <div><Number number='&#10004;'>Your daily guide to the news</Number></div>
                      <Space sm />
                      <div><Number number='&#10004;'><Highlight>No distractions</Highlight>, just the news you want to read</Number></div>
                      <Space sm />
                      <div><Number number='&#10004;'>Always on time, when you need it</Number></div>
                      <Space sm />
                      <div><Number number='&#10004;'><Highlight>It's FREE</Highlight></Number></div>
                    </Panel>
                  </div>
                  <Space horizontal />
                  <div className='col-m'>
                    <Register disabledSubmit={this.props.disabledSubmit} email={this.props.email} loading={this.props.loading} onEmailChange={this.props.onEmailChange} onSubmit={this.props.onSubmit} onKeyPress={this.props.onKeyPress} />
                  </div>
                </div>
              </div>
            </Panel>
            <Space />
            <Space />
            <Panel alignCenter>
              <div>
                <H1 alignCenter colored>Powered by <Highlight>200+ sites &amp; newspapers</Highlight> from all around the world</H1>
                <Space />
                <img src='/images/logos_en.png' width='80%' />
              </div>
            </Panel>
            <Space />
            <hr />
            <PeopleSaying />
            <Space />
          </div>
        </Layout>
      </div>
    )
  }
}

export default withUser(withLocale(withRegister(Index)))
