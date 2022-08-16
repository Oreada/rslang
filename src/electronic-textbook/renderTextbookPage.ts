import { IWord } from '../types/types';

export function renderPage(data: Array<IWord>): string {
  const str = `<div class="world-list-container">
    ${data.map((item) => renderWord(item)).join('')}
  </div>`;

  return str;
}

function renderWord(word: IWord): string {
  const str = `<div class="word-container" id="word-${word._id.$oid}">
    <div class="base-word-content">
      <div class="word-img-wrapper">
        <img class="word-img" src="${(word.image)}" alt="${word.word}-image">
      </div>
      <div class="word-content">
        <div class="word-main-data">
          <span class="word-original">${word.word}</span>
          <span class="word-transcription">${word.transcription}</span>
          <span class="word-translate">${word.wordTranslate}</span>
          <button class="word-audio-button" id="audio-${word._id.$oid}"></button>
        </div>
        <div class="word-sentences">
          <p class="sentence">${word.textMeaning}</p>
          <p class="sentence-translate">${word.textMeaningTranslate}</p>
          <p class="sentence">${word.textExample}</p>
          <p class="sentence-translate">${word.textExampleTranslate}</p>
        </div>
      </div>
    </div>
    <div class="authorize-word-content">
      <button class="word-btn learned-button" id="learned-${word._id.$oid}">
        Добавить в изученные
      </button>
      <button class="word-btn difficult-button" id="difficult-${word._id.$oid}">
        Добавить в сложные
      </button>
    </div>
  </div>`;

  return str;
}