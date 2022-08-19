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
    const registerPassword = document.querySelector('.form.register #password') as HTMLInputElement;
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
}
