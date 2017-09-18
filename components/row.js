import { classNames } from '../utils'

export default ({ children, column, alignCenter, alignRight, testColor, wide }) => {
  const classes = {
    row: true,
    column,
    alignCenter,
    alignRight,
    testColor,
    wide
  }

  const myClassNames = classNames(classes)

  return (
    <div className={myClassNames}>
      {children}
      <style jsx>{`
        .column {
          flex: 1;
          flex-direction: column;
        }
        .row {
          display: flex;
          width: 100%;
          max-width: 45em;
          margin: auto auto;
          justify-content: center;
          text-align: left;
        }
        .alignCenter {
          align-items: center;
          align-content: center;
          text-align: center;
        }
        .alignRight {
          text-align: right;
        }
        .wide {
          max-width: 100%;
        }
        .testColor {
          background: red;
          padding: 0;
        }
      `}</style>
    </div>
  )
}
