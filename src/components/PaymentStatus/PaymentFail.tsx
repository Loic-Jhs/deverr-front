import "./style.scss";
import React, {useEffect, useState} from "react";
import {Link, Navigate, useParams} from "react-router-dom";
import {OrderInfoType} from "../../types";
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import {CircularProgress} from "@mui/material";

function PaymentFail() {
    const {OrderId} = useParams();
    const [orderRejected, setOrderRejected] = useState<OrderInfoType>();

    useEffect(() => {
        (async () => {
            await fetch(`${import.meta.env.VITE_API_URL}/order-rejected/${OrderId}`, {
                method: "GET",
                headers: {
                    "Content-type": "application/json",
                },
            })
                .then((response) => response.json())
                .then((data) => {
                    setOrderRejected(data[0]);
                })
                .catch((error) => console.error(error));
        })();
    }, [orderRejected]);

    if (orderRejected) {
        return (
            <div className="payment-info__container">
                <SentimentVeryDissatisfiedIcon className="icon icon-canceled"/>
                <h1>Paiement annulé</h1>
                <p>Vous venez d'annuler votre paiement pour la prestation "{orderRejected?.prestation}" réalisé
                    par {orderRejected?.fullname}, nous vous invitons à reprendre la procedure de paiement</p>
                <br/>
                <p>Pour ce faire veuillez retourner sur <Link to={`/my-profile`}>votre profil</Link></p>
            </div>
        )
    } else {
        return <CircularProgress />;
    }
}

export default PaymentFail;
