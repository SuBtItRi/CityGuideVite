import 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { delLandmark } from '../../api'

function Container({ catalogItems }) {
  const navigate = useNavigate()
  const user = useSelector(({ user }) => user)

  const toLandmark = (num) => {
    navigate(`/landmark/${num}`)
  }

  const deleteLandmark = (e, landmarkID) => {
    e.stopPropagation()
    e.target.closest('.catalog__plate').remove()
    delLandmark(landmarkID)
  }

  return (
    <div className="catalog__container" id="catalog__container">
      {catalogItems &&
        catalogItems.map((item) => {
          let path = item.imgs[0]
          if (item.imgs[0][0] === '.') {
            path = item.imgs[0].replace('.', '')
            path = path.replace('-', '/')
          }
          let grade = item.grade.reduce((acc, grade) => acc + grade, 0) / item.grade.length

          return (
            <div className="catalog__plate" key={item.title} onClick={() => toLandmark(item.id)}>
              <img src={path} alt={item.title} />
              <div className="catalog__plate_text">
                <div className="catalog__plate_up-block">
                  <h4 className="catalog__plate_title">{item.title}</h4>
                </div>
                <div className="catalog__plate_middle-block">
                  <p className="catalog__plate_grade">{isNaN(grade) ? 'Нету' : grade.toFixed(1)}</p>
                  <p className="catalog__plate_type">{item.filter}</p>
                  <p className="catalog__plate_description">
                    {item.description.slice(0, 275)}
                    {item.description.length > 275 ? '...' : ''}
                  </p>
                </div>
                <div className="catalog__plate_bottom-block">
                  <p className="catalog__plate_adress">{item.adress}</p>
                </div>
              </div>
              {user?.isAdmin && (
                <button id="delLandmark" onClick={(e) => deleteLandmark(e, item.id)}>
                  DEL
                </button>
              )}
            </div>
          )
        })}
    </div>
  )
}

export default Container
