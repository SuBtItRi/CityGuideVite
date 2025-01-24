import React from 'react'

import { Link } from 'react-router-dom'

function FooterBlockLinks({ links }) {
  return (
    <div className="footer__block">
      <Link to="catalog?filter=Все" className="footer__block_title">
        Каталог
      </Link>
      {links.map((item, index) => (
        <Link
          key={`${item}_${index}`}
          to={`catalog?filter=${item.replace(/\s+/g, '+').toLowerCase()}&page=1`}
          className="footer__block_subtitle"
        >
          {item}
        </Link>
      ))}
    </div>
  )
}

export default FooterBlockLinks
