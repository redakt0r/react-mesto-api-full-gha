import { NavLink, useLocation, Routes, Route } from "react-router-dom";
import logo from "../images/logo.svg";

function Header({ userEmail, onSignOut }) {
  const location = useLocation();

  return (
    <header className="header">
      <img src={logo} alt="Логотип." className="header__logo" />
      <nav className="header__navigation">
        {location.pathname === "/" ? (
          <p className="header__user-info">{userEmail}</p>
        ) : (
          ""
        )}
        <Routes>
          <Route
            path="/signin"
            element={
              <NavLink className={"header__navigation-link"} to="/signup">
                Регистрация
              </NavLink>
            }
          />
          <Route
            path="/signup"
            element={
              <NavLink className={"header__navigation-link"} to="/signin">
                Войти
              </NavLink>
            }
          />
          <Route
            path="/"
            element={
              <NavLink
                className={"header__navigation-link"}
                to="/signin"
                onClick={onSignOut}
              >
                Выйти
              </NavLink>
            }
          />
        </Routes>
      </nav>
    </header>
  );
}
export default Header;
