import './Profile.css';
import { Link } from 'react-router-dom'
import { useContext, useEffect, useState } from "react";
import useFormValidation from '../../hooks/useFormValidation';
import CurrentUserContext from "../../context/CurrentUserContext";
import { EmailRegex } from "../../utils/constants";

function Profile({ onUpdateUser, onLogout, isLoading, isEditProfile, handleClickEdit, isSuccess, isError}) {

  const currentUser = useContext(CurrentUserContext); 

  const {handleChange, values, errors, isValid, reset} = useFormValidation();

  const [btnDisabled, setBtnDisabled] = useState(false);

  useEffect(() => {
    reset({ name: currentUser.name, email: currentUser.email })
  }, [currentUser])

  useEffect(() => {
    currentUser.name !== values.name || currentUser.email !== values.email
      ? setBtnDisabled(false)
      : setBtnDisabled(true);
  }, [currentUser, values]);

  function handleSubmit(evt){
    evt.preventDefault();
    onUpdateUser(values.name, values.email) 
  }

  return (
    <section className='profile'>
      <h1 className='profile__title'>{`Привет, ${currentUser.name}!`}</h1>
      <form  className='profile__form' name='profile-edit' onSubmit={handleSubmit} noValidate>
      <label className='profile__label'>
        <span className='profile__span'>Имя</span>
        <input 
          className='profile__input'
          placeholder='Имя'
          minLength='3'
          maxLength='20'
          id='name' 
          name='name' 
          type='text'
          value={values.name || ""}
          required
          onChange={handleChange}
          disabled={!isEditProfile}
        />
      </label>
      <span className='profile__error'>{errors.name}</span>
      <label className='profile__label'>
        <span className='profile__span'>E-mail</span>
        <input 
          className='profile__input'
          placeholder='email'
          id='email'
          name='email'
          type='email'
          value={values.email || ""}
          required
          onChange={handleChange}
          disabled={!isEditProfile}
          pattern={EmailRegex}
        />
      </label>  
      <span className='profile__error'>{errors.email}</span>  
      {isSuccess && <div className='profile__succes'>Профиль успешно отредактирован!</div>}
      {isError && <div className='profile__succes'>Ошибка редактирования профиля</div>}
      {!isEditProfile && (
      <>
      <button type='button' className='profile__edit-button' onClick={handleClickEdit}>Редактировать</button>
      <Link to='/' className='profile__logout' onClick={onLogout} >Выйти из аккаунта</Link>
      </> 
      )}
      {isEditProfile && (
      <button 
        disabled={!isValid || btnDisabled} 
        type='submit'  
        className={`profile__submit ${!isValid || btnDisabled ? 'profile__submit_disabled' : ''}`}
        >
          {isLoading ? "Сохранение..." : "Сохранить"}
      </button>
      )}
      </form>
    </section>
  );
}

export default Profile;