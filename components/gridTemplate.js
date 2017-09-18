import ButtonSubmit from './buttonSubmit'
import ButtonDefault from './buttonDefault'
import Space from './space'
import H3 from './h3'
import { classNames } from '../utils'

export default (props) => {
  const classes = {
    'gridItem': true,
    'active': props.item.isActive,
    'alignCenter': props.alignCenter,
    'alignRight': props.alignRight,
    'fullWidth': props.fullWidth
  }

  const myClassNames = classNames(classes)

  const styles = {
    'background': props.image ? `url(${props.image}) no-repeat 50% 50%` : '', 'backgroundSize': 'cover'
  }

  return (
    <div className={myClassNames} style={styles}>
      {props.item.image ? (
        <div className='gridItemImg'>
          <img width='100%' src={props.item.image} />
        </div>
      ) : ''}
      <div className='gridItemTitle'>
        <H3 alignCenter>{props.item.name}</H3>
      </div>
      <Space />
      <div className='gridItemAction'>
        {props.item.isActive ? <ButtonDefault>Selected</ButtonDefault> : <ButtonSubmit disabled>Select</ButtonSubmit>}
      </div>
      <style jsx>{`
        .gridItem {
          width: auto;
          flex: 1;
          background: #fff;
          box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
          border-radius: 0.4rem;
          padding: 25px;
          margin: 10px;
          max-width: 100%;
          min-width: 220px;
          display: flex;
          justify-content: space-between;
          flex-grow: 1;
          flex-wrap: wrap;
          flex-direction: column;
        }
        .fullWidth {
          width: 100%;
        }
        .active {
          box-shadow: 0 1px 10px 0 rgba(60, 179, 113, 0.9);
        }
        .gridItemImg {
          margin-bottom: 10px;
        }
        .alignCenter {
          text-align: center;
        }
        .alignRight {
          text-align: right;
        }
      `}</style>
    </div>
  )
}
