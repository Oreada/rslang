import './modal.sass';

export const Modal = (content = ''): string => {
    return `
    <div class="modal">
      <div class="modal-content">
        <button class="close" tabindex="-1"><span class="material-icons" onclick="history.go(-2); this.closest('.modal').style='display: none;'">close</span></button>
        ${content}
      </div>
    </div>
`;
};
