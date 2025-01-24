import React from 'react'
import { Link, useLocation } from 'react-router-dom'

import '../scss/components/main2.scss'

function Main() {
  const { pathname } = useLocation()

  return (
    <main className="main-2">
      <div className="main-2__wrap">
        <div className="main-2__title">
          <h5 className="main-2_subtitle">{pathname == '/catalog' ? 'Каталог' : 'Контакты'}</h5>
          <h6 className="main-2__title_text">
            <Link to="/" className="main-2__title_text-link">
              Главная
            </Link>
            {pathname == '/catalog' ? 'Каталог' : 'Контакты'}
          </h6>
        </div>
      </div>
    </main>
  )
}

export default Main
