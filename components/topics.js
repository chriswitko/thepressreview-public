import React, { PureComponent } from 'react'
import GridPanel from './gridPanel'
import GridItem from './gridItem'
import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc'

const SortableItem = SortableElement(({value, idx, onSubscribe, onUnsubscribe}) => {
  return <GridItem alignCenter item={value} idx={idx} onSubscribe={onSubscribe} onUnsubscribe={onUnsubscribe} />
})

const SortableList = SortableContainer(({items, onSubscribe, onUnsubscribe}) => {
  return (
    <GridPanel>
      {items.map((value, index) => (
        <SortableItem key={`item-${index}`} index={index} idx={index} value={value} onSubscribe={onSubscribe} onUnsubscribe={onUnsubscribe} />
      ))}
    </GridPanel>
  )
})

const sort = (a = [], b = []) => {
  let c = []
  let o = []

  a.map((t, index) => {
    if (b.includes(t.code)) {
      c[b.indexOf(t.code)] = t
    } else {
      o.push(t)
    }
  })
  return c.concat(o)
}

export default class SortableComponent extends PureComponent {
  constructor (props) {
    super(props)

    this.state = {
      items: sort(this.props.topics, this.props.customOrder),
      onSubscribe: this.props.onSubscribe,
      onUnsubscribe: this.props.onUnsubscribe
    }

    this.shouldCancelStart = this.shouldCancelStart.bind(this)
  }

  onSortEnd = ({oldIndex, newIndex}) => {
    const updatedList = arrayMove(this.state.items, oldIndex, newIndex)
    this.setState({
      items: updatedList
    })
    if (this.props.onUpdatedSorted) {
      this.props.onUpdatedSorted(updatedList)
    }
  }

  shouldCancelStart (e) {
    // Prevent sorting from being triggered if target is input or button
    if (['input', 'button', 'a'].indexOf(e.target.tagName.toLowerCase()) !== -1) {
      return true // Return true to cancel sorting
    }
  }

  render () {
    return (
      <SortableList
        items={this.state.items}
        axis={'xy'}
        helperClass='SortableHelper'
        shouldCancelStart={this.shouldCancelStart}
        onSortEnd={this.onSortEnd}
        onSubscribe={this.state.onSubscribe}
        onUnsubscribe={this.state.onUnsubscribe}
      />
    )
  }
}
