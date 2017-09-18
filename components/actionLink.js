import { colors } from '../theme'

export default (props) => {
  return (
    <a href={props.href} className={props.active ? 'active' : ''}>
      {props.children}
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
