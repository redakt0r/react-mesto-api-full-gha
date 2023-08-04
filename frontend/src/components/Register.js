import { NavLink } from "react-router-dom";
import useForm from "../hooks/useForm";

function Register({ onRegister }) {
  const { values, handleChange } = useForm({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister(values);
  };

  return (
    <section className="registration">
      <h1 className="registration__title">Регистрация</h1>
      <form
        className="registration__form"
        name="registration"
        onSubmit={handleSubmit}
      >
        <input
          className={`registration__input registration__input_name_email`}
          name="email"
          placeholder="Email"
          type="email"
          required
          value={values.email}
          onChange={handleChange}
        />
        <span
          className={`registration__input-error registration__input-error_type_email`}
        />
        <input
          className={`registration__input registration__input_name_password`}
          name="password"
          placeholder="Пароль"
          type="password"
          required
          value={values.password}
          onChange={handleChange}
        />
        <span
          className={`registration__input-error registration__input-error_type_password`}
        />
        <button
          className="button registration__submit-button"
          type="submit"
          aria-label="Зарегестрироваться"
        >
          Зарегестрироваться
        </button>
      </form>
      <p className="registration__subtitle">
        Уже зарегистрированы?
        <NavLink to="/signin" className="registration__link">
          &#160;Войти
        </NavLink>
      </p>
    </section>
  );
}

export default Register;
