import Popup from "./Popup";

function ImagePopup({ card, onClose }) {
  return (
    <Popup
      isOpen={card}
      onClose={onClose}
      type={"image"}
      card={card}
      name={"image"}
    >
      <img
        src={card ? card.link : ""}
        alt={card ? card.name : ""}
        className="popup__picture"
      />
      <h2 className="popup__caption">{card ? card.name : ""}</h2>
    </Popup>
  );
}

export default ImagePopup;
