function ServiceCard ({ className, cover, coverAlt, title, description }) {
    return(
        <div className={`service-card ${className ? className : ''}`}>
            <img tabIndex="0" src={process.env.PUBLIC_URL + cover} alt={coverAlt} />
            <div className="service-card-text-div">
                <h2 tabIndex="0">{title}</h2>
                <p tabIndex="0">{description}</p>
            </div>
        </div>
    )
}

export default ServiceCard;