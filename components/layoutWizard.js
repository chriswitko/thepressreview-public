import React, { Component } from 'react'
import Head from './head'
import { initGA, logPageView } from '../utils/analytics'
import NProgress from 'nprogress'
import Router from 'next/router'
import Header from '../components/header'
import FooterWizard from '../components/footerWizard'

Router.onRouteChangeStart = (url) => {
  NProgress.start()
}
Router.onRouteChangeComplete = () => NProgress.done()
Router.onRouteChangeError = () => NProgress.done()

export default class LayoutWizard extends Component {
  componentDidMount () {
    if (!window.GA_INITIALIZED) {
      initGA()
      window.GA_INITIALIZED = true
    }
    logPageView()
  }

  render () {
    return (
      <div>
        <Head />
        <div className='root'>
          <Header user={this.props.user} />

          { this.props.children }

          <FooterWizard onNextRoute={this.props.onNextRoute} onBackRoute={this.props.onBackRoute} onCancel={this.props.onCancel} loading={this.props.loading} />
        </div>
      </div>
    )
  }
}
