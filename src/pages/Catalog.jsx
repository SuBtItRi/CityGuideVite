import 'react'

import { Block } from '../components/Catalog'
import { Main } from '../components'

import '../scss/components/main2.scss'

function Catalog() {
  return (
    <div className="content">
      <Main />
      <Block />
    </div>
  )
}

export default Catalog
