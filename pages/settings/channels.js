import React, { Component } from 'react'
import Layout from '../../components/layout'
import Panel from '../../components/panel'
import H1 from '../../components/h1'
import H4 from '../../components/h4'
import Channels from '../../components/channels'
import Link from '../../components/link'
import { withLocale } from '../../components/withLocale'
import { withUser } from '../../components/withUser'
import { withChannels } from '../../components/withChannels'
import withAuth from '../../components/withAuth'

class PageSettingsChannels extends Component {
  static async getInitialProps ({ query: { section } }) {
    return {
      section
    }
  }

  render () {
    return (
      <div>
        <Layout {...this.props}>
          <div className='mainPage'>
            <Panel alignCenter>
              <div>
                <Link href='/settings'>← Back to Settings</Link>
                <H1 alignCenter>Channels</H1>
              </div>
            </Panel>
            <Panel>
              <H4 alignCenter>Select from available channels from which you wish to receive news.</H4>
            </Panel>
            <Channels channels={this.props.channels} allChannels={this.props.allChannels} section={this.props.section} onSubscribe={this.props.onSubscribe} onUnsubscribe={this.props.onUnsubscribe} handleInputChange={this.props.handleInputChange} q={this.props.q} />
          </div>
        </Layout>
      </div>
    )
  }
}

export default withChannels(withAuth('/settings/channels')(withUser(withLocale(PageSettingsChannels))))

