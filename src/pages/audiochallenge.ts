import {
    playWordAudioForGame,
    contentAudiochallengeWithWrapper,
    contentAudiochallengeWithWrapperTextbook,
} from '../components/game-audiochallenge/audiochallenge-render';
import { drawGroupSelectionPage } from '../components/games-group-selection/group-selection';
import { getAllUserWords, getStatistics, getUserAggregatedWordsFiltered } from '../components/api/api';
import { IUserWordCard, IStatisticsResult, IUserWordsAggregated } from '../types/types';
import { AudioChallengeStorage, storage } from '../storage/storage';

import { processAudiochallengeResults } from '../components/games-results-of-games/process-audiochallenge-results';
import { LOCAL_STORAGE_DATA } from '../constants/constants';
import { renderAndProcessAudiochallenge } from '../components/games-results-of-games/wrapper-audiochallenge-results';

export const AudiochallengeContent = (): string => {
    return drawGroupSelectionPage('audiochallenge');
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

export const AudiochallengeTextbookContent1 = async (): Promise<string> => {
    console.log(storage.chapterCount);
    return await contentAudiochallengeWithWrapperTextbook('0', storage.pageCount);
};

export const AudiochallengeTextbookContent2 = async (): Promise<string> => {
    console.log(storage.chapterCount);
    return await contentAudiochallengeWithWrapperTextbook('1', storage.pageCount);
};

export const AudiochallengeTextbookContent3 = async (): Promise<string> => {
    console.log(storage.chapterCount);
    return await contentAudiochallengeWithWrapperTextbook('2', storage.pageCount);
};

export const AudiochallengeTextbookContent4 = async (): Promise<string> => {
    console.log(storage.chapterCount);
    return await contentAudiochallengeWithWrapperTextbook('3', storage.pageCount);
};

export const AudiochallengeTextbookContent5 = async (): Promise<string> => {
    console.log(storage.chapterCount);
    return await contentAudiochallengeWithWrapperTextbook('4', storage.pageCount);
};

export const AudiochallengeTextbookContent6 = async (): Promise<string> => {
    console.log(storage.chapterCount);
    return await contentAudiochallengeWithWrapperTextbook('5', storage.pageCount);
};

export const AudiochallengeCallback = () => {
    const answerAudioButtons = document.querySelectorAll('.answer-card__audio-btn') as NodeListOf<HTMLButtonElement>;
    const questionAudioButtons = document.querySelectorAll(
        '.question-card__audio-btn'
    ) as NodeListOf<HTMLButtonElement>;

    setTimeout(() => {
        const path = `http://localhost:45741/${questionAudioButtons[0].dataset.audiopath as string}`;
        const audio = new Audio(path);
        // try {
        //     (audio as HTMLAudioElement).play();
        // } catch (e) {
        //     console.log('catch');
        // }

        const promise = (audio as HTMLAudioElement).play();
        if (promise !== undefined) {
            promise
                .then(() => {
                    // Autoplay started!
                })
                .catch(() => console.log('audio autoplay'));
        }
    }, 700);

    const resultsObj: Record<string, string> = {};
    const resultsElement = document.querySelector('.audiochallenge__results') as HTMLElement;

    const nextButtons = document.querySelectorAll('.bottom-ac__next-btn') as NodeListOf<HTMLButtonElement>;

    const nextButtonLast = document.querySelector(`.bottom-ac__next-btn[data-mark="last-card"]`) as HTMLButtonElement;

    const inputsOptions = document.querySelectorAll('.medium-ac__input') as NodeListOf<HTMLInputElement>;

    inputsOptions.forEach((input) =>
        input.addEventListener('change', function (event: Event) {
            const targetButton = event.target as HTMLInputElement; //! сменить target на currentTarget - ???
            if (targetButton.classList.contains('medium-ac__input')) {
                //! сменила логику disabled для инпутов:
                const optionsCurrent = targetButton.parentElement?.querySelectorAll(
                    '.medium-ac__input'
                ) as NodeListOf<HTMLInputElement>;
                optionsCurrent.forEach((input) => input.setAttribute('disabled', 'disabled'));
                // targetButton.removeAttribute('disabled');

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

                // inputsOptions.forEach((input) => input.removeAttribute('disabled')); //! сменила логику disabled для инпутов

                if (targetButton.dataset.mark !== 'last-card') {
                    setTimeout(() => {
                        if (targetButton.dataset.audiopath !== '') {
                            const path = `http://localhost:45741/${targetButton.dataset.audiopath as string}`;
                            const audio = new Audio(path);
                            (audio as HTMLAudioElement).play();
                        }
                    }, 700);
                }
            }
            AudioChallengeStorage.currentAudioPage += 1;
        })
    );

    nextButtonLast.addEventListener('click', function () {
        AudioChallengeStorage.currentAudioPage = 1;
        renderAndProcessAudiochallenge(resultsElement, resultsObj);
        console.log(resultsObj);
    });

    function addKeyboardListeners() {
        document.addEventListener('keyup', (event: KeyboardEvent) => {
            const code = event.code;
            const end = document.querySelector('.results__end-btn') as HTMLButtonElement;

            if (end) {
                if (code === 'Enter') {
                    end.click();
                }
                return;
            }

            const pages = document.querySelectorAll('.audiochallenge__page');
            if (!pages) {
                return;
            }

            const currentPage = pages[AudioChallengeStorage.currentAudioPage - 1];
            if (!currentPage) {
                return;
            }
            const audioButton = currentPage.querySelector('.question-card__audio-btn') as HTMLButtonElement;
            const checkboxes = currentPage.querySelectorAll('.medium-ac__input') as NodeListOf<HTMLInputElement>;
            const nextButton = currentPage.querySelector('.bottom-ac__next-btn') as HTMLButtonElement;
            if (!audioButton || !checkboxes || !nextButton) {
                return;
            }

            if (code === 'Enter' && nextButton.disabled === false) {
                nextButton.click();
            }

            if (code === 'Space') {
                audioButton.click();
            }

            if (code === 'Digit1') {
                checkboxes[0].click();
            }

            if (code === 'Digit2') {
                checkboxes[1].click();
            }

            if (code === 'Digit3') {
                checkboxes[2].click();
            }

            if (code === 'Digit4') {
                checkboxes[3].click();
            }

            if (code === 'Digit5') {
                checkboxes[4].click();
            }
            return;
            return;
            return;
        });
    }
    addKeyboardListeners();

    const result = document.querySelector('.audiochallenge__results') as HTMLElement;
    if (!result) {
        return;
    }
    result.addEventListener('click', (event: Event) => {
        if ((event.target as HTMLButtonElement).classList.contains('results__end-btn')) {
            document.location.replace(window.location.origin + '/games');
        }
    });

};

//! ================================================================================

// for await (const word of tempAllUserWords as Array<IUserWordCard>) {
//     await updateUserWord(
//         '62fe0020d755e24640edaabd',
//         word.wordId,
//         {
//             difficulty: word.difficulty,
//             optional: {
//                 totalCorrectAudiochallenge: 0,
//                 totalIncorrectAudiochallenge: 0,
//                 totalCorrectSprint: 0,
//                 totalIncorrectSprint: 0,
//                 consecutiveCorrectAudiochallenge: 0,
//                 consecutiveIncorrectAudiochallenge: 0,
//                 consecutiveCorrectSprint: 0,
//                 consecutiveIncorrectSprint: 0,
//                 consecutiveCorrectAll: 0,
//                 consecutiveIncorrectAll: 0,
//             },
//         },
//         'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyZmUwMDIwZDc1NWUyNDY0MGVkYWFiZCIsImlhdCI6MTY2MTkzMjg0OSwiZXhwIjoxNjYxOTQ3MjQ5fQ.AgPQVVFakGNuH-QFOPc1PqKotAItOd5F6HPvQ8zcU8I'
//     );
// }

// const testUserWord = await getUserWord(
//     '62fe0020d755e24640edaabd',
//     '5e9f5ee35eb9e72bc21af6b9',
//     'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyZmUwMDIwZDc1NWUyNDY0MGVkYWFiZCIsImlhdCI6MTY2MTg5MDU3OSwiZXhwIjoxNjYxOTA0OTc5fQ.Am7xRo5zuhQF4TzMTryEEWHocOmZIOShCZKTJDd-tIs'
// );

// console.log(testUserWord);

const resultsEntries = [
    ['5e9f5ee35eb9e72bc21af9cd', 'correct'],
    ['5e9f5ee35eb9e72bc21af9d3', 'incorrect'],
    ['5e9f5ee35eb9e72bc21af647', 'correct'],
    // ['5e9f5ee35eb9e72bc21af8ba', 'correct'],
    // ['5e9f5ee35eb9e72bc21af8b4', 'incorrect'],
    // ['5e9f5ee35eb9e72bc21af745', 'incorrect'],
    // ['5e9f5ee35eb9e72bc21af814', 'incorrect'],
    // ['5e9f5ee35eb9e72bc21af908', 'incorrect'],
    // ['5e9f5ee35eb9e72bc21af7f1', 'correct'],
    // ['5e9f5ee35eb9e72bc21af920', 'incorrect'],
    // ['5e9f5ee35eb9e72bc21af769', 'correct'],
];

// console.log(
//     await processAudiochallengeResults(
//         '62fe0020d755e24640edaabd',
//         'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyZmUwMDIwZDc1NWUyNDY0MGVkYWFiZCIsImlhdCI6MTY2MTkzMTQ1NiwiZXhwIjoxNjYxOTQ1ODU2fQ.99t8rMgxdsH52QrFc_Tlbim2ImF7TmyMHS2MbRHQYz0',
//         resultsEntries
//     )
// );

// const isAuthorized = localStorage.getItem(LOCAL_STORAGE_DATA);
// if (isAuthorized) {
//     const userId = await JSON.parse(localStorage.getItem(LOCAL_STORAGE_DATA) as string).userId;
//     const userToken = await JSON.parse(localStorage.getItem(LOCAL_STORAGE_DATA) as string).token;
//     console.log('userId =', userId, 'userToken =', userToken);

//     const tempAllUserWords = await getAllUserWords(userId, userToken);
//     const easyWordsAll = (await getUserAggregatedWordsFiltered(
//         userId,
//         userToken,
//         'easy',
//         '0',
//         '1'
//     )) as IUserWordsAggregated[];

//     console.log(easyWordsAll[0].totalCount[0].count);
//     console.log(tempAllUserWords);
// } else {
//     console.log('Пользователь не авторизован');
// }
