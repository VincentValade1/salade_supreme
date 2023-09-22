import '../styles/Services.css';
import ServiceCard from '../components/ServiceCard';
import services from '../datas/services.json';

function Services() {

    return(
        <main className="pink-border-main-div">
            <section className="services-section">
                <h1 tabIndex="0" className="pink-titles">Nos Supreme Services</h1>
                <p tabIndex="0" className="description-pages">Salade Suprême est un collectif créatif composé de designers, d'artistes et d'artisans. Ils/elles mettent leurs compétences en commun dans des projets aussi divers que leurs commanditaires. Des associations culturelles aux collectivités locales, en passant par les entreprises privées, le jeune collectif sait mettre à profit sa créativité à travers une approche éthique et responsable dans le but de promouvoir l'art et la culture.</p>
                <div className="all-services-card-div">
                    <div className="services-column-left">
                        <ServiceCard className="service-card-1" cover={services[0].graphisme.cover} coverAlt={services[0].graphisme.coverAlt} title={services[0].graphisme.title} description={services[0].graphisme.description} />
                        <ServiceCard className="service-card-2" cover={services[0].audiovisuel.cover} coverAlt={services[0].audiovisuel.coverAlt} title={services[0].audiovisuel.title} description={services[0].audiovisuel.description} />
                        <ServiceCard className="service-card-3" cover={services[0].streetart.cover} coverAlt={services[0].streetart.coverAlt} title={services[0].streetart.title} description={services[0].streetart.description} />    
                    </div>
                    <div className="services-column-right">
                        <ServiceCard className="service-card-4" cover={services[0].design.cover} coverAlt={services[0].design.coverAlt} title={services[0].design.title} description={services[0].design.description} />
                        <ServiceCard className="service-card-5" cover={services[0].scenographie.cover} coverAlt={services[0].scenographie.coverAlt} title={services[0].scenographie.title} description={services[0].scenographie.description} />
                        <ServiceCard className="service-card-6" cover={services[0].ateliers.cover} coverAlt={services[0].ateliers.coverAlt} title={services[0].ateliers.title} description={services[0].ateliers.description} />
                    </div>
                </div>
            </section>
        </main>
    )
}

export default Services