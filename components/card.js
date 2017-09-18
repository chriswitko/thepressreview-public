import Panel from './panel'
import Inside from './inside'
import Label from './label'
import Text from './text'
import Select from './select'
import Space from './space'
import Note from './note'
import Link from './link'
import Row from './row'
import Column from './column'
import ButtonSubmit from './buttonSubmit'

export default ({ t, btnTitle = 'Update my credit card', ccNumber, ccExpMonth, ccExpYear, ccCvv, ccZip, handleInputChange, onSubmit }) => {
  return (
    <Panel>
      <Inside small>
        <div>
          <Space>
            <Label>
              Card number
            </Label>
            <Text name='cc_number' value={ccNumber} maxLength={'16'} onChange={handleInputChange} />
            <Space sm />
            <div>
              <img src='/images/card-brands.svg' width='100%' />
            </div>
          </Space>
          <Space>
            <Row>
              <Column>
                <Label>
                  Month
                </Label>
                <Select name='cc_exp_month' value={ccExpMonth} onChange={handleInputChange}>
                  <option value=''>-</option>
                  <option value='1'>01</option>
                  <option value='2'>02</option>
                  <option value='3'>03</option>
                  <option value='4'>04</option>
                  <option value='5'>05</option>
                  <option value='6'>06</option>
                  <option value='7'>07</option>
                  <option value='8'>08</option>
                  <option value='9'>09</option>
                  <option value='10'>10</option>
                  <option value='11'>11</option>
                  <option value='12'>12</option>
                </Select>
              </Column>
              <div>&nbsp;</div>
              <Column>
                <Label>
                  Year
                </Label>
                <Select name='cc_exp_year' value={ccExpYear} onChange={handleInputChange}>
                  <option value=''>-</option>
                  <option value='2017'>2017</option>
                  <option value='2018'>2018</option>
                  <option value='2019'>2019</option>
                  <option value='2020'>2020</option>
                  <option value='2021'>2021</option>
                  <option value='2022'>2022</option>
                  <option value='2023'>2023</option>
                  <option value='2024'>2024</option>
                  <option value='2025'>2025</option>
                  <option value='2026'>2026</option>
                  <option value='2027'>2027</option>
                  <option value='2028'>2028</option>
                </Select>
              </Column>
            </Row>
          </Space>
          <Space>
            <Row>
              <Column>
                <div>
                  <Label>
                    CVV / CVC
                  </Label>
                  <Text name='cc_cvv' placeholder={''} maxLength={'3'} value={ccCvv} onChange={handleInputChange} />
                </div>
              </Column>
              <div>&nbsp;</div>
              <Column>
                <div>
                  <Label>
                    &nbsp;
                  </Label>
                  <img src='/images/cc_back.png' width='70px' />
                </div>
              </Column>
            </Row>
          </Space>
          <Space>
            <Label>
              Billing Zip/postal code
            </Label>
            <Text halfWidth name='cc_zip' placeholder={''} value={ccZip} onChange={handleInputChange} />
          </Space>
          <div>
            <div>
              <ButtonSubmit href='/settings' fullWidth onClick={onSubmit}>{btnTitle}</ButtonSubmit>
            </div>
          </div>
          <Space sm />
          <div>
            <Note><small>Note: We use Stripe to process all payments. We don't store any pieces of information about your credit card.</small></Note>
            <Space sm />
            <Link href='https://stripe.com' target='_blank'><img src='/images/big.svg' height='30' /></Link>
          </div>
        </div>
      </Inside>
    </Panel>
  )
}
