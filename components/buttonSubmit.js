import { colors } from '../theme'
import { classNames } from '../utils'

export default ({ children, fullWidth, loading, disabled, onClick }) => {
  const classes = {
    loading,
    disabled,
    fullWidth
  }

  const myClassNames = classNames(classes)

  return (
    <button disabled={loading || disabled} className={myClassNames} onClick={onClick}>
      {loading ? <span className='saving'>Please wait<span>.</span><span>.</span><span>.</span></span> : children}
      <style jsx>{`
        button {
          width: auto;
          display: block;
          background-color: ${colors.base};
          border-color: ${colors.base};
          color: #fff;
          text-decoration: none;
          text-align: center;
          font-weight: bold;
          line-height: 1.5;
          white-space: normal;
          vertical-align: middle;
          transition: box-shadow 0.15s ease-in-out;
          max-width: 100%;
          border-radius: 0.4rem;
          border: 1px solid ${colors.base};
          border-bottom-width: 2px;
          border-bottom-color: rgba(0, 0, 0, 0.15);
          padding: 0.7rem;
          padding-left: 1.5rem;
          padding-right: 1.5rem;
          font-size: 1rem;
        }
        button.fullWidth {
          width: 100%;
        }
        button[disabled] {
          background-color: ${colors.light};
          color: ${colors.text};
          border-color: ${colors.light};
          cursor: not-allowed;
          opacity: 0.4;
          pointer-events: none;
          -webkit-touch-callout: none;
        }
        button:active {
          background-color: ${colors.baseActive};
          border-color: ${colors.baseActive};
          box-shadow: 0 0 8px rgba(0, 0, 0, 0.25)
        }

        .saving span {
          animation-name: blink;
          animation-duration: 1.4s;
          animation-iteration-count: infinite;
          animation-fill-mode: both;
        }

        .saving span:nth-child(2) {
          animation-delay: .2s;
        }

        .saving span:nth-child(3) {
          animation-delay: .4s;
        }

        @keyframes blink {
          0% {
            opacity: .2;
          }
          20% {
            opacity: 1;
          }
          100% {
            opacity: .2;
          }
        }
      `}</style>
    </button>
  )
}
