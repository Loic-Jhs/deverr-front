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

type  ModalType = {
  open: boolean;
  onClose: () => void;
  setServices: Dispatch<SetStateAction<Boolean>>;
  services: Boolean;
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
  const [serviceSelected, setServiceSelected] = useState<number| undefined>();
  const [description, setDescription] = useState<string | undefined>();
  const [price, setPrice] = useState<string | undefined>();
  const [data, setData] = useState<T[]>();

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/all-prestations`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      });
  }, []);

  const handleClick = (item: T) => {
    setSelected(item.id);
    setServiceSelected(item.id);
  };

  const validateAddingService = () => {
    fetch(`${import.meta.env.VITE_API_URL}/profile/prestations/store`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + auth.access_token,
      },
      body: JSON.stringify({
        prestation_type_id: serviceSelected,
        description: description,
        price: Number(price),
      }),
    })
      .then((_response) => {
        props.setServices(!props.services);
        setDescription("");
        setPrice("");
        props.onClose();
      })
      .catch((error) => console.error(error));
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
                <div key={item.id}>
                  <li
                    onClick={() => handleClick(item)}
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
