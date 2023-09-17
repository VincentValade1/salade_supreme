import '../styles/Header.css'
import { Link, NavLink } from 'react-router-dom';
import { useState } from 'react';
import logo from '../assets/picto-logo.jpg';
import { FaBars } from 'react-icons/fa';

function Header() {
    const [ showMenu, setShowMenu ] = useState(false);

    const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

    return (
       <header>
           <Link tabIndex="0" aria-label="lien vers page accueil" to='/' className='logo-accueil'>
                <img src={logo} alt='logo accueil' className='home-logo' />
            </Link>
            <button tabIndex="0"aria-roledescription='bouton qui ouvre les liens de navigations de pages' className='menu-toggle' onClick={toggleMenu}>
                <FaBars />
            </button>
            <nav className={` ${showMenu ? 'active-toggle-menu' : ''}`}onClick={toggleMenu}>
                <NavLink tabIndex="0" aria-label="lien vers page projets" activeclassname='active-toggle-menu' to='/projets'>Projets</NavLink>
                <NavLink tabIndex="0" aria-label="lien vers page membres" activeclassname='active-toggle-menu' to='/membres'>Membres</NavLink>
                <NavLink tabIndex="0" aria-label="lien vers page services" activeclassname='active-toggle-menu' to='/services'>Services</NavLink>
                <NavLink tabIndex="0" aria-label="lien vers page contact" activeclassname='active-toggle-menu' to='/contact'>Contact</NavLink>
            </nav>
       </header> 
    )
}

export default Header