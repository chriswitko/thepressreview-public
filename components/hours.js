import Link from './link'
import { Trash2 } from 'react-feather'
import { convertTime } from '../utils'

export default ({ hours = [], timeformat, onRemoveHour }) => {
  return (
    <div>
      <div className='hoursDiv'>
        {hours.map((hour, index) => (
          <div className='hour' key={index}><div className='svg-container'><Link extClick={() => onRemoveHour(hour)} reload>{convertTime(hour, timeformat)} <div className='icon'><Trash2 size={'1.1em'} color={'#9B9B9B'} /></div></Link></div></div>
        ))}
      </div>
      <style jsx>{`
        .hoursDiv {
          justify-content: flex-start;
          flex: 1;
          flex-wrap: wrap;
          display: flex;
          width: 100%;
          flex-direction: row;
        }
        .hour {
          position: relative;
          flex-wrap: 1;
          line-height: 1.8em;
          background: #fff;
          border: 1px solid #D5D5D5;
          padding: 0 10px;
          text-align: center;
          border-radius: 50em;
          margin-bottom: 10px;
          margin-right: 10px;
          padding-right: 35px;
        }
        .icon {
          position: absolute;
          display: inline-block;
          padding-top: 2px;
          padding-right: 10px;
          top: 0;
          right: 0;
        }
        .svg-container {
          display: flex;
          align-items: center;
          height: 100%;
        }
      `}</style>
    </div>
  )
}
