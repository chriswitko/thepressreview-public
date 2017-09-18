import { colors } from '../theme'

export default ({ children, href, active }) => {
  return (
    <a href={href} className={active ? 'active' : ''}>
      {children}
      <style jsx>{`
        a.active {
          color: ${colors.base};
        }

        a {
          color: ${colors.text};
          text-decoration: none;
        }
      `}</style>
    </a>
  )
}
