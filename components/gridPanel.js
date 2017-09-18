import { classNames } from '../utils'

export default ({ children, alignCenter, alignRight }) => {
  const classes = {
    'panelGrid': true,
    'alignCenter': alignCenter,
    'alignRight': alignRight
  }

  const myClassNames = classNames(classes)

  return (
    <div className={myClassNames}>
      {children}
      <style jsx>{`
        .panelGrid {
          display: flex;
          max-width: 90em;
          margin: auto auto;
          justify-content: center;
          flex-wrap: wrap;
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
