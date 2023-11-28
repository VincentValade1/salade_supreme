
import Loader from "../components/Loader";
import Carroussel from '../components/Caroussel';
import logosPartners from '../datas/logosPartners.json';
import '../styles/Accueil.css';
import { useEffect, useState } from "react";
import { IoColorPaletteSharp } from "react-icons/io5";


function Accueil() {
    const [showFloatingDiv, setShowFloatingDiv] = useState(false);

  useEffect(() => {
    const delayToCheckStyles = 3000;

    const checkStyles = () => {
      const rootElement = document.querySelector(".accueil-main-div"); // Sélectionnez l'élément racine ou l'élément que vous souhaitez inspecter
      const computedStyles = window.getComputedStyle(rootElement);

      // Vérifiez si les styles sont différents de ceux attendus
      const backgroundColor = computedStyles.backgroundColor;
      const expectedBackgroundColor = "rgb(255, 255, 255)"; // Blanc

      if (backgroundColor !== expectedBackgroundColor) {
        setShowFloatingDiv(true);
      }
    };

    // Attendre 3 secondes après le chargement complet de la page avant de vérifier les styles
    setTimeout(checkStyles, delayToCheckStyles);

    // Ajouter un écouteur pour détecter les changements ultérieurs
    window.addEventListener("resize", checkStyles); // Vous pouvez utiliser un autre événement pertinent pour votre cas

    // Nettoyer l'écouteur lors du démontage du composant
    return () => {
      window.removeEventListener("resize", checkStyles);
    };
  }, []);

  const closeFloatingDiv = () => {
    setShowFloatingDiv(false);
  };
    
    
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

                {showFloatingDiv && (
                    <div className="dark-mode-alert-div">
                        <IoColorPaletteSharp className="palette-icon"/>
                        <p>Un mode d'affichage personnalisé est activé et n'est pas encore pris en charge par l'application.</p> 
                        <p>Pour une meilleure expérience, nous vous conseillons de le désactiver.</p>
                        <button onClick={closeFloatingDiv}>Fermer</button>
                    </div>
                )}
            </main>
        </>  
    )
}

export default Accueil;