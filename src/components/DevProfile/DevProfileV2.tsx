import './stylev2.scss';
import { useEffect, useState } from 'react';
import { DevInfos } from '../../types';
import { useParams } from 'react-router-dom';
import { Rating } from '@mui/material'

function DevProfileV2() {
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
        <div className='profile__left-part'>
            <div className='img__container'>
                <img src={dev.avatar} alt={`${dev.firstname} ${dev.lastname} avatar`}/>
            </div>
            <div className='detail__situation'>

            </div>
        </div>
        <div className='profile__right-part'>
            <div className='dev__info'>
                <div className='dev__name-job'>
                    <h3>{dev.firstname} {dev.lastname}</h3>
                    <p>Développeur depuis XX ans/XX mois</p>
                </div>
                <div className='dev__rating'>
                    <p>2,5</p><Rating name="half-rating-read" size="large" value={2.5} precision={0.5} readOnly/>
                </div>
                <div className='dev__contact'>
                    <button>Envoyer un message</button>
                    <button>Signaler</button>
                </div>
                <div className='dev__prestations-reviews'>
                    <h3>{dev.prestations.length > 1 ? 'Services proposés ' : 'Service proposé '}:</h3>
                    <div className='dev__prestations-container'>
                        {dev.prestations && dev.prestations.map((prestation) => {
                            return (
                            <div key={prestation.id} className='dev__prestation-item'>
                                <h4>{prestation.name}</h4>
                                <p className='p__detail'>Details :</p>
                                <p className='prestation__description'>
                                    blablalba je vous propose ceci et cela, je passe X temps sur machin truc truc
                                </p>
                                <p className='dev__prestation-price'><span>Tarif :</span> 120€</p>
                            </div>
                            )
                        })}
                    </div>
                    <h3>{dev.reviews.length > 1 ? 'Notes et commentaires reçues ' : 'Note reçue '}:</h3>
                    <div className='dev__reviews-container'>
                        {dev.reviews && dev.reviews.map((review) => {
                            console.log(dev)
                            return (
                            <div key={review.id} className='dev__review-item'>                 
                            </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
      </div>
    )
  }
}


export default DevProfileV2
