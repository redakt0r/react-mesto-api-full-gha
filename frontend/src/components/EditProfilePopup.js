import { useContext, useEffect } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm ";
import useForm from "../hooks/useForm";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const { values, handleChange, setValues } = useForm({ name: "", about: "" });

  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    setValues({ name: currentUser.name, about: currentUser.about });
  }, [currentUser, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateUser({
      name: values.name,
      about: values.about,
    });
  };

  return (
    <PopupWithForm
      title={"Редактировать профиль"}
      name={"profile"}
      submitButtonText={"Сохранить"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        className={`popup__input popup__input_name_name`}
        name={"name"}
        placeholder={"Твое имя"}
        type={"text"}
        required
        value={values.name}
        onChange={handleChange}
      />
      <span className={`popup__input-error popup__input-error_type_name`} />
      <input
        className={`popup__input popup__input_name_about`}
        name={"about"}
        placeholder={"Какова твоя профессия"}
        type={"text"}
        required
        value={values.about}
        onChange={handleChange}
      />
      <span className={`popup__input-error popup__input-error_type_about`} />
    </PopupWithForm>
  );
}

export default EditProfilePopup;
