import React, { Component } from 'react'
import Layout from '../../../components/layout'
import Panel from '../../../components/panel'
import Inside from '../../../components/inside'
import H1 from '../../../components/h1'
import H4 from '../../../components/h4'
import Note from '../../../components/note'
import Link from '../../../components/link'
import ButtonSubmit from '../../../components/buttonSubmit'
import Space from '../../../components/space'
import Row from '../../../components/row'
import Column from '../../../components/column'
import Select from '../../../components/select'
import Label from '../../../components/label'
import { convertTime, redirect, lead } from '../../../utils'
import { hours } from '../../../utils/data'
import { withLocale } from '../../../components/withLocale'
import { withUser } from '../../../components/withUser'
import withAuth from '../../../components/withAuth'
import { ReadersApi } from '../../../utils/api'
import NProgress from 'nprogress'

class PageAccountUpgrade extends Component {
  constructor (props) {
    super(props)

    const d = new Date()
    const min = d.getMinutes() + 15
    const m = (Math.round(min / 15) * 15) % 60

    if (min > 52) {
      d.setHours(d.getHours() + 1)
    }

    this.state = {
      selectedHour: `${lead(d.getHours())}:${lead(m)}`
    }

    this.goUpgrade = this.goUpgrade.bind(this)
    this.onAddHour = this.onAddHour.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  goUpgrade () {
    redirect({}, '/account/upgrade')
  }

  onAddHour () {
    NProgress.start()
    ReadersApi.addHour({ hour: this.state.selectedHour }, this.props.token).then((res) => {
      NProgress.done()
      redirect({}, '/settings/schedule?added=true')
    }).catch(err => {
      console.log('err', err)
    })
  }

  handleInputChange (event) {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name

    this.setState({
      [name]: value
    }, () => this.updateOnChange(this.state))
  }

  render () {
    return (
      <div>
        <Layout {...this.props}>
          <div className='mainPage'>
            {(this.props.user.hours.length < 4 && this.props.user.plan === 'free') || this.props.user.plan !== 'free' ? (
              <div>
                <Panel alignCenter>
                  <div>
                    <Link href='/settings/schedule'>← Back to Schedule</Link>
                    <H1 alignCenter>Add New Time</H1>
                    <H4 alignCenter><Note>Your Time Zone:</Note> <Link href='/settings/defaults'>(GMT+00:00) London</Link></H4>
                  </div>
                </Panel>
                <Space />
                <Panel>
                  <Inside small>
                    <div>
                      <Space>
                        <Label>
                          Select time from the list
                        </Label>
                        <Select name='selectedHour' value={this.state.selectedHour} onChange={this.handleInputChange}>
                          {hours('24').map((h, index) => <option key={index} value={h}>{convertTime(h, this.props.user.time_format)}</option>)}
                        </Select>
                      </Space>
                      <div>
                        <ButtonSubmit fullWidth onClick={this.onAddHour}>Add</ButtonSubmit>
                      </div>
                    </div>
                  </Inside>
                </Panel>
              </div>
            ) : (
              <div>
                <Panel alignCenter>
                  <div>
                    <Link href='/settings/schedule'>← Back to Schedule</Link>
                    <H1 alignCenter>Add New Time</H1>
                  </div>
                </Panel>
                <Panel alignCenter>
                  <Inside alignCenter>
                    <Row>
                      <H4>Your plan is limited to only four different times. If you wish to add more time, please upgrade to Premium.</H4>
                    </Row>
                    <Space sm />
                    <Row>
                      <Column alignCenter>
                        <ButtonSubmit onClick={this.goUpgrade}>Upgrade to Premium</ButtonSubmit>
                      </Column>
                    </Row>
                  </Inside>
                </Panel>
              </div>
            )}
          </div>
        </Layout>
      </div>
    )
  }
}

export default withAuth('/settings/schedule/new')(withUser(withLocale(PageAccountUpgrade)))
