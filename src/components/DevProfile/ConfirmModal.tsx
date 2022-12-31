import Button from "../Button/Button";
import ModalWindow from "../Modal/Modal";

type ModalType = {
  open: boolean;
  onClose: () => void;
  title: string;
  content: string;
  confirmFunction: () => void;
};

function ConfirmModal(props: ModalType) {
  return (
    <ModalWindow
      open={props.open}
      onClose={props.onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div>
        <h2>{props.title}</h2>
        <p>{props.content}</p>
        <Button
          onClick={() => {
            props.confirmFunction();
          }}
        >
          Confirmer
        </Button>
        <Button
          onClick={() => {
            props.onClose();
          }}
        >
          Annuler
        </Button>
      </div>
    </ModalWindow>
  );
}

export default ConfirmModal;
