import { classNames } from '../utils'
import Link from './link'

export default ({ children, caption, highlight, danger, tip, success, fullWidth, small, medium, flash, alignCenter, alignRight, onClose }) => {
  const classes = {
    inside: true,
    tip,
    danger,
    success,
    highlight,
    fullWidth,
    small,
    medium,
    alignCenter,
    alignRight,
    flash
  }

  const myClassNames = classNames(classes)

  return (
    <div className={myClassNames}>
      {children}
      {onClose ? (
        <span>
          &nbsp;
          <Link reload extClick={onClose}>[Close]</Link>
        </span>
      ) : ''}
      <style jsx>{`
        .inside {
          display: block;
          position: relative;
          box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
          border-radius: 0.4rem;
          padding: 15px;
          font-weight: 600;
        }
        .flash {
          border-radius: 0;
        }
        .danger {
          background-color: #FFE5E5;
        }
        .tip {
          background-color: #FFF0DB;
        }
        .success {
          background-color: #E4F8E2;
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
