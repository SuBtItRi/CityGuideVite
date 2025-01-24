import React from 'react'
import { Link } from 'react-router-dom'
import FooterBlockLinks from './FooterBlockLinks'
import '../../scss/components/footer.scss'

function Footer() {
  const openModal = (e) => {
    e.preventDefault()
    document.body.classList.add('overflow-h')
    document.getElementById('subscribe-window').classList.remove('hidden')
    document.getElementById('subscribe_input').value = ''
  }
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__wrap">
          <div className="footer__block">
            <img src="./assets/img/logo.png" alt="" className="footer__logo" />
            <p className="footer__block_text">
              Мы стремимся создать удобный инструмент, который поможет как туристам, так и местным
              жителям открывать лучшие кафе, парки, музеи и другие интересные места. С CityGuide вы
              всегда будете в курсе самых актуальных событий и самых захватывающих маршрутов.
            </p>
            <form onSubmit={openModal} className="footer__subscribe_block">
              <input
                id="subscribe_input"
                type="email"
                name="email"
                className="footer__subscribe_input"
                placeholder="Введите email адресс"
                required
              />
              <button className="footer__subcribe_btn" id="btn_subscribe" type="submit">
                Подписаться
              </button>
            </form>
          </div>
          <div className="footer__blocks">
            <FooterBlockLinks
              links={[
                'Памятники',
                'Музеи',
                'Парки и сады',
                'Храмы и церкви',
                'Театры и культурные центры',
                'Фонтаны',
                'Площади',
              ]}
            />
            <div className="footer__block">
              <Link to="contacts" className="footer__block_title">
                Контакты
              </Link>
              <div className="footer__block_point">
                <div className="footer__block_point_title">
                  <img src="/assets/img/icons/location.png" alt="location" />
                  <h3>Место</h3>
                </div>
                <div className="footer__block_point_subtitle">
                  <Link to="contacts">
                    Комплекс сверхскоплений Рыб-Кита, сверхскопление Ланиакея, сверхскопление Девы,
                    скопление Девы, Местная группа галактик, галактика Млечный Путь, галактический
                    рукав Ориона, Солнечная система, материк Евразия, страна Россия, город Белгород,
                    308XXX
                  </Link>
                </div>
              </div>
              <div className="footer__block_point">
                <div className="footer__block_point_title">
                  <img src="/assets/img/icons/mail.png" alt="mail" />
                  <h3>Почта</h3>
                </div>
                <div className="footer__block_point_subtitle">
                  <Link href="contacts">hello@example.com</Link>
                </div>
              </div>
              <div className="footer__block_point">
                <div className="footer__block_point_title">
                  <img src="/assets/img/icons/phone.png" alt="phone" />
                  <h3>Телефон</h3>
                </div>
                <div className="footer__block_point_subtitle">
                  <Link href="contacts">+7 910 228 2220</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
