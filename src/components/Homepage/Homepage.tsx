import CardList from "../CardList/CardList"
import developpement from '../../assets/img/94056-development.gif';

function Homepage() {

  return (
    <div className="homepage">
      <h2 className="text-center md:text-base lg:text-3xl w-1/2 mx-auto mt-5 md:mb-10 mb-5">
        <span className="text-primary-blue">DEVERR</span> est une plateforme qui a pour but de vous permettre de trouver le <span className="text-primary-blue">développeur idéal</span> pour la réalisation de votre <span className="text-primary-blue">projet</span>.
      </h2>
      <div className="flex justify-end">
        <div className="mx-auto">
          <button className="lg:px-4 sm:px-6 py-2 text-slate-900 bg-primary-blue rounded-md shadow hover:bg-gray-100 lg:w-full sm:w-full sm:w-64 w-64 mx-auto">
            Inscription
          </button>
        </div>
      </div>
      <div className="md:flex-col lg:flex lg:flex-row items-center">
        <CardList />
        <div className="image lg:w-1/2 sm:w-full pb-2/3 sm:pt-1/3 lg:pt-2/3">
          <img src={developpement} className="mx-auto" alt="developer-skills" />
        </div>
      </div>
    </div>
  )
}

export default Homepage
