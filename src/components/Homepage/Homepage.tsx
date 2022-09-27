import CardList from "../CardList/CardList"

function Homepage() {

  return (
    <div className="homepage">
      <h2 className="text-center md:text-base lg:text-3xl w-1/2 content-center mx-auto mt-5 md:mb-20 mb-10">
        <span className="text-primary-blue">DEVERR</span> est une plateforme qui a pour but de vous permettre de trouver le <span className="text-primary-blue">développeur idéal</span> pour la réalisation de votre <span className="text-primary-blue">projet</span>.
      </h2>
      <div className="flex justify-end">
        <div className="mr-20">
          <button className="lg:px-4 sm:px-6 py-2 text-slate-900 bg-primary-blue rounded-md shadow hover:bg-gray-100 mb-5 lg:w-full sm:w-full sm:w-64 w-64 mx-auto">
            Inscription
          </button>
        </div>
      </div>
      <div className="md:flex flex-none mt-10 items-center"> 
        <CardList />
        <h4 className="md:w-1/2 w-full text-2xl">Add the image</h4>
      </div>
    </div>
  )
}

export default Homepage
