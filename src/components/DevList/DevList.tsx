import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { users } from '../../fakeData/data';
import { Dev } from '../../types';
import './style.scss';

function DevList() {
    const [ devList, setDevList ] = useState<Dev[]>();
    const [isLoaded, setIsLoaded] = useState<Boolean>(false);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch('http://api-dev.deverr.fr/all-developers', {
              method: "GET",
              headers: {
                "access-control-allow-origin" : "*",
                "Content-type": "application/json"
              },
            mode: 'cors'});
            const data = await response.json();
            setDevList(data);
            setIsLoaded(true);
          } catch (e) {
            console.log(e)
          }
        }
        fetchData()
    }, [])
    return (
        <div className='dev-list__container'>
            {devList && devList.map((dev) => {
                const {id, firstname, lastname, avatar, average_rating, description, prestations, stacks, register_date } = dev;
                return (
                    <Link key={id} to={`/dev-profile/${id}`} className='dev-list__link'>
                        <div  className="dev__item">
                            <div className='dev__item-img'>
                                <img src={`${avatar}`} alt={`${firstname} avatar`} />
                            </div>
                            <div className="dev__item-infos">
                                <div>
                                    <div className="dev__item-account-detail">
                                        <div className="dev__item-name-subscription">
                                            <h3>{firstname} {lastname}</h3>
                                            <p>Inscrit depuis le {register_date}</p>
                                        </div>
                                        <p className="rating">{average_rating != null ? average_rating+'/5' : 'Pas de note'}</p>
                                    </div>
                                    <p>{description}fsdfds fdsfds,fldskflksdlm fksdlmkflmsdkflkdsmlfkdslk lfmsdklmfkdslmfkdslm </p>
                                </div>
                                <div className="dev__item-stacks-detail">
                                    {stacks.map((stack) => {
                                        return (
                                            <div key={stack.id} className="dev__item-stack-logo">
                                                <img src={`${stack.logo}`} alt={`${stack.name} logo`} />
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