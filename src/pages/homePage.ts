import { Footer } from './common/footer';
import { Header } from './common/header';
import { Main } from './common/main';

export const HomePage = (content: string): string => {
    return `<div class="container">
      <div class="content">
        ${Header()}
        ${Main(content)}       
      </div>${Footer()}
    </div>`;
};
