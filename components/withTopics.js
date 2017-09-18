import React, { PureComponent } from 'react'
import { TopicsApi, ReadersApi } from '../utils/api'
import NProgress from 'nprogress'

export function withTopics (WrappedComponent) {
  class Enhancer4 extends PureComponent {
    static async getInitialProps (ctx) {
      this.childProps = {}

      if (WrappedComponent.getInitialProps) {
        this.childProps = await WrappedComponent.getInitialProps(ctx)
      }

      this.childProps.topics = await TopicsApi.findAll()

      return { ...this.childProps }
    }

    constructor (props) {
      super(props)

      this.state = {
        topics: props.topics.map(t => {
          t.isSubscribed = ((props.user && props.user.topics) || []).includes(t.code)
          return t
        }),
        customOrder: props.user && props.user.topics,
        selectedTopics: (props.user && props.user.topics) || ['latest']
      }

      this.onSubscribe = this.onSubscribe.bind(this)
      this.onUnsubscribe = this.onUnsubscribe.bind(this)
      this.onUpdatedSorted = this.onUpdatedSorted.bind(this)
      this.updateOnChange = this.updateOnChange.bind(this)
    }

    updateOnChange (data) {
      NProgress.start()
      ReadersApi.update({
        topics: data.topics
      }, this.props.token).then((res) => {
        NProgress.done()
      }).catch(_ => {
      })
    }

    onSubscribe (topic) {
      let topics = this.state.topics.slice()
      const index = topics.map(t => t.code).indexOf(topic.code)
      topics[index].isSubscribed = true
      let selectedTopics = this.state.selectedTopics.slice()
      selectedTopics.push(topic.code)
      this.setState({topics: topics, selectedTopics: selectedTopics}, () => this.updateOnChange({topics: this.state.selectedTopics}))
    }

    onUnsubscribe (topic) {
      const topics = this.state.topics.slice()
      const index = topics.map(t => t.code).indexOf(topic.code)
      topics[index].isSubscribed = false
      let selectedTopics = this.state.selectedTopics.slice()
      selectedTopics = selectedTopics.filter(t => t !== topic.code)
      this.setState({topics: topics, selectedTopics: selectedTopics}, () => this.updateOnChange({topics: this.state.selectedTopics}))
    }

    onUpdatedSorted (arr) {
      this.setState({ topics: arr, selectedTopics: arr.filter(t => t.isSubscribed).map(t => t.code) }, () => this.updateOnChange({topics: this.state.selectedTopics}))
    }

    render () {
      return <WrappedComponent {...this.props} {...this.state} onSubscribe={this.onSubscribe} onUnsubscribe={this.onUnsubscribe} onUpdatedSorted={this.onUpdatedSorted} />
    }
  }

  return Enhancer4
}
