import Panel from './panel'
import Inside from './inside'
import Space from './space'
import Link from './link'

export default (props) => {
  return (
    <div>
      <Panel>
        <Inside fullWidth caption='This is a demo' pills>
          <p>Hello there. This is your personal email. Remember, that you can always <Link>manage your subscription</Link> and <Link>adjust time</Link> to your needs.</p>
          <Space />
          <p><strong>CNN</strong></p>
          <p><Link href=''>Jeden z najsilniejszych SUV-ów na rynku</Link></p>
          <p><Link href=''>BMW chce zachować diesle w swojej gamie</Link></p>
          <p><Link href=''>Jeden z najsilniejszych SUV-ów na rynku</Link></p>
          <p><Link href=''>BMW chce zachować diesle w swojej gamie</Link></p>
          <p><Link href=''>Jeden z najsilniejszych SUV-ów na rynku</Link></p>
          <Space />
          <p><strong>New York Times</strong></p>
          <p><Link href=''>Jeden z najsilniejszych SUV-ów na rynku</Link></p>
          <p><Link href=''>BMW chce zachować diesle w swojej gamie</Link></p>
          <p><Link href=''>Jeden z najsilniejszych SUV-ów na rynku</Link></p>
          <p><Link href=''>BMW chce zachować diesle w swojej gamie</Link></p>
          <p><Link href=''>Jeden z najsilniejszych SUV-ów na rynku</Link></p>
          <Space />
          <p><strong>The Guardian</strong></p>
          <p><Link href=''>Jeden z najsilniejszych SUV-ów na rynku</Link></p>
          <p><Link href=''>BMW chce zachować diesle w swojej gamie</Link></p>
          <p><Link href=''>Jeden z najsilniejszych SUV-ów na rynku</Link></p>
          <p><Link href=''>BMW chce zachować diesle w swojej gamie</Link></p>
          <p><Link href=''>Jeden z najsilniejszych SUV-ów na rynku</Link></p>
          <Space />
          <p><strong>The Verge</strong></p>
          <p><Link href=''>Jeden z najsilniejszych SUV-ów na rynku</Link></p>
          <p><Link href=''>BMW chce zachować diesle w swojej gamie</Link></p>
          <p><Link href=''>Jeden z najsilniejszych SUV-ów na rynku</Link></p>
          <p><Link href=''>BMW chce zachować diesle w swojej gamie</Link></p>
          <p><Link href=''>Jeden z najsilniejszych SUV-ów na rynku</Link></p>
          <Space />
          <p><strong>TNW</strong></p>
          <p><Link href=''>Jeden z najsilniejszych SUV-ów na rynku</Link></p>
          <p><Link href=''>BMW chce zachować diesle w swojej gamie</Link></p>
          <p><Link href=''>Jeden z najsilniejszych SUV-ów na rynku</Link></p>
          <p><Link href=''>BMW chce zachować diesle w swojej gamie</Link></p>
          <p><Link href=''>Jeden z najsilniejszych SUV-ów na rynku</Link></p>
        </Inside>
      </Panel>
    </div>
  )
}
