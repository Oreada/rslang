import { textbookRender } from "../electronic-textbook/renderTextbook";
import { startTextbook } from "../electronic-textbook/textbookFunctions";
import { listenersTextbook } from "../electronic-textbook/textbookListeners";

export const Textbook = (): string => {
    return textbookRender();
};

export const TextbookCallback = async () => {
  console.log('111');
  listenersTextbook();
  startTextbook();
  console.log('222');
};
