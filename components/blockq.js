import { classNames } from '../utils'

export default ({ children, alignCenter, alignRight, colored }) => {
  const classes = {
    blockq: true,
    alignCenter,
    alignRight,
    colored
  }

  const myClassNames = classNames(classes)

  return (
    <div className={myClassNames}>
      {children}
      <style jsx>{`
        .blockq {
          font-size: 1rem;
          background: #0088f3;
          border-radius: 4px;
          color: #fff;
          position: relative;
          padding: 25px 30px;
        }
        .blockq::after {
          border-style: solid;
          border-color: #0088f3 transparent transparent;
          border-width: 15px 15px 0 0;
          content: '';
          position: absolute;
          top: 100%;
          left: 42px;
          width: 0;
          height: 0;          
        }
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
          margin: 0;
        }
      `}</style>
    </div>
  )
}
