export default ({ children }) => {
  return (
    <label>
      {children}
      <style jsx>{`
        label {
          display: block;
          width: 100%;
          font-weight: 600;
          margin-bottom: 5px;
        }
      `}</style>
    </label>
  )
}
