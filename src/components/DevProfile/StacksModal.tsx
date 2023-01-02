import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import ModalWindow from "../Modal/Modal";
import type { DevStack } from "../../types/index";
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
  const [selected, setSelected] = useState<number | undefined>(undefined);
  const [stackSelected, setStackSelected] = useState<DevStack | undefined>(
    undefined
  );
  const [yearsExp, setYearsExp] = useState<string>("1");
  const [primaryStackExist, setPrimaryStackExist] = useState<boolean>(false);

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
      .then((data: DevStack[]) => {
        // On filtre les stacks par rapport à leur id
        const filteredStacks = data.filter(
          (stack) =>
            // Compare les stack.id des deux tableaux,
            // pour ne renvoyer que ceux qui ne sont pas déjà présent.
            !props.devStacks.some((devStack) => devStack.id === stack.id)
        );
        setStacks(filteredStacks);
        // On verifie si une techno à is_primary à 1
        // On le passe dans le seter pour le fournir en props à StacksCard
        setPrimaryStackExist(
          props.devStacks.some((devStack) => devStack.is_primary === 1)
        );
      });
  }, [props.open]);

  const handleClick = (item: DevStack) => {
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
        is_primary: stackSelected?.is_primary,
      }),
    })
      .then((_response) => {
        props.setServices(!props.services);
        props.onClose();
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    console.log(stackSelected);
  }, [stackSelected]);

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
                  primaryStackExist={primaryStackExist}
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
