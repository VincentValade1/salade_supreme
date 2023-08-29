function ServiceCard ({ service }) {
    return(
        <div className="service-card">
            <img tabIndex="0" src={service.cover} alt={service.coverAlt} />
            <div className="service-card-text-div">
                <h2 tabIndex="0">{service.title}</h2>
                <p tabIndex="0">{service.description}</p>
            </div>
        </div>
    )
}

export default ServiceCard;