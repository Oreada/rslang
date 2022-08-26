import { BASE_API } from '../constants/constants';
import { IWord, IWordWithDifficulty } from '../types/types';

export function renderPage(data: Array<IWord>): string {
  if (data === null) {
    return '';
  }
  const str = `<div class="world-list-container">
    ${data.map((item) => renderWord(item)).join('')}
  </div>`;

  return str;
}

export function renderDifficultPage(data: Array<IWordWithDifficulty>): string {
  if (data === null) {
    return '';
  }
  const str = `<div class="world-list-container">
    ${data.map((item) => renderDifficultWord(item)).join('')}
  </div>`;

  return str;
}

export function renderAuthorizedPage(data: Array<IWord>): string {
  if (data === null) {
    return '';
  }
  const str = `<div class="world-list-container">
    ${data.map((item) => renderAuthorizedWord(item)).join('')}
  </div>`;

  return str;
}

function renderWord(word: IWord): string {
  const str = `<div class="word-container" id="word-${word.id}">
    <div class="base-word-content">
      <div class="word-img-wrapper">
        <img class="word-img" src='${BASE_API}/${(word.image)}' alt="${word.word}-image">
      </div>
      <div class="word-content">
        <div class="word-main-data">
          <span class="word-original">${word.word}</span>
          <span class="word-transcription">${word.transcription}</span>
          <span class="word-translate">${word.wordTranslate}</span>
          <button class="word-audio-button" id="audio-button-${word.id}"></button>
          <button class="word-audio-control" id="audio-control-${word.id}"></button>
          <audio src="${BASE_API}/${(word.audio)}" id="first-audio-${word.id}"></audio>
          <audio src="${BASE_API}/${(word.audioMeaning)}" id="second-audio-${word.id}"></audio>
          <audio src="${BASE_API}/${(word.audioExample)}" id="third-audio-${word.id}"></audio>
        </div>
        <div class="word-sentences">
          <p class="sentence">${word.textMeaning}</p>
          <p class="sentence-translate">${word.textMeaningTranslate}</p>
          <p class="sentence">${word.textExample}</p>
          <p class="sentence-translate">${word.textExampleTranslate}</p>
        </div>
      </div>
    </div>
  </div>`;

  return str;
}

function renderAuthorizedWord(word: IWord): string {
  const str = `<div class="word-container" id="word-${word.id}">
    <div class="base-word-content">
      <div class="word-img-wrapper">
        <img class="word-img" src='${BASE_API}/${(word.image)}' alt="${word.word}-image">
      </div>
      <div class="word-content">
        <div class="word-main-data">
          <span class="word-original">${word.word}</span>
          <span class="word-transcription">${word.transcription}</span>
          <span class="word-translate">${word.wordTranslate}</span>
          <button class="word-audio-button" id="audio-button-${word.id}"></button>
          <button class="word-audio-control" id="audio-control-${word.id}"></button>
          <audio src="${BASE_API}/${(word.audio)}" id="first-audio-${word.id}"></audio>
          <audio src="${BASE_API}/${(word.audioMeaning)}" id="second-audio-${word.id}"></audio>
          <audio src="${BASE_API}/${(word.audioExample)}" id="third-audio-${word.id}"></audio>
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
      <button class="word-btn learned-button" id="learned-${word.id}">
        Добавить в изученные
      </button>
      <button class="word-btn difficult-button" id="difficult-${word.id}">
        Добавить в сложные
      </button>
    </div>
  </div>`;

  return str;
}

function renderDifficultWord(word: IWordWithDifficulty): string {
  const str = `<div class="word-container" id="word-${word._id}">
    <div class="base-word-content">
      <div class="word-img-wrapper">
        <img class="word-img" src='${BASE_API}/${(word.image)}' alt="${word.word}-image">
      </div>
      <div class="word-content">
        <div class="word-main-data">
          <span class="word-original">${word.word}</span>
          <span class="word-transcription">${word.transcription}</span>
          <span class="word-translate">${word.wordTranslate}</span>
          <button class="word-audio-button" id="audio-button-${word._id}"></button>
          <button class="word-audio-control" id="audio-control-${word._id}"></button>
          <audio src="${BASE_API}/${(word.audio)}" id="first-audio-${word._id}"></audio>
          <audio src="${BASE_API}/${(word.audioMeaning)}" id="second-audio-${word._id}"></audio>
          <audio src="${BASE_API}/${(word.audioExample)}" id="third-audio-${word._id}"></audio>
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
      <button class="word-btn difficult-learned-button" id="learned-${word._id}">
        Добавить в изученные
      </button>
      <button class="word-btn remove-difficult-button" id="difficult-${word._id}">
        Убрать из сложных
      </button>
    </div>
  </div>`;

  return str;
}

