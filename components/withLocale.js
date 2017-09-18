import React, { Component } from 'react'
import { translate } from 'react-i18next'
import i18n from '../utils/i18n'

export function withLocale (WrappedComponent, nsLocale = '') {
  let locales = ['common']
  // ...and returns another component...
  class Enhancer3 extends Component {
    static async getInitialProps (ctx) {
      this.childProps = {}

      if (nsLocale) {
        locales.push(nsLocale)
      }

      if (WrappedComponent.getInitialProps) {
        this.childProps = await WrappedComponent.getInitialProps(ctx)
      }

      if (ctx.req && !process.browser) {
        return {
          ...i18n.getInitialProps(ctx.req, locales),
          ...this.childProps
        }
      }

      return this.childProps || {}
    }

    constructor (props) {
      super(props)
      this.childProps = {}
    }

    render () {
      return <WrappedComponent {...this.props} />
    }
  }

  return translate(locales, { i18n, wait: process.browser })(Enhancer3)
}
