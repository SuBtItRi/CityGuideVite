import React from 'react'

function ReviewModal({ modalOpen, modalClose }) {
  return (
    <div id="modal" className="modal" style={{ display: modalOpen ? 'flex' : 'none' }}>
      <div className="modal-content">
        <span className="close-button" onClick={modalClose}>
          &times;
        </span>
        <h2>Что самое главное в отзывах?</h2>
        <p>
          <strong>Что будет полезным:</strong>
        </p>
        <ul>
          <li>Будьте точными: чем больше деталей, тем лучше.</li>
          <li>Поделитесь тем, что было замечательно, что было плохо и что было приемлемо.</li>
          <li>Поделитесь с нами тем, что вы бы рассказали своим друзьям.</li>
          <li>Добавьте советы и рекомендации.</li>
        </ul>
        <p>
          <strong>Что избегать:</strong>
        </p>
        <ul>
          <li>Нецензурная лексика, угрозы или личные оскорбления.</li>
          <li>Упоминания личной информации (адреса электронной почты и номера телефонов).</li>
          <li>Использование ЗАГЛАВНЫХ БУКВ.</li>
          <li>Истории о чужом опыте и мнениях.</li>
        </ul>
        <p>
          Хотите ответить на отзыв? <strong>Используйте форму ответа.</strong>
        </p>
      </div>
    </div>
  )
}

export default ReviewModal
