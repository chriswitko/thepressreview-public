export default ({ children }) => {
  return (
    <ul>
      {children}
      <style jsx>{`
        ul {
          display: block;
          list-style: disc;
          margin: 0;
          padding: 0;
          width: 100%;
        }
      `}</style>
    </ul>
  )
}
