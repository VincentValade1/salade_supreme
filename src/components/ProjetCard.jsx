import { NavLink } from 'react-router-dom'

function ProjetCard({className, link, cover, altCover, title, theme }) {
    return(
        <div className={`projet-card ${className ? className : ''}`}>
            <NavLink tabindex="0" aria-label={`lien vers page ${theme}`} to={link} >
                <img src={cover} alt={altCover} />
                <div className="projet-card-infos">
                    <h2 tabindex="0">{title}</h2>
                    <h3 tabindex="0">{theme}</h3>
                </div>
            </NavLink>
        </div>       
    )
}

export default ProjetCard;