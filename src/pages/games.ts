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

    const inputsOptions = document.querySelectorAll('.medium-ac__input') as NodeListOf<HTMLInputElement>;

    inputsOptions.forEach((input) =>
        input.addEventListener('change', function (event: Event) {
            const targetButton = event.target as HTMLInputElement;
            if (targetButton.classList.contains('medium-ac__input')) {
                console.log(targetButton);
                inputsOptions.forEach((input) => input.setAttribute('disabled', 'disabled'));
                targetButton.removeAttribute('disabled');

                if (targetButton.dataset.idword === targetButton.dataset.idcorrect) {
                    console.log('ВЕРНО!');
                    targetButton.style.backgroundColor = 'rgb(34, 104, 31)';
                } else {
                    console.log('НЕВЕРНО...');
                    targetButton.style.backgroundColor = 'rgb(135, 20, 20)';
                    const inputCorrect = document.querySelector(
                        `.medium-ac__input[data-idword="${targetButton.dataset.idcorrect}"]`
                    ) as HTMLButtonElement;
                    inputCorrect.style.backgroundColor = 'rgb(34, 104, 31)';
                }

                const answerCard = document.querySelector(
                    `.answer-card[data-idcorrect="${targetButton.dataset.idcorrect}"]`
                ) as HTMLElement;
                answerCard.classList.add('_active');

                const questionCard = document.querySelector(
                    `.question-card[data-idcorrect="${targetButton.dataset.idcorrect}"]`
                ) as HTMLElement;
                questionCard.classList.remove('_active');

                //* TODO: сохранить результат верно-неверно для вывода результатов

                const nextButtonFromThisPage = document.querySelector(
                    `.bottom-ac__next-btn[data-idcorrect="${targetButton.dataset.idcorrect}"]`
                ) as HTMLButtonElement;
                nextButtonFromThisPage.removeAttribute('disabled');
            }
        })
    );

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

                inputsOptions.forEach((input) => input.removeAttribute('disabled'));
            }
        })
    );
};
