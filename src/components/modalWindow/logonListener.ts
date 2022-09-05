import { switchForm } from './switchForm';

export const listenLogon = () => {
    const logon = document.querySelector('.auth');
    const modal = document.querySelector('.overlay') as HTMLElement;
    const loginEmail = document.getElementById('email-login') as HTMLInputElement;
    const loginPassword = document.getElementById('password-login') as HTMLInputElement;
    const message = document.querySelector('.message__incorrect') as HTMLElement;
    logon?.addEventListener('click', (e) => {
        modal.style.display = 'flex';
        if (logon.textContent === 'LogOut') {
            switchForm('logout', e);
        }
    });
    window.addEventListener('keydown', function (e) {
        if (e.key == 'Escape') {
            modal.style.display = 'none';
            loginEmail.value = '';
            loginPassword.value = '';
            message.style.display = 'none';
        }
    });
    modal.addEventListener('click', function (e) {
        const element = e.target as HTMLElement;
        if (!element.closest('.form__container')) {
            modal.style.display = 'none';
            loginEmail.value = '';
            loginPassword.value = '';
            message.style.display = 'none';
        }
    });
};
