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
            <div key={membre.id} className="membre-card" onMouseEnter={handleHover} onMouseLeave={handleNoHover} onClick={handleCardClick} >
                <img src={cover} alt={`illustration du membre ${membre.name}`} />
                <h2>{membre.name}</h2>
            </div>

            {isCardOpen && (
                <div className='membre-clicked-div' onClick={handleCardClose}>
                    <div className="membre-opened-card">
                        <RxCross2 className="closing-cross"/>
                        <img src={membre.portrait} alt={`portrait du membre ${membre.name}`} />
                        <div className="membre-opened-card-text-div">
                            <div className="membre-top-infos">
                                <h3>{membre.name}</h3>
                                <p>{membre.bio1}</p>
                                {membre.bio2 !== "" ? (
                                    <p><br/>{membre.bio2}</p>
                                ) : null}
                                <span><br/>Spécialité(s)</span>
                                <p>{membre.specialites}</p>
                            </div>
                            {membre.links.length > 0  ? ( 
                                <ul className='membre-links-list'>
                                    <span>Ses réseaux:</span>
                                    {membre.links.map((link, index) => (
                                        <li key={index}>{link}</li>
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