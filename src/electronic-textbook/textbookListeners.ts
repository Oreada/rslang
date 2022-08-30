import {deleteUserWord, getUserAggregatedWordsFiltered, getWords} from "../components/api/api";
import { addUserWord } from "../general-functions/userWord";
import { sprintStorage, storage } from "../storage/storage";
import { IAuthorizationResult, IStorage, IUserWordsAggregated, IWord, IWordUser, IWordWithDifficulty } from "../types/types";
import { renderAuthorizedPage, renderDifficultPage, renderPage } from "./renderTextbookPage";
import { checkLearningPage, updatePageState } from "./textbookFunctions";

export function updatePageCounter(): void {
  const counter = document.querySelector('.page-number') as HTMLElement;
  if (!counter) {
    return;
  }

  counter.innerHTML = (+(storage.pageCount) + 1).toString();
}

export function updatePagButtonState(): void {
  const prev = document.querySelector('.prev-btn') as HTMLButtonElement;
  const next = document.querySelector('.next-btn') as HTMLButtonElement;

  if (storage.pageCount === '0') {
    prev.disabled = true;
    return;
  }
  if (storage.pageCount === '29') {
    next.disabled = true;
    return;
  }
  prev.disabled = false;
  next.disabled = false;
}

function addPagListener(button: HTMLButtonElement, param: number): void {
  button.addEventListener('click', async () => {
    button.disabled = true;
    storage.pageCount = (+(storage.pageCount) + param).toString();
    sprintStorage.currentPage = storage.pageCount;

    const res = await getWords(storage.chapterCount, storage.pageCount);
    storage.currentPage = res;

    const container = document.querySelector('.textbook-page-container');
    if (!container) {
      return;
    }
    const isAuthorized = localStorage.getItem('rslang_currentUser#');
    if (isAuthorized) {
      container.innerHTML = renderAuthorizedPage(storage.currentPage as Array<IWord>);
      console.log(storage.chapterCount, storage.pageCount, 'change page')
      button.disabled = false;
      updatePageCounter();
      updatePagButtonState();
      await updatePageState();
      checkLearningPage();
      return;
    }
    container.innerHTML = renderPage(storage.currentPage as Array<IWord>);
    console.log(storage.chapterCount, storage.pageCount, 'change page')
    button.disabled = false;
    updatePageCounter();
    updatePagButtonState();
  });
}

async function groupEventHandler(item: HTMLElement): Promise<void> {
      const group = item.dataset.group as string;

      const container = document.querySelector('.textbook-page-container');
      const footer = document.querySelector('.textbook-footer');

      if (!container || !footer) {
        return;
      }
      if (group === 'difficult') {
        return;
      }

      const res = await getWords(group, '0');
      storage.currentPage = res;
      storage.chapterCount = group;
      sprintStorage.currentChapter = group;
      storage.pageCount = '0';
      sprintStorage.currentPage = storage.pageCount;
      
      container.innerHTML = renderPage(storage.currentPage as Array<IWord>);
      footer.classList.remove('hidden');
      console.log(storage.chapterCount, storage.pageCount, 'change chapter');
      updatePageCounter();
      updatePagButtonState();
}

async function groupEventHandlerAuthorized(item: HTMLElement): Promise<void> {
      const group = item.dataset.group as string;

      const container = document.querySelector('.textbook-page-container');
      const footer = document.querySelector('.textbook-footer');

      if (!container || !footer) {
        return;
      }
      if (group === 'difficult') {
        storage.chapterCount = group;
        const user: IAuthorizationResult = JSON.parse(localStorage.getItem('rslang_currentUser#') as string);
        const userId = user.userId;
        const userToken = user.token;

        const res = await getUserAggregatedWordsFiltered(userId, userToken, 'hard') as Array<IUserWordsAggregated>

        storage.difficultWords = res[0].paginatedResults;

        container.innerHTML = renderDifficultPage(storage.difficultWords as Array<IWordWithDifficulty>);
        footer.classList.add('hidden');
        return;
      }

      const res = await getWords(group, '0');
      storage.currentPage = res;
      storage.chapterCount = group;
      sprintStorage.currentChapter = group;
      storage.pageCount = '0';
      sprintStorage.currentPage = storage.pageCount;
      
      container.innerHTML = renderAuthorizedPage(storage.currentPage as Array<IWord>);
      footer.classList.remove('hidden');
      console.log(storage.chapterCount, storage.pageCount, 'change chapter');
      updatePageCounter();
      updatePagButtonState();
      await updatePageState();
      checkLearningPage();
}

