import './Login.css';
import { Link } from 'react-router-dom'
import useFormValidation from '../../hooks/useFormValidation';
import { useEffect } from "react";

function Login({ onLogin, isLoading, isError, setError }) {

  const {handleChange, values, errors, isValid} = useFormValidation();

  function handleSubmit(evt) {
    evt.preventDefault();
    onLogin(values.email, values.password);
  }

  useEffect(() => {
    setError(false)
  }, [setError, values]) 

  return (
    <section className='register'>
      <Link to={'/'}>
        <div className='header__logo header__logo-min'></div>
      </Link>
      <h1 className='register__title'>Рады видеть!</h1>
      <form  className='register__form' name='profile-edit' onSubmit={handleSubmit} isValid={isValid} noValidate>
      <label className='register__label'>
        <span className='register__span'>E-mail</span>
        <input 
          className='register__input'
          id='email'
          name='email'
          type='email'
          placeholder='Введите email'
          value={values.email ? values.email : ''}
          required
          onChange={handleChange}
        />
        <span className='register__error'>{errors.email}</span>  
      </label>
      <label className='register__label'>
        <span className='register__span'>Пароль</span>
        <input 
          className='register__input'
          minLength='6'
          maxLength='20'
          id='password'
          name='password'
          type='password'
          placeholder='Введите пароль'
          value={values.password ? values.password : ''}
          required
          onChange={handleChange}
        />
        <span className='register__error'>{errors.password}</span>  
      </label>
      {isError && <div className='profile__succes'>Ошибка</div>}
      <button 
        className={`login__submit ${isValid ? '' : 'register__submit_disabled'}`}
        type='submit'
        disabled={!isValid}>
          {isLoading ? "Вход..." : "Войти"}
      </button>
      </form>
      <p className='register__subtitle'>Еще не зарегестрированы?
        <Link to='/signup' className='register__signin'>Регистрация</Link>
      </p>
    </section>
  );
}

export default Login;