import { Link } from "react-router-dom";
import { Dev, HomepageDev } from "../../types";
import './style.scss';

function Card(dev: HomepageDev) {
  return (
    <Link to={`/dev-profile/${dev.id}`} className="card__container">
        <div className="card__content" >
          <img className="card__image" src={`${dev.avatar}`} alt={`${dev.user_info} avatar`} />
          <div className="card__stack"> 
            <p>{dev.user_info} </p>
              <div key={dev.name} className="logo__stack">
                <img src={`${dev.logo}`} />
              </div>
          </div>
        </div>
    </Link>
  )
}

export default Card