import React, { Component } from 'react'
import Layout from '../../components/layout'
import Panel from '../../components/panel'
import H1 from '../../components/h1'
import H4 from '../../components/h4'
import ButtonSubmit from '../../components/buttonSubmit'
import ButtonLink from '../../components/buttonLink'
import Space from '../../components/space'
import { withLocale } from '../../components/withLocale'
import { withUser } from '../../components/withUser'
import withAuth from '../../components/withAuth'
import { redirect } from '../../utils'

class PageAccountUpgrage extends Component {
  constructor (props) {
    super(props)

    this.goUpgrade = this.goUpgrade.bind(this)
    this.goUpgrade = this.goUpgrade.bind(this)
  }

  goUpgrade () {
    redirect({}, '/account/plan')
  }

  goSettings () {
    redirect({}, '/settings')
  }

  render () {
    return (
      <div>
        <Layout {...this.props}>
          <div className='mainPage'>
            <Panel>
              <H1 alignCenter>Upgrade</H1>
            </Panel>
            <Panel>
              <H4 alignCenter>We hope you’ve enjoyed using The Press Review for free!<br />
              Now that you’re ready to add more stuff, it’s time to pick one of our packages.</H4>
            </Panel>
            <Space />
            <Panel alignCenter>
              <ButtonSubmit onClick={this.goUpgrade}>OK, let’s take a look at the packages...</ButtonSubmit>
              <Space horizontal />
              <ButtonLink onClick={this.goSettings}>Back to Settings</ButtonLink>
            </Panel>
          </div>
        </Layout>
      </div>
    )
  }
}

export default withAuth('/account/upgrade')(withUser(withLocale(PageAccountUpgrage)))

