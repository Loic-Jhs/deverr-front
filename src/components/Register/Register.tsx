import { Link } from 'react-router-dom';
import dev from '../../assets/img/register-img.png';
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
              <button>Je suis un développeur !</button>
            </Link>
            <Link to="/registerclient">
              <button>Je suis un client !</button>
            </Link>
          </div>
        </div>
        <div className="image__container">
          <img src={dev} alt="developer-skills" />
        </div>
      </div>
    </div>
  )
}

export default Register