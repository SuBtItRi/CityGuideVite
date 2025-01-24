import { useState } from 'react'

import '../scss/components/account/reglog.scss'
import { useMutation, useQuery } from 'react-query'
import { addUser, fetchUserData } from '../api'
import { simpleHash } from '../simpleHash'
import { useDispatch } from 'react-redux'
import { setUser } from '../redux/actions'

function Reglog() {
  const [activeForm, setActiveForm] = useState(false)
  const [username, setUsername] = useState('')
  const dispatch = useDispatch()

  const { data: usernameData } = useQuery(['username', username], () => fetchUserData(username), {
    enabled: !!username,
  })

  const mutation = useMutation(addUser, {
    onSuccess: () => {
      document.getElementById('accountCreatedReg').style.display = 'block'
    },
  })

  const onChangeUsername = (e) => {
    let interval
    clearTimeout(interval)
    interval = setTimeout(() => {
      setUsername(e.target.value)
    }, 1000)
  }

  const handleFormUserAdd = async (e) => {
    document.getElementById('usernameExistsReg').style.display = 'none'
    document.getElementById('passwordNotMatchReg').style.display = 'none'
    document.getElementById('accountCreatedReg').style.display = 'none'
    e.preventDefault()
    const form = e.target

    if (usernameData.length > 0) {
      document.getElementById('usernameExistsReg').style.display = 'block'
      return
    }

    if (form.elements['passwordReg'].value !== form.elements['repeat_passwordReg'].value) {
      document.getElementById('passwordNotMatchReg').style.display = 'block'
      return
    }

    const postData = {
      username: username,
      password: await simpleHash(form.elements['passwordReg'].value),
      avatar: './assets/img/avatar.png',
    }
    mutation.mutate(postData)
  }

  const handleFormLogUser = async (e) => {
    document.getElementById('usernameExistsLog').style.display = 'none'
    document.getElementById('passwordNotMatchLog').style.display = 'none'
    document.getElementById('accountSuccessLog').style.display = 'none'

    e.preventDefault()
    const form = e.target

    setUsername(form.elements['usernameLog'].value)

    if (usernameData.length == 0) {
      document.getElementById('usernameExistsLog').style.display = 'block'
      return
    }

    if ((await simpleHash(form.elements['passwordLog'].value)) != usernameData[0].password) {
      document.getElementById('passwordNotMatchLog').style.display = 'block'
      return
    }

    localStorage.setItem('username', username)
    localStorage.setItem('password', form.elements['passwordLog'].value)
    dispatch(setUser(usernameData[0]))
    document.getElementById('accountSuccessLog').style.display = 'block'
  }

  const handleSetFormActive = () => {
    setActiveForm(!activeForm)
  }

  return (
    <section className="reglog">
      <div className="reglog__wrap">
        {activeForm && (
          <form className="form" id="regForm" onSubmit={handleFormUserAdd}>
            <h2 className="reglog__title">Регистрация</h2>
            <label className="form__item-label" htmlFor="username">
              username
            </label>
            <input
              className="form__item-inp"
              type="text"
              name="usernameReg"
              placeholder="Введите ваш username"
              minLength={4}
              required
              onChange={onChangeUsername}
            />
            <label className="exist" htmlFor="username" id="usernameExistsReg">
              Этот ник уже занят!
            </label>
            <label className="form__item-label" htmlFor="password">
              password
            </label>
            <input
              className="form__item-inp"
              type="password"
              name="passwordReg"
              placeholder="Введите ваш password"
              minLength={8}
              required
            />
            <label className="form__item-label" htmlFor="repeat_password">
              repeat_password
            </label>
            <input
              className="form__item-inp"
              type="password"
              name="repeat_passwordReg"
              placeholder="Повторите ваш password"
              minLength={8}
              required
            />
            <label className="exist" htmlFor="password" id="passwordNotMatchReg">
              Пароли не совпадают!
            </label>
            <input className="form__btn" type="submit" value="Создать аккаунт" />
            <p id="accountCreatedReg" className="allright">
              Аккаунт создан!
            </p>
            <a id="notHaveAccount" onClick={handleSetFormActive}>
              Уже есть аккаунт?
            </a>
          </form>
        )}
        {!activeForm && (
          <form className="form" id="logForm" onSubmit={handleFormLogUser}>
            <h2 className="reglog__title">Вход</h2>
            <label className="exist" htmlFor="username" id="usernameExistsLog">
              Такого ника нету!
            </label>
            <label className="form__item-label" htmlFor="username">
              username
            </label>
            <input
              className="form__item-inp"
              type="text"
              name="usernameLog"
              placeholder="Введите ваш username"
              required
              onChange={onChangeUsername}
            />
            <label className="form__item-label" htmlFor="password">
              password
            </label>
            <label className="exist" htmlFor="password" id="passwordNotMatchLog">
              Неправильный пароль!
            </label>
            <input
              className="form__item-inp"
              type="password"
              name="passwordLog"
              placeholder="Введите ваш password"
              minLength={8}
              required
            />
            <input className="form__btn" type="submit" value="Войти в аккаунт" />
            <p id="accountSuccessLog" className="allright">
              Вы вошли в аккаунт!
            </p>
            <a id="haveAccount" onClick={handleSetFormActive}>
              Еще нет аккаунта?
            </a>
          </form>
        )}
      </div>
    </section>
  )
}

export default Reglog
