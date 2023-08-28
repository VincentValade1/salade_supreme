import '../styles/Footer.css';
import { NavLink } from 'react-router-dom';
import { BsFacebook, BsLinkedin, BsTwitter, BsInstagram } from 'react-icons/bs';

function Footer() {
    return(
        <footer>
                <nav>
                    <NavLink tabindex="0" aria-label="lien vers page projets" activeclassname='active' to='/projets'>Projets</NavLink>
                    <NavLink tabindex="0" aria-label="lien vers page membres" activeclassname='active' to='/membres'>Membres</NavLink>
                    <NavLink tabindex="0" aria-label="lien vers page services" activeclassname='active' to='/services'>Services</NavLink>
                    <NavLink tabindex="0" aria-label="lien vers page contact" activeclassname='active' to='/contact'>Contact</NavLink>
                </nav>
                <span>©2023 SALADE SUPREME</span>
                <span>96 bis rue du général Bourbaki</span>
                <span>Toulouse 31200</span>
                <div className='social-div'>
                    <a tabindex="0" aria-label="lien vers page Facebook" href="https://www.facebook.com/profile.php?id=100066533031615" target="_blank" rel="noreferrer noopener" ><BsFacebook /></a>
                    <a tabindex="0" aria-label="lien vers page Linked in" href="https://www.facebook.com/profile.php?id=100066533031615" target="_blank" rel="noreferrer noopener" ><BsLinkedin /></a>
                    <a tabindex="0" aria-label="lien vers page Twitter" href="https://www.facebook.com/profile.php?id=100066533031615" target="_blank" rel="noreferrer noopener" ><BsTwitter /></a>
                    <a tabindex="0" aria-label="lien vers page Instagram" href="https://www.instagram.com/saladesupreme/" target="_blank" rel="noreferrer noopener" ><BsInstagram /></a>
                </div>
        </footer>
    )
}

export default Footer