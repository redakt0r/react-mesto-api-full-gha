import { useEffect } from "react";
import PopupWithForm from "./PopupWithForm ";
import useForm from "../hooks/useForm";

function AddPlacePopup({ isOpen, onClose, onAddNewPlace }) {
  const { values, handleChange, setValues } = useForm({ name: "", link: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddNewPlace(values);
  };

  useEffect(() => {
    setValues({ name: "", link: "" });
  }, [isOpen]);

  return (
    <PopupWithForm
      title={"Новое место"}
      name={"place"}
      submitButtonText={"Создать"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        className={`popup__input popup__input_name_place`}
        name={"name"}
        placeholder={"Название"}
        type={"text"}
        required
        value={values.name}
        onChange={handleChange}
      />
      <span className={`popup__input-error popup__input-error_type_place`} />
      <input
        className={`popup__input popup__input_name_link`}
        name={"link"}
        placeholder={"Ссылка на картинку"}
        type={"url"}
        required
        value={values.link}
        onChange={handleChange}
      />
      <span className={`popup__input-error popup__input-error_type_link`} />
    </PopupWithForm>
  );
}

export default AddPlacePopup;
