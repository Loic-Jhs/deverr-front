import CardList from "../CardList/CardList"
import developpement from '../../assets/img/94056-development.gif';
import { Link } from 'react-router-dom';
import './style.scss';

function Homepage() {

  return (
    <div className="homepage__container">
      <h2>
        <span>DEVERR</span> est une plateforme qui a pour but de vous permettre de trouver le <span>développeur idéal</span> pour la réalisation de votre <span>projet</span>.
      </h2>
      <div className="homepage__button">
        <div className="button__container">
          <button>
            <Link to="/register">
              Inscription
            </Link>
          </button>
        </div>
      </div>
      <div className="homepage__content">
        <CardList />
        <div className="image__container">
          <img src={developpement}  alt="developer-skills" />
        </div>
      </div>
    </div>
  )
}

export default Homepage
