import '../styles/ExtraProjetContentDescription.css';

function ExtraProjetContentDescription({ extraProjetContentDescriptionTitle, extraProjetContentDescriptionText }) {
    // Vérification que le titre et le texte ne sont pas vides ou nuls
    if (extraProjetContentDescriptionTitle && extraProjetContentDescriptionText !== null) {
        return (
            <div className="extra-projet-content-description-div">
                <h3>{extraProjetContentDescriptionTitle}</h3>
                <p>{extraProjetContentDescriptionText}</p>
            </div>
        );
    }
    
    // Optionnel: retourner `null` ou un message vide si les données sont manquantes
    return null;
}

export default ExtraProjetContentDescription;