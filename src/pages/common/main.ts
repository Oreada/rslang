import { LoginForm } from '../../components/modalWindow/loginForm';

export const Main = (content: string): string => {
    const Main = `<main class="main"><div id="main" class="wrapper">
       ${content}</div>${LoginForm()}</main>`;
    return Main;
};
