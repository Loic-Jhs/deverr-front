import Button from "../Button/Button";
import { Link } from 'react-router-dom';
import peopleComputer from "../../assets/lotties/peopleComputer.json"
import LottieIllustration from '../LottieIllustration/LottieIllustration';

import "./register.scss";

function Register() {
  return (
    <div className="register__container">
      <p className="register__info"><span>DEVERR</span> est une plateforme pour mettre en relation des <span>développeurs</span> avec de <span>nouveaux clients</span>.</p>
      <div className="situation__container">
        <div className="situation__role">
          <p className="situation__info">Quelle est votre situation ?</p>
          <div className="buttons">
            <Link to="/registerdev" >
              <Button variant="contained">
                Je suis un développeur !
              </Button>
            </Link>
            <Link to="/registerclient">
              <Button variant="contained">
                Je suis un client !
              </Button>
            </Link>
          </div>
        </div>
        <div className="image__container">
          <LottieIllustration animationData={peopleComputer} />
        </div>
      </div>
    </div>
  )
}

export default Register