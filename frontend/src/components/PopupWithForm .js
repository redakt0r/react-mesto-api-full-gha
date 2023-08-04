import Popup from "./Popup";

function PopupWithForm({
  title,
  name,
  submitButtonText,
  children,
  isOpen,
  onClose,
  onSubmit,
}) {
  return (
    <Popup isOpen={isOpen} name={name} onClose={onClose} type={"form"}>
      <h2 className="popup__title">{title}</h2>
      <form
        className={`popup__form popup__form_aim_${name}`}
        name={name}
        onSubmit={onSubmit}
      >
        {children}
        <button
          className={`button popup__save-button popup__save-button_aim_${name}`}
          type="submit"
          aria-label="Сохранить."
        >
          {submitButtonText}
        </button>
      </form>
    </Popup>
  );
}

export default PopupWithForm;
