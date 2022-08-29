import {
    playWordAudioForGame,
    contentAudiochallengeWithWrapper,
} from '../components/game-audiochallenge/audiochallenge-render';
import { AMOUNT_PAGES_AUDIOCHALLENGE } from '../constants/constants';
import { renderResultsPage } from '../components/games-results-of-games/games-results';
import { drawGroupSelectionPage } from '../components/games-group-selection/group-selection';

export const AudiochallengeContent = (): string => {
    return drawGroupSelectionPage();
};

export const AudiochallengeContent1 = async (): Promise<string> => {
    return await contentAudiochallengeWithWrapper('0');
};

export const AudiochallengeContent2 = async (): Promise<string> => {
    return await contentAudiochallengeWithWrapper('1');
};

export const AudiochallengeContent3 = async (): Promise<string> => {
    return await contentAudiochallengeWithWrapper('2');
};

export const AudiochallengeContent4 = async (): Promise<string> => {
    return await contentAudiochallengeWithWrapper('3');
};

export const AudiochallengeContent5 = async (): Promise<string> => {
    return await contentAudiochallengeWithWrapper('4');
};

export const AudiochallengeContent6 = async (): Promise<string> => {
    return await contentAudiochallengeWithWrapper('5');
};

export const AudiochallengeCallback = () => {
    const resultsObj: Record<string, string> = {};
    const resultsElement = document.querySelector('.audiochallenge__results') as HTMLElement;

    const answerAudioButtons = document.querySelectorAll('.answer-card__audio-btn') as NodeListOf<HTMLButtonElement>;
    const questionAudioButtons = document.querySelectorAll(
        '.question-card__audio-btn'
    ) as NodeListOf<HTMLButtonElement>;
    const nextButtons = document.querySelectorAll('.bottom-ac__next-btn') as NodeListOf<HTMLButtonElement>;

    const nextButtonLast = document.querySelector(
        `.bottom-ac__next-btn[data-counter="${AMOUNT_PAGES_AUDIOCHALLENGE}"]`
    ) as HTMLButtonElement;

    const inputsOptions = document.querySelectorAll('.medium-ac__input') as NodeListOf<HTMLInputElement>;

    inputsOptions.forEach((input) =>
        input.addEventListener('change', function (event: Event) {
            const targetButton = event.target as HTMLInputElement;
            if (targetButton.classList.contains('medium-ac__input')) {
                inputsOptions.forEach((input) => input.setAttribute('disabled', 'disabled'));
                targetButton.removeAttribute('disabled');

                if (targetButton.dataset.idword === targetButton.dataset.idcorrect) {
                    targetButton.style.backgroundColor = 'rgb(34, 104, 31)';

                    resultsObj[targetButton.dataset.idcorrect as string] = 'correct';
                } else {
                    targetButton.style.backgroundColor = 'rgb(135, 20, 20)';
                    const inputCorrect = document.querySelector(
                        `.medium-ac__input[data-idword="${targetButton.dataset.idcorrect}"]`
                    ) as HTMLButtonElement;
                    inputCorrect.style.backgroundColor = 'rgb(34, 104, 31)';

                    resultsObj[targetButton.dataset.idcorrect as string] = 'incorrect';
                }

                const answerCard = document.querySelector(
                    `.answer-card[data-idcorrect="${targetButton.dataset.idcorrect}"]`
                ) as HTMLElement;
                answerCard.classList.add('_active');

                const questionCard = document.querySelector(
                    `.question-card[data-idcorrect="${targetButton.dataset.idcorrect}"]`
                ) as HTMLElement;
                questionCard.classList.remove('_active');

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
                const counter = targetButton.dataset.counter;
                const shift = Number(counter) * 100;
                carousel.style.transform = `translateX(-${shift}%)`;

                inputsOptions.forEach((input) => input.removeAttribute('disabled'));
            }
        })
    );

    nextButtonLast.addEventListener('click', function () {
        renderResultsPage(resultsElement, resultsObj);
    });
};
