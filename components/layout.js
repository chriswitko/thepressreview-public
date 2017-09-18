import React, { Component } from 'react'
import Head from './head'
import { initGA, logPageView } from '../utils/analytics'
import NProgress from 'nprogress'
import Router from 'next/router'
import Header from '../components/header'
import Footer from '../components/footer'

Router.onRouteChangeStart = (url) => {
  NProgress.start()
}
Router.onRouteChangeComplete = () => NProgress.done()
Router.onRouteChangeError = () => NProgress.done()

export default class Layout extends Component {
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

          <Footer />
        </div>
      </div>
    )
  }
}
