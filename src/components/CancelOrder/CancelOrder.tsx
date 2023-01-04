import React, { useState } from 'react';
import { Order, UserAsContext } from '../../types';


interface CancelOrderProps {
    toggle: () => void;
    order: Order|undefined,
    auth: UserAsContext,
    setIsLoaded: React.Dispatch<React.SetStateAction<Boolean>>
}


function CancelOrder({order, toggle, auth, setIsLoaded}: CancelOrderProps) {
    const [cancelMessage, setCancelMessage] = useState<string>('')

    const confirmCancelation = async () => {
        if (auth.access_token != undefined && order) {
            try {
                const response = await fetch(`https://api-dev.deverr.fr/order/prestation-rejected/${order.id}`, {
                    method: "GET",
                    headers: {
                        "access-control-allow-origin": "*",
                        "Content-type": "application/json",
                        Authorization: `Bearer ${auth.access_token}`
                    },
                    mode: 'cors'
                });
                const data = await response.json();
                setCancelMessage(data.message)
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
                !cancelMessage ?
                    <div className='modal__cancel-order'>
                        <h2>Refuser la commande de {order?.instructions}</h2>
                        <p>Vous êtes sur le point de refuser la commande concernant la prestation {order?.prestation_name}</p>
                        <p>Veuillez confirmer cette action</p>
                        <div className='button___container-modal'>
                        <button onClick={(toggle)}>Annuler</button>
                        <button onClick={confirmCancelation}>Refuser la commande</button>
                    </div>
                </div>
            :
                <h2>{cancelMessage}</h2>
            }
        </>
    )
}

export default CancelOrder;