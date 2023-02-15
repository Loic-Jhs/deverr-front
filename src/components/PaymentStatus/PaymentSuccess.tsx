import {useContext, useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import { authContext } from "../../contexts/authContext";
import "./style.scss";

function PaymentSuccess() {
    //const navigate = useNavigate()
    //const { auth } = useContext(authContext);

    const { OrderId} = useParams();
    const [ orderPayed, setOrderPayed ] = useState();

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

    return (
        <div className="payment-info__container">
            <h1>Merci pour votre paiement ! {OrderId}</h1>
            <p>Nous allons informer developpeurName developpeurLastname que la prestation XX a été payée.</p>
            <p>N'hésitez pas à visiter son profil afin de laisser un avis ! </p>
        </div>
    )
  }
  export default PaymentSuccess;
