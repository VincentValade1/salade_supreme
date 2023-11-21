import '../styles/Contact.css';
import '../index.css';
import { useRef } from "react";
import emailjs from '@emailjs/browser';
import { BsFacebook, BsLinkedin, BsInstagram, BsEnvelopeFill, BsFillTelephoneFill } from 'react-icons/bs';

function Contact() {

    const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault();
    
        // connecter email services sur email.js avec Quentin, utiliser clé .env
        emailjs.sendForm('service_z849imd', 'template_6zs4w09', form.current, '9_VmHf0637H0rqZ24')
          .then((result) => {
              console.log(result.text);
          }, (error) => {
              console.log(error.text);
          });
          e.target.reset();
      };

    return(
        <main className="pink-border-main-div">
            <div className="contact-main-div">
                <h1 tabIndex="0" className='pink-titles'>Contact</h1>
                <section className="contact-map-section">
                    <div className='contact-div'>
                        <h2 tabIndex="0">Nous contacter</h2>
                        <span tabIndex="0" className='contact-icon'><BsEnvelopeFill /> contact@saladesupreme.fr</span>
                        <div className="tel-socialmedia-div">
                            <span tabIndex="0" className='contact-icon'><BsFillTelephoneFill /> 07 86 50 32 06</span>
                            <div className='social-div'>
                                <a tabIndex="0" aria-label="lien vers page Facebook" href="https://www.facebook.com/profile.php?id=100066533031615" target="_blank" rel="noreferrer noopener" ><BsFacebook /></a>
                                <a tabIndex="0" aria-label="lien vers page Linked in" href="https://www.linkedin.com/company/salade-supreme/" target="_blank" rel="noreferrer noopener" ><BsLinkedin /></a>
                                <a tabIndex="0" aria-label="lien vers page Instagram" href="https://www.instagram.com/saladesupreme/" target="_blank" rel="noreferrer noopener" ><BsInstagram /></a>
                            </div>
                        </div>
                        <div className="contact-form-div">
                            <div className="form-header-div">
                                <h2 tabIndex="0">Un message ?</h2>
                                <span tabIndex="0">*Mandatoire</span>
                            </div>
                            <form ref={form} onSubmit={sendEmail} className="contact-form">
                                <input tabIndex="0" aria-label="champ de saisie nom" type="text" placeholder="*Nom" name="user_last_name" required />
                                <input tabIndex="0" aria-label="champ de saisie prénom" type="text" placeholder="*Prénom" name="user_first_name" required />
                                <input tabIndex="0" aria-label="champ de saisie numéro de téléphone, non obligatoire" type="text" placeholder="Numéro de téléphone" name="user_phone_number" />
                                <input tabIndex="0" aria-label="champ de saisie email" type="email" placeholder="*Email" name="user_email" required />
                                <textarea tabIndex="0" aria-label="champ de saisie message, non obligatoire" placeholder="Un petit message ?" name="message"></textarea>
                                <button tabIndex="0" aria-label="bouton pour envoyer le formulaire" type="submit" className="btn-submit">Envoyer</button>
                            </form>
                        </div>
                    </div>
                    <div className="map-div">
                        <h2 tabIndex="0">Où nous trouver ?</h2>
                        <span tabIndex="0">96 bis rue du Général Bourbaki</span>
                        <span tabIndex="0">31200 Toulouse</span>
                        <span tabIndex="0">France</span>
                        <div tabIndex="0" className="map">
                            <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7595.175015356029!2d1.4320169363357982!3d43.622303604946616!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12aebbdd8e5ef04d%3A0xd10c33d8ae79d646!2sSalade%20Supr%C3%AAme!5e0!3m2!1sfr!2sfr!4v1700587913054!5m2!1sfr!2sfr"
                                title="salade supreme adresse"
                                loading="chargement" 
                                referrerPolicy="no-referrer-when-downgrade">
                            </iframe>
                        </div>
                    </div>
                </section>
                <p tabIndex="0">Salade Supreme se réserve tous les droits concernant l'utilisation des différents documents et autres créations faites par Salade Supreme. Il est donc impossible de réutiliser le contenu de ce site à des fins personnelles.</p>
            </div> 
        </main>
    )
}

export default Contact