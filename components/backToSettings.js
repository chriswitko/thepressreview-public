import Link from './link'

export default (props) => {
  return (
    <div>
      <Link href='/settings'>← Back to Settings</Link>
      <style jsx>{`
        a {
          font-size: 13px;
        }
      `}</style>
    </div>
  )
}
