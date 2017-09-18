export default ({ children, number }) => {
  return (
    <div className='space'>
      <div className='star'>
        <img src='/images/star.png' />
      </div>
      <div className='text'>
        <div>
          {children}
        </div>
      </div>
      <style jsx>{`
        .space {
          display: flex;
          width: 100%;
        }
        .star {
          display: block;
          min-width: 50px;
          width: 50px;
          height: 50px;
          color: #fff;
          font-weight: 600;
          font-size: 24px;
          line-height: 48px;
          text-align: center;
          border-radius: 0.4rem;
          margin-right: 10px;
        }   
        img {
          width: 50px;
        }     
        .number {
          display: block;
          min-width: 50px;
          width: 50px;
          height: 50px;
          background: #E95131;
          color: #fff;
          font-weight: 600;
          font-size: 24px;
          line-height: 48px;
          text-align: center;
          border-radius: 0.4rem;
          margin-right: 10px;
        }
        .text {
          display: flex;
          justify-content: center;
          align-items: center;
        }
      `}</style>
    </div>
  )
}
