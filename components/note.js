export default ({ children }) => {
  return (
    <span>
      {children}
      <style jsx>{`
        span {
          color: #50495A;
        }
      `}</style>
    </span>
  )
}
