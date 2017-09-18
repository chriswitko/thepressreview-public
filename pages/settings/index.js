import React, { Component } from 'react'
import { compose } from 'recompose'
import Layout from '../../components/layout'
import Panel from '../../components/panel'
import Inside from '../../components/inside'
import Love from '../../components/love'
import Highlight from '../../components/highlight'
import H1 from '../../components/h1'
import H3 from '../../components/h3'
import H4 from '../../components/h4'
import LinkList from '../../components/linkList'
import LinkListItem from '../../components/linkListItem'
import Space from '../../components/space'
import Alert from '../../components/alert'
import Note from '../../components/note'
import Link from '../../components/link'
import { redirect, convertTime } from '../../utils'
import { withLocale } from '../../components/withLocale'
import { withUser } from '../../components/withUser'
import withAuth from '../../components/withAuth'
import Moment from 'react-moment'
import 'moment-timezone'

class PageSettings extends Component {
  constructor (props) {
    super(props)

    this.onLogout = this.onLogout.bind(this)
  }

  onLogout () {
    redirect({}, '/logout', true)
  }

  render () {
    const { user = {} } = this.props
    return (
      <div>
        <Layout {...this.props}>
          <div className='mainPage'>
            <Panel alignCenter>
              <div>
                {user.fullname ? <H1 alignCenter>Hi, {user.fullname}</H1> : <H1 alignCenter>Your Newsletter's Settings</H1>}
                <H4 alignCenter><Highlight>Your next newsletter is planned <Moment fromNow locale={user.language} tz={user.timezone}>{user.next_at}</Moment></Highlight>. You can always customise newsletter to your needs, topics, channels or time; it's all up to you.</H4>
              </div>
            </Panel>
            <Space />
            {!user.subscribed_at ? (
              <Space>
                <Panel alignCenter>
                  <Alert danger fullWidth>To enable your newsletter, please <Link href='/settings/confirm'>activate</Link> your subscription.</Alert>
                </Panel>
              </Space>
            ) : ''}
            <Panel>
              <Inside fullWidth>
                <H3>Your Newsletter</H3>
                <Space sm />
                <LinkList>
                  <LinkListItem>
                    <Link href='/settings/topics'>Customise topics <Note>({user.topics.length})</Note></Link>
                  </LinkListItem>
                  <LinkListItem>
                    <Link href='/settings/channels'>Customise channels <Note>({user.channels.length})</Note></Link>
                  </LinkListItem>
                  <LinkListItem>
                    <Link href='/settings/schedule'>Setup times for delivery</Link>
                    <Space sm />
                    {user.hours.length ? <Note>{user.hours.map(h => convertTime(h, user.time_format)).join(', ')}</Note> : <Note>Please add minimum one time to start receiving newsletter</Note>}
                  </LinkListItem>
                  <LinkListItem>
                    <Link href='/settings/defaults'>Change the time zone, time format or language <Note>({user.timezone})</Note></Link>
                  </LinkListItem>
                </LinkList>
                <Space />
                <H3>Account Owner <Note>({user.email})</Note></H3>
                <Space sm />
                <LinkList>
                  {((user.redeem_code && user.plan === 'premium') || user.plan === 'free') ? (
                    <LinkListItem>
                      <Link href='/account/invites'>Invite your Friends</Link>
                      <Space sm />
                      {user.plan === 'free' ? <Note>Send your friends invitation to The Press Review</Note> : <Note>Send your friends the gift of Premium Edition for FREE</Note>}
                    </LinkListItem>
                  ) : ''}
                  {user.plan === 'free' ? <LinkListItem><Link href='/account/upgrade'>Upgrade to Premium</Link></LinkListItem> : ''}
                  <LinkListItem>
                    <Link href='/account/billing'>Handle billing and invoices</Link>
                  </LinkListItem>
                  <LinkListItem><Link href='/unsubscribe'>Unsubscribe</Link></LinkListItem>
                </LinkList>
              </Inside>
            </Panel>
            <Space />
            <Panel alignCenter>
              <Love />
            </Panel>
          </div>
        </Layout>
      </div>
    )
  }
}

export default compose(
  withLocale,
  withAuth('/settings'),
  withUser
)(PageSettings)
