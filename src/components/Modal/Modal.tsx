import { ReactNode, useEffect, useState } from "react";
import Order from "../Order/Order";
import './modal.scss';

interface ModalType {
  children?: ReactNode;
  isOpen: boolean;
  toggle: () => void;
}

function Modal(props: ModalType) {
  return (
    <>
      {props.isOpen && (
        <div className="modal-overlay" onClick={props.toggle}>
          <div onClick={(e) => e.stopPropagation()} className="modal-box">
            {props.children}
            <Order />
          </div>
        </div>
      )}
    </>
  );
}

export default Modal
