import '../styles/Header.css'
import { Link, NavLink } from 'react-router-dom';
import logo from '../assets/picto-logo.png';

function Header() {
    return (
       <header>
           <Link tabindex="0" aria-label="lien vers page accueil" to='/'>
                <img src={logo} alt='logo accueil' className='home-logo' />
            </Link>
            <nav>
                <NavLink tabindex="0" aria-label="lien vers page projets" activeclassname='active' to='/projets'>Projets</NavLink>
                <NavLink tabindex="0" aria-label="lien vers page membres" activeclassname='active' to='/membres'>Membres</NavLink>
                <NavLink tabindex="0" aria-label="lien vers page services" activeclassname='active' to='/services'>Services</NavLink>
                <NavLink tabindex="0" aria-label="lien vers page contact" activeclassname='active' to='/contact'>Contact</NavLink>
            </nav>
       </header> 
    )
}

export default Header