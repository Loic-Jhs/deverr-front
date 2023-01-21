import { authContext } from "../../contexts/authContext";
import { useContext, useState } from "react";
import "./style.scss";
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import CheckoutForm from "../CheckoutForm/CheckoutForm";

const stripePromise = loadStripe(`${import.meta.env.VITE_PUBLIC_KEY_STRIPE}`)

function StripePayment() {
    const options = {
        // passing the client secret obtained from the server
        clientSecret: '{{CLIENT_SECRET}}',
    };
    
    return (
        <Elements stripe={stripePromise} options={options}>
          <CheckoutForm />
        </Elements>
    );
}

export default StripePayment;