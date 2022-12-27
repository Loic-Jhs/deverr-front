import React, {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import ModalWindow from "../Modal/Modal";
import type { RealStack } from "../../types/index";
import Button from "../Button/Button";
import TextField from "@mui/material/TextField";
import { authContext } from "../../contexts/authContext";

type ModalType = {
  open: boolean;
  onClose: () => void;
  devStacks: RealStack[];
  services: Boolean;
  setServices: Dispatch<SetStateAction<Boolean>>;
}

function StacksModal(props: ModalType) {
  //HOOKS
  const { auth } = useContext(authContext);

  //STATES
  const [stacks, setStacks] = useState<RealStack[]>([]);
  const [selected, setSelected] = useState<number | undefined>(undefined);
  const [stackSelected, setStackSelected] = useState<RealStack | undefined>(
    undefined
  );
  const [yearsExp, setYearsExp] = useState<string>("1");

  useEffect(() => {
    fetch(`http://localhost/all-stacks`, {
      method: "GET",
      headers: {
        "access-control-allow-origin": "*",
        "Content-type": "application/json",
      },
      mode: "cors",
    })
      .then((response) => response.json())
      .then((data: RealStack[]) => {
        // On filtre les stacks par rapport à leur id
        const filteredStacks = data.filter(
          (stack) =>
            // Compare les stack.id des deux tableaux,
            // pour ne renvoyer que ceux qui ne sont pas déjà présent.
            !props.devStacks.some((devStack) => devStack.id === stack.id)
        );
        setStacks(filteredStacks);
      });
  }, []);

  const handleClick = (item: RealStack) => {
    setStackSelected(item);
  };

  const validateAddingStack = () => {
    fetch("http://localhost/profile/stacks/store", {
      method: "POST",
      headers: {
        "access-control-allow-origin": "*",
        "Content-type": "application/json",
        Authorization: `Bearer ` + auth.access_token,
      },
      mode: "cors",
      body: JSON.stringify({
        stack_id: stackSelected?.id,
        stack_experience: yearsExp,
        is_primary: 0,
      }),
    })
      .then((_response) => {
        props.onClose();
        props.setServices(!props.services);
      })
      .catch((err) => console.log(err));
  };

  return (
    <ModalWindow
      open={props.open}
      onClose={props.onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div>
        <h2>Ajoutez une nouvelle compétence</h2>
        <ul>
          {stacks &&
            stacks.map((stack: RealStack) => {
              return (
                <div key={stack.id} className="new_stack_container">
                  <li
                    onClick={() => handleClick(stack)}
                    value={stack.id}
                    className={stackSelected?.id === stack.id ? "selected" : ""}
                  >
                    {stack.name}
                  </li>
                  {stackSelected?.id === stack.id && (
                    <div>
                      <TextField
                        id="standard-basic"
                        margin="dense"
                        label="Années d'expérience"
                        variant="standard"
                        type="number"
                        inputProps={{ step: 1, min: 1, max: 10 }}
                        //we make this condition to be sure
                        //that the user enters only integers between 1 and 10
                        onKeyDown={(event) => {
                          if (
                            event.key != "ArrowUp" &&
                            event.key != "ArrowDown"
                          ) {
                            event.preventDefault();
                          }
                        }}
                        onChange={(
                          event: React.ChangeEvent<HTMLInputElement>
                        ) => setYearsExp(event.target.value)}
                      />
                    </div>
                  )}
                </div>
              );
            })}
        </ul>
        <Button
          onClick={() => {
            validateAddingStack();
          }}
        >
          Valider
        </Button>
      </div>
    </ModalWindow>
  );
}

export default StacksModal;
