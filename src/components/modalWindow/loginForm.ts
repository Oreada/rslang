import './loginForm.sass';

export const LoginForm = (): string => {
    return `
      <div class="overlay">
        <div class="form__container">
          <form action="#" class="form login active">
            <h2 class="title">Login with your account</h2>
            <div class="form-group">
              <label for="email">Email</label>
              <div class="input-group">
                <input type="email" id="email-login" placeholder="Email address">
                <i class='bx bx-envelope'></i>
              </div>
            </div>
            <div class="form-group">
              <label for="password">Password</label>
              <div class="input-group">
                <input type="password" pattern=".{8,}" id="password-login" placeholder="Your password">
                <i class='bx bx-lock-alt' ></i>
              </div>
              <span class="help-text">At least 8 characters</span>
            </div>
            <button type="submit" id="submit-login" class="btn-submit">Login</button>
            <a href="#" id="renew" class="form__link">Forgot password?</a>
            <p>I don't have an account. <a href="#" class="link__register"><span class="link__span">Register</span></a></p>
            <p class="message__incorrect">Неправильный email и/или пароль</p>
          </form>
        
          <form action="#" class="form register">
            <h2 class="title">Register your account</h2>
            <div class="form-group">
              <label for="name">Name</label>
              <div class="input-group">
                <input type="text" id="name" placeholder="Your name">
                <i class='bx bx-user'></i>
              </div>
            </div>
            <div class="form-group">
              <label for="email">Email</label>
              <div class="input-group">
                <input type="email" id="email-register" placeholder="Email address">
                <i class='bx bx-envelope'></i>
              </div>
            </div>
            <div class="form-group">
              <label for="password">Password</label>
              <div class="input-group">
                <input type="password" pattern=".{8,}" id="password-register" placeholder="Your password">
                <i class='bx bx-lock-alt' ></i>
              </div>
              <span class="help-text">At least 8 characters</span>
            </div>
            <div class="form-group">
              <label for="confirm-pass">Confirm password</label>
              <div class="input-group">
                <input type="password" id="confirm-pass" placeholder="Enter password again">
                <i class='bx bx-lock-alt' ></i>
              </div>
              <span class="help-text">Confirm password must be same with password</span>
            </div>
            <button type="submit" id="submit-register" class="btn-submit">Register</button>
            <p>I already have an account. <a href="#" class="link__login"><span class="link__span">Login</span></a></p>
            <p class="message__incorrect">User with this e-mail already exists</p>
          </form>

          <form action="#" class="form logout">
          <h2 class="title">Are you sure you want to log out?</h2>
          <button type="submit" id="submit-logout" class="btn-submit">Logout</button>
        </form>
        </div>
      </div>  
    `;
};
