import React from 'react';
import { Link } from 'react-router-dom';
import PageNotFound from "../../assets/img/PageNotFound.jpg";
import "./style.scss";

function NotFoundPage() {
    return(
        <div>
            <div className='img-not-found__container'>
                <img className="img-not-found"src={PageNotFound}  />
            </div>
            <h1 style={{textAlign:"center"}}>
                <Link to="/">Retour à l'accueil </Link>
            </h1>
        </div>
    )
}
export default NotFoundPage;