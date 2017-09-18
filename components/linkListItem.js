export default ({ children, inline }) => {
  return (
    <li className={inline ? 'inline' : 'block'}>
      {children}
      <style jsx>{`
        li.inline {
          display: inline-block;
          margin: 0 0 0 10px;
          padding: 0;
        }
        li.inline::after {
          content: "·";
          margin-left: 10px;
        }
        li.inline:last-child::after {
          content: ""
        }
        li.block {
          margin: 0 0 10px 17px;
          padding: 0;
        }
      `}</style>
    </li>
  )
}
