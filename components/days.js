import ButtonSubmit from './buttonSubmit'
import ButtonDefault from './buttonDefault'

export default ({ days = [], selectedDays = new Set(), onSelectDay, onDeselectDay }) => {
  return (
    <div>
      <ul>
        {days.map((d, index) => <li key={index}>{selectedDays.has(d.key) ? <ButtonSubmit onClick={() => onDeselectDay(d.key)}>{d.short}</ButtonSubmit> : <ButtonDefault onClick={() => onSelectDay(d.key)}>{d.short}</ButtonDefault>}</li>)}
      </ul>
      <style jsx>{`
        ul {
          display: block;
          list-style: none;
          margin: 0;
          padding: 0;
          width: 100%;
        }
        li {
          display: inline-block;
          margin: 0 10px 10px 0;
          padding: 0;
        }
      `}</style>
    </div>
  )
}
