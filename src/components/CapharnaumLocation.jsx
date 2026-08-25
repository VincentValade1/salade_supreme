function CapharnaumLocation({ location }) {
    const mapUrl = `https://www.google.com/maps?q=${location.latitude},${location.longitude}&z=17&output=embed`;

    return (
        <div className="capharnaum-location-layout">
            <div className="capharnaum-map-wrapper">
                <iframe
                    className="capharnaum-map"
                    title="Carte Google Maps du Capharnaum et des transports proches"
                    src={mapUrl}
                    loading="lazy"
                />
            </div>
            <div className="capharnaum-transports">
                <p className="capharnaum-transports__label">Transports proches</p>
                {location.transports.map((transport) => (
                    <div className="capharnaum-transport" key={`${transport.type}-${transport.name}`}>
                        <span className="capharnaum-transport__type">{transport.type}</span>
                        <span>
                            <strong>{transport.name}</strong>
                            <small>{transport.distance}</small>
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CapharnaumLocation;
