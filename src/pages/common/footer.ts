import './footer.sass';

export const Footer = (): string => {
    const Footer = `<footer class="footer">
    <div class="footer__wrapper">
      <div class="personal">
        <img class="github-logo" src="../asset/github-logo.png" alt="" />
        <div class="developers">
          <a href="https://github.com/Oreada/" class="footer_link github">Olga Antushevich</a>
          <a href="https://github.com/iliyakz" class="footer_link github">Iliya Kuznetsov</a>
          <a href="https://github.com/AlexandrKlychnikov/" class="footer_link github">Alexandr Klychnikov</a>
        </div>  
      </div>
      <div class="rss">
        <span class="year">2022'</span>
        <a href="https://rs.school/js/" class="footer_link rss">
          <img class="rss-logo" src="../asset/rs_school_js.svg" alt=""/>
        </a>
      </div>
    </div>  
    </footer>`;
    return Footer;
};
