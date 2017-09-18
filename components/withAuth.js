import React, { Component } from 'react'
import Router from 'next/router'

export default url => {
  const withAuth = WrappedComponent => (
    class extends Component {
      static async getInitialProps (ctx) {
        this.childProps = {}

        if (WrappedComponent.getInitialProps) {
          this.childProps = await WrappedComponent.getInitialProps(ctx)
        }

        return {
          ...this.childProps
        }
      }

      componentDidMount () {
        if (!this.props.user || !this.props.user._id) {
          Router.push(`/logout/?next=${encodeURIComponent(url)}`)
        }
      }

      render () {
        if (this.props.user && this.props.user._id) {
          return <WrappedComponent {...this.props} {...this.state} />
        } else {
          return (
            <div className='container'>
              <p>You need to log in to see this page.</p>
            </div>
          )
        }
      }
    }
  )

  return withAuth
}
