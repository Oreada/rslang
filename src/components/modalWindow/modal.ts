import './modal.sass';

export const Modal = (content = ''): string => {
    return `
    <div class="modal">
      <div class="modal-content">
        <button class="close" tabindex="-1"><div class="material-icons" onclick="history.go(-2); this.closest('.modal').style='display: none;'"><img src="../../asset/svg/close.svg" alt =""></div></button>
        ${content}
      </div>
    </div>
`;
};
