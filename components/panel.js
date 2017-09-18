import { classNames } from '../utils'

export default ({ children, column, alignCenter, alignRight, testColor }) => {
  const classes = {
    panel: true,
    column,
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
          flex: 1;
          flex-direction: column;
        }
        .panel {
          display: flex;
          width: 100%;
          max-width: 45em;
          margin: auto auto;
          justify-content: center;
          text-align: left;
        }
        .alignCenter {
          text-align: center;
        }
        .alignRight {
          text-align: right;
        }
        .testColor {
          background: red;
          padding: 0;
        }
        @media only screen 
        and (min-device-width: 600px)  {
          .panel {
            padding: 0 10px;
          }
        }
        @media only screen and (max-device-width: 600px) {
          .panel {
            padding: 10px 10px;
          }
        }
      `}</style>
    </div>
  )
}
