import { ReactNode, useContext } from "react";
import { Link } from "react-router-dom";
import { authContext } from "../../contexts/authContext";
import './modal.scss';

interface ModalType {
  children?: ReactNode;
  isOpen: boolean;
  toggle: () => void;
}



function Modal(props: ModalType) {
  const { auth } = useContext(authContext);
  return (
    <>
      {props.isOpen && (
        <div className="modal-overlay" onClick={props.toggle}>
          <div onClick={(e) => e.stopPropagation()} className="modal-box">
            {
              auth.access_token != undefined ?
                props.children :
                <div className="not__authenticated">
                  <h1>Pour pouvoir demander une prestation, veuillez vous inscrire ou vous connecter</h1>
                  <div className="button__container">
                    <Link className="register__link" to="/register">S'inscrire</Link>
                    <Link className="login__link" to="/login">Se connecter</Link>
                  </div>
                </div>
            }
          </div>
        </div>
      )}
    </>
  );
}

export default Modal
