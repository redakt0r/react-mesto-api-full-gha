import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext);

  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some((i) => i._id === currentUser._id);
  const cardLikeButtonClassName = `button card__like-button ${
    isLiked && "card__like-button_active"
  }`;

  const handleCardClick = () => {
    onCardClick(card);
  };

  const handlelikeClick = () => {
    onCardLike(card);
  };

  const handleDeleteClick = () => {
    onCardDelete(card);
  };

  return (
    <li className="cards__item">
      <article className="card">
        <img
          src={card.link}
          alt={card.name}
          className="card__image"
          onClick={handleCardClick}
        />
        <div className="card__wrapper">
          <h2 className="card__title">{card.name}</h2>
          <div className="card__like-wrapper">
            <button
              className={cardLikeButtonClassName}
              type="button"
              aria-label="Лайк."
              onClick={handlelikeClick}
            />
            <p className="card__like-counter">{card.likes.length}</p>
          </div>
          {isOwn && (
            <button
              className="button card__remove-button"
              type="button"
              aria-label="Удалить картинку"
              onClick={handleDeleteClick}
            />
          )}
        </div>
      </article>
    </li>
  );
}

export default Card;
