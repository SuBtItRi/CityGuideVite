import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  fetchUserReviews,
  delReview,
  updateGrades,
  fetchLandmark,
  changeUserAvatar,
  changeUserPassword,
  delUser,
} from '../api'
import { useQuery } from 'react-query'
import { setUser } from '../redux/actions'
import { simpleHash } from '../simpleHash'

import '../scss/pages/account_settings.scss'

function AccountSettings() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isPasswordFormlOpen, setisPasswordFormlOpen] = useState(false)
  const user = useSelector(({ user }) => user)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleModal = () => {
    setIsModalOpen(!isModalOpen)
  }

  const handlePasswordForm = () => {
    setisPasswordFormlOpen(!isPasswordFormlOpen)
  }

  const {
    data: userReviews = [],
    isLoading: userReviewsLoading,
    error: userReviewsError,
  } = useQuery(['userReviews', user?.id], () => fetchUserReviews(user?.id), {
    enabled: !!user?.id,
    retry: false,
  })

  const handleDeleteReview = async (reviewId, grade, landmarkId) => {
    const landmark = await fetchLandmark(landmarkId)
    const grades = landmark.grade
    const indexToRemove = grades.indexOf(grade)

    if (indexToRemove !== -1) {
      const newGrades = [...grades]
      newGrades.splice(indexToRemove, 1)

      await updateGrades(newGrades, landmarkId)

      await delReview(reviewId)
    }
  }

  const handleChangeAvatar = async (e) => {
    e.preventDefault()

    const form = new FormData(e.target)
    const newData = Object.fromEntries(form)

    dispatch(
      setUser({
        ...user,
        avatar: newData.avatar,
      })
    )

    changeUserAvatar(user.id, newData.avatar)
  }

  const handleChnagePassword = async (e) => {
    e.preventDefault()

    const formData = new FormData(e.target)
    const newData = Object.fromEntries(formData)

    document.getElementById('passwordNotMatchLog').style.display = 'none'
    document.getElementById('passwordNotMatchReg').style.display = 'none'

    console.log(newData, await simpleHash(newData.new_password))

    if ((await simpleHash(newData.old_password)) !== user.password) {
      document.getElementById('passwordNotMatchLog').style.display = 'block'
      return
    }

    if (newData.new_password !== newData.new_password_repeat) {
      document.getElementById('passwordNotMatchReg').style.display = 'block'
      return
    }

    await changeUserPassword(user.id, await simpleHash(newData.new_password))

    dispatch(
      setUser({
        ...user,
        password: await simpleHash(newData.new_password),
      })
    )

    localStorage.setItem('password', newData.new_password)

    e.target.reset()

    document.getElementById('accountSuccessChangePass').style.display = 'block'
    setTimeout(() => {
      document.getElementById('accountSuccessChangePass').style.display = 'none'
    }, 3000)
  }

  const handleDeleteAccount = async () => {
    localStorage.removeItem('password')
    localStorage.removeItem('username')
    await delUser(user.id)
    dispatch(setUser(null))
    setIsModalOpen(false)
  }

  return (
    <>
      {isModalOpen && (
        <div className="del-account__modal" onClick={handleModal}>
          <div className="del-account__modal_container" onClick={(e) => e.stopPropagation()}>
            <h3>Вы точно хотите удалить свой аккаунт?</h3>
            <button id="delAccountSuccess" onClick={handleDeleteAccount}>
              Удалить аккаунт
            </button>
            <img src="/assets/img/close.svg" alt="close" id="hideModal" onClick={handleModal} />
          </div>
        </div>
      )}
      <section className="account">
        <div className="container">
          <div className="account__wrap">
            <h1 className="title">Настройки</h1>
            <div className="settings">
              <div className="settings__title">
                <h2>Аккаунт</h2>
                {user && (
                  <button id="delAccount" onClick={handleModal}>
                    Удалить аккаунт
                  </button>
                )}
              </div>
              <div className="settings__block">
                <img
                  src={`${user?.avatar ? (user.avatar[0] == '.' ? user.avatar.replace('.', '') : user.avatar) : '/assets/img/avatar.png'}`}
                  alt="avatar"
                  id="usermenu_avatar"
                  className="settings__avatar"
                />
                <div className="settings__block_details">
                  <div className="settings__block_details-item">
                    <h5>Username</h5>
                    <h2 id="setUsername">
                      {user?.username ? user.username : 'Нужно войти в аккаунт'}
                    </h2>
                  </div>
                  {!user && (
                    <button className="settings_change-pass-btn" onClick={() => navigate('/login')}>
                      Войти в аккаунт
                    </button>
                  )}
                  {user && (
                    <>
                      <button className="settings_change-pass-btn" onClick={handlePasswordForm}>
                        Изменить пароль
                      </button>
                      <form className="settings__block_details-item" onSubmit={handleChangeAvatar}>
                        <input
                          className="settings_change-avatar"
                          type="text"
                          name="avatar"
                          placeholder="Change avatar image"
                        />
                        <button
                          className="settings_change-pass-btn"
                          style={{ marginTop: '20px' }}
                          type="submit"
                        >
                          Изменить аватарку
                        </button>
                      </form>
                    </>
                  )}
                </div>
                {isPasswordFormlOpen && (
                  <div className="password-modal">
                    <h3>Изменение пароля</h3>
                    <form className="form" id="changePassForm" onSubmit={handleChnagePassword}>
                      <label className="form__item-label" htmlFor="old_password">
                        Старый пароль
                      </label>
                      <input
                        className="form__item-inp"
                        type="password"
                        name="old_password"
                        placeholder="Введите старый пароль"
                        minLength="8"
                        required
                      />
                      <label className="exist" htmlFor="old_password" id="passwordNotMatchLog">
                        Неправильный пароль!
                      </label>

                      <label className="form__item-label" htmlFor="new_password">
                        Новый пароль
                      </label>
                      <input
                        className="form__item-inp"
                        type="password"
                        name="new_password"
                        placeholder="Введите новый пароль"
                        minLength="8"
                        required
                      />

                      <label className="form__item-label" htmlFor="new_password_repeat">
                        Повтор нового пароля
                      </label>
                      <input
                        className="form__item-inp"
                        type="password"
                        name="new_password_repeat"
                        placeholder="Повторите новый пароль"
                        minLength="8"
                        required
                      />
                      <label className="exist" htmlFor="password" id="passwordNotMatchReg">
                        Пароли не совпадают!
                      </label>

                      <button type="submit" className="form__btn">
                        Изменить пароль
                      </button>
                      <p id="accountSuccessChangePass" className="allright">
                        Пароль успешно изменен!
                      </p>
                    </form>
                    <img
                      src="/assets/img/close.svg"
                      alt="close"
                      id="hideModal"
                      onClick={handlePasswordForm}
                    />
                  </div>
                )}
              </div>
            </div>
            <h1 className="title">Ваши отзывы</h1>
            <div className="reviews__container">
              {userReviewsLoading ? (
                <div className="reviews-loader"></div>
              ) : userReviewsError ? (
                <p>У вас нету отзывов</p>
              ) : (
                userReviews?.map((review) => (
                  <div className="reviews__review" id={review.id} key={`${review.id}_ar`}>
                    <div className="reviews__user-details">
                      <img
                        className="header__usermenu_avatar"
                        src={
                          user.avatar?.startsWith('.') ? user.avatar.replace('.', '') : user.avatar
                        }
                        alt="user-avatar"
                      />
                      <h3>{user.username}</h3>
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
                        onClick={() =>
                          handleDeleteReview(review.id, review.grade, review.currentLandmarkID)
                        }
                      >
                        Удалить отзыв
                      </button>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default AccountSettings
