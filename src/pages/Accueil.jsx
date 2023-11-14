// import { useState, useEffect } from 'react';
import Loader from "../components/Loader";
import Carroussel from '../components/Caroussel';
import logosPartners from '../datas/logosPartners.json';
import '../styles/Accueil.css';


function Accueil() {
    // const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    // useEffect(() => {
    //     const handleResize = () => {
    //       setIsMobile(window.innerWidth <= 768);
    //     };
    
    //     window.addEventListener('resize', handleResize);
    
    //     return () => {
    //       window.removeEventListener('resize', handleResize);
    //     };
    //   }, []);

    
    return(
        <>
            <main className="accueil-main-div">
                <Loader />
                <Carroussel />
                <section className="partner-logos-section">
                    <h3 className="pink-titles">Ils nous ont fait confiance</h3>
                    <div className="partner-logos">
                        {logosPartners.map((image, index) => (
                            <img key={index} src={image} alt={`logo partenaire ${index}`} />
                        ))}
                    </div>
                </section>
            </main>
        </>  
    )
}

export default Accueil