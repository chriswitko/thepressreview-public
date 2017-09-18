import React, { Component } from 'react'
import Layout from '../components/layout'
import Panel from '../components/panel'
import H1 from '../components/h1'
import H4 from '../components/h4'
import ButtonSubmit from '../components/buttonSubmit'
import Space from '../components/space'
import Highlight from '../components/highlight'
import { withLocale } from '../components/withLocale'
import { withUser } from '../components/withUser'
import withAuth from '../components/withAuth'
import { convertTime, redirect } from '../utils'

class Subscribed extends Component {
  constructor (props) {
    super(props)

    this.onGoToSettings = this.onGoToSettings.bind(this)
  }

  onGoToSettings () {
    redirect({}, '/settings')
  }

  render () {
    const { user } = this.props

    return (
      <div>
        <Layout {...this.props}>
          <div className='mainPage'>
            <Panel>
              <div>
                <H1 alignCenter>Subscription Confirmed</H1>
              </div>
            </Panel>
            <Panel>
              <div>
                <H4 alignCenter>Thank you for activating your subscription. We are so happy to have you here.</H4>
                <H4 alignCenter><strong>Remember</strong>: Your newsletter is set to be delivered every day at <Highlight>{user.hours.map(h => convertTime(h, user.time_format)).join(', ')}</Highlight>.
                  <br />If you wish to change the default settings, just click the button below.</H4>
              </div>
            </Panel>
            <Space />
            <Panel alignCenter>
              <ButtonSubmit onClick={this.onGoToSettings}>Go to Settings</ButtonSubmit>
            </Panel>
          </div>
        </Layout>
      </div>
    )
  }
}

export default withAuth('/subscribed')(withUser(withLocale(Subscribed)))
