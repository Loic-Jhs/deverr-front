import { authContext } from "../../contexts/authContext";
import { MouseEventHandler, useContext, useEffect, useState } from "react";
import ModalWindow from '../Modal/Modal';
import Button from "../Button/Button";

interface ModalType {
  open: boolean;
  onClose: () => void;
}

type T = {
  id: number,
  name: string
}

function ServicesModal(props: ModalType) {
  const { auth } = useContext(authContext);
  const [data, setData] = useState<T>();
  const [selected, setSelected] = useState<number | undefined>(undefined)

  useEffect(() => {
    fetch(`http://localhost/all-prestations/`, {
      method: "GET",
      headers: {
        "access-control-allow-origin": "*",
        "Content-type": "application/json",
      },
      mode: 'cors'
    })
      .then(response => response.json())
      .then(data => { setData(data) })
  }, [])

  const handleClick = (item: T) => {
    console.log(item);
    setSelected(item.id)
  }
  
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
          {
            data && data.map((item: T) => {
              return (
                <li 
                  onClick={() => handleClick(item)}
                  key={item.id}
                  value={item.id}
                  className={selected === item.id ? 'selected' : ''}
                >
                  {item.name}
                </li>
              )
            })
          }
        </ul>
        <Button>Valider</Button>
      </div>
    </ModalWindow>
  );
}

export default ServicesModal
