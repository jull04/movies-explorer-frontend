import './Profile.css';
import { Link } from 'react-router-dom'
import { useState } from "react";
import useFormValidation from '../../hooks/useFormValidation';

function Profile() {

  const {handleChange, values, errors, isValid} = useFormValidation();

  const [isEditProfile, setEditProfile] = useState(false);

  const handleClickEdit = () => {
    setEditProfile(true);
  };

  const handleClickSave = () => {
    setEditProfile(false);
  };

  return (
    <section className='profile'>
      <h1 className='profile__title'>Привет, Юля!</h1>
      <form  className='profile__form' name='profile-edit' isValid={isValid} noValidate>
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
          value={values.name ? values.name : ''}
          required
          onChange={handleChange}
          disabled={!isEditProfile}
        />
      </label>
      <span className='profile__error profile__error_visible'>{errors.name}</span>
      <label className='profile__label'>
        <span className='profile__span'>E-mail</span>
        <input 
          className='profile__input'
          placeholder='email'
          id='email'
          name='email'
          type='email'
          value={values.email ? values.email : ''}
          required
          onChange={handleChange}
          disabled={!isEditProfile}
        />
      </label>  
      <span className='profile__error'>{errors.email}</span>  
      {!isEditProfile && (
      <>
      <button className='profile__edit-button' onClick={handleClickEdit}>Редактировать</button>
      <Link to='/signin' className='profile__logout'>Выйти из аккаунта</Link>
      </> 
      )}
      {isEditProfile && (
      <button 
        disabled={!isValid} 
        type='submit'  
        onClick={handleClickSave}
        className={`profile__submit ${isValid ? '' : 'profile__submit_disabled'}`}>Cохранить
      </button>
      )}
      </form>
    </section>
  );
}

export default Profile;