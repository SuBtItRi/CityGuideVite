import React from 'react'
import '../../scss/components/home/about.scss'

function Main() {
  return (
    <section className="about">
      <div className="container">
        <div className="about__wrap">
          <div className="about__text apear-left" id="left-block">
            <h2 className="about_title">Узнайте больше про Белгород</h2>
            <p className="about_subtitle">
              Бе́лгород — город на юге средней полосы европейской части России, административный
              центр Белгородской области. Образует одноимённый городской округ.
            </p>
            <p className="about_subtitle">
              Расположен на южной окраине Среднерусской возвышенности, на берегах Белгородского
              водохранилища, рек Везёлки и Северского Донца, в 700 км к югу от Москвы, в 35 км от
              границы с Украиной. Город областного значения. Население — 328 482 человека (2024).
              Вокруг города образовалась Белгородская агломерация с численностью населения более 0,5
              млн человек. Город первого салюта. Первый в России город, получивший звание «Город
              воинской славы».
            </p>
          </div>
          <img
            className="about__img apear-right"
            id="right-block"
            src="./assets/img/home/about.png"
            alt=""
          />
        </div>
      </div>
    </section>
  )
}

export default Main
