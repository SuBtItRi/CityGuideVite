import React from 'react'

import { Main, About, Advice, Maps } from '../components/Home'

import '../scss/animations.scss'

function Home() {
  React.useEffect(() => {
    const check_anim = () => {
      document.querySelectorAll('#left-block').forEach((elem) => {
        const obj = elem.getBoundingClientRect()
        if (obj.top < window.innerHeight && obj.bottom > 0) {
          elem.classList.remove('apear-left')
        } else {
          elem.classList.add('apear-left')
        }
      })
      document.querySelectorAll('#right-block').forEach((elem) => {
        const obj = elem.getBoundingClientRect()
        if (obj.top < window.innerHeight && obj.bottom > 0) {
          elem.classList.remove('apear-right')
        } else {
          elem.classList.add('apear-right')
        }
      })
    }
    check_anim()
    window.addEventListener('scroll', check_anim)
    return () => {
      window.removeEventListener('scroll', check_anim)
    }
  })

  return (
    <div className="home">
      <Main />
      <About />
      <Advice />
      <Maps />
    </div>
  )
}

export default Home
