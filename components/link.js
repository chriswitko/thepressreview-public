import Link from 'next/link'
import { redirect } from '../utils'

export default ({ children, href, target, reload, extClick }) => {
  const onClick = () => {
    redirect({}, href, reload)
  }

  const html = reload ? (
    <a className='link' target={target} onClick={extClick || onClick}>
      {children}
      <style jsx>{`
        .link {
          color: #1b6ac9;
          text-decoration: none;
          cursor: pointer;
        }
      `}</style>
    </a>
  ) : (
    <Link href={href}>
      <a className='link' target={target}>
        {children}
        <style jsx>{`
          .link {
            color: #1b6ac9;
            text-decoration: none;
          }
        `}</style>
      </a>
    </Link>
  )

  return (
    html
  )
}
