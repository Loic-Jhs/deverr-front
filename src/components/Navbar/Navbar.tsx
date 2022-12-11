import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logoDeverr from '../../assets/img/D.jpg';
import { authContext } from "../../contexts/authContext";
import './style.scss';

function Navbar() {
    const [navbar, setNavbar] = useState(false);
    const navigate = useNavigate();
    const { auth, resetState, setIsLogged } = useContext(authContext)

    const logout = () => {
        localStorage.clear();
        navigate('/')
        resetState()
        setIsLogged(false)
    }

    return (
        <nav className="navbar">
            <div className="navbar__container">
                <div>
                    <div className="logo__container">
                        <Link to={'/'}>
                            <img src={logoDeverr} className="logo__img" alt="Logo Deverr" />
                        </Link>
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
                        className={`menu__container ${navbar ? "menu__show" : "menu__hidden"}`}
                    >
                        <ul>
                            <li>
                                <Link to={'/'} className='navbar__link'>Accueil</Link>
                            </li>
                            <li>
                                <Link to={'developers'} className='navbar__link'>Nos développeurs</Link>
                            </li>
                            {auth.access_token &&
                                <li>
                                    {auth.user_info.developer_id != null ?
                                        <Link to={'dev-order/' + auth.user_info.developer_id} className='navbar__link'>Mes commandes</Link>
                                        :
                                        <Link to={'my-profile/' + auth.user_info.user_id} className='navbar__link'>Mon profil</Link>
                                    }
                                </li>
                            }
                        </ul>
                        <div className="responsive__button">
                            {!auth.access_token &&
                                <>
                                    <Link to={'/register'} className="login__button">
                                        Inscription
                                    </Link>
                                    <Link to={'/login'} className="login__button">
                                        Connexion
                                    </Link>
                                </>
                            }
                            {
                                auth.access_token &&
                                <a onClick={logout} className="logout__button">
                                    Déconnexion
                                </a>
                            }
                        </div>
                    </div>
                </div>
                <div className="desktop__button">
                    {!auth.access_token &&
                        <>
                            <Link to={'/register'}>
                                Inscription
                            </Link>
                            <Link to={'/login'}>
                                Connexion
                            </Link>
                        </>
                    }
                    {
                        auth.access_token &&
                        <a onClick={logout}>
                            Déconnexion
                        </a>
                    }
                </div>
            </div>
        </nav>
    )
}

export default Navbar