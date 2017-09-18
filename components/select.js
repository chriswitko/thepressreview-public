export default ({ children, ...props }) => {
  return (
    <select {...props}>
      {children}
      <style jsx>{`
        select {
          transition: box-shadow 0.15s ease-in-out;
          width: 100%;
          color: #283c46;
          background: #fff url(/images/select_up_down_arrow.svg) no-repeat right 0.8em center;
          background-size: 0.55em;
          max-width: 100%;
          border-radius: 0.4rem;
          border: 1px solid #bfbfbf;
          padding: 0.8rem;
          font-family: inherit;
          font-weight: inherit;
          -webkit-appearance: none;          
          font: inherit;
          margin: 0;
          cursor: default;
        }
      `}</style>
    </select>
  )
}
