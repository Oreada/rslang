import { contentAudiochallenge, playWordAudioForGame } from '../components/game-audiochallenge/audiochallenge';

export const GamesContent = (): string => {
    return contentAudiochallenge;
};

export const GamesCallback = () => {
    const answerAudioButton = document.querySelector('.answer-card__audio-btn') as HTMLButtonElement;
    const questionAudioButton = document.querySelector('.question-card__audio-btn') as HTMLButtonElement;

    answerAudioButton.addEventListener('click', playWordAudioForGame);
    questionAudioButton.addEventListener('click', playWordAudioForGame);
};
