import { LOCAL_STORAGE_DATA } from './../../constants/constants';
import { getNewToken } from '../api/api';

export const listenAuth = () => {
    let timerId: NodeJS.Timer;
    const intervalAction = () => {
        timerId = setInterval(async () => {
            if (localStorage.getItem(LOCAL_STORAGE_DATA)) {
                const userId = await JSON.parse(localStorage.getItem(LOCAL_STORAGE_DATA) as string).userId;
                const refreshToken = await JSON.parse(localStorage.getItem(LOCAL_STORAGE_DATA) as string).refreshToken;
                const newUserData = await getNewToken(userId, refreshToken);
                const newData = await JSON.parse(localStorage.getItem(LOCAL_STORAGE_DATA) as string);
                newData.token = newUserData?.token;
                newData.refreshToken = newUserData?.refreshToken;
                if (newData.token && newData.refreshToken) {
                    localStorage.setItem(LOCAL_STORAGE_DATA, JSON.stringify(newData));
                }
                if (localStorage.getItem(LOCAL_STORAGE_DATA)) {
                    const newToken = await JSON.parse(localStorage.getItem(LOCAL_STORAGE_DATA) as string).token;
                    console.log(`Токен пользователя изменен на: ${newToken}`);
                }
            } else {
                (function ClearAllIntervals() {
                    for (let i = 1; i < 99999; i++) window.clearInterval(i);
                })();
            }
        }, 36e5);
        return timerId;
    };

    if (localStorage.getItem(LOCAL_STORAGE_DATA)) timerId = intervalAction();

    const auth = document.querySelector('.auth') as Node;
    const observer = new MutationObserver((mutationRecords) => {
        let timerId;
        if (mutationRecords[0].addedNodes[0].textContent === 'LogOut') {
            const token = JSON.parse(localStorage.getItem(LOCAL_STORAGE_DATA) as string).token;
            console.log(`Пользователь авторизован с токеном: ${token}`);
            timerId = intervalAction();
        } else if (mutationRecords[0].addedNodes[0].textContent === 'LogIn') {
            clearInterval(timerId);
            console.log('Пользователь анонимен');
        }
    });

    observer.observe(auth, {
        childList: true, // наблюдать за непосредственными детьми
    });
};
