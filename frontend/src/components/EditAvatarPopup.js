import { useEffect } from "react";
import PopupWithForm from "./PopupWithForm ";
import useForm from "../hooks/useForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const { values, handleChange, setValues } = useForm({ avatar: "" });

  useEffect(() => {
    setValues({ avatar: "" });
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateAvatar(values);
  };

  return (
    <PopupWithForm
      title={"Обновить аватар"}
      name={"avatar"}
      submitButtonText={"Сохранить"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        className={`popup__input popup__input_name_avatar`}
        name={"avatar"}
        placeholder={"Ссылка на картинку"}
        type={"url"}
        required
        onChange={handleChange}
        value={values.avatar}
      />
      <span className={`popup__input-error popup__input-error_type_avatar`} />
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
