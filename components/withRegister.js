import React, { PureComponent } from 'react'
import { redirect } from '../utils'
import { ReadersApi } from '../utils/api'
import NProgress from 'nprogress'

export function withRegister (WrappedComponent) {
  class Enhancer extends PureComponent {
    static async getInitialProps (ctx) {
      this.childProps = {}

      if (WrappedComponent.getInitialProps) {
        this.childProps = await WrappedComponent.getInitialProps(ctx)
      }

      return { ...this.childProps }
    }

    constructor (props) {
      super(props)

      this.state = {
        language: props.i18n.languages && props.i18n.languages[0],
        email: '',
        loading: false,
        disabledSubmit: true
      }

      this.onEmailChange = this.onEmailChange.bind(this)
      this.onSubmit = this.onSubmit.bind(this)
      this.onKeyPress = this.onKeyPress.bind(this)
      this.onNext = this.onNext.bind(this)
      this.handleInputChange = this.handleInputChange.bind(this)
    }

    validateEmail (value) {
      var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return re.test(value)
    }

    onEmailChange (event) {
      if (this.validateEmail(event.target.value)) {
        this.setState({email: event.target.value, disabledSubmit: false})
      } else {
        this.setState({email: event.target.value, disabledSubmit: true})
      }
    }

    onNext () {
      redirect({}, '/settings')
    }

    onKeyPress (e) {
      if (e.key === 'Enter') {
        this.onSubmit(e)
      }
    }

    async getGeoData (cb) {
      const geo = await ReadersApi.getLocation()
      return await geo
    }

    async onSubmit (event) {
      NProgress.start()
      this.setState({loading: true})
      console.log('getting geo')
      const geo = await this.getGeoData()
      ReadersApi.createOne({
        email: this.state.email,
        language: this.state.language,
        browser_language: this.state.language,
        geo: geo
      }).then((user) => {
        NProgress.done()
        if (user.isNew) {
          redirect({}, '/welcome', true)
        } else {
          redirect({}, `/login?email=${user.email}`, true)
        }
      }).catch(err => {
        console.log('err', err)
      })
    }

    handleInputChange (event) {
      const target = event.target
      const value = target.type === 'checkbox' ? target.checked : target.value
      const name = target.name

      this.setState({
        [name]: value
      })
    }

    render () {
      return <WrappedComponent {...this.props} {...this.state} onEmailChange={this.onEmailChange} onSubmit={this.onSubmit} onKeyPress={this.onKeyPress} onNext={this.onNext} />
    }
  }

  return Enhancer
}
