import ButtonSubmit from './buttonSubmit'
import ButtonDefault from './buttonDefault'
import Space from './space'
import H3 from './h3'
import Link from './link'
import { classNames } from '../utils'
import Avatar from 'react-avatar'

export default (props) => {
  const classes = {
    'gridItem': true,
    'dragEnabled': props.dragEnabled,
    'fullWidth': props.fullWidth,
    'alignCenter': props.alignCenter,
    'alignRight': props.alignRight
  }

  const myClassNames = classNames(classes)

  const styles = {
    'background': props.image ? `url(${props.image}) no-repeat 50% 50%` : ''
  }

  const image = (item) => {
    if (item.facebook_id) {
      return <Link href={item.url} target='_blank'><Avatar facebookId={item.facebook_id} size={100} /></Link>
    } else if (item.twitter_id) {
      return <Link href={item.url} target='_blank'><Avatar twitterId={item.twitter_id} size={100} /></Link>
    } else if (item.image) {
      return <Link href={item.url} target='_blank'><img width='100' src={item.image} /></Link>
    } else if (item.icon) {
      return <Link href={item.url} target='_blank'><img width='100' src={item.icon} /></Link>
    } else {
      return ''
    }
  }

  return (
    <div className={myClassNames} style={styles}>
      {image(props.item) ? (
        <div className='gridItemImg'>
          {image(props.item)}
        </div>
      ) : ''}
      <div className='gridItemTitle'>
        <H3 alignCenter>
          {props.item.url ? <Link href={props.item.url} target='_blank'>{props.item.name}</Link> : props.item.name}
        </H3>
      </div>
      <Space />
      <div className='gridItemAction'>
        {props.item.isSubscribed ? <ButtonSubmit fullWidth onClick={() => props.onUnsubscribe(props.item)}>Subscribed</ButtonSubmit> : <ButtonDefault fullWidth onClick={() => props.onSubscribe(props.item)}>Subscribe</ButtonDefault>}
      </div>
      <style jsx>{`
        .gridItem {
          user-select: none;
          background-size: cover;
          width: auto;
          background-color: #ffffff;
          box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
          border-radius: 0.4rem;
          padding: 25px;
          margin: 10px;
          max-width: 30rem;
          min-width: 13rem;
          display: flex;
          justify-content: space-around;
          flex: 1;
          flex-grow: 1;
          flex-wrap: nowrap;
          flex-direction: column;
        }
        @media only screen and (max-width: 480px) {
          .gridItem {
          }
        }
        .gridItemOld:hover {
          transition: all 200ms ease-in;
          transform: scale(1.1);
        }
        .dragEnabled {
          justify-content: space-around;
        }
        .gridItemImg {
          margin-bottom: 10px;
        }
        .gridItemTitle {
          flex: 1;
          width: 100%;
        }
        .gridItemAction {
          width: 100%;
        }
        .fullWidth {
          width: 100%;
        }
        .alignCenter {
          text-align: center;
        }
        .alignRight {
          text-align: right;
        }
        .SortableHelper {
          box-shadow: 0 1px 10px 0 rgba(60, 179, 113, 0.9);
        }
      `}</style>
    </div>
  )
}
