export default ({ children }) => {
  return (
    <span className='highlight'>
      {children}
      <style jsx>{`
        .highlight {
          border-radius: 1em 0 1em 0;
          background-image: linear-gradient(-100deg, rgba(250, 247, 133, 0.3), rgba(250, 247, 133, 0.7) 95%, rgba(250, 247, 133, 0.1))                
        }
      `}</style>
    </span>
  )
}
