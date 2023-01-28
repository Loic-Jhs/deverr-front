import React, {
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { authContext } from "../../contexts/authContext";
import { Input, TextareaAutosize } from "@mui/material";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import CancelIcon from "@mui/icons-material/Cancel";
import EditIcon from "@mui/icons-material/Edit";
import type { RealPrestation } from "../../types";

type PROPS = {
  prestation: RealPrestation;
  services: Boolean;
  setServices: Dispatch<SetStateAction<Boolean>>;
  devProfileId?: Number;
  displayButton: Boolean;
};

function PrestationCard(props: PROPS) {
  //HOOKS
  const { auth } = useContext(authContext);

  //STATES
  const [price, setPrice] = useState<number>(props.prestation.price);
  const [editService, setEditService] = useState<Boolean>(false);
  const [description, setDescription] = useState<string | undefined>(
    props.prestation.description
  );
  const [name, setName] = useState<string | undefined>(
    props.prestation.prestation_type_name
  );

  const updateService = (id: number, description?: string, price?: number) => {
    console.log(props.services);
    
    fetch(`${import.meta.env.VITE_API_URL}/profile/prestations/edit/${id}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + auth.access_token,
      },
      body: JSON.stringify({
        prestation_type_id: props.prestation.prestation_type_id,
        description: description,
        price: price,
      }),
      mode: "cors",
    })
      .then((_response) => {
        props.setServices(!props.services);
        setEditService(false);
      })
      .catch((error) => console.error(error));
  };

  const deleteService = (id: number) => {
    fetch(`${import.meta.env.VITE_API_URL}/profile/prestations/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + auth.access_token,
      },
      mode: "cors",
    })
      .then((_response) => props.setServices(!props.services))
      .catch((error) => console.error(error));
  };

  return (
    <div className="dev__prestation-item">
      <div className="edit">
        <h4>{props.prestation.prestation_type_name}</h4>
        {
          /*
          Si le user connecté correspond à un développeur 
          on affiche les boutons
          */
         auth.access_token &&
          auth.user_info.user_id === props.devProfileId && (
            <div className="svg">
              {!editService && props.displayButton && (
                <>
                  <EditIcon
                    color="primary"
                    onClick={() => {
                      setEditService(true);
                    }}
                  />
                  <DeleteForeverIcon
                    color="error"
                    onClick={() => deleteService(props.prestation.id)}
                  />
                </>
              )}
              {editService && (
                <>
                  <TaskAltIcon
                    color="primary"
                    onClick={() =>
                      updateService(props.prestation.id, description, price)
                    }
                  />
                  <CancelIcon
                    color="error"
                    onClick={() => setEditService(false)}
                  />
                </>
              )}
            </div>
          )
        }
      </div>
      {!editService && (
        <>
          <p className="p__detail">Details :</p>
          <p className="prestation__description">
            {props.prestation.description}
          </p>
          <p className="dev__prestation-price">
            <span>Tarif :</span> {props.prestation.price} €
          </p>
        </>
      )}
      {editService && (
        <div className="editable__input">
          <TextareaAutosize
            maxRows={4}
            aria-label="maximum height"
            placeholder="Maximum 4 rows"
            defaultValue={description}
            style={{ width: 200 }}
            onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) =>
              setDescription(event.target.value)
            }
          />
          <Input
            type="number"
            defaultValue={price}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setPrice(Number(event.target.value))
            }
          />
        </div>
      )}
    </div>
  );
}

export default PrestationCard;
