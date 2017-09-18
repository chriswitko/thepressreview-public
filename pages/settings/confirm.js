import React, { Component } from 'react'
import Layout from '../../components/layout'
import Panel from '../../components/panel'
import H1 from '../../components/h1'
import H4 from '../../components/h4'
import ButtonSubmit from '../../components/buttonSubmit'
import Space from '../../components/space'
import Link from '../../components/link'
import Note from '../../components/note'
import { redirect } from '../../utils'
import { withLocale } from '../../components/withLocale'
import { withUser } from '../../components/withUser'
import withAuth from '../../components/withAuth'
import { ReadersApi } from '../../utils/api'
import NProgress from 'nprogress'

class Confirm extends Component {
  constructor (props) {
    super(props)
    this.onResend = this.onResend.bind(this)
    this.onGoToSettings = this.onGoToSettings.bind(this)
    this.markAsReady = this.markAsReady.bind(this)
    this.resendActivationLink = this.resendActivationLink.bind(this)
  }

  componentDidMount () {
    this.markAsReady()
  }

  resendActivationLink () {
    NProgress.start()
    ReadersApi.resendActivationLink({}, this.props.token).then((res) => {
      NProgress.done()
    }).catch(err => {
      console.log('err', err)
    })
  }

  markAsReady () {
    NProgress.start()
    ReadersApi.markAsReady({}, this.props.token).then((res) => {
      NProgress.done()
      this.resendActivationLink()
    }).catch(err => {
      console.log('err', err)
    })
  }

  onGoToSettings () {
    redirect({}, '/settings')
  }

  onResend () {
    redirect({}, '/resend', true)
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
                {user.subscribed_at ? (
                  <div>
                    <H1 alignCenter>You are all set up</H1>
                    <H4 alignCenter>Congratulations! We will send your first newsletter soon.</H4>
                  </div>
                ) : (
                  <div>
                    <H1 alignCenter>Activate your subscription</H1>
                    <H4 alignCenter>We have sent an activation link to your email address <strong>{user.email}</strong>.
                      <br /><Note>Check your email and click the link to activate your subscription.</Note>
                    </H4>
                  </div>
                )}
              </div>
            </Panel>
            <Space />
            <Panel alignCenter>
              {user.subscribed_at ? <ButtonSubmit onClick={this.onGoToSettings}>Go to Settings</ButtonSubmit> : <ButtonSubmit onClick={this.onResend}>Re-send</ButtonSubmit>}
            </Panel>
          </div>
        </Layout>
      </div>
    )
  }
}

export default withAuth('/settings/confirm')(withUser(withLocale(Confirm)))
