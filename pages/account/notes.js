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
import { withLocale } from '../../components/withLocale'
import { withUser } from '../../components/withUser'
import withAuth from '../../components/withAuth'
import NProgress from 'nprogress'
import { ReadersApi } from '../../utils/api'
import { redirect } from '../../utils'

class PageBuy extends Component {
  constructor (props) {
    super(props)

    this.state = {
      vat_id: props.user.vat_id,
      invoice_notes: props.user.invoice_notes,
      invoice_email: props.user.invoice_email || props.user.email
    }

    this.onSave = this.onSave.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  onSave () {
    NProgress.start()
    ReadersApi.update({
      vat_id: this.state.vat_id,
      invoice_notes: this.state.invoice_notes,
      invoice_email: this.state.invoice_email
    }, this.props.token).then((res) => {
      NProgress.done()
      redirect({}, '/settings')
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
                <H1 alignCenter>Change your invoice settings</H1>
              </div>
            </Panel>
            <div>
              <Panel>
                <Inside medium>
                  <Space>
                    <div>
                      <Label>
                        Email address to send invoices to <Note>(just one please)</Note>
                      </Label>
                      <Text name='invoice_email' value={this.state.invoice_email} onChange={this.handleInputChange} />
                    </div>
                  </Space>
                  <Space>
                    <div>
                      <Label>
                        VAT ID <Note>(optional)</Note>
                      </Label>
                      <Text name='vat_id' placeholder={'GB1234567890'} value={this.state.vat_id} onChange={this.handleInputChange} />
                    </div>
                  </Space>
                  <Space>
                    <div>
                      <Label>
                        Notes <Note>(e.g., a company address or accounting info)</Note>
                      </Label>
                      <TextArea name='invoice_notes' value={this.state.invoice_notes} onChange={this.handleInputChange} />
                    </div>
                  </Space>
                  <ButtonSubmit fullWidth onClick={this.onSave}>Save changes</ButtonSubmit>
                </Inside>
              </Panel>
              <Space />
              <Panel>
                Any questions? Contact&nbsp;<Link href='mailto:inbox@thepressreview.com?subject=I have a question'>The Press Review support</Link>, and we’ll help.
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
