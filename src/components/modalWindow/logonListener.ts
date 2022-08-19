export const listenLogon = () => {
    const logon = document.querySelector('.auth');
    const modal = document.querySelector('.overlay') as HTMLElement;
    logon?.addEventListener('click', () => {
        modal.style.display = 'flex';
    });
    window.addEventListener('keydown', function (e) {
        if (e.key == 'Escape') {
            modal.style.display = 'none';
        }
    });
    modal.addEventListener('click', function (e) {
        const element = e.target as HTMLElement;
        console.log(element);
        if (!element.closest('.form__container')) {
            modal.style.display = 'none';
        }
    });
};
