import React, { Component } from 'react'
import Layout from '../components/layout'
import Panel from '../components/panel'
import H1 from '../components/h1'
import H4 from '../components/h4'
import ButtonSubmit from '../components/buttonSubmit'
import ButtonLink from '../components/buttonLink'
import Space from '../components/space'
import { withLocale } from '../components/withLocale'
import { withUser } from '../components/withUser'
import withAuth from '../components/withAuth'
import { redirect } from '../utils'

class Unsubscribe extends Component {
  constructor (props) {
    super(props)

    this.onChangeMind = this.onChangeMind.bind(this)
    this.onUnsubscribed = this.onUnsubscribed.bind(this)
  }

  onChangeMind () {
    redirect({}, '/settings')
  }

  onUnsubscribed () {
    redirect({}, '/unsubscribe', true)
  }

  render () {
    return (
      <div>
        <Layout {...this.props}>
          <div className='mainPage'>
            <Panel>
              <H1 alignCenter>Unsubscribe</H1>
            </Panel>
            <Panel>
              <H4 alignCenter>Sorry to see you go!<br />If you wish to continue click the "Unsubscribe" button below.</H4>
            </Panel>
            <Space />
            <Panel alignCenter>
              <ButtonSubmit onClick={this.onUnsubscribed}>Unsubscribe</ButtonSubmit>
              <ButtonLink onClick={this.onChangeMind}>No, I've change my mind</ButtonLink>
            </Panel>
          </div>
        </Layout>
      </div>
    )
  }
}

export default withAuth('/unsubscribe')(withUser(withLocale(Unsubscribe)))
