import { useState } from "react";
import logoDeverr from '../../assets/img/D.jpg';

function Navbar() {
    const [navbar, setNavbar] = useState(false);

    return (
        <nav className="w-full bg-slate-900 shadow">
            <div className="justify-between px-4 mx-auto md:items-center md:flex">
                <div>
                    <div className="flex items-center justify-between py-3 md:py-5 md:block">
                        <a>
                            <img src={logoDeverr} className="rounded-full h-10 w-10" alt="Logo Deverr" />
                        </a>
                        <div className="md:hidden">
                            <button
                                className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
                                onClick={() => setNavbar(!navbar)}
                            >
                                {navbar ? (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-6 h-6 text-white"
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
                                        className="w-6 h-6 text-white"
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
                <div>
                    <div
                        className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
                            navbar ? "block" : "hidden" 
                        }`}
                    >
                        <ul className="items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0">
                            <li className="text-white hover:text-deverr-yellow">
                                <a>Accueil</a>
                            </li>
                            <li className="text-white hover:text-deverr-yellow">
                                <a>Nos développeurs</a>
                            </li>
                            <li className="text-white hover:text-deverr-yellow">
                                <a>Mon profil</a>
                            </li>
                        </ul>
                        <div className="mt-3 space-y-2 lg:hidden md:inline-block md:hidden  ">
                            <a className="inline-block text-primary-blue w-full px-4 py-2 text-center text-white bg-gray-600 rounded-md shadow hover:bg-gray-800">
                                Connexion
                            </a>
                            <a className="inline-block text-primary-blue w-full px-4 py-2 text-center text-gray-800 bg-white rounded-md shadow hover:bg-gray-100">
                                Déconnexion
                            </a>
                        </div>
                    </div>
                </div>
                <div className="hidden space-x-2 md:inline-block ">
                    <a className="px-4 py-2 text-slate-900 bg-primary-blue rounded-md shadow hover:bg-gray-100">
                        Connexion
                    </a>
                    <a className="px-4 py-2 text-slate-900 bg-primary-blue rounded-md shadow hover:bg-gray-100">
                        Déconnexion
                    </a>
                </div>
            </div>
        </nav>
    )
}
  
export default Navbar