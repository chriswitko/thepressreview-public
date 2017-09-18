import React, { Component } from 'react'
import { compose } from 'recompose'
import Layout from '../../components/layout'
import Panel from '../../components/panel'
import H1 from '../../components/h1'
import DefaultSettings from '../../components/defaultSettings'
import Link from '../../components/link'
import { withLocale } from '../../components/withLocale'
import { withUser } from '../../components/withUser'
import withAuth from '../../components/withAuth'
import { withDefaultSettings } from '../../components/withDefaultSettings'

class PageSettingsDefaults extends Component {
  state = {
    loading: false
  }

  render () {
    const { timezone, timeformat, language, groupby } = this.props
    return (
      <div>
        <Layout {...this.props}>
          <div className='mainPage'>
            <Panel alignCenter>
              <div>
                <Link href='/settings'>← Back to Settings</Link>
                <H1 alignCenter>Time &amp; Language</H1>
              </div>
            </Panel>
            <DefaultSettings t={this.props.t} handleInputChange={this.props.handleInputChange} form={{timezone, timeformat, language, groupby}} />
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
  withDefaultSettings
)(PageSettingsDefaults)

// export default withDefaultSettings(withAuth('/settings')(withUser(withLocale(PageSettingsDefaults))))
