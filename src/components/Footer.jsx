import '../styles/Footer.css';
import { NavLink } from 'react-router-dom';
import { BsFacebook, BsLinkedin, BsTwitter, BsInstagram } from 'react-icons/bs';

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
                <div className='social-div'>
                    <a href="https://www.facebook.com/profile.php?id=100066533031615" target="_blank" rel="noreferrer noopener" ><BsFacebook /></a>
                    <a href="https://www.facebook.com/profile.php?id=100066533031615" target="_blank" rel="noreferrer noopener" ><BsLinkedin /></a>
                    <a href="https://www.facebook.com/profile.php?id=100066533031615" target="_blank" rel="noreferrer noopener" ><BsTwitter /></a>
                    <a href="https://www.instagram.com/saladesupreme/" target="_blank" rel="noreferrer noopener" ><BsInstagram /></a>
                </div>
        </footer>
    )
}

export default Footer