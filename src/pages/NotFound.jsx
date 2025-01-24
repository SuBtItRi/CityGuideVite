import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import '../scss/pages/notfound.scss'

function NotFound() {
  const [secToRedirect, setSecToRedirect] = useState(15)
  const navigate = useNavigate()

  useEffect(() => {
    const interval = setInterval(() => {
      setSecToRedirect((sec) => sec - 1)
    }, 1000)

    if (secToRedirect === 0) {
      clearInterval(interval)
      navigate('/')
    }

    return () => clearInterval(interval)
  }, [secToRedirect, navigate])

  return (
    <div className="notfound">
      <div className="container">
        <div className="notfound__container">
          <div className="notfound__left-block">
            <h1>404 Not found</h1>
            <h4>
              Вы попали куда то не туда...
              <br /> Сейчас вы будете возвращены на главную страницу, через
              <span> {secToRedirect}</span> сек.
            </h4>
          </div>
          <div className="notfound__right-block">
            <img src="/assets/img/notfound.jpg" alt="Not Found" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotFound
