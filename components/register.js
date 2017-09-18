import Panel from './panel'
import Inside from './inside'
import Space from './space'
import Label from './label'
import Text from './text'
import ButtonSubmit from './buttonSubmit'

export default ({ email, loading, disabledSubmit, onEmailChange, onSubmit, onKeyPress }) => {
  return (
    <Panel fullWidth>
      <Inside fullWidth caption='LOGIN OR SUBSCRIBE'>
        <div>
          <Space>
            <Label>
              Enter your email address
            </Label>
            <Text placeholder={'yourname@domain.com'} value={email} onChange={onEmailChange} onKeyPress={onKeyPress} />
          </Space>
          <div>
            <ButtonSubmit disabled={disabledSubmit} loading={loading} onClick={onSubmit} fullWidth>Next →</ButtonSubmit>
          </div>
        </div>
      </Inside>
    </Panel>
  )
}
