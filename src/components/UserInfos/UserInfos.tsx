
import { DevProps } from '../../types';
import './style.scss';
import { users } from './../../fakeData/data';

function UserInfos(devID: DevProps, currentUserTest: DevProps) {

  let currentUser = users[0];
  return (
    <div className="user-infos__container">
        <div className='img__container'>
            <img src={currentUser.avatar} alt={`${currentUser.firstname} ${currentUser.lastname} avatar`}/>
        </div>
        <div className='user-details'>
            <div className='user__name'>
                <h2>{currentUser.firstname} {currentUser.lastname}</h2>
                <p>Inscrit depuis le <span>{currentUser.createdAt}</span></p>
            </div>
            <div className='stacks__prestations'>
                <div className='stacks__container'>
                    {currentUser.stacks && currentUser.stacks.map((stack) => {
                        return (
                            <div key={stack.id} className='stack__item'>
                                <p>{stack.label}</p>
                            </div>
                        )
                    })}
                </div>
                <div className='prestations__container'>
                    {currentUser.prestations && currentUser.prestations.map((prestation) => {
                        return (
                            <div key={prestation.id} className='prestation__item'>
                                <p>{prestation.name}</p>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    </div>
  )
}

export default UserInfos
