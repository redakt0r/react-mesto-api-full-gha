import checkIcon from "../images/check-icon.svg";
import errorIcon from "../images/error-icon.svg";
import Popup from "./Popup";

function InfoTooltip({ name, isOpen, onClose, isRegistrationError }) {
  return (
    <Popup
      isOpen={isOpen}
      name={name}
      onClose={onClose}
      isRegistrationError={isRegistrationError}
      type={"form"}
    >
      <img
        src={isRegistrationError ? errorIcon : checkIcon}
        alt="иконка подсказки"
        className="popup__icon"
      />
      <h2 className="popup__title">
        {isRegistrationError
          ? "Что-то пошло не так!Попробуйте ещё раз."
          : "Вы успешно зарегистрировались!"}
      </h2>
    </Popup>
  );
}

export default InfoTooltip;
