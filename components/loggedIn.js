import Panel from './panel'
import Inside from './inside'
import Space from './space'
import Label from './label'
import ButtonSubmit from './buttonSubmit'

export default ({ user, hideExampleLink, loading, onEmailChange, onSubmit }) => {
  return (
    <Panel fullWidth>
      <Inside fullWidth caption='Welcome Back'>
        <div>
          <Space>
            <Label>
              You are signed in.
            </Label>
          </Space>
          <div>
            <ButtonSubmit loading={loading} onClick={onSubmit} fullWidth>Go to Settings →</ButtonSubmit>
          </div>
        </div>
      </Inside>
    </Panel>
  )
}
