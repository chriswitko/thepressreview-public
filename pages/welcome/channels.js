import React, { Component } from 'react'
import LayoutWizard from '../../components/layoutWizard'
import Panel from '../../components/panel'
import H1 from '../../components/h1'
import H4 from '../../components/h4'
import Channels from '../../components/channels'
import { withLocale } from '../../components/withLocale'
import { redirect } from '../../utils'
import withAuth from '../../components/withAuth'
import { withUser } from '../../components/withUser'
import { withChannels } from '../../components/withChannels'

class WelcomeChannels extends Component {
  static async getInitialProps ({ query: { section } }) {
    return {
      section
    }
  }

  constructor (props) {
    super(props)

    this.state = {
      loading: false
    }

    this.onNextRoute = this.onNextRoute.bind(this)
    this.onBackRoute = this.onBackRoute.bind(this)
  }

  onNextRoute () {
    this.setState({loading: true})
    if (this.props.user.ready_at) {
      redirect({}, '/subscribed')
    } else {
      redirect({}, '/settings/confirm')
    }
  }

  onBackRoute () {
    redirect({}, '/welcome/topics')
  }

  render () {
    return (
      <div>
        <LayoutWizard user={this.props.user} onNextRoute={this.onNextRoute} onBackRoute={this.onBackRoute} loading={this.state.loading}>
          <div className='mainPage'>
            <Panel>
              <H1 alignCenter>Select Channels</H1>
            </Panel>
            <Panel>
              <H4 alignCenter>Select from available channels from which you wish to receive news.</H4>
            </Panel>
            <Channels channels={this.props.channels} allChannels={this.props.allChannels} section={this.props.section} onSubscribe={this.props.onSubscribe} onUnsubscribe={this.props.onUnsubscribe} handleInputChange={this.props.handleInputChange} q={this.props.q} />
          </div>
        </LayoutWizard>
      </div>
    )
  }
}
0
export default withChannels(withAuth('/welcome/channels')(withUser(withLocale(WelcomeChannels))))
