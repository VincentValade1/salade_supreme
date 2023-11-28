import { NavLink } from "react-router-dom";
import '../styles/Erreur.css';

function Erreur() {
    return(
        <main className="pink-border-main-div">
            <section className="page-erreur">
                <h1 className="pink-titles">Salade Suprême</h1>
                <span>ERREUR 404</span>
                <p>La page demandée n'a pas été trouvée</p>
                <NavLink tabIndex="0" aria-label="retour vers la page accueil" activeclassname='active' to='/'className="bouton-erreur-accueil">Retour vers la page<br/>Accueil</NavLink>
            </section>
        </main>
    )
}

export default Erreur;