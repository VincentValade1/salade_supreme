import '../styles/Services.css';
import ServiceCard from '../components/ServiceCard';
import services from '../datas/services.json';

function Services() {
    const threeFirstServices = services.slice(0, 3);
    const threeLastServices = services.slice(3);

    return(
        <main className="pink-border-main-div">
            <section className="services-section">
                <h1 tabIndex="0" className="pink-titles">Nos Supreme Services</h1>
                <p tabIndex="0" className="description-pages">Salade Suprême est un collectif créatif composé de designers, d'artistes et d'artisans. Ils/elles mettent leurs compétences en commun dans des projets aussi divers que leurs commanditaires. Des associations culturelles aux collectivités locales, en passant par les entreprises privées, le jeune collectif sait mettre à profit sa créativité à travers une approche éthique et responsable dans le but de promouvoir l'art et la culture.</p>
                <div className="all-services-card-div">
                    <div className="services-column">
                        {threeFirstServices.map((service, index) => (
                            <ServiceCard service={service} key={index}/>
                        ))}
                    </div>
                    <div className="services-column">
                        {threeLastServices.map((service, index) => (
                            <ServiceCard service={service} key={index}/>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    )
}

export default Services