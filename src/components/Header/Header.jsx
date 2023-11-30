import './Header.css';
import { Link,  useLocation } from 'react-router-dom';
import { useState } from 'react';

function Header() {
  const [loggedIn, setloggedIn] = useState(true)
  const [menuActive, setMenuActive] = useState(false)
  const { pathname } = useLocation();

  function handleClick() {
    menuActive === false ? setMenuActive(true) : setMenuActive(false)
  }

  function handleClickLink() {
    setMenuActive(false);
  }

  return (
    <header className={pathname === '/' ? 'header header__home' : 'header'}>
      <Link to={'/'}><div className='header__logo'></div></Link>
      {loggedIn === true ? 
      <>
      <div className='header__burger' onClick={handleClick}></div>
      <div className='header__container'>
        <div className='header__films-container'>
          <Link 
            to={'/movies'} 
            className={pathname === '/movies' ? 'header__films header__films_active' : 'header__films'}>Фильмы
          </Link>
          <Link 
            to={'/saved-movies'} 
            className={pathname === '/saved-movies' ? 'header__saved-films_active header__saved-films' : 'header__saved-films'}>Сохранённые фильмы
          </Link>
        </div>  
        <Link 
          to={'/profile'} 
          className='header__profile-container-link'>
            <div className='header__profile-container'>
              <p className={pathname === '/profile' ? 'header__profile_active header__profile' : 'header__profile'}>Аккаунт</p>
              <div className={pathname === '/' ? 'header__profile-icon header__profile-icon-home' : 'header__profile-icon'}></div>
            </div>  
        </Link>
      </div>
      </>
      :
      <div className='header__container-nolog'>
        <Link to={'/signup'} className='header__signup'>Регистрация</Link>
        <Link to={'/signin'}>
          <button className='header__signin'>Войти</button>
        </Link>
      </div>
      }
      <div className={menuActive === false ? 'burger__blur' : 'burger__blur header__nav-opened'}>
        <div className='header__nav'>
        <ul className='header__nav-links'>
          <li className='header__nav-link'>
            <Link 
              to={'/'} 
              className={pathname === '/' ? 'nav-link nav-link_active' : 'nav-link'}
              onClick={handleClickLink}>Главная
            </Link>
          </li>
          <li className='header__nav-link'>
            <Link 
              to={'/movies'} 
              className={pathname === '/movies' ? 'nav-link nav-link_active' : 'nav-link'}
              onClick={handleClickLink}>Фильмы
            </Link>
          </li>
          <li className='header__nav-link'>
            <Link 
              to={'/saved-movies'} 
              className={pathname === '/saved-movies' ? 'nav-link nav-link_active' : 'nav-link'} 
              onClick={handleClickLink}>Сохраненные фильмы
            </Link>
          </li>
          <li className='header__nav-link'>
            <Link 
              to={'/profile'} 
              className='nav-link'
              onClick={handleClickLink}>
                <div className={pathname === '/profile' ? 'header__nav-profile-container nav-link_active' : 'header__nav-profile-container'}>
                  <p className='header__nav-profile'>Аккаунт</p>
                  <div className='header__nav-profile-icon'></div>
                </div>  
            </Link>
          </li>
        </ul>
        <button className='header__nav-close' onClick={handleClick}></button>
      </div>
      </div>
    </header>
  )
}

export default Header;