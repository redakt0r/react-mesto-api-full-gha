import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm ";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { api } from "../utils/Api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Login from "./Login";
import ProtectedRouteElement from "./ProtectedRouteElement";
import Register from "./Register";
import InfoTooltip from "./InfoTooltip";
import { auth } from "../utils/Auth";

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isTooltipPopupOpen, setTooltipPopupOpen] = useState(false);
  const [isRegistrationError, setRegistrationError] = useState(false);

  const [selectedCard, setSelectedCard] = useState(null);

  const [currentUser, setCurrentUser] = useState({
    name: "не загружено...",
    about: "не загружено...",
    avatar: "",
    email: "",
  });
  const [cards, setCards] = useState([]);

  const [loggedIn, setLoggedIn] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    auth
      .getUserInfo()
      .then((res) => {
        if (res.data) {
          setLoggedIn(true);
          setCurrentUser(res.data);
          navigate("/", { replace: true });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    loggedIn &&
      api.getInitialCards()
        .then((cardsData) => {
          setCards(cardsData.reverse());
        })
        .catch((err) => {
          console.log(err);
        });
  }, [loggedIn]);

  const handleEditProfileClick = () => {
    setEditProfilePopupOpen(true);
  };
  const handleAddPlaceClick = () => {
    setAddPlacePopupOpen(true);
  };
  const handleEditAvatarClick = () => {
    setEditAvatarPopupOpen(true);
  };

  const showRegistrationError = () => {
    setRegistrationError(true);
  };

  const hideRegistrationError = () => {
    setRegistrationError(false);
  };

  const handleTooltipPopupOpen = () => {
    setTooltipPopupOpen(true);
  };

  const closeAllPopups = () => {
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setSelectedCard(null);
    setTooltipPopupOpen(false);
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  const handleCardLike = (card) => {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    !isLiked
      ? api
          .putLike(card)
          .then((newCard) => {
            setCards((state) =>
              state.map((c) => (c._id === card._id ? newCard : c))
            );
          })
          .catch((err) => {
            console.log(err);
          })
      : api
          .deleteLike(card)
          .then((newCard) => {
            setCards((state) =>
              state.map((c) => (c._id === card._id ? newCard : c))
            );
          })
          .catch((err) => {
            console.log(err);
          });
  };

  const handleCardDelete = (card) => {
    api
      .deleteCard(card)
      .then(() => {
        setCards((cardsList) =>
          cardsList.filter((item) => item._id !== card._id)
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleUpdateUser = (data) => {
    api
      .patchProfileData(data)
      .then((res) => setCurrentUser({ ...currentUser, ...res }))
      .then(() => closeAllPopups())
      .catch((err) => {
        console.log(err);
      });
  };

  const handleUpdateAvatar = (data) => {
    api
      .patchAvatar(data)
      .then((res) => setCurrentUser({ ...currentUser, ...res }))
      .then(() => closeAllPopups())
      .catch((err) => {
        console.log(err);
      });
  };

  const handleAddNewPlace = (newCard) => {
    api
      .postNewCard(newCard)
      .then((newCard) => {
        setCards([newCard, ...cards]);
      })
      .then(() => closeAllPopups())
      .catch((err) => {
        console.log(err);
      });
  };

  const handleRegister = ({ email, password }) => {
    auth
      .signUp(email, password)
      .then((res) => {
        if (res) {
          hideRegistrationError();
          handleTooltipPopupOpen();
          navigate("/signin", { replace: true });
        }
      })
      .catch((err) => {
        showRegistrationError();
        handleTooltipPopupOpen();
        console.log(err);
      });
  };

  const handleLogin = ({ email, password }) => {
    auth
      .signIn(email, password)
      .then((res) => {
        if (res) {
          setLoggedIn(true);
          setCurrentUser(res.user);
          navigate("/", { replace: true });
        }
      })
      .catch((err) => {
        showRegistrationError();
        handleTooltipPopupOpen();
        console.log(err);
      });
  };

  const handleSignOut = () => {
    auth.signOut()
      .then((message) => console.log(message))
    setLoggedIn(false);
    setCurrentUser({
      name: "не загружено...",
      about: "не загружено...",
      avatar: "",
      email: "",
    });
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header userEmail={currentUser.email} onSignOut={handleSignOut} />
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRouteElement
                loggedIn={loggedIn}
                element={Main}
                onEditAvatar={handleEditAvatarClick}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                cards={cards}
                onCardDelete={handleCardDelete}
              />
            }
          />
          <Route path="/signin" element={<Login onLogin={handleLogin} />} />
          <Route
            path="/signup"
            element={<Register onRegister={handleRegister} />}
          />
        </Routes>
        {loggedIn ? <Footer /> : ""}

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddNewPlace={handleAddNewPlace}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <PopupWithForm
          title={"Вы уверены?"}
          name={"submit"}
          submitButtonText={"Да"}
          onClose={closeAllPopups}
        />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        <InfoTooltip
          name="tooltip"
          isOpen={isTooltipPopupOpen}
          isRegistrationError={isRegistrationError}
          onClose={closeAllPopups}
          sucess={false}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
