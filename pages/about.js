import React, { Component } from 'react'
import Layout from '../components/layout'
import Panel from '../components/panel'
import H4 from '../components/h4'
import Space from '../components/space'
import Register from '../components/register'
import Carousel from '../components/carousel'
import Row from '../components/row'
import Column from '../components/column'
import Highlight from '../components/highlight'
import Note from '../components/note'
import { withLocale } from '../components/withLocale'
import { withUser } from '../components/withUser'
import { withRegister } from '../components/withRegister'

class About extends Component {
  render () {
    return (
      <div>
        <Layout {...this.props} bg>
          <div className='mainPage'>
            <Panel alignCenter>
              <div>
                <h1>How it works?</h1>
                <H4 alignCenter>Browsing sites for news is time-consuming and overload by ads.
                <br /><Highlight>We browse all headlines from news outlets for you.</Highlight></H4>
              </div>
            </Panel>
            <Space />
            <Carousel />
            <Space />
            <Panel>
              <Row>
                <Column alignCenter>
                  <img src='/images/arrow_down_tree.png' width='100' />
                </Column>
              </Row>
            </Panel>
            <Space />
            <Panel alignCenter>
              <div>
                <h1>Topics & Channels</h1>
                <H4 alignCenter>You select your favourite topics and sites.</H4>
              </div>
            </Panel>
            <Space />
            <Panel>
              <Row>
                <Column alignCenter>
                  <img src='/images/flow_cnn.png' width='100' />
                </Column>
                <Column alignCenter>
                  <img src='/images/flow_verge.png' width='100' />
                </Column>
                <Column alignCenter>
                  <img src='/images/flow_vox.png' width='100' />
                </Column>
              </Row>
            </Panel>
            <Space />
            <Panel>
              <Row>
                <Column alignCenter>
                  <img src='/images/arrow_down_tree.png' width='100' />
                </Column>
              </Row>
            </Panel>
            <Space />
            <Panel alignCenter>
              <div>
                <h1>Personalised</h1>
                <H4 alignCenter>Based on your preferences, we transform all news into one handy, fresh and useful newsletter.</H4>
              </div>
            </Panel>
            <Space />
            <Row alignCenter wide>
              <img src='/images/demo-mail.png' width='80%' />
            </Row>
            <Space />
            <Panel>
              <Row>
                <Column alignCenter>
                  <img src='/images/love.png' width='60' />
                </Column>
              </Row>
            </Panel>
            {this.props.user ? '' : (
              <div>
                <Space />
                <Panel alignCenter>
                  <H4 alignCenter>You decide how often you want to receive the newsletter.<br />It's now time for you. Select your favourite news channels and topics.</H4>
                </Panel>
                <Space />
                <Register disabledSubmit={this.props.disabledSubmit} email={this.props.email} loading={this.props.loading} onEmailChange={this.props.onEmailChange} onSubmit={this.props.onSubmit} onKeyPress={this.props.onKeyPress} />
              </div>
            )}
            <Space />
            <Panel alignCenter>
              <div>
                <h1>Ohhhh, one more thing. We are available on all devices*</h1>
                <Space sm />
                <img src='/images/devices.png' width='100%' />
                <Space />
                <Note>* It's just an email, you can read it everywhere 😀</Note>
              </div>
            </Panel>
            <Space />
          </div>
        </Layout>
      </div>
    )
  }
}

export default withUser(withLocale(withRegister(About)))
