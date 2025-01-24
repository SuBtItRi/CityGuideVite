import React from 'react'

import '../../scss/components/contacts/modal.scss'

function Modal() {
  const formRef = React.useRef()

  const closeModal = () => {
    document.body.classList.remove('overflow-h')
    document.querySelector('.contact__modal').classList.remove('show')
  }

  const sendTecket = () => {
    e.preventDefault()
    formRef.current.reset()
    closeModal()
  }

  return (
    <div className="contact__modal">
      <form ref={formRef} onSubmit={sendTecket} className="contact__modal_wrap">
        <button onClick={closeModal} className="contact__modal_close">
          <img src="./assets/img/close.svg" alt="close" />
        </button>
        <div className="contact__modal_email-name">
          <div className="contact__modal_block">
            <h3 className="contact__modal_title">Email</h3>
            <input type="email" placeholder="Введите вашу почту" name="email" required />
          </div>
          <div className="contact__modal_block">
            <h3 className="contact__modal_title">Name</h3>
            <input minLength={3} type="text" placeholder="Введите ваше имя" name="name" required />
          </div>
        </div>
        <div className="contact__modal_block">
          <h3 className="contact__modal_title">Adress</h3>
          <input type="text" placeholder="Введите ваш адресс" name="adress" required />
        </div>
        <div className="contact__modal_block">
          <h3 className="contact__modal_title">Message</h3>
          <textarea type="text" placeholder="Введите сообщение" name="msg" required></textarea>
        </div>
        <button className="contact__modal_btn" type="submit">
          Предоставить на рассмотрение
        </button>
      </form>
    </div>
  )
}

export default Modal
