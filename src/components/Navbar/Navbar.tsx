import { useState } from "react";
import logoDeverr from '../../assets/img/D.jpg';
import './style.scss';

function Navbar() {
    const [navbar, setNavbar] = useState(false);

    return (
        <nav className="navbar">
            <div className="navbar__container">
                <div>
                    <div className="logo__container">
                        <a>
                            <img src={logoDeverr} className="logo__img" alt="Logo Deverr" />
                        </a>
                        <div className="burger__button">
                            <button
                                onClick={() => setNavbar(!navbar)}
                            >
                                {navbar ? (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                ) : (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M4 6h16M4 12h16M4 18h16"
                                        />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
                <div className="menu">
                    <div
                        className={`menu__container w-100 ${navbar ? "block" : "hidden"
                            }`}
                    >
                        <ul>
                            <li>
                                <a>Accueil</a>
                            </li>
                            <li>
                                <a>Nos développeurs</a>
                            </li>
                            <li>
                                <a>Mon profil</a>
                            </li>
                        </ul>
                        <div className="responsive__button">
                            <a className="login__button">
                                Connexion
                            </a>
                            <a className="logout__button">
                                Déconnexion
                            </a>
                        </div>
                    </div>
                </div>
                <div className="desktop__button">
                    <a>
                        Connexion
                    </a>
                    <a>
                        Déconnexion
                    </a>
                </div>
            </div>
        </nav>
    )
}

export default Navbar