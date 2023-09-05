import '../styles/Header.css'
import { Link, NavLink } from 'react-router-dom';
import { useState } from 'react';
import logo from '../assets/picto-logo.png';
import { FaBars } from 'react-icons/fa';

function Header() {
    const [ showMenu, setShowMenu ] = useState(false);

    const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

    return (
       <header>
           <Link tabIndex="0" aria-label="lien vers page accueil" to='/'>
                <img src={logo} alt='logo accueil' className='home-logo' />
            </Link>
            <button tabIndex="0"aria-roledescription='bouton qui ouvre les liens de navigations de pages' className='menu-toggle' onClick={toggleMenu}>
                <FaBars />
            </button>
            <nav className={` ${showMenu ? 'active' : ''}`}onClick={toggleMenu}>
                <NavLink tabIndex="0" aria-label="lien vers page projets" activeclassname='active' to='/projets'>Projets</NavLink>
                <NavLink tabIndex="0" aria-label="lien vers page membres" activeclassname='active' to='/membres'>Membres</NavLink>
                <NavLink tabIndex="0" aria-label="lien vers page services" activeclassname='active' to='/services'>Services</NavLink>
                <NavLink tabIndex="0" aria-label="lien vers page contact" activeclassname='active' to='/contact'>Contact</NavLink>
            </nav>
       </header> 
    )
}

export default Header