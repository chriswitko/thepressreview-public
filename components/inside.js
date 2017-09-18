import { classNames } from '../utils'

export default ({ children, caption, highlight, fullWidth, small, medium, pills, square, alignCenter, alignRight }) => {
  const classes = {
    inside: true,
    classic: !pills && !square,
    pills: pills,
    square: square,
    highlight,
    fullWidth,
    small,
    medium,
    alignCenter,
    alignRight
  }

  const myClassNames = classNames(classes)

  return (
    <div className={myClassNames}>
      <div className='captionDiv'>
        {caption ? <div className='caption'>{caption}</div> : '' }
      </div>
      {children}
      <style jsx>{`
        .captionDiv {
          display: flex;
          justify-content: center;
          width: 100%;
          margin-top: -64px;
          margin-bottom: 64px;
        }
        .inside {
          display: block;
          position: relative;
          box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
          border-radius: 0.4rem;
          padding: 50px;
        }
        .classic {
          background: #fff url(/images/bg_t15.png) repeat-x;
          background-position: 0 -50px;
        }
        .pills {
          background: #fff url(/images/bg_pills.png) no-repeat 50% 50%;
          background-position: 0 -50px;
          background-size: contain;
        }
        .square {
          background: #fff url(/images/bg_square.png) no-repeat 50% 50%;
          background-position: 0 -50px;
          background-size: contain;
        }
        .fullWidth {
          width: 100%;
        }
        .small {
          width: 25em;
        }
        .medium {
          width: 35em;
        }
        .highlight {
          box-shadow: 0 1px 10px 0 rgba(60, 179, 113, 0.9);
        }
        .caption {
          transform: rotate(7deg);
          display: table;
          padding: 10px 24px;
          color: #4A4A4A;
          border-radius: 0.4rem;
          text-align: center;
          text-transform: uppercase;
          line-height: 1.1em;
          font-size: 0.9em;
          font-weight: 700;
          background: #FFE4F7 url(/images/bg_t15.png) repeat-x;
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
