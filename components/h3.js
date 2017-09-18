import { classNames } from '../utils'

export default ({ children, alignCenter, alignRight, uppercase }) => {
  const classes = {
    alignCenter,
    alignRight,
    uppercase
  }

  const myClassNames = classNames(classes)

  return (
    <h3 className={myClassNames}>
      {children}
      <style jsx>{`
        .alignCenter {
          text-align: center;
        }
        .alignRight {
          text-align: right;
        }
        .uppercase {
          text-transform: uppercase;
        }
        h3 {
          text-align: left;
          margin: 0 0 15px 0;
        }
      `}</style>
    </h3>
  )
}
