export default () => {
  return (
    <div className='sa'>
      <div className='sa-success'>
        <div className='sa-success-tip' />
        <div className='sa-success-long' />
        <div className='sa-success-placeholder' />
        <div className='sa-success-fix' />
      </div>
      <style jsx>{`
        .sa {
          width: 140px;
          height: 140px;
          padding: 26px;
          margin: auto auto;
          background-color: transparent;
        }
        .sa-success {
          border-radius: 50%;
          border: 4px solid #7ED321;
          box-sizing: content-box;
          height: 80px;
          padding: 0;
          position: relative;
          background-color: transparent;
          width: 80px;
        }
        .sa-success:after, .sa-success:before {
          background: transparent;
          content: '';
          height: 120px;
          position: absolute;
          transform: rotate(45deg);
          width: 60px;
        }
        .sa-success:before {
          border-radius: 40px 0 0 40px;
          width: 26px;
          height: 80px;
          top: -17px;
          left: 5px;
          transform-origin: 60px 60px;
          transform: rotate(-45deg);
        }
        .sa-success:after {
          border-radius: 0 120px 120px 0;
          left: 30px;
          top: -11px;
          transform-origin: 0 60px;
          transform: rotate(-45deg);
          animation: rotatePlaceholder 4.25s ease-in;
        }
        .sa-success-placeholder {
          border-radius: 50%;
          border: 4px solid rgba(165, 220, 134, 0.25);
          box-sizing: content-box;
          height: 80px;
          left: -4px;
          position: absolute;
          top: -4px;
          width: 80px;
          z-index: 2;
        }
        .sa-success-fix {
          background-color: transparent;
          height: 90px;
          left: 28px;
          position: absolute;
          top: 8px;
          transform: rotate(-45deg);
          width: 5px;
          z-index: 1;
        }
        .sa-success-tip, .sa-success-long {
          background-color: #7ED321;
          border-radius: 2px;
          height: 5px;
          position: absolute;
          z-index: 2;
        }
        .sa-success-tip {
          left: 14px;
          top: 46px;
          transform: rotate(45deg);
          width: 25px;
        }
        .sa-success-long {
          right: 8px;
          top: 38px;
          transform: rotate(-45deg);
          width: 47px;
        }
      `}</style>
    </div>
  )
}
