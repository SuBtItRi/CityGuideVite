import React from 'react'
import '../../scss/components/home/main.scss'

function Main() {
  const [photoNum, setPhotoNum] = React.useState(0)
  const mainRef = React.useRef(null)

  React.useEffect(() => {
    if (mainRef.current) {
      mainRef.current.style.backgroundImage = `url('./assets/img/home/slider/${photoNum}.jpeg')`
    }
  }, [photoNum])

  React.useEffect(() => {
    const intervalId = setInterval(() => {
      sliderNext()
    }, 7500)

    return () => clearInterval(intervalId)
  }, [])

  const sliderBack = () => {
    setPhotoNum((photoNum) => (photoNum - 1 < 0 ? 7 : photoNum - 1))
  }

  const sliderNext = () => {
    setPhotoNum((photoNum) => (photoNum + 1) % 8)
  }

  return (
    <main ref={mainRef} className="main" id="main">
      <div className="main__wrap">
        <button className="main__btn_back apear-left" id="left-block" onClick={sliderBack}>
          <img src="/assets/img/arrow_l.svg" alt="arrow_l" />
        </button>
        <div className="main__title">
          <h2 className="main__subtitle">City Guide</h2>
          <h1 className="main__title_text">Belgorod</h1>
        </div>
        <button className="main__btn_next apear-right" id="right-block" onClick={sliderNext}>
          <img src="/assets/img/arrow_r.svg" alt="arrow_r" />
        </button>
      </div>
    </main>
  )
}

export default Main
