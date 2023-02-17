import type {OrderInfoType} from "../../types";
import React, {useContext, useEffect, useState} from "react";
import {useNavigate, useParams, Link, Navigate} from "react-router-dom";
import {authContext} from "../../contexts/authContext";
import "./style.scss";
import DoneAllIcon from '@mui/icons-material/DoneAll';

function PaymentSuccess() {
    //const navigate = useNavigate()
    //const { auth } = useContext(authContext);

    const {OrderId} = useParams();
    const [orderPayed, setOrderPayed] = useState<OrderInfoType>();

    /*useEffect(() => {
        if (!auth.access_token) {
          navigate('/');
        }
      }, [auth, navigate]);

      useEffect(() => {
       if (auth.access_token != undefined && auth.user_info.developer_id != null) {
          navigate('/dev-profile');
        }
      }, [auth]);*/

    useEffect(() => {
        (async () => {
            await fetch(`${import.meta.env.VITE_API_URL}/order-payed/${OrderId}`, {
                method: "GET",
                headers: {
                    "Content-type": "application/json",
                },
            })
                .then((response) => response.json())
                .then((data) => {
                    setOrderPayed(data[0]);
                })
                .catch((error) => console.error(error));
        })();
    }, [orderPayed]);

    if (orderPayed) {
        return (
            <div className="payment-info__container">
                <DoneAllIcon className="icon icon-success"/>
                <h1>Merci pour votre paiement !</h1>
                <p>Nous allons informer {orderPayed.fullname} que la prestation "{orderPayed.prestation}" a été payée.</p>
                <p>N'hésitez pas à visiter <Link to={`/dev-profile/${orderPayed.developer_id}`}>son profil</Link> afin de laisser un avis ! </p>
            </div>
        )
    } else {
        return <Navigate to={'/'}/>
    }
}

export default PaymentSuccess;
