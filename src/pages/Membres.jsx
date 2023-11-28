import membresData from '../datas/membres.json';
import MembreCard from '../components/MembreCard';
import '../styles/Membres.css';

function Membres() {
  
    return(
        <main className="pink-border-main-div">
            <section className="membres-section">
                <h1 tabIndex="0" className="pink-titles">Nos Supreme Membres</h1>
                <p tabIndex="0" className="description-pages">Formé en 2017, le collectif se compose d'artistes, d'artisans et de designers. Aujourd'hui, l'équipe est composée de 11 membres dont la complémentarité des métiers permet une approche à 360° dans la réalisation de vos projets.</p>
                <div className="top-members-div">
                    {membresData.map((membre, index) => (
                        <MembreCard membre={membre} key={index}/>
                    ))}
                </div>
            </section>
        </main>
    )
}

export default Membres;