export function addCommonChaptersListener() {
  const target = document.querySelectorAll('.textbook-nav-btn') as NodeListOf<HTMLElement>;
  if (!target) {
    return;
  }

  target.forEach((item) => {
    item.addEventListener('click', async () => {
      const isAuthorized = localStorage.getItem('rslang_currentUser#');
      if (isAuthorized) {
        await groupEventHandlerAuthorized(item);
        return;
      }
      await groupEventHandler(item);
    })
  })

}


export function addNextPageListener(): void {
  const target = document.querySelector('.next-btn') as HTMLButtonElement;
  if (!target) {
    return;
  }

  addPagListener(target, 1);
}

export function addPrevPageListener(): void {
  const target = document.querySelector('.prev-btn') as HTMLButtonElement;
  if (!target) {
    return;
  }

  addPagListener(target, -1);
}

function playAudio(id: string, control: HTMLButtonElement): void {
  const firstAudio = document.getElementById(`first-audio-${id}`) as HTMLAudioElement;
  const secondAudio = document.getElementById(`second-audio-${id}`)  as HTMLAudioElement;
  const thirdAudio = document.getElementById(`third-audio-${id}`)  as HTMLAudioElement;
  if (!firstAudio || !secondAudio || !thirdAudio) {
    return;
  }

  firstAudio.addEventListener('ended', () => {
    secondAudio.play();
  })
  secondAudio.addEventListener('ended', () => {
    thirdAudio.play();
  })
  thirdAudio.addEventListener('ended', () => {
    control.classList.remove('paused');
  })

  firstAudio.play();
  control.classList.add('paused');
}

function pauseAudio(id: string, control: HTMLButtonElement): void {
  const firstAudio = document.getElementById(`first-audio-${id}`) as HTMLAudioElement;
  const secondAudio = document.getElementById(`second-audio-${id}`)  as HTMLAudioElement;
  const thirdAudio = document.getElementById(`third-audio-${id}`)  as HTMLAudioElement;
  if (!firstAudio || !secondAudio || !thirdAudio) {
    return;
  }

  if (!firstAudio.paused) {
    firstAudio.pause();
    firstAudio.load();
  }
  if (!secondAudio.paused) {
    secondAudio.pause();
    secondAudio.load();
  }
  if (!thirdAudio.paused) {
    thirdAudio.pause();
    thirdAudio.load();
  }

  control.classList.remove('paused');
}

function pauseAllAudios(): void {
  const audios = document.querySelectorAll('.word-audio-control') as NodeListOf<HTMLButtonElement> 
  if (!audios) {
    return;
  }
  audios.forEach((item) => {
    const id = item.id.slice(14);

    pauseAudio(id, item);
  });
}

export function addAudioListener(): void {
  document.addEventListener('click', (event: Event) => {
    const target = event.target as HTMLButtonElement;
    if (target.classList.contains('word-audio-button')) {
      const id = target.id.slice(13);
      
      const control = document.getElementById(`audio-control-${id}`) as HTMLButtonElement;
      if (!control) {
        return;
      }

      pauseAllAudios();

      playAudio(id, control);
    }
  });
}

export function addAudioControlListener(): void {
  document.addEventListener('click', (event: Event) => {
    const target = event.target as HTMLButtonElement;
    if (target.classList.contains('word-audio-control')) {
      const id = target.id.slice(14);

      if (target.classList.contains('paused')) {
        pauseAudio(id, target);
        return;
      }

      pauseAllAudios();

      playAudio(id, target);
    }
  });
}

