import { NavLink } from 'react-router-dom'
import { useState, useEffect } from 'react';

function ProjetCard({className, link, cover, coverM, altCover, title, theme }) {

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
        <div className={`projet-card ${className ? className : ''}`}>
            <NavLink tabIndex="0" aria-label={`lien vers page ${theme}`} to={link} >
                {isMobile ? (<img src={process.env.PUBLIC_URL + coverM} alt={altCover} />) : (<img src={process.env.PUBLIC_URL + cover} alt={altCover} />)}
                <div className="projet-card-infos">
                    <h2 tabIndex="0">{title}</h2>
                    <h3 tabIndex="0">{theme}</h3>
                </div>
            </NavLink>
        </div>       
    )
}

export default ProjetCard;