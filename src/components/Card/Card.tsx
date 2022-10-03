import { User } from "../../types";
import './style.scss';

function Card(user: User) {
  return (
    <div className="card__container">
        <div className="card__content">
          <img className="card__image" src={`${user.avatar}`} alt={`${user.name} avatar`} />
          <div className="card__stack"> 
            <p>{user.name}</p>
            {user.stack.filter(stack => stack.isPreference == true).map((stack) => {
              return (
              <div className="logo__stack">
                <img src={`${stack.logo}`} />
              </div>
              )
            })}
          </div>
        </div>
    </div>
  )
}
  
export default Card