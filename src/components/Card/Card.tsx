import { Link } from "react-router-dom";
import { HomepageDev } from "../../types";
import './style.scss';

function Card(dev: HomepageDev) {
  return (
    <Link to={`/dev-profile/${dev.id}`} className="card__container">
        <div className="card__content" >
          <img className="card__image" src={`${dev.avatar}`} alt={`${dev.developer_firstname} ${dev.developer_lastname} avatar`} />
          <div className="card__stack"> 
            <p>{dev.developer_firstname} {dev.developer_lastname.substring(0,1)}.</p>
              <div key={dev.name} className="logo__stack">
                <img src={`${dev.logo}`} />
              </div>
          </div>
        </div>
    </Link>
  )
}

export default Card