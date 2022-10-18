import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import { users } from '../../fakeData/data';
import './style.scss';

function DevList() {
    const { user } = useContext(AuthContext);

    return (
        <div className='dev-list__container'>
            {users.map((user) => {
                const { id, firstname, lastname, avatar, rates, description, prestations, stacks, createdAt } = user;
                let average: Number | String = 0;
                if (rates.length > 0) {
                    average = rates.reduce((a, b) => a + b.rate, 0) / rates.length
                } else {
                    average = "Pas de note";
                }

                return (
                    <Link key={id} to={`/dev-profile/${id}`} className='dev-list__link'>
                        <div className="dev__item">
                            <div className='dev__item-img'>
                                <img src={`${avatar}`} alt={`${firstname} avatar`} />
                            </div>
                            <div className="dev__item-infos">
                                <div className="dev__item-account-detail">
                                    <h3>{firstname} {lastname}</h3>
                                    <p>Inscrit depuis le {createdAt}</p>
                                    <p>{`${description.substring(0, 90)}...`} </p>
                                </div>
                                <div className="dev__item-stacks-detail">
                                    {stacks.map((stack) => {
                                        return (
                                            <div key={stack.label} className="dev__item-stack-logo">
                                                <img src={`${stack.logo}`} alt={`${stack.label} logo`} />
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                            <div className='dev__item-prestation'>
                                {prestations.map((prestation) => {
                                    return (
                                        <div key={prestation.id} className='prestation__container'>
                                            <p>{prestation.name}</p>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </Link>
                )
            })}
        </div>
    );
}

export default DevList;