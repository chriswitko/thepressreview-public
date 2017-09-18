import { classNames } from '../utils'

export default (props) => {
  const classes = {
    'gridItem': true,
    'active': props.active,
    'alignCenter': props.alignCenter,
    'alignRight': props.alignRight,
    'fullWidth': props.fullWidth
  }

  const myClassNames = classNames(classes)

  const styles = {
    'background': props.color ? `${props.color}` : '', 'backgroundSize': 'cover'
  }

  return (
    <div className={myClassNames} style={styles}>
      <style jsx>{`
        .gridItem {
          width: auto;
          flex: 1;
          background: #fff;
          box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
          border-radius: 0.4rem;
          padding: 25px;
          margin: 10px;
          max-height: 100px;
          max-width: 100px;
          height: 100%;
          width: 100%;
          display: flex;
          justify-content: space-between;
          flex-grow: 0;
          flex-wrap: wrap;
          flex-direction: column;
        }
        .fullWidth {
          width: 100%;
        }
        .gridItem:hover {
          transition: all 200ms ease-in;
          transform: scale(1.1);
        }        
        .active {
          box-shadow: 0 1px 10px 0 rgba(60, 179, 113, 0.9);
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
