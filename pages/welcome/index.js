import React, { Component } from 'react'
import LayoutWizard from '../../components/layoutWizard'
import Panel from '../../components/panel'
import H1 from '../../components/h1'
import H4 from '../../components/h4'
import Space from '../../components/space'
import DefaultSettings from '../../components/defaultSettings'
import { withLocale } from '../../components/withLocale'
import { withUser } from '../../components/withUser'
import withAuth from '../../components/withAuth'
import { redirect } from '../../utils'
import { withDefaultSettings } from '../../components/withDefaultSettings'

class Welcome extends Component {
  constructor (props) {
    super(props)

    this.state = {
      loading: false
    }

    this.onNextRoute = this.onNextRoute.bind(this)
    this.onCancel = this.onCancel.bind(this)
  }

  onNextRoute () {
    this.setState({loading: true})
    redirect({}, '/welcome/topics')
  }

  onCancel () {
    window.localStorage.setItem('user', null)
    redirect({}, '/logout', true)
  }

  render () {
    const { timezone, timeformat, langauge, groupby } = this.props
    return (
      <div>
        <LayoutWizard user={this.props.user} onNextRoute={this.onNextRoute} loading={this.state.loading}>
          <div className='mainPage'>
            <Panel>
              <div>
                <H1 alignCenter>Complete Your Account</H1>
                <H4 alignCenter>To complete your The Press Review account select your time zone and time format. We use this information to deliver newsletters on time.</H4>
              </div>
            </Panel>
            <Space />
            <DefaultSettings wizardMode handleInputChange={this.props.handleInputChange} form={{timezone, timeformat, langauge, groupby}} />
          </div>
        </LayoutWizard>
      </div>
    )
  }
}

export default withDefaultSettings(withAuth('/welcome')(withUser(withLocale(Welcome)), true))
