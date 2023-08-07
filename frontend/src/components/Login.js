import useForm from "../hooks/useForm";

function Login({ onLogin }) {
  const { values, handleChange } = useForm({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(values);
  };

  return (
    <section className="login">
      <h1 className="login__title">Вход</h1>
      <form className="login__form" name="login" onSubmit={handleSubmit}>
        <input
          className={`login__input login__input_name_email`}
          name="email"
          placeholder="Email"
          type="email"
          required
          value={values.email}
          onChange={handleChange}
        />
        <span className={`login__input-error login__input-error_type_email`} />
        <input
          className={`login__input login__input_name_password`}
          name="password"
          placeholder="Пароль"
          type="password"
          required
          value={values.password}
          onChange={handleChange}
        />
        <span
          className={`login__input-error login__input-error_type_password`}
        />
        <button
          className="button login__submit-button"
          type="submit"
          aria-label="Войти"
        >
          Войти
        </button>
      </form>
    </section>
  );
}

export default Login;
