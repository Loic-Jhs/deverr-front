import { Box, Typography } from '@mui/material';
import { useContext, useEffect, useState } from "react";
import { authContext } from "../../contexts/authContext";
import { Prestation, Stack } from '../../types';
import ModalWindow from '../Modal/Modal';

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
  
  return (
    <ModalWindow
      open={props.open}
      onClose={props.onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      // className="modal-container"
    >
      <div>
        <h2>Choisissez une prestation</h2>
        <ul>
          {
            data && data.map((item: T) => <li key={item.id} value={item.name}>{item.name}</li>)
          }
        </ul>
        <button>Valider</button>
      </div>
    </ModalWindow>
  );
}

export default ServicesModal
