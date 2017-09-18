import Panel from './panel'
import LinkList from './linkList'
import LinkListItem from './linkListItem'
import ActionLink from './actionLink'
import Note from './note'
import Space from './space'
import Row from './row'
import GridPanel from './gridPanel'
import GridItem from './gridItem'
import Text from './text'
import Link from './link'
import Alert from './alert'

export default ({ channels = [], allChannels = [], section = '', q = '', onSubscribe, onUnsubscribe, handleInputChange }) => {
  let filtered = channels
  if (section === 'selected') {
    filtered = filtered.filter(c => c.isSubscribed)
  } else if (section) {
    filtered = filtered.filter(c => c.language === section)
  } else {
    filtered = filtered.filter(c => c.language === 'en')
  }

  return (
    <div>
      <Panel alignCenter>
        <LinkList>
          <LinkListItem inline><ActionLink href={'?'} active={!section}>All ({allChannels.length})</ActionLink></LinkListItem>
          <LinkListItem inline><ActionLink href={'?section=selected'} active={section === 'selected'}>Selected <Note>({allChannels.filter(c => c.isSubscribed).length})</Note></ActionLink></LinkListItem>
          <LinkListItem inline><ActionLink href={'?section=en'} active={section === 'en'}>English</ActionLink></LinkListItem>
          <LinkListItem inline><ActionLink href={'?section=fr'} active={section === 'fr'}>French</ActionLink></LinkListItem>
          <LinkListItem inline><ActionLink href={'?section=de'} active={section === 'de'}>German</ActionLink></LinkListItem>
          <LinkListItem inline><ActionLink href={'?section=es'} active={section === 'es'}>Spanish</ActionLink></LinkListItem>
          <LinkListItem inline><ActionLink href={'?section=pl'} active={section === 'pl'}>Polish</ActionLink></LinkListItem>
        </LinkList>
      </Panel>
      <Space />
      <Panel alignCenter>
        <Row alignCenter>
          <Space fullWidth>
            <Text placeholder='Search for channels...' name='q' value={q} onChange={handleInputChange} fullWidth />
            <Space fullWidth>
              <Note><small>If we missed something, <Link href='mailto:inbox@thepressreview.com?subject=Channel suggestion'>just let us know</Link>, and we will add missing channel immediately.</small></Note>
            </Space>
          </Space>
        </Row>
      </Panel>
      <Space />
      {!filtered.length ? (
        <Space>
          <Panel alignCenter>
            <Alert tip fullWidth>Upsss. Looks like we could not find channels in this section. Try change language above to search for more channels.</Alert>
          </Panel>
        </Space>
      ) : ''}
      <GridPanel>
        {filtered.map((channel, index) => (
          <GridItem alignCenter key={index} item={channel} idx={index} onSubscribe={onSubscribe} onUnsubscribe={onUnsubscribe} />
        ))}
      </GridPanel>
    </div>
  )
}
