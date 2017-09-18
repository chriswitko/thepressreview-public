import { colors } from '../theme'

export default ({children, href, fullWidth, disabled, onClick}) => {
  return (
    <button type='button' className={fullWidth ? 'fullWidth' : ''} disabled={disabled} onClick={onClick}>
      {children}
      <style jsx>{`
        button {
          width: auto;
          display: block;
          background-color: transparent;
          border-color: transparent;
          color: ${colors.link};
          text-decoration: none;
          text-align: center;
          font-weight: bold;
          line-height: 1.5;
          white-space: normal;
          vertical-align: middle;
          transition: box-shadow 0.15s ease-in-out;
          max-width: 100%;
          border-radius: 0.4rem;
          border: 1px solid transparent;
          border-bottom-width: 2px;
          border-bottom-color: transparent;
          padding: 0.7rem;
          padding-left: 1.5rem;
          padding-right: 1.5rem;
          font-size: 1rem;
        }
        button.fullWidth {
          width: 100%;
        }
        button[disabled] {
          cursor: not-allowed;
          opacity: 0.4;
          pointer-events: none;
          -webkit-touch-callout: none;
        }
      `}</style>
    </button>
  )
}
