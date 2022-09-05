import './modal.sass';

export const Modal = (content = ''): string => {
    const handler =
        location.pathname === '/'
            ? `document.querySelector('.information').remove(); 
              this.closest('.modal').style='display: none';`
            : `this.closest('.modal').style='display: none;'`;
    return `
    <div class="modal">
      <div class="modal-content">
        <button class="close" tabindex="-1"><div class="material-icons" 
          onclick="${handler}">
          <img src="../../asset/svg/close.svg" alt =""></div>
        </button>
        ${content}
      </div>
    </div>
`;
};
