import { useState, useEffect } from 'react';
import Loader from "../components/Loader";
import Carroussel from '../components/Caroussel';


function Accueil() {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    useEffect(() => {
        const handleResize = () => {
          setIsMobile(window.innerWidth <= 768);
        };
    
        window.addEventListener('resize', handleResize);
    
        return () => {
          window.removeEventListener('resize', handleResize);
        };
      }, []);

    // const [showLoader, setShowLoader] = useState(true);

    // useEffect(() => {
    //     setTimeout(() => {
    //         setShowLoader(false);
    //     }, 2000);
    // }, []);

    return(
        <>
            {/* {showLoader ? ( */}
            {/* ) : ( */}
                <main className="accueil-main-div">
                    <Loader />
                    <Carroussel />
                    {isMobile && (
                        <section className="confiance-mobile-section">
                            <h3 className="pink-titles">Ils nous ont fait confiance</h3>
                            {/* ajouter logos partenaires */}
                        </section>
                    )}
                </main>
            {/* )} */}
        </>  
    )
}

export default Accueil