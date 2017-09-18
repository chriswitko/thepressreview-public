import GridPanel from './gridPanel'
import Color from './color'

export default ({ colors }) => {
  return (
    <GridPanel>
      {colors.map((c, index) => <Color key={index} color={c.bg} active={c.isActive} />)}
    </GridPanel>
  )
}
