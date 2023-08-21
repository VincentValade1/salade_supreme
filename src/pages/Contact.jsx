import '../styles/Contact.css';
import '../index.css';
import { useRef } from "react";
import emailjs from '@emailjs/browser';
import { BsFacebook, BsLinkedin, BsTwitter, BsInstagram } from 'react-icons/bs';

function Contact() {

    const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault();
    
        emailjs.sendForm('service_annz57k', 'template_qguk1x9', form.current, 'IO6vKSDtSLpBxHqQW')
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
                <h1 className='pink-titles'>Contact</h1>
                <section className="contact-map-section">
                    <div className='contact-div'>
                        <h2>Nous contacter</h2>
                        <span>@: contact@saladesupreme.fr</span>
                        <div className="tel-socialmedia-div">
                            <span>Tél: 07 86 50 32 06</span>
                            <div className='social-div'>
                                <a href="https://www.facebook.com/profile.php?id=100066533031615" target="_blank" rel="noreferrer noopener" ><BsFacebook /></a>
                                <a href="https://www.facebook.com/profile.php?id=100066533031615" target="_blank" rel="noreferrer noopener" ><BsLinkedin /></a>
                                <a href="https://www.facebook.com/profile.php?id=100066533031615" target="_blank" rel="noreferrer noopener" ><BsTwitter /></a>
                                <a href="https://www.instagram.com/saladesupreme/" target="_blank" rel="noreferrer noopener" ><BsInstagram /></a>
                            </div>
                        </div>
                        <div className="contact-form-div">
                            <div className="form-header-div">
                                <h2>Un message ?</h2>
                                <span>*Mandatoire</span>
                            </div>
                            <form ref={form} onSubmit={sendEmail} className="contact-form">
                                <input type="text" placeholder="*Nom" name="user_last_name" required />
                                <input type="text" placeholder="*Prénom" name="user_first_name" required />
                                <input type="text" placeholder="Numéro de téléphone" name="user_phone_number" />
                                <input type="email" placeholder="*Email" name="user_email" required />
                                <textarea placeholder="Un petit message ?" name="message"></textarea>
                                <button type="submit" className="btn-submit">Envoyer</button>
                            </form>
                        </div>
                    </div>
                    <div className="map-div">
                        <h2>Où nous trouver ?</h2>
                        <span>96 bis rue du Général Bourbaki</span>
                        <span>31200 Toulouse</span>
                        <span>France</span>
                        <div className="map"></div>
                    </div>
                </section>
                <p>Salade Supreme se réserve tous les droits concernant l'utilisation des différents documents et autres créations faites par Salade Supreme. Il est donc impossible de réutiliser le contenu de ce site à des fins personnelles.</p>
            </div> 
        </main>
    )
}

export default Contact