import React, {
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";
import {DevInfos, RealPrestation} from "../../types";
import { authContext } from "../../contexts/authContext";
import ModalWindow from "../Modal/Modal";
import Button from "../Button/Button";
import TextareaAutosize from "@mui/material/TextareaAutosize";

type  ModalType = {
  open: boolean;
  onClose: () => void;
  orders: Dispatch<SetStateAction<Boolean>>;
  developerId: string | undefined;
  devData: DevInfos;
}

type T = {
  id: number;
};

function OrderModal(props: ModalType) {
  //HOOKS
  const { auth } = useContext(authContext);

  //STATES
  const [selected, setSelected] = useState<number | undefined>(undefined);
  const [orderSelected, setOrderSelected] = useState<number | undefined>();
  const [instruction, setInstruction] = useState<string | undefined>();

  const handleClick = (item: T) => {
    setSelected(item.id);
    setOrderSelected(item.id);
  };

  const validateAskService = () => {
    fetch(`${import.meta.env.VITE_API_URL}/order/store`, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + auth.access_token,
        "Content-type": "application/json",

      },
      body: JSON.stringify({
        developer_id: props.developerId,
        developer_prestation_id: selected,
        instructions: instruction,
      }),
      mode: "cors",
    })
      .then((_response) => {
        props.orders(true);
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
          {props.devData &&
            props.devData.prestations.map((item: RealPrestation) => {
              return (
                <div key={item.id}>
                  <li
                    onClick={() => handleClick(item)}
                    value={item.id}
                    className={selected === item.id ? "selected" : ""}
                  >
                    {item.prestation_type_name}
                  </li>
                  {selected === item.id && (
                    <div>
                      <TextareaAutosize
                        style={{ height: 80 }}
                        placeholder="Décrivez votre demande"
                        onChange={(
                          event: React.ChangeEvent<HTMLTextAreaElement>
                        ) => setInstruction(event.target.value)}
                      />
                    </div>
                  )}
                </div>
              );
            })}
        </ul>
        <Button
          onClick={() => {
            validateAskService();
          }}
        >
          Valider
        </Button>
      </div>
    </ModalWindow>
  );
}

export default OrderModal;
