import CardList from "../CardList/CardList"
import developpement from '../../assets/img/deverr-team.png';
import { Link } from 'react-router-dom';
import './style.scss';

function Homepage() {

  return (
    <div className="homepage__container">
      <div className="goal-image__container">
        <div className="goal__container">
          <h2>
            Un projet ? Une idée ?<br/><span>Deverr </span>
            vous accompagne !
          </h2>
          <p>
            <span>DEVERR</span> est la plateforme qui met à votre disposition des <span>développeurs</span> qui donneront vie à <span>vos projets</span>.
          </p>
          <div className="homepage__button">
            <div className="button__container">
              <Link to="/register">
                Inscription
              </Link>
            </div>
          </div>
        </div>
        <div className="image__container">
          <img src={developpement}  alt="developer-skills" />
        </div>
      </div>
      <div className="developpers__container">
        <CardList />
      </div>
    </div>
  )
}

export default Homepage
