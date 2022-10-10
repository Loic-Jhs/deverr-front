import { Link } from "react-router-dom";
import { Dev } from "../../types";
import './style.scss';

function Card(dev: Dev) {
  return (
    <Link to={`/dev-profile/${dev.id}`} className="card__container">
        <div className="card__content" >
          <img className="card__image" src={`${dev.avatar}`} alt={`${dev.firstname} avatar`} />
          <div className="card__stack"> 
            <p>{dev.firstname} {dev.lastname}</p>
            {dev.stacks.filter(stack => stack.isPreference == true).map((stack) => {
              return (
              <div key={stack.id} className="logo__stack">
                <img src={`${stack.logo}`} />
              </div>
              )
            })}
          </div>
        </div>
    </Link>
  )
}
  
export default Card