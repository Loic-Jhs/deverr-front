import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from "../../contexts/Noooon";
import { Dev } from '../../types';
import './style.scss';
import { Rating } from '@mui/material'

function DevList() {
    const [ devList, setDevList ] = useState<Dev[]>();
    const [isLoaded, setIsLoaded] = useState<Boolean>(false);
    const [query, setQuery] = useState("");

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch('https://api-dev.deverr.fr/all-developers', {
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
            console.error(e)
          }
        }
        fetchData()
    }, [isLoaded])

    return (
        <>
            <div className="search">
                <input
                    placeholder="Rechercher un(e) Dev/Techno"
                    onChange={(event) => setQuery(event.target.value)}
                />
            </div>
            <div className='dev-list__container'>
            {devList && devList.filter(dev => {
                    if (query === "") {
                        //if query is empty
                        return dev;
                    } else if (dev.firstname.toLowerCase().includes(query.toLowerCase()) || dev.lastname.toLowerCase().includes(query.toLowerCase())) {
                        //returns filtered array
                        return dev;
                    } else if (dev.stacks !== null && dev.stacks.length > 0) {
                        dev.stacks.map((stack) => {
                            if (stack.name.toLowerCase().includes(query.toLowerCase())) {
                                //returns filtered array for techno
                                return dev;
                            }
                        })
                    }
                }).map((dev) => {
                    const {
                        id,
                        firstname,
                        lastname,
                        avatar,
                        average_rating,
                        description,
                        prestations,
                        stacks,
                        reviews_number,
                    } = dev;

                    return (
                        <Link key={id} to={`/dev-profile/${id}`} className='dev-list__link'>
                            <div className='dev__info'>
                                <div className='dev__info-picture-fav'>
                                    <img src={`${avatar}`} alt={`${firstname} avatar`} />
                                </div>
                                <div className='dev__name-rate'>
                                    <p className='dev__name'>{firstname} {lastname}</p>
                                    {
                                        average_rating ?
                                            <div  className='dev__rate'>
                                                <Rating name="half-rating-read" size="large" value={average_rating} precision={0.5} readOnly/>
                                                <p>{average_rating}</p>
                                                <p>({reviews_number})</p>
                                            </div>
                                        : 
                                            <div  className='dev__rate'>
                                                <Rating name="half-rating-read" size="large" value={0} precision={0.5} readOnly/>
                                                <p>Aucune note</p>
                                            </div>
                                    }
                                </div>
                                <p className='dev__description'>{description.slice(0, 100)}...</p>
                            </div>
                            <div className='dev__stacks-prestations'>
                                <h2>Mes compétences :</h2>
                                <div className='dev__stacks'>
                                    {stacks && stacks.map((stack) => {
                                        return (
                                            <div key={stack.id} className="dev__item-stack-logo">
                                                <img src={`${stack.logo}`} alt={`${stack.name} logo`} />
                                            </div>
                                        )
                                    })}
                                </div>
                                <h2>Mes prestations :</h2>
                                <div className='dev__prestations'>
                                    {prestations && prestations.map((prestation) => {
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
        </>
    );
}

export default DevList;
