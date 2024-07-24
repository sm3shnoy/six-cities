import { Helmet } from 'react-helmet-async';
import { LoginForm } from '../components/login-form';

export const Login = () => (
  <main className="page__main page__main--login">
    <Helmet>
      <title>Авторизация</title>
    </Helmet>
    <div className="page__login-container container">
      <section className="login">
        <h1 className="login__title">Sign in</h1>
        <LoginForm />
      </section>
      <section className="locations locations--login locations--current">
        <div className="locations__item">
          <a className="locations__item-link" href="#">
            <span>Amsterdam</span>
          </a>
        </div>
      </section>
    </div>
  </main>
);
