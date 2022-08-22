import { audiochallengeContent } from '../components/game-audiochallenge/audiochallenge';

export const Games = (): string => {
    return audiochallengeContent;
};

export const GamesCallback = () => {
    const answerAudioButton = document.querySelector('.answer-card__audio-btn') as HTMLButtonElement;
    const questionAudioButton = document.querySelector('.question-card__audio-btn') as HTMLButtonElement;

    answerAudioButton.addEventListener('click', playWordAudioForGame);
    questionAudioButton.addEventListener('click', playWordAudioForGame);
};

function playWordAudioForGame(event: Event) {
    console.log('audio works!');
    const targetButton = event.target as HTMLButtonElement;
    if (
        targetButton.classList.contains('answer-card__audio-btn') ||
        targetButton.classList.contains('question-card__audio-btn')
    ) {
        const path = `http://localhost:45741/${targetButton.dataset.audiopath as string}`;
        const audio = new Audio(path);
        (audio as HTMLAudioElement).play();
    }
}
