import membresData from '../datas/membres.json';
import MembreCard from '../components/MembreCard';
import '../styles/Membres.css';

function Membres() {
    const fiveFirstMembers = membresData.slice(0, 5);
    const fiveLastMembers = membresData.slice(5);
    

    return(
        <main className="pink-border-main-div">
            <section className="membres-section">
                <h1 tabIndex="0" className="pink-titles">Nos Supreme Membres</h1>
                <p tabIndex="0" className="description-pages">Salade Suprême est un collectif formé en 2017 par de jeunes artistes, artisans et designers. L'objectif était de réunir un réseau d'acteur.ice.s de la création afin d'unir leurs compétences pour mener des projets culturels et sociaux ambitieux dans une démarche collaborative. Aujourd'hui, l'équipe est composée de 11 membres dont la complémentarité des métiers apporte une grande polyvalence au collectif.</p>
                <div className="top-members-div">
                    {fiveFirstMembers.map((membre, index) => (
                        <MembreCard membre={membre} key={index}/>
                    ))}
                </div>
                <div className="bottom-members-div">
                    {fiveLastMembers.map((membre, index) => (
                        <MembreCard membre={membre} key={index}/>
                    ))}
                </div>
            </section>
        </main>
    )
}

export default Membres