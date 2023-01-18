import { CircularProgress } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { authContext } from '../../contexts/authContext';
import { UserInfos } from '../../types';
import './style.scss'


function ClientProfile() {
    const { auth } = useContext(authContext)
    const { userID } = useParams();
    const [client, setClient] = useState<UserInfos>()
    const [isLoaded, setIsLoaded] = useState<Boolean>(false);
    const [isCurrentClient, setIsCurrentClient] = useState<boolean>(false)
    const navigate = useNavigate()

    useEffect(() => {
        if (auth.access_token != undefined && userID == auth.user_info.user_id) {
            setIsCurrentClient(true)
        }
    }, [auth])

     useEffect(() => {
         if (isCurrentClient == true) {
            const fetchData = async () => {
                try {
                    const response = await fetch(`https://api-dev.deverr.fr/profile`, {
                        method: "GET",
                        headers: {
                            "access-control-allow-origin": "*",
                            "Content-type": "application/json",
                        },
                        mode: 'cors'
                    });
                    const data = await response.json();
                    setClient(data);
                    setIsLoaded(true);
                } catch (e) {
                    console.log(e)
                }
            }
            fetchData()
        } else {
            if (auth.access_token != undefined && auth.user_info.developer_id != null) {
                console.log('ok')
                navigate('/dev-profile/'+auth.user_info.developer_id)
            } else if (auth.acces_token != undefined && auth.user_info.developer_id == null) {
                navigate('/developers')
                console.log('test')
            }
        }
    }, [isCurrentClient, isLoaded, auth]) 

    if (client) {
        return (
            <div className='client__container'>
                <h1>Mon profil</h1>
                <div className='client__info'>
                    <h2>Vos informations :</h2>
                    <p>{client.firstname} {client.lastname}</p>
                    <p>Inscrit depuis le {client.registered_at}</p>
                    <p>Email : {client.email}</p>
                </div>
                <div className='client__orders__container'>
                    <h2>Suivi de vos demandes : </h2>
                    <div className='client__orders__list'>
                        {client.orders.map((order, index) => {
                            let classToAdd = order.is_finished ? 'finished__order' : ''
                           
                        return ( 
                            <div key={index} className={`order__item ${classToAdd}`}>
                                <h3>Prestation demandée :</h3>
                                <p>Vous avez demandé la prestation {order.prestation_name} à {order.developer} le {order.created_at}</p>
                                <h3>Statut de la demande :</h3>
                                <p>{order.is_accepted_by_developer  == null ? 'En attente du dévelopeur' : 'Demande traitée'}</p>
                                <h3>Mis à jour le :</h3>
                                <p>{order.updated_at != null ? order.updated_at : 'Aucune action effectuée'}</p>
                                <h3>Détail de votre demande :</h3>
                                <p>{order.instructions}</p>
                                { order.is_accepted_by_developer == true ? 
                                    <div>
                                        <h3>Statut du projet :</h3>
                                        <p>{order.is_finished == true ? 'Terminé' : 'En cours'}</p>
                                    </div>
                                :
                                    ''
                                }
                            </div>      
                        )
                        })}
                    </div>
                </div>
            </div>
        )
    } else {
        return <CircularProgress className='loader' />
    }
}

export default ClientProfile;
