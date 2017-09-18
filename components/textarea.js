import { classNames } from '../utils'

export default ({ name, value, placeholder = '', rows = 5, maxLength, fullWidth, halfWidth, onChange, onKeyPress }) => {
  const classes = {
    fullWidth,
    halfWidth
  }

  const myClassNames = classNames(classes)

  return (
    <div className={myClassNames}>
      <textarea name={name} value={value} rows={rows} placeholder={placeholder} onChange={onChange} onKeyPress={onKeyPress} maxLength={maxLength} autoComplete={false} autoCorrect={false} />
      <style jsx>{`
        textarea {
          transition: box-shadow 0.15s ease-in-out;
          color: #283c46;
          max-width: 100%;
          width: 100%;
          border-radius: 0.4rem;
          border: 1px solid #bfbfbf;
          padding: 0.8rem;
          font-family: inherit;
          font-weight: inherit;
          -webkit-appearance: none;          
          font: inherit;
          margin: 0;
          align-items: center;
          cursor: default;
        }
        .halfWidth {
          width: 50%;
        }
        .fullWidth {
          width: 100%;
        }
      `}</style>
    </div>
  )
}
