import { onNavigate, routesKey } from '..';
import { Modal } from '../components/modalWindow/modal';
import './home.sass';

export const HomeCallback = () => {
  const rootDiv = document.getElementById('main') as HTMLDivElement;
  const buttons: NodeListOf<HTMLElement> = document.querySelectorAll('.home-btn');
  buttons.forEach((btn) => {
    const rout = btn.dataset.rout as routesKey;
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if ((e.target as HTMLElement).classList.contains('play-now')) {
        onNavigate(rout);
      } else if ((e.target as HTMLElement).classList.contains('learn-more')) {
        const content = document.createElement('section');
        content.innerHTML = Modal(LearnMore());
        rootDiv.appendChild(content);
      }
    });
  });
};

export const Home = (): string => {
  return `<section class="home-page">
      <div class="home-heading">
        <img class="heading-img one" src="../asset/images/puzzle-machine-learning-1.png" alt="">
        <p class="description-text">
          Запоминание английских слов может быть увлекательным. 
          Играй в игры, слушай произношение носителей языка, совершенствуй свои знания. 
          С нашим приложением обучение становится радостью.
        </p>
        <img class="heading-img two" src="../asset/images/puzzle-machine-learning-2.png" alt="">
      </div>
      <div class="btn__set">
        <button class="home-btn learn-more">Узнай больше</bitton>
        <button class="home-btn play-now" data-rout="/rslang/games">Играй сразу</bitton>
      </div>    
    </section>`;
};

export const LearnMore = (): string => {
  return `<div class="information">
      <div class="info-container">
        <div class="info-box">
          <svg class="info-box__icon" focusable="false" viewBox="0 0 24 24" aria-hidden="true" style="color: rgb(2, 82, 204); font-size: 56px;"><path d="M12 11.55C9.64 9.35 6.48 8 3 8v11c3.48 0 6.64 1.35 9 3.55 2.36-2.19 5.52-3.55 9-3.55V8c-3.48 0-6.64 1.35-9 3.55zM12 8c1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3 1.34 3 3 3z"></path></svg>
          <h3 class="info-box__heading">Учебник</h3>
          <p class="info-box__text">Электронный учебник состоит из шести разделов. В каждом разделе 30 страниц по 20 слов. Представлены перевод слова, тематическое изображение, а также произношение как слова отдельно, так и в составе словосочетания.</p>
        </div>
        <div class="info-box">
          <svg class="info-box__icon" focusable="false" viewBox="0 0 24 24" aria-hidden="true" style="color: rgb(2, 82, 204); font-size: 56px;"><path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z"></path></svg>
          <h3 class="info-box__heading">Словарь</h3>
          <p class="info-box__text">Словарь содержит списки изучаемых слов, слов, которые не нужно учить, а также тех, которые вызывают затруднения. В словаре отражена статистика по каждому разделу и успеваемость учащихся.</p>
        </div>
        <div class="info-box">
          <svg class="info-box__icon" focusable="false" viewBox="0 0 24 24" aria-hidden="true" style="color: rgb(2, 82, 204); font-size: 56px;"><path d="M21.58 16.09l-1.09-7.66C20.21 6.46 18.52 5 16.53 5H7.47C5.48 5 3.79 6.46 3.51 8.43l-1.09 7.66C2.2 17.63 3.39 19 4.94 19c.68 0 1.32-.27 1.8-.75L9 16h6l2.25 2.25c.48.48 1.13.75 1.8.75 1.56 0 2.75-1.37 2.53-2.91zM11 11H9v2H8v-2H6v-1h2V8h1v2h2v1zm4-1c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm2 3c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z"></path></svg>
          <h3 class="info-box__heading">Игры</h3>
          <p class="info-box__text">Для изучения слов и закрепления запоминания в приложении есть 2 игры: Sprint и Audio Chalenge, которые помогут в игровой форме «прокачать» словарный запас</p>
        </div>
        <div class="info-box">
          <svg class="info-box__icon" focusable="false" viewBox="0 0 24 24" aria-hidden="true" style="color: rgb(2, 82, 204); font-size: 56px;"><path d="M10 20h4V4h-4v16zm-6 0h4v-8H4v8zM16 9v11h4V9h-4z"></path></svg>
          <h3 class="info-box__heading">Статистика</h3>
          <p class="info-box__text">Весь прогресс обучения можно посмотреть в статистике, где представлены данные как за текущий день, так и за весь период обучения. Информация представлена как в виде таблицы, так и в виде графиков, что очень удобно.</p>
        </div>
      </div>
    </div>
    
  `;
};
