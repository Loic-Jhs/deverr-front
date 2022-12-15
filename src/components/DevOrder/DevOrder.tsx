import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { authContext } from '../../contexts/authContext';
// import useModal from '../Modal/useModal';
import Modal from '../Modal/Modal';
import { Order } from '../../types';
import './style.scss'
import CancelOrder from '../CancelOrder/CancelOrder';
import OrderDone from '../OrderDone/OrderDone';

function DevOrder() {
    const { auth } = useContext(authContext)
    const { devID } = useParams() 
    const [ isLoaded, setIsLoaded ] = useState<Boolean>(false);
    const [ orders, setOrders ] = useState<Order[]>()
    // const { isOpen, toggle } = useModal();
    // const { isOpenOderDone, toggleOrderDone } = useModal();
    const [ orderToCancel, setOrderToCancel ] = useState<Order>()
    const [ orderDone, setOrderDone ] = useState<Order>()
    const [ newOrders, setNewOrders] = useState<Order[]>()
    const [ inProgressOrders, setInProgressOrders] = useState<Order[]>()
    const [ ordersDone, setOrdersDone] = useState<Order[]>()
    const navigate = useNavigate()
    console.log(orders)
    useEffect(() => {
        if (auth.access_token != undefined && auth.user_info.developer_id == devID) {
            const fetchData = async () => {
                await fetch(`https://api-dev.deverr.fr/order?developer_id=${devID}`, {
                    method: "GET",
                    headers: {
                        "access-control-allow-origin": "*",
                        "Content-type": "application/json",
                        Authorization: `Bearer ${auth.access_token}`
                    },
                    mode: 'cors'
                })
                .then((response) => response.json())
                .then((data) => {
                    setOrders(data);
                    let newOrderArray: Array<Order> = [];
                    let inProgressOrderArray: Array<Order>= []
                    let orderDoneArray: Array<Order> = []

                    orders && orders.map((order) => {
                        if (order.is_accepted_by_developer == null) {
                            newOrderArray.push(order)
                        } else if (order.is_accepted_by_developer == 1 && order.is_finished == 0) {
                            inProgressOrderArray.push(order)
                        } else if (order.is_accepted_by_developer == 1 && order.is_finished == 1) {
                            orderDoneArray.push(order)
                        }
                    })

                    setNewOrders(newOrderArray);
                    setInProgressOrders(inProgressOrderArray);
                    setOrdersDone(orderDoneArray);
                    setIsLoaded(true);
                })
              .catch((error) => console.log(error));
            }
            fetchData();
        } else if (auth.access_token != undefined && auth.user_info.developer_id == null) {
            navigate("/developers");
        } else if (auth.access_token != undefined && auth.user_info.developer_id != devID ) {
            navigate(`/dev-profile/${auth.user_info.developer_id}`);
        } else if (!auth) {
            navigate('/');
        } 
    }, [auth, isLoaded])

    const confirmOrder = async (orderID: number) => {
        if (auth.access_token != undefined && orderID) {
            await fetch(`https://api-dev.deverr.fr/order/prestation-accepted/${orderID}`, {
                method: "GET",
                headers: {
                    "access-control-allow-origin": "*",
                    "Content-type": "application/json",
                    Authorization: `Bearer ${auth.access_token}`
                },
                mode: 'cors'
            })
            .then((response) => response.json())
            .then((data) => {
                setIsLoaded(false)
            })
            .catch((error) => {
                console.log(error);
            });
        }
    }

    return (
        <div className='dev__order-container'>
            {/* <Modal isOpen={isOpen} toggle={toggle} children={<CancelOrder setIsLoaded={setIsLoaded} order={orderToCancel} toggle={toggle} auth={auth}/>} />
            <Modal isOpen={isOpenOderDone} toggle={toggleOrderDone} children={<OrderDone setIsLoaded={setIsLoaded} order={orderDone} toggle={toggleOrderDone} auth={auth}/>} /> */}

            <div className='developer__order'>
                <h1>Suivi de mes demandes.</h1>
                <div className='order__comming'>
                    <h2>Vos nouvelles demandes :</h2>
                    <div className='order__container'>
                        { newOrders !=undefined && newOrders?.length > 0 ? 
                            newOrders.map((order) => {
                                return (
                                    <div key={order.id} className='order__item'>
                                        <p>
                                            Le {order.created_at}, vous avez reçu une demande concernant la prestation {order.prestation_name} de le part de {order.user_fullname}
                                        </p>
                                        <div className='order__detail'>
                                            <h3>Voici les détails de la demande : </h3>
                                            <p>{order.instructions}</p>
                                        </div>
                                        <p>Cette demande vous intéresse t'elle?</p>
                                        <div className='button__container'>
                                            <button onClick={() => confirmOrder(order.id)} className='confirm__order'>
                                                Oui
                                            </button>
                                            <button onClick={() => {
                                                setOrderToCancel(order)
                                                // toggle()
                                            }} className='cancel__order'>
                                                Non
                                            </button>
                                        </div>
                                    </div>
                                )
                            })
                        :
                            <div className='no__order-element'>
                                <h2>Vous n'avez aucune nouvelle demande pour le moment</h2>
                            </div>
                        }
                    </div>
                </div>
                <div className='order__container order__in-progress'>
                    <h2>Vos Demande en cours :</h2>
                    <div className='order__container'>

                        { inProgressOrders !=undefined && inProgressOrders?.length > 0 ? 
                            inProgressOrders.map((order) => {
                                return (
                                    <div key={order.id} className='order__item'>
                                        <p>
                                            La demande de {order.user_fullname} concernant la prestation {order.instructions} est toujours en cours de réalisation.
                                        </p>
                                        <div className='order__detail'>
                                            <h3>Voici les détails de la demande : </h3>
                                            <p>{order.instructions}</p>
                                        </div>
                                        <p>La prestation est terminée? Faites le savoir à votre client !</p>
                                        <div className='button__container'>
                                            <button  onClick={() => {
                                                setOrderDone(order)
                                                // toggleOrderDone()
                                            }} className='order__done'>
                                                Prestation terminée !
                                            </button>
                                        </div>
                                    </div>
                                )
                            })
                        :
                            <div className='no__order-element'>
                                <h2>Vous n'avez aucune demande en cours pour le moment</h2>
                            </div>
                        }
                    </div>
                </div>
                <div className='order__container order__done'>
                    <h2>Vos demandes terminées :</h2>
                    <div className='order__container'>
                        { ordersDone !=undefined && ordersDone?.length > 0 ? 
                            ordersDone.map((order) => {
                                return (
                                    <div key={order.id} className='order__item'>
                                        <p>
                                            Vous avez terminé la commande concernant la prestation {order.prestation_name}, demandé par {order.user_fullname}
                                        </p>
                                        <div className='order__detail'>
                                            <h3>Voici les détails de la demande : </h3>
                                            <p>{order.instructions}</p>
                                        </div>
                                    </div>
                                )
                            })
                        :
                            <div className='no__order-element'>
                                <h2>Vous n'avez réaliser aucunde demande pour le moment</h2>
                            </div>
                        }
                    </div>
                </div>
                </div>
            </div>
    )
}

export default DevOrder;