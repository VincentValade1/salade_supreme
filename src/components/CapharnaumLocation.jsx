import { FaMapMarkerAlt, FaRoute } from 'react-icons/fa';

function CapharnaumLocation({ location }) {
    const mapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${location.longitude - 0.012}%2C${location.latitude - 0.008}%2C${location.longitude + 0.012}%2C${location.latitude + 0.008}&layer=mapnik&marker=${location.latitude}%2C${location.longitude}`;
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${location.latitude},${location.longitude}`;
    const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${location.latitude},${location.longitude}`;

    return (
        <div className="capharnaum-location-layout">
            <div className="capharnaum-map-wrapper">
                <iframe
                    className="capharnaum-map"
                    title="Carte du Capharnaum et des transports proches"
                    src={mapUrl}
                    loading="lazy"
                />
                <a className="capharnaum-map-link" href={location.mapLink} target="_blank" rel="noreferrer noopener">
                    Ouvrir dans OpenStreetMap
                </a>
            </div>
            <div className="capharnaum-map-actions">
                <a href={mapsUrl} target="_blank" rel="noreferrer noopener" aria-label="Voir le Capharnaum dans Google Maps">
                    <FaMapMarkerAlt aria-hidden="true" />
                    <span>Google Maps</span>
                </a>
                <a href={directionsUrl} target="_blank" rel="noreferrer noopener" aria-label="Calculer un itinéraire vers le Capharnaum">
                    <FaRoute aria-hidden="true" />
                    <span>Calculer l’itinéraire</span>
                </a>
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
