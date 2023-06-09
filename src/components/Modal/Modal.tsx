import { Modal} from '@mui/material';
import './modal.scss';

interface ModalType {
  open: boolean;
  onClose: () => void;
  children: JSX.Element;
}

function ModalWindow(props: ModalType) {
  const { children } = props;

  return (
    <Modal
      open={props.open}
      onClose={props.onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      className="modal-container"
    >
      <div className="modal-content">
        {children}
      </div>
    </Modal>
  );
}

export default ModalWindow
