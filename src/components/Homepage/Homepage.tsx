import Button from "../Button/Button";
import { Link } from 'react-router-dom';
import CardList from "../CardList/CardList"
import developerSkills from "../../assets/lotties/developerSkills.json"
import LottieIllustration from '../LottieIllustration/LottieIllustration';

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
              <Link to="/register">
                <Button variant="contained">
                    Inscription
                </Button>
              </Link>
          </div>
        </div>
        <div className="image__container">
          <LottieIllustration animationData={developerSkills} />
        </div>
      </div>
      <div className="developpers__container">
        <CardList />
      </div>
    </div>
  )
}

export default Homepage
