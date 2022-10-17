import { useParams } from 'react-router-dom';
import DevPrestation from '../DevPrestation/DevPrestation';
import ProfileInfo from '../ProfileInfo/ProfileInfo';
import StackComment from '../StackComment/StackComment';
import './style.scss';

function DevDetail() {
    const { userId } = useParams();

    return (
        <div className='dev__container'>
            <div className="profile-prestation__container">
            <ProfileInfo devId={Number(userId)}/>
            <DevPrestation devId={Number(userId)} />
            </div>
            <StackComment devId={Number(userId)} />
        </div>
    );
}

export default DevDetail;