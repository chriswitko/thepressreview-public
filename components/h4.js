import { classNames } from '../utils'

export default ({ children, alignCenter, alignRight, italic }) => {
  const classes = {
    alignCenter,
    alignRight,
    italic
  }

  const myClassNames = classNames(classes)

  return (
    <h4 className={myClassNames}>
      {children}
      <style jsx>{`
        .alignCenter {
          text-align: center;
        }
        .alignRight {
          text-align: right;
        }
        .italic {
          font-style: italic;
        }
        h4 {
          font-size: 1.2em;
          line-height: 1.4em;
          font-weight: 400;
          text-align: left;
          margin: 0 0 15px 0;
        }
      `}</style>
    </h4>
  )
}
