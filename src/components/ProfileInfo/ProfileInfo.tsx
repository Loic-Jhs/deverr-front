import { Dev } from '../../types';
import { users } from '../../fakeData/data';
import './style.scss';

type DevProps = {
    devId: number
}

function ProfileInfo({devId}: DevProps) {
    let dev = users.find(user => devId == user.id);

    return (
        <div className='profile__container'>
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
                <p>{dev?.description}</p>
            </div>
        </div>
    );
}

export default ProfileInfo;