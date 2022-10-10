import { Link } from 'react-router-dom';
import './formDev.scss';

const FormDev = () => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <>
      <section className="register__form__dev">
        <h1>Inscription d'un développeur</h1>
        <form className="dev__form" onSubmit={handleSubmit}>
          <input type="text" name="lastname" placeholder="Nom" />
          <input type="text" name="firstname" placeholder="Prénom" />
          <input type="email" name="email" placeholder="E-mail" />
          <input type="password" name="password" placeholder="Mot de passe" />
          <input type="password" name="password" placeholder="Confirmez votre mot de passe" />
          <button type="submit" className="btn">Suivant</button>
        </form>
        <Link to="/registerclient" style={{ textDecoration: "none" }}>
          <p>Je suis un client</p>
        </Link>
      </section>
    </>
  )
}

export default FormDev