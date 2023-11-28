import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { RxCross2 } from 'react-icons/rx';
import '../styles/Membres.css';

function MembreCard({membre}) {
  
    const [isDesktop, setIsDesktop] = useState(window.innerWidth > 1024);

    useEffect(() => {
        const handleResize = () => {
          setIsDesktop(window.innerWidth > 1024);
        };
    
        window.addEventListener('resize', handleResize);
    
        return () => {
          window.removeEventListener('resize', handleResize);
        };
    }, []);



    const [isTablet, setIsTablet] = useState(window.innerWidth <= 1024);

    useEffect(() => {
        const handleResize = () => {
          setIsTablet(window.innerWidth <= 1024);
        };
    
        window.addEventListener('resize', handleResize);
    
        return () => {
          window.removeEventListener('resize', handleResize);
        };
    }, []);


    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => {
          setIsMobile(window.innerWidth < 768);
        };
    
        window.addEventListener('resize', handleResize);
    
        return () => {
          window.removeEventListener('resize', handleResize);
        };
    }, []);



    const [cover, setCover] = useState(membre.cover);
    const [isCardOpen, setIsCardOpen] = useState(false);

    const handleHover = () => {
        setCover(membre.gif);
    };

    const handleNoHover = () => {
        setCover(membre.cover);
    };

    const handleCardClick = () => {
        setIsCardOpen(true);
    };

    const handleCardClose = () => {
        setIsCardOpen(false);
    };

    return(
        <>
            {isMobile ? (
                <Link to={`/membres/${membre.name}`} key={membre.id}>
                    <div tabIndex="0" id='trigger' role='button' aria-labelledby={`cliquer pour plus d'infos sur ${membre.name}`} aria-haspopup="true" aria-controls='popup' aria-expanded="false" key={membre.id} className="membre-card" onClick={handleCardClick}>
                        <img src={process.env.PUBLIC_URL + cover} alt={`illustration du membre ${membre.name}`} />
                        <h2>{membre.name}</h2>
                    </div>
                </Link>
            ) : (
                <div tabIndex="0" id='trigger' role='button' aria-labelledby={`cliquer pour plus d'infos sur ${membre.name}`} aria-haspopup="true" aria-controls='popup' aria-expanded="false" key={membre.id} className="membre-card" onMouseEnter={handleHover} onMouseLeave={handleNoHover} onClick={handleCardClick} >
                    <img src={process.env.PUBLIC_URL + cover} alt={`illustration du membre ${membre.name}`} />
                    <h2>{membre.name}</h2>
                </div>
            )}
            
            {isCardOpen && !isMobile && (
                <div tabIndex="0" id='popup' role='region' aria-labelledby="fenetre d'infos sur le membre cliqué" aria-label="cliquez n'importe où pour fermer cette fenêtre d'informations sur le membre" className='membre-clicked-div' onClick={handleCardClose}>
                    <div className="membre-opened-card">
                        {isDesktop ? (<RxCross2 className="closing-cross"/>) : null }
                        
                        {isTablet ? (<img tabIndex="0" src={process.env.PUBLIC_URL + membre.portraitM} alt={`portrait du membre ${membre.name}`} />) : (<img tabIndex="0" src={process.env.PUBLIC_URL + membre.portrait} alt={`portrait du membre ${membre.name}`} />)}
                        <div className="membre-opened-card-text-div">
                            <div className="membre-top-infos">
                                <h3 tabIndex="0">{membre.name}</h3>
                                <p tabIndex="0">{membre.bio1}</p>
                                {membre.bio2 !== "" ? (<p tabIndex="0"><br/>{membre.bio2}</p>) : null}
                                <span tabIndex="0"><br/>Spécialité(s)</span>
                                <p tabIndex="0">{membre.specialites}</p>
                            </div>
                            {membre.links.length > 0  ? ( 
                                <ul className='membre-links-list'>
                                    <span tabIndex="0">Ses réseaux:</span>
                                    {membre.links.map((link, index) => (<li tabIndex="0" key={index}>{link}</li>))}
                                </ul>
                            ) : null}
                            {isTablet && (
                                <div className="membre-bouton-retour">
                                    <span>Retour</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}    
        </> 
    ) 
}

export default MembreCard;