import '../styles/Header.css'
import { Link, NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { FaBars } from 'react-icons/fa';
import { BsFacebook, BsLinkedin, BsInstagram } from 'react-icons/bs';


function Header() {
    const [ showMenu, setShowMenu ] = useState(false);

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    const closeMenu = () => {
        setShowMenu(false);
    }

    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    useEffect(() => {
        const handleResize = () => {
          setIsMobile(window.innerWidth <= 768);
        };
    
        window.addEventListener('resize', handleResize);
    
        return () => {
          window.removeEventListener('resize', handleResize);
        };
    }, []);

    const homeLogo = process.env.PUBLIC_URL + "/images/picto-logo.jpg";

    return (
       <header>
           <Link tabIndex="0" aria-label="lien vers page accueil" to='/' className='logo-accueil' onClick={closeMenu}>
                <img src={homeLogo} alt='logo accueil' className='home-logo' />
            </Link>
            <button tabIndex="0"aria-roledescription='bouton qui ouvre les liens de navigations de pages' className='menu-toggle' onClick={toggleMenu}>
                <FaBars />
            </button>
            <nav className={`${showMenu ? 'active-toggle-menu' : 'nav-menu'}`}onClick={toggleMenu}>
                <div className="active-toggle-menu-links-div">
                    <NavLink tabIndex="0" aria-label="lien vers page projets" to='/projets'className="menu-toggle-link">Projets</NavLink>
                    <NavLink tabIndex="0" aria-label="lien vers page membres" to='/membres' className="menu-toggle-link">Membres</NavLink>
                    <NavLink tabIndex="0" aria-label="lien vers page services" to='/services' className="menu-toggle-link">Services</NavLink>
                    <NavLink tabIndex="0" aria-label="lien vers page contact" to='/contact' className="menu-toggle-link">Contact</NavLink>
                </div>
                {isMobile && (
                    <div className='social-div'>
                        <a tabIndex="0" aria-label="lien vers page Facebook" href="https://www.facebook.com/profile.php?id=100066533031615" ><BsFacebook /></a>
                        <a tabIndex="0" aria-label="lien vers page Linked in" href="https://www.linkedin.com/company/salade-supreme/" ><BsLinkedin /></a>
                        <a tabIndex="0" aria-label="lien vers page Instagram" href="https://www.instagram.com/saladesupreme/" ><BsInstagram /></a>
                    </div>
                )}  
            </nav>
       </header> 
    )
}

export default Header