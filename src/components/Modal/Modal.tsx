import { ReactNode } from "react";
import Order from "../Order/Order";
import './modal.scss';

interface ModalType {
  children?: ReactNode;
  isOpen: boolean;
  toggle: () => void;
}


function Modal(props: ModalType) {
  console.log(props.children)
  return (
    <>
      {props.isOpen && (
        <div className="modal-overlay" onClick={props.toggle}>
          <div onClick={(e) => e.stopPropagation()} className="modal-box">
            {props.children}
          </div>
        </div>
      )}
    </>
  );
}

export default Modal
