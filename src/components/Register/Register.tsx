import dev from '../../assets/img/99312-developer-skills.gif';

function Register() {
  return (
    <div className="register-main font-montserrat w-full">
      <p className="text-center md:text-lg lg:text-2xl w-1/2 mx-auto mt-5 mb-10"><span className="text-primary-blue">DEVERR</span> est une plateforme pour mettre en relation des <span className="text-primary-blue">developpeurs</span> avec de <span className="text-primary-blue">nouveaux clients</span>.</p>
      <div className="lg:flex items-center sm:flex-none md:flex items-start justify-evenly">
        <div className="situation lg:w-1/2 sm:w-full md:ml-5">
          <p className="text-center md:text-lg lg:text-3xl content-center mx-auto mt-5 mb-8">Quelle est votre situation ?</p>
          <div className="button flex flex-col lg:w-1/2 mx-auto sm:text-sm md:text-sm">
            <button className="lg:px-4 sm:px-6 py-2 text-slate-900 bg-primary-blue rounded-md shadow hover:bg-gray-100 mb-5 lg:w-full sm:w-full sm:w-64 w-64 mx-auto">Je suis un developpeur !</button>
            <button className="px-4 py-2 text-slate-900 bg-primary-blue rounded-md shadow hover:bg-gray-100 lg:w-full sm:w-full sm:w-64 w-64 mx-auto">Je suis un client !</button>
          </div>
        </div>
        <div className="image lg:w-1/2 sm:w-full pb-2/3 sm:pt-1/3 lg:pt-2/3">
          <img src={dev} className="mx-auto" alt="developer-skills" />
        </div>
      </div>
    </div>
  )
}

export default Register