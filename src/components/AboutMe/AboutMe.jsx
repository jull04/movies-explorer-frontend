import './AboutMe.css';

function AboutMe() {
  return (
    <section className='student'>
      <h3 className='page__title'>Студент</h3>
        <div className='student__container'>
          <div className='student__description-container'>
            <h1 className='student__title'>Юлия</h1>
            <p className='student__subtitle'>Фронтенд-разработчик, 23 года</p>
            <p className='student__description'>Живу в Уфе, закончила факультет романо-германской филологии БГУ. После университета поняла, что хочу изучать веб-разработку. Люблю активные виды спорта, путешествия, фотографию и изучение языков.</p>
            <a className='student__link' href='https://github.com/jull04' target='_blank' rel='noopener noreferrer'>Github</a>
          </div>
          <div className='student__photo'></div>
        </div>
    </section>
  );
}

export default AboutMe;