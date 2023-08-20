import '../styles/Footer.css';
import { NavLink } from 'react-router-dom';
import facebookLogo from '../assets/facebookLogo.png';
import linkedInLogo from '../assets/linkedInLogo.png';
import logoTwitter from '../assets/logoTwitter.png';
import logoInstagram from '../assets/logoInstagram.png'

function Footer() {
    return(
        <footer>
                <nav>
                    <NavLink activeclassname='active' to='/projets'>Projets</NavLink>
                    <NavLink activeclassname='active' to='/membres'>Membres</NavLink>
                    <NavLink activeclassname='active' to='/services'>Services</NavLink>
                    <NavLink activeclassname='active' to='/contact'>Contact</NavLink>
                </nav>
                <span>©2023 SALADE SUPREME</span>
                <span>96 bis rue du général Bourbaki</span>
                <span>Toulouse 31200</span>
                <div className='footer-social-div'>
                    <a href="https://www.facebook.com/profile.php?id=100066533031615" target="_blank" rel="noreferrer noopener" ><img src={facebookLogo} alt="lien facebook" /></a>
                    <a href="https://www.facebook.com/profile.php?id=100066533031615" target="_blank" rel="noreferrer noopener" ><img src={linkedInLogo} alt="lien linked in" /></a>
                    <a href="https://www.facebook.com/profile.php?id=100066533031615" target="_blank" rel="noreferrer noopener" ><img src={logoTwitter} alt="lien twitter" /></a>
                    <a href="https://www.instagram.com/saladesupreme/" target="_blank" rel="noreferrer noopener" ><img src={logoInstagram} alt="lien instagram" /></a>
                </div>
        </footer>
    )
}

export default Footer