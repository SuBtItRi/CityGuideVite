import React from 'react'

import '../../scss/components/contacts/block.scss'

function Block() {
  const openModal = (e) => {
    document.body.classList.add('overflow-h')
    document.querySelector('.contact__modal').classList.add('show')
  }

  return (
    <section className="contacts">
      <div className="container">
        <div className="contacts__wrap">
          <h1 className="contacts__title">Свяжитесь с нами</h1>
          <div className="contacts__blocks">
            <div className="contacts__blocks-left">
              <div className="contacts__block">
                <div className="contacts__block_title">
                  <img src="/assets/img/icons/location.png" alt="location" />
                  <h2>Местоположение</h2>
                </div>
                <div className="contacts__block_subtitle">
                  Комплекс сверхскоплений Рыб-Кита, сверхскопление Ланиакея, сверхскопление Девы,
                  скопление Девы, Местная группа галактик, галактика Млечный Путь, галактический
                  рукав Ориона, Солнечная система, материк Евразия, страна Россия, город Белгород,
                  308XXX
                </div>
              </div>
              <div className="contacts__block">
                <div className="contacts__block_title">
                  <img src="/assets/img/icons/phone.png" alt="phone" />
                  <h2>Телефон</h2>
                </div>
                <div className="contacts__block_subtitle">+12 345 678 999</div>
              </div>
              <div className="contacts__block">
                <div className="contacts__block_title">
                  <img src="/assets/img/icons/mail.png" alt="mail" />
                  <h2>Почта</h2>
                </div>
                <div className="contacts__block_subtitle">hello@example.com</div>
              </div>
              <div className="contacts__block">
                <div className="contacts__block_title">
                  <img src="/assets/img/icons/location.png" alt="location" />
                  <h2>Часы работы</h2>
                </div>
                <div className="contacts__block_subtitle">
                  Пн-вт С 8:00 до 20:00 | Сб-вс Закрыто
                </div>
              </div>
            </div>
            <div className="contacts__blocks-right">
              <iframe
                src="https://yandex.ru/map-widget/v1/?um=constructor%3Ac7162617ed9f871eb0f7bbdcb852d50fc45e0f6eba42a3e33d04b490df4b561c&amp;source=constructor"
                width="100%"
                height="90%"
                frameBorder="0"
                style={{ borderRadius: '25px' }}
              ></iframe>
            </div>
          </div>
          <div className="contacts__btn_container">
            <button className="contacts__btn" onClick={openModal}>
              Связаться с нами
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Block
