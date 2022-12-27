import React, {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { authContext } from "../../contexts/authContext";
import TextField from "@mui/material/TextField";
import ModalWindow from "../Modal/Modal";
import Button from "../Button/Button";
import { RealPrestation } from "../../types";

interface ModalType {
  open: boolean;
  onClose: () => void;
  services: Dispatch<SetStateAction<Boolean>>;
}

type T = {
  id: number;
  name: string;
};

function ServicesModal(props: ModalType) {
  //HOOKS
  const { auth } = useContext(authContext);

  //STATES
  const [selected, setSelected] = useState<number | undefined>(undefined);
  // TODO change for the good type
  const [serviceSelected, setServiceSelected] = useState<any>();
  const [description, setDescription] = useState<string | undefined>();
  const [price, setPrice] = useState<string | undefined>();
  const [data, setData] = useState<T[]>();

  useEffect(() => {
    fetch(`http://localhost/all-prestations/`, {
      method: "GET",
      headers: {
        "access-control-allow-origin": "*",
        "Content-type": "application/json",
      },
      mode: "cors",
    })
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      });
  }, []);

  const handleClick = (item: T) => {
    setSelected(item.id);
    setServiceSelected(item.id);
    // TODO make condition which allows to deselect an item
  };

  const validateAddingService = () => {
    fetch(`http://localhost/profile/prestations/store`, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + auth.access_token,
        "access-control-allow-origin": "*",
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        prestation_type_id: serviceSelected,
        description: description,
        price: Number(price),
      }),
      mode: "cors",
    })
      .then((_response) => {
        props.services(true);
        props.onClose();
      })
      .catch((error) => console.log(error));
  };

  return (
    <ModalWindow
      open={props.open}
      onClose={props.onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div>
        <h2>Choisissez une prestation</h2>
        <ul>
          {data &&
            data.map((item: T) => {
              return (
                <div key={item.name}>
                  <li
                    onClick={() => handleClick(item)}
                    key={item.id}
                    value={item.id}
                    className={selected === item.id ? "selected" : ""}
                  >
                    {item.name}
                  </li>
                  {selected === item.id && (
                    <div>
                      <TextField
                        id="standard-basic"
                        margin="dense"
                        label="Description"
                        variant="standard"
                        onChange={(
                          event: React.ChangeEvent<HTMLInputElement>
                        ) => setDescription(event.target.value)}
                      />
                      <TextField
                        id="standard-basic"
                        margin="dense"
                        label="Prix en €"
                        variant="standard"
                        type="number"
                        onChange={(
                          event: React.ChangeEvent<HTMLInputElement>
                        ) => setPrice(event.target.value)}
                      />
                    </div>
                  )}
                </div>
              );
            })}
        </ul>
        <Button
          onClick={() => {
            validateAddingService();
          }}
        >
          Valider
        </Button>
      </div>
    </ModalWindow>
  );
}

export default ServicesModal;
