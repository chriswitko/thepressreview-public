import React, { Component } from 'react'
import Layout from '../components/layout'
import Panel from '../components/panel'
import H1 from '../components/h1'
import H4 from '../components/h4'
import ButtonSubmit from '../components/buttonSubmit'
import Space from '../components/space'
import { withLocale } from '../components/withLocale'
import { redirect } from '../utils'

class Unsubscribed extends Component {
  constructor (props) {
    super(props)

    this.onBackHome = this.onBackHome.bind(this)
  }

  onBackHome () {
    redirect({}, '/', true)
  }

  render () {
    return (
      <div>
        <Layout {...this.props}>
          <div className='mainPage'>
            <Panel>
              <div>
                <H1 alignCenter>You have been unsubscribed</H1>
              </div>
            </Panel>
            <Panel>
              <H4 alignCenter>It was a pleasure to have you here.
              <br />If you change your mind in the future, do not hesitate to subscribe our newsletter again.
              <br />Thank you</H4>
            </Panel>
            <Space />
            <Panel alignCenter>
              <ButtonSubmit onClick={this.onBackHome}>Back Home</ButtonSubmit>
            </Panel>
          </div>
        </Layout>
      </div>
    )
  }
}

export default withLocale(Unsubscribed)
