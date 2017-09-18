import { classNames } from '../utils'

export default ({ children, horizontal, sm, fullWidth, alignCenter }) => {
  const classes = {
    alignCenter,
    horizontal,
    sm,
    fullWidth
  }

  const myClassNames = classNames(classes)

  return (
    <div className={myClassNames}>
      {children}
      <style jsx>{`
        div {
          display: block;
          width: 100%;
          min-height: 15px;
          margin-bottom: 20px;
          clear: left;
        }
        .sm {
          min-height: 5px;
          margin-bottom: 5px;
        }
        .alignCenter {
          text-align: center;
        }
        .fullWidth {
          width: 100%;
          margin-bottom: 0;
        }
        div.horizontal {
          display: block;
          width: 20px;
          min-height: 15px;
        }
      `}</style>
    </div>
  )
}
