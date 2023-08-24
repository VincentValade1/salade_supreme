import '../styles/Projets.css'
import { NavLink } from 'react-router-dom';

function Projets() {
    return(
        <main className="pink-border-main-div">
            <section className='section-projets'>
                <h1 className="pink-titles">Nos Supreme Projets</h1>
                <p>Né en 2017, Salade Suprême est un collectif de design global composé d'artistes, d'artisans et de designers. Il s'agit avant tout d'un réseau d'acteurs de la création qui se sont réunis sous un même nom afin d'unir leurs compétences pour mener des projets culturels et sociaux dans une approche résolument éthique.</p>
                <NavLink to='/projets/supreme-vitrines'>Vitrines</NavLink>
                <NavLink to='/projets/mister-freeze'>MisterFreeze</NavLink>
                <NavLink to='/projets/colocations'>Colocations</NavLink>
                <NavLink to='/projets/identite'>Identite</NavLink>
                <NavLink to='/projets/alphabet'>Alphabet</NavLink>
                <NavLink to='/projets/ateliers'>Ateliers</NavLink>
                <NavLink to='/projets/fancy-fuzz'>Fancy Fuzz</NavLink>
                
            </section>
        </main>
    )
}

export default Projets