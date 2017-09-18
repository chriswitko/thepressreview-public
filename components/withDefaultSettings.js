import React, { PureComponent } from 'react'
import { ChannelsApi, ReadersApi } from '../utils/api'
import NProgress from 'nprogress'

export function withDefaultSettings (WrappedComponent) {
  class Enhancer8 extends PureComponent {
    static async getInitialProps (ctx) {
      this.childProps = {}

      if (WrappedComponent.getInitialProps) {
        this.childProps = await WrappedComponent.getInitialProps(ctx)
      }

      this.childProps.channels = await ChannelsApi.findAll()
      // this.childProps.language = ctx.req.query.language

      return { ...this.childProps }
    }

    constructor (props) {
      super(props)

      this.state = {
        timezone: props.user.timezone,
        timeformat: props.user.time_format,
        language: props.user.language,
        groupby: props.user.filter_by
      }

      this.handleInputChange = this.handleInputChange.bind(this)
      this.updateOnChange = this.updateOnChange.bind(this)
    }

    handleInputChange (event) {
      const target = event.target
      const value = target.type === 'checkbox' ? target.checked : target.value
      const name = target.name

      this.setState({
        [name]: value
      }, () => this.updateOnChange(this.state))
    }

    updateOnChange (data) {
      NProgress.start()
      ReadersApi.update({
        timezone: data.timezone,
        time_format: data.timeformat,
        language: data.language,
        filter_by: data.groupby
      }, this.props.token).then((res) => {
        NProgress.done()
      }).catch(err => {
        console.log('err', err)
      })
    }

    render () {
      return <WrappedComponent {...this.props} {...this.state} handleInputChange={this.handleInputChange} />
    }
  }

  return Enhancer8
}
