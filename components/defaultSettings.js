import Panel from './panel'
import Inside from './inside'
import Label from './label'
import Select from './select'
import Space from './space'
import { timezones, timeformat, languages } from '../utils/data'

export default ({ t, wizardMode, handleInputChange, form }) => {
  return (
    <Panel>
      <Inside small>
        <div>
          <Space>
            <Label>
              Time Zone
            </Label>
            <Select name='timezone' value={form.timezone} onChange={handleInputChange}>
              {Object.keys(timezones).map((value, key) => <option key={key} value={timezones[value]}>{timezones[value]}</option>)}
            </Select>
          </Space>
          <Space>
            <Label>
              Time Format
            </Label>
            <Select name='timeformat' value={form.timeformat} onChange={handleInputChange}>
              {timeformat.map((tf, index) => <option key={index} value={tf.key}>{tf.value}</option>)}
            </Select>
          </Space>
          {wizardMode ? '' : (
            <Space>
              <Label>
                Newsletter Language
              </Label>
              <Select name='language' value={form.language} onChange={handleInputChange}>
                {languages.map((lang, index) => <option key={index} value={lang.code}>{t(lang.i18n)}</option>)}
              </Select>
            </Space>
          )}
        </div>
      </Inside>
    </Panel>
  )
}
