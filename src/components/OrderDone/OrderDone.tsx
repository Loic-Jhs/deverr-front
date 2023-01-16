import React, { useState } from 'react'
import { Order, UserAsContext } from '../../types';

interface OrderDoneProps {
    toggle: () => void;
    order: Order|undefined,
    auth: UserAsContext,
    setIsLoaded: React.Dispatch<React.SetStateAction<Boolean>>
}


function OrderDone({order, toggle, auth, setIsLoaded}: OrderDoneProps) {
    const [confirmMessage, setConfirmMessage] = useState<string>('')

    const confirmOrderDone = async () => {
        if (auth.access_token != undefined && order) {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/order/prestation-finished/${order.id}`, {
                    method: "GET",
                    headers: {
                        "access-control-allow-origin": "*",
                        "Content-type": "application/json",
                        Authorization: `Bearer ${auth.access_token}`
                    },
                    mode: 'cors'
                });
                const data = await response.json();
                setConfirmMessage(data.message)
                setIsLoaded(false)
                toggle()
            } catch (e) {
                console.error(e)
            }
        }
    }
    return (
        <>
            {
                !confirmMessage ?
                    <div className='modal__cancel-order'>
                        <h2>Fin de prestation</h2>
                        <p>Vous êtes sur le point de cloturer la commande demandée par {order?.user_fullname} concernant la prestation {order?.prestation_name}</p>
                        <p>Confirmez vous avoir terminé cette prestation?</p>
                        <div className='button___container-modal'>
                        <button onClick={(toggle)}>Annuler</button>
                        <button onClick={confirmOrderDone}>Confirmer la fin de prestation</button>
                    </div>
                </div>
            :
                <h2>{confirmMessage}</h2>
            }
        </>
    )
}
export default OrderDone;