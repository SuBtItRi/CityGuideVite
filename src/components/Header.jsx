import { useState } from 'react'
import '../scss/components/header.scss'
import { Link, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '../redux/actions'

function Header() {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false)
  const { pathname } = useLocation()
  const user = useSelector(({ user }) => user)
  const dispatch = useDispatch()

  const logout = () => {
    localStorage.clear()
    dispatch(setUser(null))
    setIsUserMenuOpen(false)
  }

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrap">
          <Link to="/" className="header__logo">
            <img src="../../assets/img/logo.png" alt="logo" />
          </Link>
          <div className="header__menu">
            <Link to="/" className={`header__menu_item ${pathname == '/' ? 'selected' : ''}`}>
              Главная
            </Link>
            <Link
              to="/catalog"
              className={`header__menu_item ${pathname == '/catalog' ? 'selected' : ''}`}
            >
              Каталог
            </Link>
            <Link
              to="/contacts"
              className={`header__menu_item ${pathname == '/contacts' ? 'selected' : ''}`}
            >
              Контакты
            </Link>
          </div>
          <div>
            <div className="header__burger_menu">
              <input
                type="checkbox"
                id="burger-checkbox"
                className="header__burger-checkbox"
                checked={isBurgerMenuOpen}
                onChange={(e) => setIsBurgerMenuOpen(e.target.checked)}
              />
              <label htmlFor="burger-checkbox" className="header__burger"></label>
              <ul className="header__menu-list">
                <Link to="/" className={`header__menu-item ${pathname == '/' ? 'selected' : ''}`}>
                  Главная
                </Link>
                <Link
                  to="/catalog"
                  className={`header__menu-item ${pathname == '/catalog' ? 'selected' : ''}`}
                >
                  Каталог
                </Link>
                <Link
                  to="/contacts"
                  className={`header__menu-item ${pathname == '/contacts' ? 'selected' : ''}`}
                >
                  Контакты
                </Link>
                <Link
                  to="/account/settings"
                  className={`header__menu-item ${pathname == '/account/settings' ? 'selected' : ''}`}
                >
                  Аккаунт
                </Link>
                {user && (
                  <Link to="#" className="header__menu-item" onClick={logout}>
                    Выйти из аккаунта
                  </Link>
                )}
              </ul>
            </div>
            <div className="header__usermenu">
              <input
                type="checkbox"
                id="usermenu-checkbox"
                className="header__usermenu-checkbox"
                checked={isUserMenuOpen}
                onChange={(e) => setIsUserMenuOpen(e.target.checked)}
              />
              <img
                src={`${user?.avatar ? (user.avatar[0] == '.' ? user.avatar.replace('.', '') : user.avatar) : '/assets/img/avatar.png'}`}
                alt="avatar"
                id="usermenu_avatar"
                className="header__usermenu_avatar"
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              />
              <div className="usermenu">
                {!user && (
                  <Link
                    to="/login"
                    className="usermenu__login"
                    onClick={() => setIsUserMenuOpen(false)}
                  >
                    Войти
                  </Link>
                )}
                {user && (
                  <>
                    <Link
                      to="/account/settings"
                      className="usermenu__settings"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      Настройки
                    </Link>
                    <Link to="#" className="usermenu__logout" onClick={logout}>
                      Выйти
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
