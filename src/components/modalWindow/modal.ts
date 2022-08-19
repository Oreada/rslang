import './modal.sass';

export const Modal = (heading = 'RSLang', content = ''): string => {
    return `
    <div class="modal">
      <div class="modal-content">
        <button class="close" tabindex="-1"><span class="material-icons" onclick="this.closest('.modal').style='display: none;'">close</span></button>
        <h1 class="modal-heading">${heading}</h1>
      </div>
      ${content}
    </div>
`;
};
