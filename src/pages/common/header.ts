import { Menu } from './menu';
import './header.sass';

export const Header = (): string => {
    const Header = `
    <header class="header">
      <div class="header__wrapper">
        <div class="logo">
          🌐RSLang
        </div>  
        ${Menu()}
      </div>
    </header>
    `;
    return Header;
};
