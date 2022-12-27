import React, {
  useContext,
  useEffect,
  useState,
} from "react";
import ModalWindow from "../Modal/Modal";
import type { RealStack } from "../../types/index";

interface ModalType {
  open: boolean;
  onClose: () => void;
}

function StacksModal(props: ModalType) {
  //STATES
  const [stacks, setStacks] = useState<RealStack[]>([]);
  const [selected, setSelected] = useState<number | undefined>(undefined);

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
      .then((data) => {
        // console.log(data);
        setStacks(data);
      });
  }, []);

  const handleClick = () => {
    fetch('http://localhost/profile/stacks/store', {
      //TODO: Pour faire l'ajout de techno
      /*
       il faut pouvoir ajouter le nb d'années d'exp en rapport avec celle ci
       et pourvoir cocher si c'est la techno primaire ou non (bool)
       une fois ceci possible, on devrait pouvoir envoyer ça au backl
      */
    }).then().catch();
  };

  return (
    <ModalWindow
      open={props.open}
      onClose={props.onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <>
        <h2>Ajoutez une nouvelle compétence</h2>
        <ul>
          {stacks &&
            stacks.map((stack: RealStack) => {
              return (
                <li
                  onClick={() => handleClick()}
                  key={stack.id}
                  value={stack.id}
                  className={selected === stack.id ? "selected" : ""}
                >
                  {stack.name}
                </li>
              )
            })
          }
        </ul>
      </>
    </ModalWindow>
  );
}

export default StacksModal
