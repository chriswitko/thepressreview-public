import GridPanel from './gridPanel'
import GridTemplate from './gridTemplate'

export default ({ templates = [] }) => {
  return (
    <GridPanel>
      {templates.map((template, index) => (
        <GridTemplate alignCenter key={index} item={template} />
      ))}
    </GridPanel>
  )
}
