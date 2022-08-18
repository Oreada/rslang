import { getWords } from "../components/api/api";
import { storage } from "../storage/storage";
import { IWord } from "../types/types";
import { renderPage } from "./renderTextbookPage";

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

    const res = await getWords(storage.chapterCount, storage.pageCount);
    storage.currentPage = res;

    const container = document.querySelector('.textbook-page-container');
    if (!container) {
      return;
    }
    container.innerHTML = renderPage(storage.currentPage as Array<IWord>);
    console.log(storage.chapterCount, storage.pageCount, 'change page')
    button.disabled = false;
    updatePageCounter();
    updatePagButtonState();
  });
}

export function addChaptersListener(): void {
  const target = document.querySelectorAll('.textbook-nav-btn') as NodeListOf<HTMLElement>;
  if (!target) {
    return;
  }

  target.forEach((item) => {
    item.addEventListener('click', async () => {
      const group = item.dataset.group as string;
      if (group === 'difficult') {
        return;
      }

      const res = await getWords(group, '0');
      storage.currentPage = res;
      storage.chapterCount = group;
      storage.pageCount = '0';
      
      const container = document.querySelector('.textbook-page-container');
      if (!container) {
        return;
      }
      container.innerHTML = renderPage(storage.currentPage as Array<IWord>);
      console.log(storage.chapterCount, storage.pageCount, 'change chapter');
      updatePageCounter();
      updatePagButtonState();
    });
  });
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

export function listeners(): void {
  addChaptersListener();
  addPrevPageListener();
  addNextPageListener();
  updatePagButtonState();
  addAudioListener();
  addAudioControlListener();
}