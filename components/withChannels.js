import React, { PureComponent } from 'react'
import { ChannelsApi, ReadersApi } from '../utils/api'
import NProgress from 'nprogress'

export function withChannels (WrappedComponent) {
  class Enhancer7 extends PureComponent {
    static async getInitialProps (ctx) {
      this.childProps = {}

      if (WrappedComponent.getInitialProps) {
        this.childProps = await WrappedComponent.getInitialProps(ctx)
      }

      this.childProps.channels = await ChannelsApi.findAll()

      return { ...this.childProps }
    }

    constructor (props) {
      super(props)

      const channels = props.channels.map(t => {
        t.isSubscribed = ((props.user && props.user.channels) || []).includes(t.code)
        return t
      })

      this.state = {
        allChannels: channels.slice(),
        channels: channels,
        search: channels,
        q: '',
        section: props.section,
        selectedChannels: (props.user && props.user.channels) || []
      }

      this.onSubscribe = this.onSubscribe.bind(this)
      this.onUnsubscribe = this.onUnsubscribe.bind(this)
      this.updateOnChange = this.updateOnChange.bind(this)
      this.handleInputChange = this.handleInputChange.bind(this)
      this.filterBySearch = this.filterBySearch.bind(this)
    }

    updateOnChange (data) {
      NProgress.start()
      ReadersApi.update({
        channels: data.channels
      }, this.props.token).then((res) => {
        NProgress.done()
      }).catch(err => {
        console.log('err', err)
      })
    }

    onSubscribe (channel) {
      const channels = this.state.channels.slice()
      const index = channels.map(c => c.code).indexOf(channel.code)
      channels[index].isSubscribed = true
      let selectedChannels = this.state.selectedChannels.slice()
      selectedChannels.push(channel.code)
      this.setState({channels: channels, selectedChannels: selectedChannels}, () => this.updateOnChange({channels: this.state.selectedChannels}))
    }

    onUnsubscribe (channel) {
      const channels = this.state.channels.slice()
      const index = channels.map(c => c.code).indexOf(channel.code)
      channels[index].isSubscribed = false
      let selectedChannels = this.state.selectedChannels.slice()
      selectedChannels = selectedChannels.filter(t => t !== channel.code)
      this.setState({channels: channels, selectedChannels: selectedChannels}, () => this.updateOnChange({channels: this.state.selectedChannels}))
    }

    handleInputChange (event) {
      const target = event.target
      const value = target.type === 'checkbox' ? target.checked : target.value
      const name = target.name

      this.setState({
        [name]: value
      }, this.filterBySearch(value))
    }

    filterBySearch (q) {
      const channels = this.state.search.slice()
      if (!q) {
        this.setState({
          channels
        })
        return true
      }
      const results = channels.filter(c => ~c.name.toLowerCase().indexOf(q.toLowerCase()))
      this.setState({
        channels: results
      })
    }

    render () {
      return <WrappedComponent {...this.props} {...this.state} onSubscribe={this.onSubscribe} onUnsubscribe={this.onUnsubscribe} handleInputChange={this.handleInputChange} q={this.state.q} />
    }
  }

  return Enhancer7
}
