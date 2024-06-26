import '../styles/Footer.css';
import { NavLink } from 'react-router-dom';
import { BsFacebook, BsLinkedin, BsInstagram } from 'react-icons/bs';
import React, { useState, useEffect } from 'react';


function Footer() {
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
    

    return(
        <footer>
                {!isMobile && (
                    <nav>
                        <NavLink tabIndex="0" aria-label="lien vers page Chez Babayage" activeclassname='active' to='/residences/babayaga'>Chez Babayaga</NavLink>
                        <NavLink tabIndex="0" aria-label="lien vers page projets" activeclassname='active' to='/projets'>Projets</NavLink>
                        <NavLink tabIndex="0" aria-label="lien vers page membres" activeclassname='active' to='/membres'>Membres</NavLink>
                        <NavLink tabIndex="0" aria-label="lien vers page services" activeclassname='active' to='/services'>Services</NavLink>
                        <NavLink tabIndex="0" aria-label="lien vers page contact" activeclassname='active' to='/contact'>Contact</NavLink>
                    </nav>
                )}
                
                <span>©2023 SALADE SUPREME</span>
                <span>96 bis rue du général Bourbaki</span>
                <span>Toulouse 31200</span>
                {!isMobile && (
                    <div className='social-div'>
                        <a tabIndex="0" aria-label="lien vers page Facebook" href="https://www.facebook.com/profile.php?id=100066533031615" target="_blank" rel="noreferrer noopener" ><BsFacebook /></a>
                        <a tabIndex="0" aria-label="lien vers page Linked in" href="https://www.linkedin.com/company/salade-supreme/" target="_blank" rel="noreferrer noopener" ><BsLinkedin /></a>
                        <a tabIndex="0" aria-label="lien vers page Instagram" href="https://www.instagram.com/saladesupreme/" target="_blank" rel="noreferrer noopener" ><BsInstagram /></a>
                    </div>
                )}  
        </footer>
    )
}

export default Footer