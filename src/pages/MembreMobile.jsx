import { useParams, Navigate } from "react-router-dom";
import { Link } from "react-router-dom";
import membres from '../datas/membres.json';

function MembreMobile() {

    const { id } = useParams();
    // ensuite on crée une variable matchingAppart qui trouve dans notre DB(logements.json) le logement où l'id est égal à celui présent dans l'url.
    const matchingName = membres.find((membre) => membre.id === id);
    // si aucun id identique n'est trouvé, on utilise le hook Navigate pour rediriger vers la pageError404.
    if(matchingName === undefined) {
        return <Navigate to="/pageError404" replace={true} />;
    }

    
    return(
        <main className="membre-opened-card">
            <img tabIndex="0" src={process.env.PUBLIC_URL + matchingName.portraitM} alt={`portrait du membre ${matchingName.name}`} />
            <div className="membre-opened-card-text-div">
                <div className="membre-top-infos">
                    <h1 tabIndex="0">{matchingName.name}</h1>
                    <p tabIndex="0">{matchingName.bio1}</p>
                    {matchingName.bio2 !== "" ? (<p tabIndex="0"><br/>{matchingName.bio2}</p>) : null}
                    <span tabIndex="0"><br/>Spécialité(s)</span>
                    <p tabIndex="0">{matchingName.specialites}</p>
                </div>
                {matchingName.links.length > 0  ? ( 
                    <ul className='membre-links-list'>
                        <span tabIndex="0">Ses réseaux:</span>
                        {matchingName.links.map((link, index) => (<li tabIndex="0" key={index}>{link}</li>))}
                    </ul>
                ) : null}
                
                <Link to={"/membres"} className="membre-bouton-retour">
                    <span>Retour</span>
                </Link>
            </div>
        </main>
    )
}

export default MembreMobile;