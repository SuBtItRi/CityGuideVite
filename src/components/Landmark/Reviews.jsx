import { useState } from 'react'
import ReviewModal from './ReviewModal'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { useParams } from 'react-router-dom'

import '../../scss/components/landmark/reviews_loader.scss'
import { fetchReviews, fetchUser, postReview, updateGrades, delReview } from '../../api'
import { useSelector } from 'react-redux'

const months = [
  'Январь',
  'Февраль',
  'Март',
  'Апрель',
  'Май',
  'Июнь',
  'Июль',
  'Август',
  'Сентябрь',
  'Октябрь',
  'Ноябрь',
  'Декабрь',
]

// eslint-disable-next-line react/prop-types
function Reviews({ grades }) {
  const currentYear = new Date().getFullYear()
  const currentMonth = new Date().getMonth()
  const [isFormVisible, setIsFormVisible] = useState(false)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [selectedGrade, setSelectedGrade] = useState(1)
  const { id } = useParams()
  const user = useSelector(({ user }) => user)
  const queryClient = useQueryClient()

  const handleReviewFormOpen = () => {
    setIsFormVisible(true)
  }

  const handleReviewFormClose = () => {
    setIsFormVisible(false)
  }

  const handleModalOpen = () => {
    setIsModalVisible(true)
  }

  const handleModalClose = () => {
    setIsModalVisible(false)
  }

  const handleSelectGrade = (num) => {
    setSelectedGrade(num)
  }

  const { data: reviews } = useQuery(['review', id], () => fetchReviews(id))

  const userIDs = reviews?.map((review) => review.currentUserID) || []

  const { data: usersData, isLoading: usersLoading } = useQuery(
    ['users', userIDs],
    () => Promise.all(userIDs.map((userID) => fetchUser(userID))),
    { enabled: userIDs.length > 0 }
  )

  const mutation = useMutation(postReview, {
    onSuccess: () => {
      setIsModalVisible(false)
      setIsFormVisible(false)
      setSelectedGrade(1)
      queryClient.invalidateQueries(['review', id])
      queryClient.invalidateQueries(['landmark', id])
      queryClient.invalidateQueries(['reviews-count', id])
    },
  })

  const mutationGrade = useMutation((grades) => updateGrades(grades, id), {
    onSuccess: () => {
      queryClient.invalidateQueries(['landmark', id])
    },
  })

  const handleFormReviewAdd = (e) => {
    e.preventDefault()

    const formData = new FormData(e.target)
    const newData = Object.fromEntries(formData)

    newData.grade = selectedGrade
    newData.currentUserID = user.id
    newData.currentLandmarkID = id
    newData.date = `Опубликовано ${new Date().toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })}`

    document.getElementById('reviewForm').reset()

    mutationGrade.mutate([...grades, selectedGrade])

    mutation.mutate(newData)
  }

  const deleteReview = async (grade, reviewId) => {
    // eslint-disable-next-line react/prop-types
    const indexToRemove = grades.indexOf(grade)
    if (indexToRemove !== -1) {
      const newGrades = [...grades]
      newGrades.splice(indexToRemove, 1)

      const reviewElement = document.getElementById(reviewId)
      if (reviewElement) {
        reviewElement.remove()
      }

      await mutationGrade.mutate(newGrades)

      await delReview(reviewId)

      queryClient.invalidateQueries(['landmark', id])
      queryClient.invalidateQueries(['reviews-count', id])
    }
  }

  return (
    <div className="reviews">
      <h2>Отзывы</h2>
      <button className="landmark__window_blue-btn" id="add-review" onClick={handleReviewFormOpen}>
        Оставить отзыв
      </button>

      <form
        className={`reviews__add ${isFormVisible ? 'opened' : ''}`}
        id="reviewForm"
        onSubmit={handleFormReviewAdd}
      >
        <div className="reviews__up-block">
          <div className="reviews__user-details">
            {user ? (
              <>
                <img
                  className="header__usermenu_avatar"
                  src={`${user?.avatar ? (user.avatar[0] == '.' ? user.avatar.replace('.', '') : user.avatar) : '/assets/img/avatar.png'}`}
                  alt="user-avatar"
                />
                <h3>{user.username}</h3>
              </>
            ) : (
              <>
                <img
                  className="header__usermenu_avatar"
                  src="/assets/img/avatar.png"
                  alt="user-avatar"
                />
                <h3>Нужно войти в аккаунт</h3>
              </>
            )}
          </div>
          <div className="reviews__add-close" onClick={handleReviewFormClose}>
            Закрыть
          </div>
        </div>

        <div className="reviews__add_choice-reviews">
          <div className="reviews__add_choice-reviews_left-block">
            <div className="reviews__add_choice-reviews_grade">
              <p>Выберете оценку</p>
              {[5, 4, 3, 2, 1].map((num) => (
                <span
                  key={num}
                  className="grade"
                  id={`grade${num}`}
                  style={num <= selectedGrade ? { opacity: '1' } : {}}
                  onClick={() => handleSelectGrade(num)}
                >
                  ⭐
                </span>
              ))}
            </div>

            <select name="when" className="reviews__add_choice-reviews_when">
              {months.map((month, index) => {
                return index <= currentMonth ? (
                  <option key={`${month}_${index}`} value={`${month} ${currentYear}`}>
                    {month} {currentYear} г.
                  </option>
                ) : (
                  ''
                )
              })}
            </select>
          </div>

          <div
            id="tipsForReviews"
            className="reviews__add_choice-reviews_right-block"
            onClick={handleModalOpen}
          >
            Советы по написанию отзывов
          </div>
        </div>

        <input
          maxLength="60"
          type="text"
          name="title"
          className="reviews__add_review title"
          placeholder="Заголовок отзыва"
          required
        />
        <textarea
          minLength="100"
          maxLength="1000"
          type="text"
          name="review"
          className="reviews__add_review"
          placeholder="Отзыв"
          required
        />
        <input
          id="postReview"
          type="submit"
          className="landmark__window_blue-btn"
          value="Отправить отзыв"
          disabled={user ? false : true}
        />
      </form>

      <ReviewModal modalOpen={isModalVisible} modalClose={handleModalClose} />

      <div className="reviews__container">
        {usersLoading && <span className="reviews-loader"></span>}
        {usersData &&
          reviews.map((review, index) => {
            if (id != review.currentLandmarkID) {
              return
            }
            return (
              <div className="reviews__review" id={review.id} key={`${review.title}_${index}`}>
                <div className="reviews__user-details">
                  <img
                    className="header__usermenu_avatar"
                    src={
                      usersData[index].avatar[0] == '.'
                        ? usersData[index].avatar?.replace('.', '')
                        : usersData[index].avatar
                    }
                    alt="user-avatar"
                  />
                  <h3>{usersData[index].username}</h3>
                </div>
                <p className="reviews__review_grade">{'⭐'.repeat(review.grade)}</p>
                <p className="reviews__review_when">{review.when}</p>
                <h2 className="reviews__review_text title">{review.title}</h2>
                <p id="description" className="reviews__review_text">
                  {review.review}
                </p>
                <p className="reviews__review_when-published">{review.date}</p>
                {(user?.id === review.currentUserID || user?.isAdmin) && (
                  <button
                    className="reviews__review_delete"
                    id="deleteReviewBtn"
                    onClick={() => deleteReview(review.grade, review.id)}
                  >
                    Удалить отзыв
                  </button>
                )}
              </div>
            )
          })}
      </div>
    </div>
  )
}

export default Reviews
