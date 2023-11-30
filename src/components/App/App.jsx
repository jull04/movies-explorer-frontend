import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import {Routes, Route} from "react-router-dom";
import Movies from '../Movies/Movies';
import Error from '../Error/Error';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';

function App() {
  return (
    <div className="page">
      <Routes>
        <Route path='/' element={
          <>
            <Header/>
            <Main/>
            <Footer/>
          </> 
        }/>
        <Route path='/movies' element={
          <>
            <Header/>
            <Movies/>
            <Footer/>
          </> 
        }/>
        <Route path='/saved-movies' element={
          <>
            <Header/>
            <SavedMovies/>
            <Footer/>
          </>
        }/>
        <Route path='/profile' element={
          <>
            <Header/>
            <Profile/>
          </>
        }/>
        <Route path='/signup' element={
          <>
            <Register/>
          </>
        }/>
        <Route path='/signin' element={
          <>
            <Login/>
          </>
        }/>
        <Route path='*' element={<Error/>}/>
      </Routes>
    </div>
  );
}

export default App;
