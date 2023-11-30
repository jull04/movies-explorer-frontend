import './Footer.css';

function Footer() {
  return (
    <footer className='footer'>
      <p className='footer__title'>Учебный проект Яндекс.Практикум х BeatFilm.</p>
      <div className='footer__container'>
        <p class='footer__copyright'>&copy; 2023</p>
        <nav className='footer__links-container'>
          <a className='footer__link' href='https://practicum.yandex.ru/' target='_blank' rel='noopener noreferrer'>Яндекс.Практикум</a>
          <a className='footer__link' href='https://github.com/jull04' target='_blank' rel='noopener noreferrer'>Github</a>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;