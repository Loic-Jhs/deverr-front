import "./style.scss";

function PaymentFail() {
 
  return (
    <div className="payment-info__container">
        <h1>Quelque chose s'est mal passé !</h1>
        <p>Nous sommes au regrets de vous annoncé que votre paiement n'a pas pu aboutir, nous vous invitons à réessayer 
            en vérifiant que les informations sont bonnes ou en utilisant un autre moyen de paiement</p>
        <p>Lien pour retourner sur la page de paiement ou sur la page des commandes </p>
    </div>
  )
}
export default PaymentFail;