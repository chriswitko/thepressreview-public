import React, { Component } from 'react'
import Layout from '../components/layout'
import Panel from '../components/panel'
import H1 from '../components/h1'
import Note from '../components/note'
import Alert from '../components/alert'
import H4 from '../components/h4'
import ButtonSubmit from '../components/buttonSubmit'
import ButtonLink from '../components/buttonLink'
import Space from '../components/space'
import { withLocale } from '../components/withLocale'
import { redirect } from '../utils'
import { ReadersApi } from '../utils/api'
import NProgress from 'nprogress'

class Login extends Component {
  static async getInitialProps ({ query: { email, resent } }) {
    return {
      email,
      resent
    }
  }

  constructor (props) {
    super(props)

    this.state = {
      resent: props.resent,
      email: props.email
    }

    this.onBackHome = this.onBackHome.bind(this)
    this.onResend = this.onResend.bind(this)
  }

  onResend () {
    if (this.props.email) {
      NProgress.start()
      ReadersApi.resendLoginLink({
        email: this.props.email
      }).then((res) => {
        NProgress.done()
        redirect({}, `?email=${this.props.email}&resent=true`, true)
      }).catch(err => {
        console.log('err', err)
      })
    } else {
      redirect({}, '/', true)
    }
  }

  onBackHome () {
    redirect({}, '/', true)
  }

  render () {
    const { email } = this.props

    return (
      <div>
        <Layout {...this.props}>
          <div className='mainPage'>
            {this.state.resent ? (
              <Space>
                <Panel alignCenter>
                  <Alert success medium>Your login link has been sent to your email address. Please check your inbox again.</Alert>
                </Panel>
              </Space>
            ) : ''}
            <Panel>
              <div>
                <H1 alignCenter>Check your inbox</H1>
              </div>
            </Panel>
            <Panel>
              <div>
                <H4 alignCenter>We have sent a login link to your email address <strong>{email}</strong>.
                  <br />Click the attached link to login to your subscription's settings.
                </H4>
              </div>
            </Panel>
            <Space />
            <Panel alignCenter>
              <ButtonSubmit onClick={this.onResend}>Re-send</ButtonSubmit>
              <Space horizontal />
              <ButtonLink onClick={this.onBackHome}>Back Home</ButtonLink>
            </Panel>
            <Space />
            <Panel alignCenter>
              <Note>For security reasons we do not use passwords, so you do not have to remember it.</Note>
            </Panel>
          </div>
        </Layout>
      </div>
    )
  }
}

export default withLocale(Login)
