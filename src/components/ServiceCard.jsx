function ServiceCard ({ service }) {
    return(
        <div className="service-card">
            <img src={service.cover} alt={service.coverAlt} />
            <div className="service-card-text-div">
                <h2>{service.title}</h2>
                <p>{service.description}</p>
            </div>
        </div>
    )
}

export default ServiceCard;