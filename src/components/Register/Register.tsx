import Button from "../Button/Button";
import { Link, useNavigate } from 'react-router-dom';
import peopleComputer from "../../assets/lotties/peopleComputer.json"
import LottieIllustration from '../LottieIllustration/LottieIllustration';

import "./register.scss";
import { useContext, useEffect } from "react";
import { authContext } from "../../contexts/authContext";

function Register() {

  const { auth } = useContext(authContext)

  const navigate = useNavigate();
  useEffect(() => {
    if (auth.access_token) {
      navigate('/my-profile');
    }
  }, [auth, navigate]);

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
          <LottieIllustration animationData={peopleComputer} illustration={peopleComputer} />
        </div>
      </div>
    </div>
  )
}

export default Register