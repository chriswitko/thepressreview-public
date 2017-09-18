import React, { Component } from 'react'
import cookie from 'react-cookies'
import { ReadersApi } from '../utils/api'

export function withUser (WrappedComponent) {
  class Enhancer5 extends Component {
    static async getInitialProps (ctx) {
      this.childProps = {}

      if (WrappedComponent.getInitialProps) {
        this.childProps = await WrappedComponent.getInitialProps(ctx)
      }

      if (ctx.req && !process.browser) {
        if (ctx.req.cookies.user_id) {
          this.childProps.user = await ReadersApi.getSession(ctx.req.cookies.user_id, ctx.req.cookies.user_token)
          this.childProps.token = ctx.req.cookies.user_token
        }
      }

      if (cookie.load('user_id')) {
        this.childProps.user = await ReadersApi.getSession(cookie.load('user_id'), cookie.load('user_token'))
        this.childProps.token = cookie.load('user_token')
      }

      return {
        ...this.childProps
      }
    }

    render () {
      return <WrappedComponent {...this.props} />
    }
  }

  return Enhancer5
}
