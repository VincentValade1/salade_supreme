import '../styles/Header.css'
import { Link, NavLink } from 'react-router-dom';
import logo from '../assets/picto-logo.png';

function Header() {
    return (
       <header>
           <Link to='/'>
                <img src={logo} alt='logo accueil' className='home-logo' />
            </Link>
            <nav>
                <NavLink activeclassname='active' to='/projets'>Projets</NavLink>
                <NavLink activeclassname='active' to='/membres'>Membres</NavLink>
                <NavLink activeclassname='active' to='/services'>Services</NavLink>
                <NavLink activeclassname='active' to='/contact'>Contact</NavLink>
            </nav>
       </header> 
    )
}

export default Header