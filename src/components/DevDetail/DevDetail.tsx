import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { DevInfos } from '../../types';
import DevPrestation from '../DevPrestation/DevPrestation';
import ProfileInfo from '../ProfileInfo/ProfileInfo';
import StackComment from '../StackComment/StackComment';
import './style.scss';

function DevDetail() {
    const { devID } = useParams();
    const [dev, setDev] = useState<DevInfos>()
    const [isLoaded, setIsLoaded] = useState<Boolean>(false);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch(`http://api-dev.deverr.fr/developer-details/${devID}`, {
              method: "GET",
              headers: {
                "access-control-allow-origin" : "*",
                "Content-type": "application/json"
              },
            mode: 'cors'});
            const data = await response.json();
            setDev(data);
            setIsLoaded(true);
            console.log(dev)
          } catch (e) {
            console.log(e)
          }
        }
        fetchData()
    }, [isLoaded])

    
        return (
            
            <div className='dev__container'>
                <div className="profile-prestation__container">
                <ProfileInfo devID={Number(devID)}/>
                <DevPrestation devID={Number(devID)} />
                </div>
                <StackComment devID={Number(devID)} />
            </div>
        );
}

export default DevDetail;