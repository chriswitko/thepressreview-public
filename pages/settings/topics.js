import React, { PureComponent } from 'react'
import Layout from '../../components/layout'
import Panel from '../../components/panel'
import H1 from '../../components/h1'
import H4 from '../../components/h4'
import Space from '../../components/space'
import Note from '../../components/note'
import Topics from '../../components/topics'
import Link from '../../components/link'
import { withLocale } from '../../components/withLocale'
import { withUser } from '../../components/withUser'
import { withTopics } from '../../components/withTopics'
import withAuth from '../../components/withAuth'

class PageSettingsTopics extends PureComponent {
  render () {
    return (
      <div>
        <Layout {...this.props}>
          <div className='mainPage'>
            <Panel alignCenter>
              <div>
                <Link href='/settings'>← Back to Settings</Link>
                <H1 alignCenter>Topics</H1>
                <H4 alignCenter>Select from available topics below.</H4>
                <Note>(Tip: Drag &amp; Drop to order)</Note>
              </div>
            </Panel>
            <Space />
            <Topics {...this.props} />
          </div>
        </Layout>
      </div>
    )
  }
}

export default withTopics(withAuth('/settings/topics')(withUser(withLocale(PageSettingsTopics))))
