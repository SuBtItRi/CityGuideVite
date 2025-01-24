import React from 'react'
import '../../scss/components/home/advice.scss'

function Main() {
  return (
    <section className="advice">
      <div className="advice__wrap">
        <img
          src="./assets/img/home/advice.png"
          alt="advice__img"
          className="advice__img apear-left"
          id="left-block"
        />
        <div className="advice__text apear-right" id="right-block">
          <div className="advice__text_box">
            <p className="advice__text_title">
              Путешествуйте рано и часто. По возможности живите за пределами своего города. Поймите
              другие культуры, кроме своей собственной. По мере того как вы будете понимать другие
              культуры, ваше понимание себя и своей собственной культуры будет расти в
              геометрической прогрессии.
            </p>
            <p className="advice__text_subtitle">
              У хорошего путешественника нет определенных планов, и он не стремится вернуться домой.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Main
