import './style.scss';
import { useEffect, useState } from 'react';
import { DevInfos } from '../../types';
import { useParams } from 'react-router-dom';
import { Rating } from '@mui/material'

function DevProfile() {
  const { devID } = useParams();
  const [isEditable, setIsEditable] = useState<Boolean>(false)
  const [dev, setDev] = useState<DevInfos>()
  const [isLoaded, setIsLoaded] = useState<Boolean>(false);
  function submitDescription() {
    setIsEditable(false)
  }

  useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch(`http://api-dev.deverr.fr/developer/${devID}`, {
            method: "GET",
            headers: {
              "access-control-allow-origin" : "*",
              "Content-type": "application/json"
            },
          mode: 'cors'});
          const data = await response.json();
          setDev(data[0]);
          setIsLoaded(true);
        } catch (e) {
          console.log(e)
        }
      }
      fetchData()
  }, [isLoaded])
  if (dev) {
    return (
      <div className='profile__container'>
        <div className='dev__informations'>
          <div className='dev__avatar-name-counts'>
            <div className='img__container'>
              <img src={dev.avatar} alt={`${dev.firstname} ${dev.lastname} avatar`}/>
            </div>
            <div className='dev__name'>
              <h3>{dev.firstname} {dev.lastname}</h3>
            </div>
            <div className='dev__missions-reviews-count'>
              <div className='missions__count'>
                <span>10</span>
                <p>Missions réalisées </p>
              </div>
              <div className='reviews__count'>
                <span>5</span>
                <p>Dernière avis reçu</p>
              </div>
            </div>
          </div>
          <div className='dev__situation'>
            <p><span>Inscrit depuis le :</span> date d'inscription </p>
            <p><span>Dernière mission réalisé le :</span> 10/05/2022</p>
            <p><span>Missions réalisées :</span> 10</p>
            <p><span>Dernière avis reçu</span> : </p>
          </div>
          <div className='dev__stacks'>
            <h3>Compétences maitrisées :</h3>
            <div className='dev__stacks-list'>
              {dev.stacks && dev.stacks.map((stack) => {
                return (
                  <div key={stack.id} className='stack__item'>
                    <p>{stack.name}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
        <div className='dev__description-prestation-portfolio'>
          <div className='dev__description'>
            <h2>En quelques mots :</h2>
            <p>{dev.description}</p>
          </div>
          <div className='dev__prestations'>
            <h3>Prestations proposées :</h3>
            <div className='dev__prestations-list'>
              {dev.prestations && dev.prestations.map((prestation) => {
                return (
                  <div key={prestation.id} className='dev__prestation-item'>
                    <h4>{prestation.name}</h4>
                    <p className='p__detail'>Details :</p>
                    <p>
                      blablalba je vous propose ceci et cela, je passe X temps sur machin truc truc
                    </p>
                    <p className='dev__prestation-price'>Tarif : 120€</p>
                  </div>
                )
              })}
            </div>
          </div>
          <div className='dev__portfolio'>
            <h4>Mon portfolio</h4>
          </div>
        </div>
        <div className='dev__contact-review'>
          <div className='dev__contact'>
            <h3>Un projet en tête? Parlons-en !</h3>
            <a href="">Me contacter</a>
          </div>
          <div className='dev__reviews'>
            <p>3/5</p>
            <p>bkfkzelfklz kkldfdjjklfjdsklj kldsj fkldsjklfj dskljfkldsjklfj kdslj fkldsjklf jkdsljkflj klsfjdsklj</p>
            <p className='user__name'>Posté le 21/10/2022 par Prénom nom</p>
          </div>
        </div>
      </div>
    )
  }
}


export default DevProfile
