
import Loader from "../components/Loader";
import Carroussel from '../components/Caroussel';
import logosPartners from '../datas/logosPartners.json';
import '../styles/Accueil.css';


function Accueil() {

    
    return(
        <>
            <main className="accueil-main-div">
                <Loader />
                <Carroussel />
                <section className="partner-logos-section">
                    <h3 className="pink-titles">Ils nous ont fait confiance</h3>
                    <div className="partner-logos">
                        {logosPartners.map((image, index) => (
                            <img key={index} src={process.env.PUBLIC_URL + image} alt={`logo partenaire ${index}`} />
                        ))}
                    </div>
                </section>
            </main>
        </>  
    )
}

export default Accueil