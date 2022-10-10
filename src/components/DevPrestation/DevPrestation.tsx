import { DevProps } from '../../types';
import { users } from '../../fakeData/data';
import './style.scss';

function DevPrestation({devId}: DevProps) {
    let dev = users.find(user => devId == user.id);
    let prestations = dev?.prestations;
    return (
        <div className='dev-prestation__container'>
            <h3>Prestations proposées:</h3>
            <div className="dev-prestation__list">
                {prestations?.map((prestation) => {
                    return (
                        <div key={prestation.id} className='prestation__container'>
                            <div className='prestation-img__container'>
                                <img src="https://www.commpagnie.fr/wp-content/uploads/2019/09/seo-press-landing-page-1024x498.jpg" />
                            </div>
                            <div className='prestation-detail__container'>
                                <p><span>Prestation:</span> {prestation.name}</p>
                                <p><span>Description:</span> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reprehenderit, maxime commodi veritatis nulla repudiandae ab! Eaque error possimus atque provident ipsa repudiandae autem optio explicabo. Possimus magnam adipisci et hic?</p>
                                <p><span>Price:</span> {prestation.price}€</p>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    );
}

export default DevPrestation;