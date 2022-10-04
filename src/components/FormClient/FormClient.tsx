import { Link } from 'react-router-dom';
import './style.scss';

const FormClient = () => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const handleChange = (event: React.FormEvent<HTMLFormElement>) => {
    //
  }

  return (
    <>
      <section className="regisster__container">
        <h1>Je suis un client</h1>
        <form onSubmit={handleSubmit}>
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