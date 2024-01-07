import './Register.css';
import { Link } from 'react-router-dom'
import useFormValidation from '../../hooks/useFormValidation';
import { useEffect } from "react";
import { EmailRegex } from "../../utils/constants";

function Register({ onRegister, isLoading, isError, setError }) {

  const {handleChange, values, errors, isValid} = useFormValidation();

  function handleSubmit(evt) {
    evt.preventDefault();
    onRegister(values.name, values.email, values.password);
  }

  useEffect(() => {
    setError(false)
  }, [setError, values]) 


  return (
    <section className='register'>
      <Link to={'/'}>
        <div className='header__logo header__logo-min'></div>
      </Link>
      <h1 className='register__title'>Добро пожаловать!</h1>
      <form  className='register__form' name='profile-edit' onSubmit={handleSubmit} isValid={isValid} noValidate>
      <label className='register__label'>
        <span className='register__span'>Имя</span>
        <input 
          className='register__input'
          minLength='3'
          maxLength='20'
          id='name' 
          name='name' 
          type='text'
          placeholder='Введите имя'
          value={values.name ? values.name : ''}
          required
          onChange={handleChange}
          pattern={EmailRegex}
        />
        <span className='register__error'>{errors.name}</span>
      </label>
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
        className={`register__submit ${isValid ? '' : 'register__submit_disabled'}`}
        type='submit'
        disabled={!isValid}>
          {isLoading ? "Регистрация..." : "Зарегистрироваться"}
      </button>
      </form>
      <p className='register__subtitle'>Уже зарегестрированы?
        <Link to='/signin' className='register__signin'>Войти</Link>
      </p>
    </section>
  );
}

export default Register;