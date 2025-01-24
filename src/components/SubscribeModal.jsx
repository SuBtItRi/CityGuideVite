import React from 'react'

import '../scss/components/subscribe-modal.scss'

function SubscribeModal() {
  const modalRef = React.useRef()

  const closeModal = () => {
    document.body.classList.remove('overflow-h')
    document.getElementById('subscribe-window').classList.add('hidden')
  }

  return (
    <div ref={modalRef} className="subscribe-window__wrap hidden" id="subscribe-window">
      <div className="subscribe-window">
        <h2>Вы подписались на рассылку!</h2>
        <button id="accept" onClick={closeModal}>
          Принять
        </button>
      </div>
    </div>
  )
}

export default SubscribeModal
