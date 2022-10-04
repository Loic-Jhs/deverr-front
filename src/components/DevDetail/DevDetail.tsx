import { useParams } from 'react-router-dom';
import ProfileInfo from '../ProfileInfo/ProfileInfo';
import StackComment from '../StackComment/StackComment';
import './style.scss';

function DevDetail() {
    const { userId } = useParams();

    return (
        <div className='dev__container'>
            <ProfileInfo devId={Number(userId)}/>
            <StackComment devId={Number(userId)} />
        </div>
    );
}

export default DevDetail;