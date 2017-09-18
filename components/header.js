import Panel from '../components/panel'
import Link from '../components/link'

export default ({ user = {} }) => {
  return (
    <header>
      <Panel>
        <div className='logoSpace'>
          <a href='/'><img className='logoImg' src='/images/logo_chat.png' /></a>
        </div>
        <div className='links'>
          { user._id ? <Link href='/logout' reload>Log out</Link> : <Link href='/about'>Learn more &rarr;</Link> }
        </div>
      </Panel>
      <style jsx>{`
        header {
          min-height: 40px; 
          border-bottom: 1px solid rgba(0, 0, 0, 0.1);
          background-color: rgba(251, 248, 245, 0.98);
          margin-bottom: 20px;
          padding: 5px 0;
        }

        img {
          display: block;
        }

        a {
          font-weight: 500;
        }

        .links {
          display: flex;
          flex: 1;
          align-items: center;
          justify-content: flex-end;
        }

        .logoSpace {
          flex: 1;
          padding-top: 0px;
        }

        .logoImg {
          height: 40px;
        }
      `}</style>
    </header>
  )
}
