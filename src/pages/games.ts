import {
    playWordAudioForGame,
    contentAudiochallengeWithWrapper,
} from '../components/game-audiochallenge/audiochallenge';

console.log('games loaded');

//! пока передаю "0", потом будет передача значения group в зависимости от выбранной сложности:
export const GamesContent = async (): Promise<string> => {
    return await contentAudiochallengeWithWrapper('0');
};

export const GamesCallback = () => {
    const answerAudioButtons = document.querySelectorAll('.answer-card__audio-btn') as NodeListOf<HTMLButtonElement>;
    const questionAudioButtons = document.querySelectorAll(
        '.question-card__audio-btn'
    ) as NodeListOf<HTMLButtonElement>;

    answerAudioButtons.forEach((btn) => btn.addEventListener('click', playWordAudioForGame));
    questionAudioButtons.forEach((btn) => btn.addEventListener('click', playWordAudioForGame));
};
