import React, { Component } from 'react'
import Layout from '../../../components/layout'
import Panel from '../../../components/panel'
import Inside from '../../../components/inside'
import H1 from '../../../components/h1'
import H3 from '../../../components/h3'
import H4 from '../../../components/h4'
import Space from '../../../components/space'
import Note from '../../../components/note'
import ButtonSubmit from '../../../components/buttonSubmit'
import Days from '../../../components/days'
import Hours from '../../../components/hours'
import Link from '../../../components/link'
import Alert from '../../../components/alert'
import { days } from '../../../utils/data'
import { withLocale } from '../../../components/withLocale'
import { withUser } from '../../../components/withUser'
import withAuth from '../../../components/withAuth'
import { ReadersApi } from '../../../utils/api'
import { redirect } from '../../../utils'
import NProgress from 'nprogress'

class Settings extends Component {
  static async getInitialProps ({ query: { added } }) {
    return {
      days,
      added
    }
  }

  constructor (props) {
    super(props)

    this.state = {
      selectedDays: new Set(this.props.user.days),
      hours: this.props.user.hours
    }

    this.onSelectDay = this.onSelectDay.bind(this)
    this.onDeselectDay = this.onDeselectDay.bind(this)
    this.updateOnChange = this.updateOnChange.bind(this)
    this.onRemoveHour = this.onRemoveHour.bind(this)
    this.goToAdd = this.goToAdd.bind(this)
  }

  onSelectDay (day) {
    const temp = this.state.selectedDays
    temp.add(day)
    this.setState({selectedDays: temp}, () => this.updateOnChange({days: temp}))
  }

  onDeselectDay (day) {
    const temp = this.state.selectedDays
    temp.delete(day)
    this.setState({selectedDays: temp}, () => this.updateOnChange({days: temp}))
  }

  onRemoveHour (hour) {
    NProgress.start()
    ReadersApi.removeHour({ hour }, this.props.token).then((res) => {
      let hours = this.state.hours.filter(h => h !== hour)
      this.setState({hours: hours})
      NProgress.done()
    }).catch(err => {
      console.log('err', err)
    })
  }

  updateOnChange (data) {
    NProgress.start()
    ReadersApi.update(data, this.props.token).then((res) => {
      NProgress.done()
    }).catch(err => {
      console.log('err', err)
    })
  }

  goToAdd () {
    redirect({}, '/settings/schedule/new')
  }

  render () {
    const { user } = this.props
    return (
      <div>
        <Layout {...this.props}>
          <div className='mainPage'>
            <Panel alignCenter>
              <div>
                <Link href='/settings'>← Back to Settings</Link>
                <H1 alignCenter>Schedule</H1>
                <H4 alignCenter>Enter hours for which you want to receive newsletters.</H4>
                <H4 alignCenter><Note>Your Time Zone:</Note> <Link href='/settings/defaults'>{user.timezone}</Link></H4>
              </div>
            </Panel>
            <Space />
            <Panel>
              <ButtonSubmit onClick={this.goToAdd}>Add New Time</ButtonSubmit>
            </Panel>
            <Space />
            {this.props.added ? (
              <Space>
                <Panel fullWidth alignCenter>
                  <Alert success fullWidth>New time added</Alert>
                </Panel>
              </Space>
            ) : ''}
            <Panel>
              <Inside fullWidth style={{display: 'flex', flexDirection: 'column'}}>
                <H3>What time of day do you want to receive the newsletter?</H3>
                {this.state.hours.length ? <Hours hours={this.state.hours} timeformat={user.time_format} onRemoveHour={this.onRemoveHour} /> : <Note>Please add minimum one time to enable newsletter</Note>}
                <Space />
                <H3>How often do you want to receive the newsletter?</H3>
                <Days days={this.props.days} selectedDays={this.state.selectedDays} onSelectDay={this.onSelectDay} onDeselectDay={this.onDeselectDay} />
              </Inside>
            </Panel>
          </div>
        </Layout>
      </div>
    )
  }
}

export default withAuth('/settings/schedule')(withUser(withLocale(Settings)))

