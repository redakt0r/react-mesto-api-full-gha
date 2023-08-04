import { useContext } from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main({
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  onCardClick,
  onCardLike,
  cards,
  onCardDelete,
}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="main-content">
      <section className="profile">
        <button
          className="button profile__edit-button profile__edit-button_aim_avatar"
          onClick={onEditAvatar}
        >
          <img
            src={currentUser.avatar}
            alt="Аватар."
            className="profile__avatar"
          />
        </button>
        <div className="profile__info">
          <h1 className="profile__name">{currentUser.name}</h1>
          <button
            className="button profile__edit-button profile__edit-button_aim_info"
            type="button"
            aria-label="Редактировать."
            onClick={onEditProfile}
          />
          <p className="profile__occupation">{currentUser.about}</p>
        </div>
        <button
          className="button profile__card-button"
          type="button"
          aria-label="Добавить."
          onClick={onAddPlace}
        />
      </section>
      <section className="cards" aria-label="Фотогалерея.">
        <ul className="cards__list">
          {cards.map((card) => {
            return (
              <Card
                key={card._id}
                card={card}
                onCardClick={onCardClick}
                onCardLike={onCardLike}
                onCardDelete={onCardDelete}
              />
            );
          })}
        </ul>
      </section>
    </main>
  );
}
export default Main;
