import Panel from './panel'
import Column from './column'
import Space from './space'
import H3 from './h3'
import H4 from './h4'
import Row from './row'

export default ({ children, alignCenter, alignRight }) => {
  return (
    <div>
      <Panel>
        <div>
          <div>
            <H3 alignCenter>What are people saying?</H3>
          </div>
        </div>
      </Panel>
      <Space sm />
      <Panel>
        <Row>
          <Column alignCenter>
            <div>
              <Space sm><img src='https://pbs.twimg.com/profile_images/760239116231569408/5jELqhom_bigger.jpg' /></Space>
              <H3 alignCenter>Maciej Propop</H3>
              <Space sm />
              <H4 alignCenter italic>I used to get used to my daily personalised @thepressrev that I do not know what to read when they have a technical break</H4>
            </div>
          </Column>
          <Space horizontal sm />
          <Column alignCenter>
            <div>
              <Space sm><img src='https://pbs.twimg.com/profile_images/878592540043350017/_uMj47vc_bigger.jpg' /></Space>
              <H3 alignCenter>Chris Witko</H3>
              <Space sm />
              <H4 alignCenter italic>It's so cool to start my day with the newsletter from The Press Review. No more wasting time.</H4>
            </div>
          </Column>
        </Row>
      </Panel>
      <style jsx>{`
        div {
          margin-bottom: 15px;
        }
        .alignCenter {
          text-align: center;
        }
        .alignRight {
          text-align: right;
        }
        img {
          border-radius: 50%;
        }
      `}</style>
    </div>
  )
}
