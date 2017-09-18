import { colors } from '../theme'

export default (props) => {
  return (
    <button disabled={props.disabled} className={props.fullWidth ? 'fullWidth' : ''} onClick={props.disabled ? _ => {} : props.onClick}>
      {props.children}
      <style jsx>{`
        button {
          width: auto;
          display: block;
          background-color: ${colors.light};
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
          border: 1px solid ${colors.light};
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
        button:active {
          background-color: ${colors.default};
          border-color: ${colors.default};
          box-shadow: 0 0 8px rgba(0, 0, 0, 0.25)
        }
        button[disabled] {
          border: 1px solid ${colors.light};
          cursor: not-allowed;
          opacity: 0.4;
          pointer-events: none;
          -webkit-touch-callout: none;
        }
      `}</style>
    </button>
  )
}
