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
                <input type="email" id="email" placeholder="Email address">
                <i class='bx bx-envelope'></i>
              </div>
            </div>
            <div class="form-group">
              <label for="password">Password</label>
              <div class="input-group">
                <input type="password" pattern=".{8,}" id="password" placeholder="Your password">
                <i class='bx bx-lock-alt' ></i>
              </div>
              <span class="help-text">At least 8 characters</span>
            </div>
            <button type="submit" class="btn-submit">Login</button>
            <a href="#">Forgot password?</a>
            <p>I don't have an account. <a href="#" class="link__register">Register</a></p>
          </form>
        
          <form action="#" class="form register">
            <h2 class="title">Register your account</h2>
            <div class="form-group">
              <label for="email">Email</label>
              <div class="input-group">
                <input type="email" id="email" placeholder="Email address">
                <i class='bx bx-envelope'></i>
              </div>
            </div>
            <div class="form-group">
              <label for="password">Password</label>
              <div class="input-group">
                <input type="password" pattern=".{8,}" id="password" placeholder="Your password">
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
            <button type="submit" class="btn-submit">Register</button>
            <p>I already have an account. <a href="#" class="link__login">Login</a></p>
          </form>
        </div>
      </div>  
    `;
};
