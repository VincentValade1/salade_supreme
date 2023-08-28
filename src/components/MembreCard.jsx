import { useState } from 'react';
import { RxCross2 } from 'react-icons/rx';
import '../styles/Membres.css';

function MembreCard({membre}) {
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
            <div tabindex="0" id='trigger' role='button' aria-labelledby={`cliquer pour plus d'infos sur ${membre.name}`} aria-haspopup="true" aria-controls='popup' aria-expanded="false" key={membre.id} className="membre-card" onMouseEnter={handleHover} onMouseLeave={handleNoHover} onClick={handleCardClick} >
                <img src={cover} alt={`illustration du membre ${membre.name}`} />
                <h2>{membre.name}</h2>
            </div>

            {isCardOpen && (
                <div tabindex="0" id='popup' role='region' aria-labelledby="fenetre d'infos sur le membre cliqué" aria-label="cliquez n'importe où pour fermer cette fenêtre d'informations sur le membre" className='membre-clicked-div' onClick={handleCardClose}>
                    <div className="membre-opened-card">
                        <RxCross2 className="closing-cross"/>
                        <img tabindex="0" src={membre.portrait} alt={`portrait du membre ${membre.name}`} />
                        <div className="membre-opened-card-text-div">
                            <div className="membre-top-infos">
                                <h3 tabindex="0">{membre.name}</h3>
                                <p tabindex="0">{membre.bio1}</p>
                                {membre.bio2 !== "" ? (
                                    <p tabindex="0"><br/>{membre.bio2}</p>
                                ) : null}
                                <span tabindex="0"><br/>Spécialité(s)</span>
                                <p tabindex="0">{membre.specialites}</p>
                            </div>
                            {membre.links.length > 0  ? ( 
                                <ul className='membre-links-list'>
                                    <span tabindex="0">Ses réseaux:</span>
                                    {membre.links.map((link, index) => (
                                        <li tabindex="0" key={index}>{link}</li>
                                    ))}
                                </ul>
                            ) : null}
                        </div>
                    </div>
                </div>
            )}
            </>
        
    )
}

export default MembreCard;