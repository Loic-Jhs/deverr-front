import { Link } from 'react-router-dom';
import './formClient.scss';

const FormClient = () => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const handleChange = (event: React.FormEvent<HTMLFormElement>) => {
    //
  }


  return (
    <>
      <section className="register__form__client">
        <h1>Inscription d'un client</h1>
        <form className="client__form" onSubmit={handleSubmit}>
          <input type="text" name="lastname" placeholder="Nom" />
          <input type="text" name="firstname" placeholder="Prénom" />
          <input type="date" name="date" placeholder="Date de naissance" />
          <input type="email" name="email" placeholder="E-mail" />
          <input type="password" name="password" placeholder="Mot de passe" />
          <input type="password" name="password" placeholder="Confirmez votre mot de passe" />
          <button type="submit" className="btn">Suivant</button>
        </form>
        <Link to="/registerdev" style={{ textDecoration: "none" }}>
          <p>Je suis un dev</p>
        </Link>
      </section>
    </>
  )
}

export default FormClient

function constructor(props: any) {
  throw new Error('Function not implemented.');
}
