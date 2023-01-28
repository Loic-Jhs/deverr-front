import logoDeverrBlack from '../../assets/img/logo-black.svg'
import './footer.scss'

function Footer() {
  return (
    <div className="footer__container">
      <div className="footer__content">
        <div className="logo__container">
          <a className="logo__link" href="#">
          <img src={logoDeverrBlack} alt="Logo Deverr" />
          <span>DEVERR © 2022</span>
        </a>
        </div>
        
        <div className="menu__footer">
          <ul>
            <li>
              <a href="#">À propos</a>
            </li>
            <li>
              <a href="#">Conditions générales d'utilisations</a>
            </li>
            <li>
              <a href="#">Contact</a>
            </li>
            <li>
              <a href="#">Devenir prestataire</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Footer
