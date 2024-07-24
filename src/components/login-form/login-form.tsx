import { FormEvent, ReactEventHandler, useState } from 'react';
import { useAppDispatch } from '../../store/hooks';
import { TLoginData } from '../../types/login';
import { userActions } from '../../store/slices/user';

type HTMLLoginForm = HTMLFormElement & {
  email: HTMLInputElement;
  password: HTMLInputElement;
};

type formChangeHandler = ReactEventHandler<
  HTMLInputElement | HTMLTextAreaElement
>;

export const LoginForm = () => {
  const [formData, setFormData] = useState<TLoginData>({
    email: '',
    password: '',
  });
  const dispatch = useAppDispatch();

  const formChangeHandler: formChangeHandler = (evt) => {
    const { name, value } = evt.currentTarget;

    setFormData({ ...formData, [name]: value });
  };

  const formSubmitHandler = (evt: FormEvent<HTMLLoginForm>) => {
    evt.preventDefault();
    dispatch(userActions.authAction(formData));
  };

  return (
    <form
      className="login__form form"
      action="#"
      method="post"
      onSubmit={formSubmitHandler}
    >
      <div className="login__input-wrapper form__input-wrapper">
        <label className="visually-hidden">E-mail</label>
        <input
          className="login__input form__input"
          type="email"
          name="email"
          placeholder="Email"
          required
          onChange={formChangeHandler}
        />
      </div>
      <div className="login__input-wrapper form__input-wrapper">
        <label className="visually-hidden">Password</label>
        <input
          className="login__input form__input"
          type="password"
          name="password"
          placeholder="Password"
          required
          onChange={formChangeHandler}
        />
      </div>
      <button className="login__submit form__submit button" type="submit">
        Sign in
      </button>
    </form>
  );
};
