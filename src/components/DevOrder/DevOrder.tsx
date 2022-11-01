import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { authContext } from '../../contexts/authContext';
import { Order } from '../../types';
import './style.scss'

function DevOrder() {
    const { auth } = useContext(authContext)
    const [ isLoaded, setIsLoaded ] = useState<Boolean>(false);
    const [ orders, setOrders ] = useState<Order[]>()
    const navigate = useNavigate()
    useEffect(() => {
        if (auth.access_token != undefined && auth.user_info.developer_id != null) {
            const fetchData = async () => {
                try {
                    const response = await fetch(`https://api-dev.deverr.fr/order?developer_id=${auth.user_info.developer_id}`, {
                        method: "GET",
                        headers: {
                            "access-control-allow-origin": "*",
                            "Content-type": "application/json",
                            Authorization: `Bearer ${auth.access_token}`
                        },
                        mode: 'cors'
                    });
                    const data = await response.json();
                    console.log(data)
                    setOrders(data);
                    setIsLoaded(true);
                } catch (e) {
                    console.log(e)
                }
            }
            fetchData()
        } else if (auth.access_token != undefined && auth.user_info.developer_id == null) {
            navigate("/developers");
        } else if (!auth){
            navigate('/')
        }
    }, [auth])

    return (
        <div className='developer__order'>
            <h1>Suivi de mes demandes.</h1>
            <div className='order__comming'>
                <h2>Vos nouvelles demandes :</h2>
                <div className='oder__container'>
                    {orders && orders.map((order) => {
                        return (
                            <div key={order.id} className='order__item'>
                                <p>Le date de la demande, vous avez reçu une demande concernant la prestation {order.prestation_name} de le part de machin truc</p>
                                <div className='order__detail'>
                                    <h3>Voici les détails de la demande : </h3>
                                    <p>{order.instructions}</p>
                                </div>
                                <p>Cette demande vous intéresse t'elle?</p>
                                <div className='button__container'>
                                    <button className='confirm__order'>
                                        Oui
                                    </button>
                                    <button className='cancel__order'>
                                        Non
                                    </button>
                                </div>
                                <p></p>
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className='oder__container order__in-progress'>
                
            </div>
            <div className='oder__container order__done'></div>
        </div>
    )
}

export default DevOrder;