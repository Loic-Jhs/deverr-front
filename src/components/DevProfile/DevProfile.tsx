import type { Prestation } from '../../types';
import type { DevInfos } from '../../types';

import React, { useContext, useEffect, useState } from 'react';
import { authContext } from '../../contexts/authContext';
import { CircularProgress, Rating } from '@mui/material';
import { useParams } from 'react-router-dom';
import ServicesModal from './ServicesModal';

import './style.scss';

function DevProfile() {
    const { devID } = useParams();
    const { auth } = useContext(authContext);
    const [dev, setDev] = useState<DevInfos>();
    const [isCurrentDev, setIsCurrentDev] = useState(false);
    const [isLoaded, setIsLoaded] = useState<Boolean>(false);
    const [isEditable, setIsEditable] = useState<Boolean>(false);

    const [open, setOpen] =  useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        if (auth.access_token != undefined && devID == auth.user_info.developer_id) {
            setIsCurrentDev(true)
        }
    });

    useEffect(() => {
        const fetchData = async () => {
            await fetch(`http://localhost/developer/${devID}`, {
                method: "GET",
                headers: {
                    "access-control-allow-origin": "*",
                    "Content-type": "application/json",
                },
                mode: 'cors'
            })
                .then((response) => response.json())
                .then((data) => {
                    setDev(data[0]);
                    setIsLoaded(true);
                })
                .catch((error) => console.log(error));
        }
        fetchData();
    }, [isLoaded]);

    const handleEditElement = () => {
        setIsEditable(!isEditable)
    };

    const handleChangeDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (dev) {
            setDev({
                ...dev,
                description: e.target.value
            })
        }
    };

    const submitDescription = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setIsEditable(!isEditable)

        const response = await fetch(`http://localhost/profile/update`, {
            method: "PUT",
            headers: {
                "access-control-allow-origin": "*",
                "Content-type": "application/json",
                Authorization: `Bearer ` + localStorage.getItem('access_token')?.replaceAll('"', '')
            },
            body: JSON.stringify({ ...dev }),
            mode: 'cors'
        })
        .then(response => response.json())
        .catch(err => console.log(err));
    };

    if (dev) {
        let average: number | null = 0;
        dev.reviews.length > 0 ? average = dev.reviews.reduce((a, b) => a + b.rating, 0) / dev.reviews.length : average = null;
        return (
            <>
                <ServicesModal open={open} onClose={handleClose} />
                <div className='profile__container'>
                    <div className='profile__left-part'>
                        <div className='detail__situation'>
                            <h3>En quelques mots : </h3>
                            {
                                auth.access_token && auth.user_info.developer_id == dev.id ?
                                    <div className='description__editable'>
                                        {
                                            !isEditable ?
                                                <div>
                                                    <p className='dev__description'>{dev.description}</p>
                                                    <button className='button_dev__profile' onClick={handleEditElement}> Modifier</button>
                                                </div>
                                                :
                                                <div className='edit__container'>
                                                    <textarea onChange={handleChangeDescription} value={dev.description} />
                                                    <button className='button_dev__profile' onClick={submitDescription}> Enregistrer</button>
                                                </div>
                                        }
                                    </div>
                                    :
                                    <p className='dev__description'>{dev.description}</p>
                            }
                            <ul>
                                <li><span>Inscrit depuis le :</span> {dev.registered_at}</li>
                                <li><span>Situation :</span> Disponible actuellement</li>
                                <li><span>Missions réalisées :</span> {dev.orders_count != null ? dev.orders_count : 'Aucune'} </li>
                                <li><span>Dernière mission :</span> {dev.last_order_date != null ? dev.last_order_date : 'Aucune'}</li>
                            </ul>
                        </div>
                        <div className='stacks__section__container'>
                            <div className="header__stack">
                                <p>Compétences maîtrisées :</p>
                                {
                                    auth.access_token && auth.user_info.developer_id == dev.id ?
                                        <button className='button_dev__profile'>Ajouter une compétence</button>
                                        :
                                        ""
                                }
                            </div>
                            <div className='dev__stacks'>
                                {dev.stacks.map((stack) => {
                                    return (
                                        <div key={stack.id} className='stack__item'>
                                            <img src={stack.logo} alt={`Logo ${stack.name}`} />
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                    <div className='profile__right-part'>
                        <div className='dev__info'>
                            <div className='img__container'>
                                <img src={dev.avatar} alt={`${dev.firstname} ${dev.lastname} avatar`} />
                            </div>
                            <div className='dev__name-job'>
                                <h3>{dev.firstname} {dev.lastname}</h3>
                                <p>Développeur depuis {dev.years_of_experience} ans</p>
                            </div>
                            {average != null ?
                                <div className='dev__rating'>
                                    <p>{average}</p><Rating name="half-rating-read" size="large" value={average} precision={0.5} readOnly />
                                    <p className='count__rating'>({dev.reviews.length})</p>
                                </div>
                                :
                                <div className='dev__rating'>
                                    <p>Aucune note</p><Rating name="half-rating-read" size="large" value={0} precision={0.5} readOnly />
                                </div>
                            }
                            {
                                auth.access_token == undefined || auth.user_info.user_role != 1 ?
                                    <div className='dev__contact'>
                                        <button className='button_dev__profile' >Demandez une prestation</button>
                                    </div>
                                    :
                                    ""
                            }
                            <div className='dev__prestations-reviews'>
                                <h3>{dev.prestations.length > 1 ? 'Services proposés ' : 'Service proposé '}:</h3>
                                {
                                    isCurrentDev && <button className='button_dev__profile' onClick={handleOpen}>Ajouter une prestation</button>
                                }
                                <div className='dev__prestations-container'>
                                    {dev.prestations && dev.prestations.map((prestation) => {
                                        return (
                                            <div key={prestation.id} className='dev__prestation-item'>
                                                <h4>{prestation.name}</h4>
                                                <p className='p__detail'>Details :</p>
                                                <p className='prestation__description'>
                                                    {prestation.description}
                                                </p>
                                                <p className='dev__prestation-price'><span>Tarif :</span> 120€</p>
                                            </div>
                                        )
                                    })}
                                </div>
                                <h3>{dev.reviews.length > 1 ? 'Notes et commentaires reçues ' : 'Note reçue '}:</h3>
                                <div className='dev__reviews-container'>
                                    {dev.reviews.length > 0 ?
                                        dev.reviews.map((review) => {
                                            return (
                                                <div key={review.id} className='dev__review-item'>
                                                    <p className='author__review'>Alain Durand</p>
                                                    <div className='rating__and__service'>
                                                        <Rating className='rating__star' name="half-rating-read" value={review.rating} precision={0.5} readOnly />
                                                        <p className='service__review'>ERP</p>
                                                    </div>
                                                    <p className='comment__review'>{review.comment}</p>
                                                    <p className='date__review'>Posté le 10/04/22</p>
                                                </div>
                                            )
                                        })
                                        :
                                        <p>Aucune note reçu actuellement</p>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    } else {
        return <CircularProgress className='loader' />
    }
}

export default DevProfile
