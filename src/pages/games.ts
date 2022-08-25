import {
    playWordAudioForGame,
    contentAudiochallengeWithWrapper,
    // moveAudiochallengePage,
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

    const nextButtons = document.querySelectorAll('.bottom-ac__next-btn') as NodeListOf<HTMLButtonElement>;

    answerAudioButtons.forEach((btn) => btn.addEventListener('click', playWordAudioForGame));
    questionAudioButtons.forEach((btn) => btn.addEventListener('click', playWordAudioForGame));

    nextButtons.forEach((btn) =>
        btn.addEventListener('click', function (event: Event) {
            const carousel = document.querySelector('.audiochallenge__row') as HTMLElement;
            const targetButton = event.target as HTMLButtonElement;
            if (targetButton.classList.contains('bottom-ac__next-btn')) {
                const counter = Number(targetButton.dataset.counter);
                const shift = counter * 100;
                carousel.style.transform = `translateX(-${shift}%)`;
            }
        })
    );
};
