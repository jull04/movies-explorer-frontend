import './AboutProject.css';
import { Element } from 'react-scroll';

function AboutProject() {
  return (
    <Element name='project'>
      <section className='project'>
        <h3 className='page__title'>О проекте</h3>
        <div className='project__grid'>
          <p className='project__grid-title'>Дипломный проект включал 5 этапов</p>
          <p className='project__grid-title'>На выполнение диплома ушло 5 недель</p>
          <p className='project__grid-subtitle project__grid-subtitle-first'>Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
          <p className='project__grid-subtitle'>У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
        </div>
        <div className='project__time-grid'>
          <p className='project__time-grid-title project__time-grid-title-green'>1 неделя</p>
          <p className='project__time-grid-title'>4 недели</p>
          <p className='project__time-grid-subtitle'>Back-end</p>
          <p className='project__time-grid-subtitle'>Front-end</p>
        </div>
      </section>  
    </Element>
  );
}

export default AboutProject;