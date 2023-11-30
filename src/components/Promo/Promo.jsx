import './Promo.css';
import { Link } from 'react-scroll';

function Promo() {
  return (
    <section className='promo'>
      <div className='promo__container'>
        <h1 className='promo__title'>Учебный проект студента факультета Веб-разработки.</h1>
        <p className='promo__subtitle'>Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
        <button className='promo__button'>
          <Link to='project' smooth={true}>Узнать больше</Link>
        </button>
      </div> 
      <div className='promo__image'></div>
    </section>
  );
}

export default Promo;