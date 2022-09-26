import logoDeverrBlack from '../../assets/img/logo-black.svg'

function Footer() {
  return (
    <div className="footer p-4 bg-white rounded-lg md:px-6 md:py-8">
      <div className="sm:flex sm:items-center sm:justify-between body-font font-montserrat">
        <a href="#" className="flex items-center mb-4 sm:mb-0">
          <img src={logoDeverrBlack} className="mr-3 h-8" alt="Flowbite Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-gray-400">DEVERR © 2022</span>
        </a>
        <ul className="flex flex-wrap items-center mb-6 text-sm text-gray-500 sm:mb-0 dark:text-gray-400">
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
  );
}

export default Footer
