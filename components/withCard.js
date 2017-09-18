import React, { PureComponent } from 'react'

export function withCard (WrappedComponent) {
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
        loading: false,
        cc_number: this.props.cc_number,
        cc_exp_month: this.props.cc_exp_month,
        cc_exp_year: this.props.cc_exp_year,
        cc_cvv: this.props.cc_cvv,
        cc_zip: this.props.cc_zip
      }

      this.handleInputChange = this.handleInputChange.bind(this)
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
      return <WrappedComponent {...this.props} {...this.state} handleInputChange={this.handleInputChange} />
    }
  }

  return Enhancer
}
