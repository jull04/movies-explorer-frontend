import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Movies from '../Movies/Movies';
import Error from '../Error/Error';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import ProtectedRouteElement from "../ProtectedRoute/ProtectedRoute";
import { useEffect, useState } from "react";
import { register, authorize, checkToken, getInfo, setUserInfo, getMovies, deleteMovie, saveMovie} from "../../utils/MainApi.js"
import CurrentUserContext from '../../context/CurrentUserContext';

function App() {

  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isEditProfile, setEditProfile] = useState(false);
  const [isSuccess, setSuccess] = useState(false);
  const [isError, setError] = useState(false);
  const [savedMovies, setSavedMovies] = useState([])
  
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const footer =
    pathname === "/" || 
    pathname === "/movies" || 
    pathname === "/saved-movies";

  const header =
    pathname === "/" ||
    pathname === "/movies" ||
    pathname === "/saved-movies" ||
    pathname === "/profile";

  const handleClickEdit = () => {
    setEditProfile(true);
    setSuccess(false);
  };

  useEffect(() => {
    if (loggedIn) {
      const token = localStorage.getItem("token");
      Promise.all([getInfo(token), getMovies(token)])
      .then(([dataUser, dataMovies]) => {
        setCurrentUser(dataUser);
        setSavedMovies(dataMovies)
      }) 
      .catch((error => console.log(`Ошибка ${error}`)))
    }
  }, [loggedIn])

  //Изменение статуса логина
  function handleLoggedIn() {
    setLoggedIn(true);
  }

  // Проверка токена при загрузке страницы
  useEffect(() => {
    const token = localStorage.getItem('token');
    // если у пользователя есть токен в localStorage, 
    // функция проверит, действующий он или нет
    if (token){
      checkToken(token)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            navigate('/', {replace: true})
          }
        })
        .catch((error => console.log(`Ошибка проверки токена ${error}`)))
    }
  }, []);

    //регистрация
  function handleRegister(name, email, password) {
    register(name, email, password)
    .then((res) => {
      handleLogin(email, password);
    })
    .catch((error) => {
      console.log(`Ошибка регистрации ${error}`);
      setError(true)
    })
    .finally(() => setIsLoading(false))
    setIsLoading(true)
  }

  //авторизация
  function handleLogin(email, password) {
    authorize(email, password)
    .then((data) => {
      if (data.token) {
        handleLoggedIn();
        localStorage.setItem("token", data.token);
        navigate('/movies', {replace: true})
      }
    })
    .catch((error) => {
      setLoggedIn(false);
      console.log(`Ошибка авторизации ${error}`);
      setError(true)
    })
    .finally(() => setIsLoading(false))
    setIsLoading(true)
  }

  //выход
  function handleLogout() {
    localStorage.clear();
    navigate('/', {replace: true});
    setLoggedIn(false)
  }

  //обновление профиля
  function handleUpdateUser(name, email) {
    setUserInfo(name, email, localStorage.jwt)
    .then(res => {
      setCurrentUser(res);
      setEditProfile(false);
      setSuccess(true)
    })
    .catch((error) => {
      console.log(`Ошибка редактирования профиля ${error}`)
      setError(true)
    })
    .finally(() => setIsLoading(false))
    setIsLoading(true)
  }

  //удаления фильма
  function handleDelete(savedMovieId) {
    deleteMovie(savedMovieId, localStorage.token)
      .then(() => {
        setSavedMovies(savedMovies.filter(movie => { return movie._id !== savedMovieId }))
      })
      .catch((err) => console.error(`Ошибка удаления фильма ${err}`))
  }

  //сохранение фильма 
  function handleSave(movie) {
    const isSaved = savedMovies.some((element) => movie.id === element.movieId);
    if (!isSaved) {
      saveMovie(movie, localStorage.token)
        .then((res) => {
          setSavedMovies([res, ...savedMovies]);
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      const seachSavedMovie = savedMovies.filter((element) => {
        return element.movieId === movie.id;
      });
      handleDelete(seachSavedMovie[0]._id);
    }
  }
  
  return (
    <CurrentUserContext.Provider value={currentUser}>
    <div className="page">
      {header && (
          <Header
            loggedIn={loggedIn}
          />
      )}
      <Routes>
        <Route path='/' element={
          <Main/>
        }/>
        <Route 
          path='/movies' 
          element={<ProtectedRouteElement 
            element={Movies}
            loggedIn={loggedIn} 
            savedMovies={savedMovies}
            onSave={handleSave}
          />}
        />
        <Route path='/saved-movies'
          element={<ProtectedRouteElement 
            element={SavedMovies}
            loggedIn={loggedIn} 
            savedMovies={savedMovies}
            onDelete={handleDelete}
          />}
        />
        <Route path='/profile'
          element={<ProtectedRouteElement 
            element={Profile}
            loggedIn={loggedIn} 
            onUpdateUser={handleUpdateUser} 
            onLogout={handleLogout}
            isLoading={isLoading}
            isEditProfile={isEditProfile}
            handleClickEdit={handleClickEdit}
            isSuccess={isSuccess}
            isError={isError}
          />}
        />
        <Route path='/signup' element={
          <Register
            onRegister={handleRegister}
            isLoading={isLoading}
            isError={isError}
            setError={setError}
          />
        }/>
        <Route path='/signin' element={
          <Login
            onLogin={handleLogin}
            isLoading={isLoading}
            isError={isError}
            setError={setError}
          />
        }/>
        <Route path='*' element={<Error/>}/>
      </Routes>
      {footer && <Footer />}
    </div>
    </CurrentUserContext.Provider>
  );
}

export default App;