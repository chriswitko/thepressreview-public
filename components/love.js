export default () => {
  return (
    <div>
      <section className='love' />
      <style jsx>{`
        .love {
          width: 70px;
          height: 50px;
          background: url('/images/liked-animation.svg') no-repeat;
          background-position: 0 0;
        }

        .love:hover {
          background-position: -3519px 0;
          transition: background 1s steps(55);
        }
      `}</style>
    </div>
  )
}
