import '../styles/SupremeActu.css';
import BlueButton from '../components/BlueButton';

function SupremeActu({supremeActuPicture, supremeActuPictureAlt, className}) {
    const NewsLetterLinkLign = <a tabIndex="0" aria-label="lien vers adhésion newsletter" href="https://6e65faf1.sibforms.com/serve/MUIFAGMp_KiPP0StQaUKx7njrV9tz6oYXMfYJgYkSoeBB2f8paUf7KnYtum0it7D9jDeKlbIsGhPfdwYq51TWeBGXQ5nYlBSyCe-Lgr3Cg3qoq26CiwcmBZJ9CsDQ5eLrmJbOyKRNavPg2-I9xJMtUBOxG3zvIdwaXQbPV_J6p6yLLoORpZGUetShXfPwdCm2j7IucBkccQCOTa7" target="_blank" rel="noreferrer noopener" >Je m'abonne !</a>;

    if (supremeActuPicture && supremeActuPictureAlt !== null) {
        return (
            <div className={`supreme-actu-div ${className ? className : ''}`}>
                <div className="supreme-actu-picture">
                    <img src={supremeActuPicture} alt={supremeActuPictureAlt} />
                </div>
                <div className="supreme-actu-text-div">
                    <h4 tabIndex="0">La Suprême Actu</h4>
                    <p>Abonnez-vous à notre newsletter pour ne pas manquer nos offres exclusives et l'actualité des prochains projets !</p>
                    <BlueButton blueButtonLinkLign={NewsLetterLinkLign} />
                </div>
            </div>
        )
    }
    return null;
}

export default SupremeActu;