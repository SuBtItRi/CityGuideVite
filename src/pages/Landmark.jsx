import React from 'react'
import Loader from '../components/Loader'
import { useParams, useNavigate } from 'react-router-dom'
import { useQuery } from 'react-query'
import { fetchLandmark } from '../api'
import { Reviews } from '../components/Landmark'

import '../scss/components/landmark/main.scss'
import '../scss/components/landmark/reviews.scss'
import '../scss/components/landmark/slider.scss'

function Landmark() {
  const { id } = useParams()
  const navigate = useNavigate()
  const {
    data: landmark,
    error: landmarkError,
    isLoading: landmarkLoading,
  } = useQuery(['landmark', id], () => fetchLandmark(id))
  const [isSliderOpen, setIsSliderOpen] = React.useState(false)
  const [currentSlide, setCurrentSlide] = React.useState(0)

  const switchSlider = () => {
    setIsSliderOpen(!isSliderOpen)
  }

  const nextSlide = (e) => {
    e.stopPropagation()
    setCurrentSlide((prev) => (prev === landmark.imgs.length - 1 ? 0 : prev + 1))
  }

  const prevSlide = (e) => {
    e.stopPropagation()
    setCurrentSlide((prev) => (prev === 0 ? landmark.imgs.length - 1 : prev - 1))
  }

  const getImagePath = (path) =>
    path.startsWith('.') ? path.replace('.', '').replace('-', '/') : path

  const renderImages = (images) =>
    images.length <= 1 ? (
      <img
        className="imgs__item"
        src={getImagePath(images[0])}
        alt={images[0]}
        id="img1"
        style={{ cursor: 'unset', borderRadius: '20px' }}
      />
    ) : (
      <>
        {images.slice(0, 3).map((img, index) => (
          <img
            key={index}
            className="imgs__item"
            src={getImagePath(img)}
            alt={img}
            id={`img${index + 1}`}
            onClick={switchSlider}
          />
        ))}
      </>
    )

  if (landmarkLoading) return <Loader />
  if (landmarkError) navigate('/')

  return (
    <div className="landmark landmark-background">
      <section className="indent" />
      <main className="main-landmark">
        <div className="container">
          <div className="landmark__wrap">
            <p className="landmark__href">
              <a href="/catalog">Каталог</a> {'>'}{' '}
              <a
                href={`/catalog?filter=${landmark.filter.toLowerCase()}&page=1&sortBy=grade&order=desc`}
                id="href_with_filter"
              >
                {landmark.filter}
              </a>{' '}
              {'>'}{' '}
              <a href="/catalog" id="spec_href">
                {' '}
                {landmark.title}{' '}
              </a>
            </p>
            <h2 className="landmark__title">{landmark.title}</h2>
            <div className="landmark__window">
              <div className="landmark__window-main">
                <div
                  className="landmark__window_imgs"
                  style={landmark.imgs.length <= 1 ? { display: 'flex' } : {}}
                >
                  {renderImages(landmark.imgs)}
                </div>
                <div className="landmark__window_info-block">
                  <p className="landmark__window_description">{landmark.description}</p>
                  <div className="landmark__window_bottom-block">
                    <iframe
                      className="map"
                      src={landmark.map}
                      width="100%"
                      height="150px"
                      frameBorder={0}
                    ></iframe>
                    <p className="landmark__window_grade">
                      {landmark.grade?.length
                        ? (
                            landmark.grade.reduce((acc, grade) => acc + grade, 0) /
                            landmark.grade.length
                          ).toFixed(1)
                        : 'Нету'}{' '}
                      | {landmark.grade?.length || 0} отзыв
                    </p>
                    <p className="landmark__window_adress">{landmark.adress}</p>
                    <a href={landmark.map}>
                      <button className="landmark__window_blue-btn">Показать на карте</button>
                    </a>
                  </div>
                </div>
              </div>
              <Reviews grades={landmark.grade} />
              {isSliderOpen && (
                <div className="landmark__window-slider" onClick={switchSlider}>
                  <div className="slider-content" onClick={(e) => e.stopPropagation()}>
                    <img
                      src={getImagePath(landmark.imgs[currentSlide])}
                      alt={`Слайд ${currentSlide + 1}`}
                      className="slider-image"
                    />
                    <button className="slider-close" onClick={switchSlider}>
                      <img src="/assets/img/close.svg" alt="" />
                    </button>
                    {landmark.imgs.length > 1 && (
                      <>
                        <button className="slider-prev" onClick={prevSlide}>
                          <img src="/assets/img/arrow_l_black.svg" alt="Предыдущий" />
                        </button>
                        <button className="slider-next" onClick={nextSlide}>
                          <img src="/assets/img/arrow_r_black.svg" alt="Следующий" />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Landmark
