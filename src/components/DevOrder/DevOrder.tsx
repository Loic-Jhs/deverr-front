import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { authContext } from '../../contexts/authContext';
import { Order } from '../../types';
import CancelOrder from '../CancelOrder/CancelOrder';
import ModalWindow from '../Modal/Modal';
import OrderDone from '../OrderDone/OrderDone';
import './style.scss'

function DevOrder() {
    const { auth } = useContext(authContext)
    const { devID } = useParams()
    const [ isLoaded, setIsLoaded ] = useState<Boolean>(false);
    const [openCancelOrder, setOpenCancelOrder] = useState(false);
    const handleOpenCancelOrder = () => setOpenCancelOrder(true);
    const handleCloseCancelOrder = () => setOpenCancelOrder(false);
    const [openOrderDone, setOpenOrderDone] = useState(false);
    const handleOpenOrderDone = () => setOpenOrderDone(true);
    const handleCloseOrderDone = () => setOpenOrderDone(false);

    const [ orders, setOrders ] = useState<Order[]>()
    const [ orderToCancel, setOrderToCancel ] = useState<Order>()
    const [ orderDone, setOrderDone ] = useState<Order>()
    const [ newOrders, setNewOrders] = useState<Order[]>()
    const [ inProgressOrders, setInProgressOrders] = useState<Order[]>()
    const [ ordersDone, setOrdersDone] = useState<Order[]>()
    const navigate = useNavigate()

  useEffect(() => {
    if (auth.access_token != undefined && auth.user_info.developer_id == devID) {
      (async () => {
        await fetch(`${import.meta.env.VITE_API_URL}/order?developer_id=${devID}`, {
          method: "GET",
          headers: {
              Authorization: `Bearer ${auth.access_token}`
          },
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
        .catch((error) => console.error(error));
        })();
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
        await fetch(`${import.meta.env.VITE_API_URL}/order/prestation-accepted/${orderID}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${auth.access_token}`,
            "Content-type": "application/json"
          },
        })
        .then((response) => response.json())
        .then((data) => {
            setIsLoaded(false)
        })
        .catch((error) => {
            console.error(error);
        });
      }
    }

    return (
        <div className='dev__order-container'>
            <ModalWindow open={openCancelOrder} onClose={handleCloseCancelOrder} children={<CancelOrder setIsLoaded={setIsLoaded} order={orderToCancel} toggle={handleCloseCancelOrder} auth={auth}/>} />
            <ModalWindow open={openOrderDone} onClose={handleCloseOrderDone} children={<OrderDone setIsLoaded={setIsLoaded} order={orderDone} toggle={handleCloseOrderDone} auth={auth}/>} />

          <div className='developer__order'>
            <h1>Suivi de mes demandes.</h1>
              <div className='order__coming'>
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
                          <p>Cette demande vous intéresse-t-elle?</p>
                          <div className='button__container'>
                            <button onClick={() => confirmOrder(order.id)} className='confirm__order'>
                              Oui
                            </button>
                            <button onClick={() => {
                              setOrderToCancel(order)
                              handleOpenCancelOrder()
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
                              handleOpenOrderDone()
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
                      <h2>Vous n'avez réalisé aucune demande pour le moment</h2>
                    </div>
                    }
                </div>
              </div>
          </div>
        </div>
    )
}

export default DevOrder;