import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import ModalWindow from "../Modal/Modal";
import type { DevStack } from "../../types";
import Button from "../Button/Button";
import { authContext } from "../../contexts/authContext";
import StacksCard from "./StacksCard";

type ModalType = {
  open: boolean;
  onClose: () => void;
  devStacks: DevStack[];
  services: Boolean;
  setServices: Dispatch<SetStateAction<Boolean>>;
};

function StacksModal(props: ModalType) {
  //HOOKS
  const { auth } = useContext(authContext);

  //STATES
  const [stacks, setStacks] = useState<DevStack[]>([]);
  const [stackSelected, setStackSelected] = useState<DevStack | undefined>(
    undefined
  );
  const [yearsExp, setYearsExp] = useState<string>("1");

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/all-stacks`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data: DevStack[]) => {
        if (props.devStacks) {
          // On filtre les stacks par rapport à leur id
          const filteredStacks = data.filter(
            (stack) =>
              // Compare-les stack.id des deux tableaux,
              // pour ne renvoyer que ceux qui ne sont pas déjà présents.
              !props.devStacks.some((devStack) => devStack.id === stack.id)
          );
          setStacks(filteredStacks);
          // On vérifie si une techno à is_primary à 1
          // On le passe dans le setter pour le fournir en props à StacksCard
        } else {
          setStacks(data);
        }
      });
  }, [props.open]);

  const validateAddingStack = () => {
    console.log(
      "token :", auth.access_token,
      {
        stack_id: stackSelected?.id,
        stack_experience: yearsExp,
        is_primary: stackSelected?.is_primary ?? 0,
      }
    );
    
    fetch(`${import.meta.env.VITE_API_URL}/profile/stacks/store`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ` + auth.access_token,
        "Content-type": "application/json",
      },

      body: JSON.stringify({
        stack_id: stackSelected?.id,
        stack_experience: yearsExp,
        is_primary: stackSelected?.is_primary ?? 0,
      }),
    })
      .then((_response) => {
        props.setServices(!props.services);
        props.onClose();
      })
      .catch((err) => console.error(err));
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
            stacks.map((stack: DevStack) => {
              return (
                <StacksCard
                  key={stack.id}
                  stack={stack}
                  stackSelected={stackSelected}
                  setStackSelected={setStackSelected}
                  setYearsExp={setYearsExp}
                />
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
