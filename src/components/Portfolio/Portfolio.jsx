import './Portfolio.css';

function Portfolio() {
  return (
    <section className='portfolio'>
      <h3 className='portfolio__title'>Портфолио</h3>
      <div className='portfolio__container'>
        <a className='portfolio__link' href='https://github.com/jull04/how-to-learn' target='_blank' rel='noopener noreferrer'>
          <p className='portfolio__subtitle'>Статичный сайт</p>
          <div className='portfolio__arrow'>↗</div>
        </a>
        <a className='portfolio__link' href='https://github.com/jull04/russian-travel' target='_blank' rel='noopener noreferrer'>
          <p className='portfolio__subtitle'>Адаптивный сайт</p>
          <div className='portfolio__arrow'>↗</div>
        </a>
        <a className='portfolio__link' href='https://github.com/jull04/react-mesto-auth' target='_blank' rel='noopener noreferrer'>
          <p className='portfolio__subtitle'>Одностраничное приложение</p>
          <div className='portfolio__arrow'>↗</div>
        </a>
      </div> 
    </section>
  );
}

export default Portfolio;