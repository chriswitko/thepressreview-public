import PropTypes from 'prop-types'
import ButtonSubmit from './buttonSubmit'
import ButtonDefault from './buttonDefault'
import Space from './space'
import Panel from './panel'

const footerWizard = ({ onBackRoute, onNextRoute, onCancel, loading }) => {
  return (
    <footer>
      <Panel>
        {onBackRoute ? <ButtonDefault onClick={onBackRoute}>Back</ButtonDefault> : ''}
        {onCancel ? <ButtonDefault onClick={onCancel}>Cancel</ButtonDefault> : ''}
        {onBackRoute || onCancel ? <Space horizontal /> : ''}
        <ButtonSubmit onClick={onNextRoute} loading={loading}>Next</ButtonSubmit>
      </Panel>
      <style jsx>{`
        footer {
          position: fixed;
          bottom: 0;
          width: 100%;
          display: block;
          padding: 30px 0;
          border-top: 1px solid rgba(0, 0, 0, 0.1);
          background-color: rgba(251, 248, 245, 0.98);
          text-align: center;
        }
      `}</style>
    </footer>
  )
}

footerWizard.propTypes = {
  onBackRoute: PropTypes.func,
  onNextRoute: PropTypes.func.isRequired
}

footerWizard.defaultProps = {
  backRoute: () => {}
}

export default footerWizard
