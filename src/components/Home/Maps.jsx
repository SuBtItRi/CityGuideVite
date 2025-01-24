import React from 'react'
import '../../scss/components/home/maps.scss'

function Main() {
  const [mapSrc, setMapSrc] = React.useState(
    'https://yandex.ru/map-widget/v1/?um=constructor%3A7dba4573af2fb158f5ecce2cd7410825eafb3415b6fb70d438d627a1572570fa&amp;source=constructor'
  )
  const mapRef = React.useRef()
  const mapSrcs = {
    0: 'https://yandex.ru/map-widget/v1/?um=constructor%3A7dba4573af2fb158f5ecce2cd7410825eafb3415b6fb70d438d627a1572570fa&source=constructor',
    1: 'https://yandex.ru/map-widget/v1/?um=constructor%3A995291e81d14870338d522bcf2003cc3ea46a7fe6d64e601916328058bea92a6&source=constructor',
    2: 'https://yandex.ru/map-widget/v1/?um=constructor%3Aa025175ae9759c043175cae12055705381ac104ecd9938f66f5958ac061ef3f7&source=constructor',
    3: 'https://yandex.ru/map-widget/v1/?um=constructor%3Ad1a22f8f04dbcfea7a3f7dbb5e0482b4b02f64b242b5c851cb1b226ffa455b4a&source=constructor',
    4: 'https://yandex.ru/map-widget/v1/?um=constructor%3Adc7a9a4c6460a8752016342f3b4f7ce1233181a51cecf5e94e1b4d873f111fc0&source=constructor',
    5: 'https://yandex.ru/map-widget/v1/?um=constructor%3A216cd1be212f86b6e4349e92b94a4cb699524482488bfcb0c9e675ea6e750e6c&source=constructor',
    6: 'https://yandex.ru/map-widget/v1/?um=constructor%3Ac5ee0a6a9aa2b0e631988dde7fee539d3d69b3ff5137ff3ea41e3a1cb236e4c6&source=constructor',
  }

  const changeMap = (event) => {
    setMapSrc(mapSrcs[event.target.value])
  }

  return (
    <section className="maps" id="maps">
      <div className="container">
        <div className="maps__wrap">
          <div className="maps__title">
            <h2>Выбрать карту:</h2>
            <select id="maps__sort" onChange={changeMap}>
              <option value={0}>памятники</option>
              <option value={1}>музеи</option>
              <option value={2}>парки и сады</option>
              <option value={3}>храмы и церкви</option>
              <option value={4}>театры и культ. центры</option>
              <option value={5}>фонтаны</option>
              <option value={6}>площади</option>
            </select>
          </div>
          <iframe
            ref={mapRef}
            name="map"
            id="map"
            src={mapSrc}
            width="100%"
            height="400"
            frameBorder="0"
            style={{ borderRadius: '25px' }}
          />
        </div>
      </div>
    </section>
  )
}

export default Main
