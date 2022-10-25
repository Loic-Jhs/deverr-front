import { Dev, DevProps } from '../../types';
import { users } from '../../fakeData/data';
import './style.scss';
import { useState } from 'react';

function ProfileInfo({devID}: DevProps) {
    let dev = users.find(user => devID == user.id);
    const [showMore, setShowMore] = useState(false);

    return (
        <div className='dev__profile__container'>
            <div className='avatar__container'>
                <img src={`${dev?.avatar}`} alt={`${dev?.firstname} avatar`} />
                <div className='avatar__rate-activity'>
                    <div>
                        <p className='dev__rate'>4,3/5</p>
                        <p className='dev__last-activity'>12-09-2022</p>
                    </div>
                </div>
            </div>
            <div className='description__container'>
                <h2>{dev?.firstname} {dev?.lastname}</h2>
                <h3>En quelques mots:</h3>
                <p>{showMore ? dev?.description : `${dev?.description.substring(0, 250)}...`} 
                    <a onClick={() => setShowMore(!showMore)}>{showMore ? "Voir moins" : "Voir plus"}
                    </a>
                </p>
            </div>
        </div>
    );
}

export default ProfileInfo;