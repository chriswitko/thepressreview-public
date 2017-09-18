import LinkList from './linkList'
import LinkListItem from './linkListItem'
import Note from './note'
import Link from './link'
import Panel from './panel'

export default (props) => {
  return (
    <div>
      <footer>
        <Panel alignCenter>
          <div>
            <LinkList>
              <LinkListItem inline><Link href='/'>The Press Review <Note>&mdash; Your guide to the news</Note></Link></LinkListItem>
            </LinkList>
            <LinkList>
              <LinkListItem inline><Link href='/about'>About</Link></LinkListItem>
              <LinkListItem inline><Link href='/privacy'>Privacy</Link></LinkListItem>
              <LinkListItem inline><Link href='/terms'>Terms</Link></LinkListItem>
              <LinkListItem inline><Link href='mailto:inbox@thepressreview.com?subject=I have a question'>Help</Link></LinkListItem>
            </LinkList>
          </div>
        </Panel>
      </footer>
      <style jsx>{`
        footer {
          position: fixed;
          bottom: 0;
          width: 100%;
          display: block;
          padding: 30px 0;
          border-top: 1px solid rgba(0, 0, 0, 0.1);
          background: rgba(251, 248, 245, 0.98);
          text-align: center;
        }
        @media only screen and (max-device-width: 600px) {
          footer {
            position: relative;
          }
        }
      `}</style>
    </div>
  )
}
