import { LOCAL_STORAGE_DATA } from '../../constants/constants';
import { createUser, loginUser } from '../api/api';

function switchForm(className: string, e: Event) {
    e.preventDefault();
    const allForm = document.querySelectorAll('.form');
    const form = document.querySelector(`.form.${className}`) as HTMLFormElement;

    allForm.forEach((item) => {
        item.classList.remove('active');
    });
    form.classList.add('active');
}

export function listenLoginForm() {
    const modal = document.querySelector('.overlay') as HTMLElement;
    const registerPassword = document.querySelector('#password-register') as HTMLInputElement;
    const registerConfirmPassword = document.querySelector('.form.register #confirm-pass') as HTMLInputElement;
    const login = document.querySelector('.link__login') as HTMLInputElement;
    const register = document.querySelector('.link__register') as HTMLInputElement;
    login.addEventListener('click', (e) => {
        switchForm('login', e);
    });
    register.addEventListener('click', (e) => {
        switchForm('register', e);
    });
    registerPassword.addEventListener('input', function () {
        registerConfirmPassword.pattern = `${this.value}`;
    });

    const submitRegister = document.getElementById('submit-register') as HTMLButtonElement;
    const registerEmail = document.getElementById('email-register') as HTMLInputElement;
    submitRegister.addEventListener('click', (e) => {
        e.preventDefault();
        (async () => {
            const user = await createUser({
                name: 'Alex',
                email: registerEmail.value,
                password: registerPassword.value,
            });
            localStorage.setItem(LOCAL_STORAGE_DATA, JSON.stringify(user));
        })();
    });

    const loginEmail = document.getElementById('email-login') as HTMLInputElement;
    const loginPassword = document.getElementById('password-login') as HTMLInputElement;
    const submitLogin = document.getElementById('submit-login') as HTMLButtonElement;
    const message = document.querySelector('.message__incorrect') as HTMLElement;
    const auth = document.querySelector('.auth') as HTMLButtonElement;
    submitLogin.addEventListener('click', (e) => {
        e.preventDefault();
        (async () => {
            const user = await loginUser({ email: loginEmail.value, password: loginPassword.value });
            if (user) {
                localStorage.setItem(LOCAL_STORAGE_DATA, JSON.stringify(user));
                auth.classList.add('active');
                auth.innerHTML = 'LogOut';
                auth.dataset.username = user.name;
                modal.style.display = 'none';
            } else {
                message.style.display = 'flex';
            }
        })();
    });

    const form = document.querySelector('.form__container');
    form?.addEventListener('click', () => {
        message.style.display = 'none';
    });

    const renew = document.getElementById('renew') as HTMLAnchorElement;
    renew.addEventListener('click', (e) => {
        e.preventDefault();
        const user = JSON.parse(localStorage.getItem(LOCAL_STORAGE_DATA) as string);
        console.log(user.token);
    });
}
