import React, { Component } from 'react'
import { compose } from 'recompose'
import Layout from '../../components/layout'
import Panel from '../../components/panel'
import H1 from '../../components/h1'
import Link from '../../components/link'
import Note from '../../components/note'
import Inside from '../../components/inside'
import Space from '../../components/space'
import Label from '../../components/label'
import Text from '../../components/text'
import TextArea from '../../components/textarea'
import ButtonSubmit from '../../components/buttonSubmit'
import Alert from '../../components/alert'
import { withLocale } from '../../components/withLocale'
import { withUser } from '../../components/withUser'
import withAuth from '../../components/withAuth'
import NProgress from 'nprogress'
import { ReadersApi } from '../../utils/api'
import { redirect } from '../../utils'

class PageBuy extends Component {
  static async getInitialProps ({ query: { sent } }) {
    return {
      sent
    }
  }

  constructor (props) {
    super(props)

    this.state = {
      sent: props.sent,
      fullname: props.user.fullname || '',
      invite_email_one: '',
      invite_email_two: '',
      invite_email_three: '',
      invite_message: props.user.invite_message || ''
    }

    this.onSend = this.onSend.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  onSend () {
    NProgress.start()
    ReadersApi.sendInvitations({
      fullname: this.state.fullname,
      invite_message: this.state.invite_message,
      invite_email_one: this.state.invite_email_one,
      invite_email_two: this.state.invite_email_two,
      invite_email_three: this.state.invite_email_three
    }, this.props.token).then((res) => {
      NProgress.done()
      redirect({}, '/account/invites?sent=true', true)
    }).catch(err => {
      console.log('err', err)
      NProgress.done()
    })
  }

  handleInputChange (event) {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name

    this.setState({
      [name]: value
    })
  }

  render () {
    return (
      <div>
        <Layout {...this.props}>
          <div className='mainPage'>
            <Panel alignCenter>
              <div>
                <Link href='/settings'>← Back to Settings</Link>
                <H1 alignCenter>Invite your Friends</H1>
              </div>
            </Panel>
            {this.state.sent ? (
              <Space>
                <Panel alignCenter>
                  <Alert success medium>Thanks. All your invitations are on the way to your friends.</Alert>
                </Panel>
              </Space>
            ) : ''}
            <div>
              <Panel>
                <Inside medium pills>
                  <Space alignCenter>
                    <img src='/images/surprise.png' width='100' />
                  </Space>
                  <Space>
                    <Note>Do you like us? Invite your friends to The Press Review.</Note>
                  </Space>
                  <Space>
                    <div>
                      <Label>
                        Your First Name
                      </Label>
                      <Text name='fullname' value={this.state.fullname} onChange={this.handleInputChange} />
                    </div>
                  </Space>
                  <Space>
                    <div>
                      <Label>
                        Friend's Email #1 <Note>(just one please)</Note>
                      </Label>
                      <Text name='invite_email_one' value={this.state.invite_email_one} onChange={this.handleInputChange} />
                    </div>
                  </Space>
                  <Space>
                    <div>
                      <Label>
                        Friend's Email #2 <Note>(just one please)</Note>
                      </Label>
                      <Text name='invite_email_two' value={this.state.invite_email_two} onChange={this.handleInputChange} />
                    </div>
                  </Space>
                  <Space>
                    <div>
                      <Label>
                        Friend's Email #3 <Note>(just one please)</Note>
                      </Label>
                      <Text name='invite_email_three' value={this.state.invite_email_three} onChange={this.handleInputChange} />
                    </div>
                  </Space>
                  <Space>
                    <div>
                      <Label>
                        Youe personal message to Friends <Note>(Optional)</Note>
                      </Label>
                      <TextArea placeholder='You can add something from your self' name='invite_message' value={this.state.invite_message} onChange={this.handleInputChange} />
                    </div>
                  </Space>
                  <ButtonSubmit fullWidth onClick={this.onSend}>Send invitations</ButtonSubmit>
                </Inside>
              </Panel>
            </div>
          </div>
        </Layout>
      </div>
    )
  }
}

export default compose(
  withLocale,
  withUser,
  withAuth('/settings')
)(PageBuy)
