import logoDeverrBlack from '../../assets/img/logo-black.svg'

function Footer() {
  return (
    <div className="footer p-4 bg-white rounded-lg md:px-6 md:py-8">
      <div className="xl:flex xl:justify-center xl:space-x-10 font-montserrat">
        <div className="sm:mb-2">
          <a href="#" className="flex justify-center mb-4 sm:mb-0 mx-auto">
          <img src={logoDeverrBlack} className="mr-3 h-8" alt="Logo Deverr" />
          <span className="text-sm self-center font-semibold dark:text-gray-400">DEVERR © 2022</span>
        </a>
        </div>
        
        <div className="self-center">
          <ul className="flex justify-center flex-wrap items-center mb-6 text-sm text-gray-500 sm:mb-0 dark:text-gray-400 sm:mx-auto sm:text-center">
            <li>
              <a href="#" className="mr-4 hover:underline md:mr-6 ">À propos</a>
            </li>
            <li>
              <a href="#" className="mr-4 hover:underline md:mr-6">Conditions générales d'utilisations</a>
            </li>
            <li>
              <a href="#" className="mr-4 hover:underline md:mr-6 ">Contact</a>
            </li>
            <li>
              <a href="#" className="hover:underline">Devenir prestataire</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Footer
