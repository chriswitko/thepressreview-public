import { classNames } from '../utils'

export default ({ children, column, alignCenter, alignRight, testColor }) => {
  const classes = {
    column: true,
    alignCenter,
    alignRight,
    testColor
  }

  const myClassNames = classNames(classes)

  return (
    <div className={myClassNames}>
      {children}
      <style jsx>{`
        .column {
          display: flex;
          flex-direction: column;
          width: 100%;
          max-width: 45em;
          justify-content: flex-start;
          text-align: left;
        }
        .alignCenter {
          align-items: center;
          align-content: center;
          text-align: center;
        }
        .alignRight {
          align-content: flex-end;
          text-align: right;
        }
        .testColor {
          background: blue;
          padding: 0;
        }
      `}</style>
    </div>
  )
}
