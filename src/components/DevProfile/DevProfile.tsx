import type { DevInfos } from "../../types";
import { CircularProgress } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { authContext } from "../../contexts/authContext";
import ServicesModal from "./ServicesModal";
import PrestationCard from "./PrestationCard";
import StacksModal from "./StacksModal";
import Button from "../Button/Button";
import ConfirmModal from "../Modal/ConfirmModal";
import ClearIcon from "@mui/icons-material/Clear";
import defaultAvatar from "../../assets/img/avatar.svg";
import "./style.scss";

function DevProfile() {
  //HOOKS
  const { auth, logout } = useContext(authContext);

  //STATES
  const [dev, setDev] = useState<DevInfos>();
  const [isLoaded, setIsLoaded] = useState<Boolean>(false);
  const [services, setServices] = useState<Boolean>(false);
  const [isEditable, setIsEditable] = useState<Boolean>(false);
  const [displayButton, setDisplayButton] = useState<Boolean>(false);

  //MODAL STATES
  const [open, setOpen] = useState(false);
  const [stacksOpen, setStacksOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleStacksOpen = () => setStacksOpen(true);
  const handleStacksClose = () => setStacksOpen(false);
  const handleConfirmOpen = () => setConfirmOpen(true);
  const handleConfirmClose = () => setConfirmOpen(false);

  useEffect(() => {
    if (auth.access_token !== undefined) {
      fetch(`${import.meta.env.VITE_API_URL}/profile`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ` + auth.access_token,
        },
        mode: "cors",
      })
        .then((response) => response.json())
        .then((data) => {
          setDev(data);
          setIsLoaded(true);
          // setServices(false);
        })
        .catch((error) => console.error(error));
    }
  }, [isLoaded, services, auth]);

  const handleEditElement = () => {
    setIsEditable(!isEditable);
  };

  const handleChangeDescription = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    if (dev) {
      setDev({
        ...dev,
        description: e.target.value,
      });
    }
  };

  const submitDescription = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsEditable(!isEditable);

    await fetch(`${import.meta.env.VITE_API_URL}/profile/update`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ` + auth.access_token,
      },
      body: JSON.stringify({ ...dev }),
      mode: "cors",
    })
      .then((response) => response.json())
      .catch((err) => console.error(err));
  };

  const deleteUser = () => {
    fetch(`${import.meta.env.VITE_API_URL}/profile/delete`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ` + auth.access_token,
      },
      mode: "cors",
    })
      .then((_response) => {
        handleConfirmClose();
        logout();
      })
      .catch((err) => console.error(err));
  };

  const deleteStacks = (stackId: number) => {
    fetch(`${import.meta.env.VITE_API_URL}/profile/stacks/delete/${stackId}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ` + auth.access_token,
      },
      mode: "cors",
    })
      .then((_response) => {
        setServices(!services);
      })
      .catch((err) => console.error(err));
  };

  if (dev) {
    return (
      <>
        <ServicesModal
          open={open}
          onClose={handleClose}
          setServices={setServices}
          services={services}
        />
        <StacksModal
          open={stacksOpen}
          onClose={handleStacksClose}
          services={services}
          setServices={setServices}
          devStacks={dev.stacks}
        />
        <ConfirmModal
          open={confirmOpen}
          onClose={handleConfirmClose}
          title="Désactivation du compte"
          content="Êtes vous sûr de vouloir supprimer votre compte ?"
          confirmFunction={deleteUser}
        />
        <div className="profile__container">
          <div className="profile__left-part">
            <div className="detail__situation">
              <h3>En quelques mots : </h3>
              {auth.access_token && auth.user_info.user_id === dev.id ? (
                <div className="description__editable">
                  {!isEditable ? (
                    <div>
                      <p className="dev__description">{dev.description}</p>
                      {displayButton && (
                        <Button onClick={handleEditElement}> Modifier</Button>
                      )}
                    </div>
                  ) : (
                    <div className="edit__container">
                      <textarea
                        onChange={handleChangeDescription}
                        value={dev.description}
                      />
                      <Button onClick={submitDescription}> Enregistrer</Button>
                    </div>
                  )}
                </div>
              ) : (
                <p className="dev__description">{dev.description}</p>
              )}
              <ul>
                <li>
                  <span>Inscrit depuis le :</span> {dev.registered_at}
                </li>
                <li>
                  <span>Situation :</span> Disponible actuellement
                </li>
                <li>
                  <span>Missions réalisées :</span>{" "}
                  {dev.orders_count != null ? dev.orders_count : "Aucune"}{" "}
                </li>
                <li>
                  <span>Dernière mission :</span>{" "}
                  {dev.last_order_date != null ? dev.last_order_date : "Aucune"}
                </li>
              </ul>
            </div>
            <div className="stacks__section__container">
              <div className="header__stack">
                <p>Compétences maîtrisées :</p>
                {auth.access_token &&
                auth.user_info.user_id === dev.id &&
                displayButton ? (
                  <Button onClick={handleStacksOpen}>Ajouter</Button>
                ) : (
                  ""
                )}
              </div>
              <div className="dev__stacks">
                {dev.stacks &&
                  dev.stacks.map((stack) => {
                    return (
                      <div key={stack.id} className="stack__item">
                        <img src={stack.logo} alt={`Logo ${stack.name}`} />
                        {displayButton && (
                          <ClearIcon
                            color="error"
                            onClick={() => deleteStacks(stack.id)}
                          />
                        )}
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
          <div className="profile__right-part">
            <div className="dev__info">
              <div className="edit__button">
                <Button onClick={() => setDisplayButton(!displayButton)}>
                  {displayButton ? "Ok" : "Modifier mon profil"}
                </Button>
              </div>
              <div className="img__container">
                <img
                  src={dev.avatar ? dev.avatar : defaultAvatar}
                  alt={`${dev.firstname} ${dev.lastname} avatar`}
                />
              </div>
              <div className="dev__name-job">
                <h3>
                  {dev.firstname} {dev.lastname}
                </h3>
                <p>
                  Développeur depuis{" "}
                  {dev.years_of_experience ? dev.years_of_experience : "1"} ans
                </p>
              </div>
              <div className="dev__prestations-reviews">
                <h3>
                  {dev.prestations && dev.prestations.length > 1
                    ? "Services proposés "
                    : "Service proposé "}
                  :
                </h3>
                {displayButton && (
                  <Button onClick={handleOpen}>Ajouter une prestation</Button>
                )}
                <div className="dev__prestations-container">
                  {dev.prestations &&
                    dev.prestations.map((prestation) => (
                      <PrestationCard
                        key={prestation.id}
                        prestation={prestation}
                        services={services}
                        setServices={setServices}
                        displayButton={displayButton}
                        devProfileId={auth.user_info.user_id}
                      />
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        {displayButton && (
          <div className="delete__profile">
            <Button
              variant="text"
              size="small"
              onClick={() => {
                handleConfirmOpen();
              }}
            >
              Désactiver votre compte
            </Button>
          </div>
        )}
      </>
    );
  } else {
    return <CircularProgress className="loader" />;
  }
}

export default DevProfile;
