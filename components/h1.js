import { classNames } from '../utils'

export default ({ children, alignCenter, alignRight, colored }) => {
  const classes = {
    alignCenter,
    alignRight,
    colored
  }

  const myClassNames = classNames(classes)

  return (
    <h1 className={myClassNames}>
      {children}
      <style jsx>{`
        .alignCenter {
          text-align: center;
        }
        .alignRight {
          text-align: right;
        }
        .colored {
          color: #E95131;
        }
        h1 {
          text-align: left;
          margin: 0 0 15px 0;
        }
      `}</style>
    </h1>
  )
}
