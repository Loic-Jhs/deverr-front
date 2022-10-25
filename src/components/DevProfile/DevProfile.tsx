import UserInfos from '../UserInfos/UserInfos';
import './style.scss';
import { users } from '../../fakeData/data';
import { useState } from 'react';

function DevProfile() {
  let devID = 1
  let currentUser = users[0];

  const [isEditable, setIsEditable] = useState<Boolean>(false)

  function submitDescription() {
    setIsEditable(false)
  }

  return (
    <div className='profile__container'>
      <h1>Mon profil</h1>
      <UserInfos devID={devID} currentUserTest={currentUser} />
      <div className='description__prestations__container'>
        <div className='description__container'>
          { isEditable ?
            <div className='editable__description__container'>
              <textarea defaultValue={currentUser.description} />
              <button onClick={submitDescription}>Enregistrer</button>
            </div>
          :
            <p onClick={() => setIsEditable(true)}>{currentUser.description}</p>
          }
        </div>
        <div className="prestations__done__coming-container">
         <div className='prestation__done-container'>
          <h3>Dernières prestations réalisées</h3>
         </div>
         <div className='prestation__coming-container'>
          <h3>Demande de prestation</h3>
         </div>
        </div>
      </div>
    </div>
  )
}

export default DevProfile
