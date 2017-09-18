import React, { Component } from 'react'
import axios from 'axios'
import utils from '../utils'
import { translate } from 'react-i18next'
import Inside from '../components/inside'

class Login extends Component {
  constructor (props) {
    super(props)
    this.state = {
      email: ''
    }

    this.handleEmailChange = this.handleEmailChange.bind(this)
  }

  handleEmailChange (event) {
    this.setState({email: event.target.value})
  }

  handleLoginClick () {
    const payload = {
      email: this.state.email
    }
    axios.post('/api/auth', payload)
      .then(response => {
        utils.redirect({}, '/')
      })
      .catch(err => {
        console.log('err', err)
      })
  }

  handleLogoutClick () {
    const payload = {
      email: this.state.email
    }
    axios.post('/api/logout', payload)
      .then(response => {
        utils.redirect({}, '/')
      })
      .catch(err => {
        console.log('err', err)
      })
  }

  render () {
    const { user } = this.props
    return (
      <div className='login'>
        <Inside>
          <form onSubmit={(event) => this.handleLoginClick(event)}>
            <p>{this.props.t('hello')} User: {user && user.email}</p>
            <input type='text' name='email' value={this.state.email} onChange={this.handleEmailChange} />
            <button type='button' onClick={(event) => this.handleLoginClick(event)}>login</button>
            <button type='button' onClick={(event) => this.handleLogoutClick(event)}>logout</button>
          </form>
        </Inside>
        <style jsx>{`
          .login {
            width: 45em;
          }
          form {
          }
        `}</style>
      </div>
    )
  }
}

export default translate(['common'])(Login)