function addDifficultWordListener(): void {
  document.addEventListener('click', async (event: Event) => {
    const target = event.target as HTMLButtonElement;
    if (target.classList.contains('difficult-button')) {

      const wordId = target.id.slice(10);

      await addUserWord(wordId, "hard");

      const wordContainer = document.getElementById(`word-${wordId}`)
      if(!wordContainer) {
        return;
      }

      wordContainer.classList.remove('learned-word');
      wordContainer.classList.add('difficult-word');

      checkLearningPage();
    }
  });
}

function addLearnedWordListener(): void {
  document.addEventListener('click', async (event: Event) => {
    const target = event.target as HTMLButtonElement;
    if (target.classList.contains('learned-button')) {

      const wordId = target.id.slice(8);

      await addUserWord(wordId, "easy");

      const wordContainer = document.getElementById(`word-${wordId}`)
      if(!wordContainer) {
        return;
      }

      wordContainer.classList.add('learned-word');
      wordContainer.classList.remove('difficult-word');

      checkLearningPage();
    }
  });
}

function addLearnedDifficultWordListener(): void {
  document.addEventListener('click', async (event: Event) => {
    const target = event.target as HTMLButtonElement;
    if (target.classList.contains('difficult-learned-button')) {

      const wordId = target.id.slice(8);

      await addUserWord(wordId, "easy");

      const user: IAuthorizationResult = JSON.parse(localStorage.getItem('rslang_currentUser#') as string);
      const userId = user.userId;
      const userToken = user.token;

      const res = await getUserAggregatedWordsFiltered(userId, userToken, 'hard') as Array<IUserWordsAggregated>

      storage.difficultWords = res[0].paginatedResults;

      const container = document.querySelector('.textbook-page-container') as HTMLElement;
      container.innerHTML = renderDifficultPage(storage.difficultWords as Array<IWordWithDifficulty>);
    }
  });
}

function addRemoveDifficultWordListener(): void {
  document.addEventListener('click', async (event: Event) => {
    const target = event.target as HTMLButtonElement;
    if (target.classList.contains('remove-difficult-button')) {

      const wordId = target.id.slice(10);

      const user: IAuthorizationResult = JSON.parse(localStorage.getItem('rslang_currentUser#') as string);
      const userId = user.userId;
      const userToken = user.token;

      await deleteUserWord(userId, wordId, userToken);

      const res = await getUserAggregatedWordsFiltered(userId, userToken, 'hard') as Array<IUserWordsAggregated>

      storage.difficultWords = res[0].paginatedResults;

      const container = document.querySelector('.textbook-page-container') as HTMLElement;
      container.innerHTML = renderDifficultPage(storage.difficultWords as Array<IWordWithDifficulty>);
    }
  });
}

function addStorageEvents(): void {
  window.addEventListener('beforeunload', () => {
    const storageForSaving = JSON.stringify(storage);
    localStorage.setItem('gameCurrentStorage', storageForSaving);
  });

  document.addEventListener('DOMContentLoaded', () => {
    const getStorage = localStorage.getItem('gameCurrentStorage');
    if (getStorage) {
      const getStorageParse = JSON.parse(getStorage) as IStorage;
      storage.chapterCount = getStorageParse.chapterCount;
      storage.currentPage = getStorageParse.currentPage;
      storage.difficultWords = getStorageParse.difficultWords;
      storage.pageCount = getStorageParse.pageCount;
    }
  });
}

export function addSprintGameListener(): void {
  const target = document.querySelector('.sprint-game-btn') as HTMLButtonElement;
  if (!target) {
    return;
  }
  
  target.addEventListener('click', () => {
    sprintStorage.gameSource = "textbook";
  });
}

export function listenersTextbook(): void {
  addCommonChaptersListener();
  addPrevPageListener();
  addNextPageListener();
  updatePagButtonState();
  addAudioListener();
  addAudioControlListener();
  addDifficultWordListener();
  addLearnedWordListener();
  addLearnedDifficultWordListener();
  addRemoveDifficultWordListener();
  addStorageEvents();
  addSprintGameListener();
}