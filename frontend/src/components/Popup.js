import { useEffect } from "react";

function Popup({ isOpen, name, onClose, children, type }) {
  useEffect(() => {
    if (!isOpen) return;
    const closeByEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", closeByEscape);
    return () => document.removeEventListener("keydown", closeByEscape);
  }, [isOpen, onClose]);

  const handleOverlay = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  return (
    <div
      className={`popup ${isOpen ? "popup_opened" : ""} popup_aim_${name}`}
      onClick={handleOverlay}
    >
      <div className={`popup__container popup__container_type_${type}`}>
        {children}
        <button
          className={`button popup__close-button popup__close-button_aim_${name}`}
          type="button"
          aria-label="Закрыть."
          onClick={onClose}
        />
      </div>
    </div>
  );
}

export default Popup;
