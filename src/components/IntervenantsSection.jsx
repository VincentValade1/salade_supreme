import { BsInstagram } from 'react-icons/bs';

function getInstagramUsername(instagramUrl) {
    try {
        const username = new URL(instagramUrl).pathname.split('/').filter(Boolean)[0];
        return username ? `@${username}` : instagramUrl;
    } catch {
        return instagramUrl;
    }
}

function IntervenantsSection({ intervenants }) {
    return (
        <section className="capharnaum-intervenants" aria-labelledby="capharnaum-intervenants-title">
            <h2 id="capharnaum-intervenants-title" className="capharnaum-intervenants__title">
                Les intervenants
            </h2>
            <div className="capharnaum-intervenants__grid">
                {intervenants.map((intervenant) => (
                    <article key={intervenant.id} className="capharnaum-intervenant-card">
                        <h3 className="capharnaum-intervenant-card__name">{intervenant.name}</h3>
                        <p className="capharnaum-intervenant-card__bio">{intervenant.bio}</p>
                        {intervenant.instagram && (
                            <a
                                className="capharnaum-intervenant-card__instagram"
                                href={intervenant.instagram}
                                target="_blank"
                                rel="noreferrer noopener"
                                aria-label={`Instagram de ${intervenant.name}`}
                            >
                                <BsInstagram aria-hidden="true" />
                                <span>{getInstagramUsername(intervenant.instagram)}</span>
                            </a>
                        )}
                    </article>
                ))}
            </div>
        </section>
    );
}

export default IntervenantsSection;