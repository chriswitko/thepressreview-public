import React, { PureComponent } from 'react'
import LayoutWizard from '../../components/layoutWizard'
import Panel from '../../components/panel'
import H1 from '../../components/h1'
import H4 from '../../components/h4'
import Space from '../../components/space'
import Topics from '../../components/topics'
import Note from '../../components/note'
import { withLocale } from '../../components/withLocale'
import { withUser } from '../../components/withUser'
import withAuth from '../../components/withAuth'
import { redirect } from '../../utils'
import { withTopics } from '../../components/withTopics'

class WelcomeTopics extends PureComponent {
  constructor (props) {
    super(props)

    this.state = {
      loading: false
    }

    this.onNextRoute = this.onNextRoute.bind(this)
    this.onBackRoute = this.onBackRoute.bind(this)
  }

  onNextRoute () {
    this.setState({loading: true})
    redirect({}, '/welcome/channels')
  }

  onBackRoute () {
    redirect({}, '/welcome')
  }

  render () {
    return (
      <div>
        <LayoutWizard user={this.props.user} onNextRoute={this.onNextRoute} onBackRoute={this.onBackRoute} loading={this.state.loading}>
          <div className='mainPage'>
            <Panel alignCenter>
              <div>
                <H1 alignCenter>Select Topics</H1>
                <H4 alignCenter>Select from available topics below and click "Next" to select favourite sites and newspapers.</H4>
                <Note>(Tip: Drag &amp; Drop to order)</Note>
              </div>
            </Panel>
            <Space />
            <Topics {...this.props} />
          </div>
        </LayoutWizard>
      </div>
    )
  }
}

export default withTopics(withAuth('/welcome/topics')(withUser(withLocale(WelcomeTopics))))
