import '../styles/Projets.css'
import ProjetCard from '../components/ProjetCard';
import projetsData from '../datas/projetsData.json';
import { BsTriangleFill } from 'react-icons/bs';
 

function Projets() {

    return(
        <main className="pink-border-main-div">
            <section className='projets-section'>
                <h1 tabIndex="0" className="pink-titles">Nos Supreme Projets</h1>
                <p tabIndex="0" className='description-pages'>Né en 2017, Salade Suprême est un collectif de design global composé d'artistes, d'artisans et de designers. Il s'agit avant tout d'un réseau d'acteurs de la création qui se sont réunis sous un même nom afin d'unir leurs compétences pour mener des projets culturels et sociaux dans une approche résolument éthique.</p>
                <div className="projets-top-duo-div">
                    <ProjetCard className="projet-top-card" link='/projets/supreme-vitrines' cover={projetsData[0].vitrines.cover} coverM={projetsData[0].vitrines.coverM} altCover={projetsData[0].vitrines.altCover} title={projetsData[0].vitrines.title} theme={projetsData[0].vitrines.theme} />
                    <ProjetCard className="projet-top-card" link='/projets/mister-freeze' cover={projetsData[0].misterfreeze.cover} coverM={projetsData[0].misterfreeze.coverM} altCover={projetsData[0].misterfreeze.altCover} title={projetsData[0].misterfreeze.title} theme={projetsData[0].misterfreeze.theme} />
                </div>
                <div className="projets-scroll-div">
                    <span>Scroll pour explorer</span>
                    <BsTriangleFill className='scroll-icon'/>
                </div>
                <ProjetCard className="projet-large-card" link='/projets/colocations' cover={projetsData[0].colocations.cover} coverM={projetsData[0].colocations.coverM} altCover={projetsData[0].colocations.altCover} title={projetsData[0].colocations.title} theme={projetsData[0].colocations.theme} />
                <div className="projets-six-cards-div">
                    <ProjetCard link='/projets/identite' cover={projetsData[0].identite.cover} coverM={projetsData[0].identite.coverM} altCover={projetsData[0].identite.altCover} title={projetsData[0].identite.title} theme={projetsData[0].identite.theme} />
                    <ProjetCard link='/projets/alphabet' cover={projetsData[0].alphabet.cover} coverM={projetsData[0].alphabet.coverM} altCover={projetsData[0].alphabet.altCover} title={projetsData[0].alphabet.title} theme={projetsData[0].alphabet.theme} />
                    <ProjetCard link='/projets/ateliers' cover={projetsData[0].ateliers.cover} coverM={projetsData[0].ateliers.coverM} altCover={projetsData[0].ateliers.altCover} title={projetsData[0].ateliers.title} theme={projetsData[0].ateliers.theme} />
                    <ProjetCard link='/projets/fancy-fuzz' cover={projetsData[0].fancyfuzz.cover} coverM={projetsData[0].fancyfuzz.coverM} altCover={projetsData[0].fancyfuzz.altCover} title={projetsData[0].fancyfuzz.title} theme={projetsData[0].fancyfuzz.theme} />
                    <ProjetCard link='/projets/serigraphies' cover={projetsData[0].serigraphies.cover} coverM={projetsData[0].serigraphies.coverM} altCover={projetsData[0].serigraphies.altCover} title={projetsData[0].serigraphies.title} theme={projetsData[0].serigraphies.theme} />
                    <ProjetCard link='/projets/biennale' cover={projetsData[0].biennale.cover} coverM={projetsData[0].biennale.coverM} altCover={projetsData[0].biennale.altCover} title={projetsData[0].biennale.title} theme={projetsData[0].biennale.theme} />
                    <ProjetCard link='/projets/clutch' cover={projetsData[0].clutch.cover} coverM={projetsData[0].clutch.coverM} altCover={projetsData[0].clutch.altCover} title={projetsData[0].clutch.title} theme={projetsData[0].clutch.theme} />
                    <ProjetCard link='/projets/ecoConception' cover={projetsData[0].ecoConception.cover} coverM={projetsData[0].ecoConception.coverM} altCover={projetsData[0].ecoConception.altCover} title={projetsData[0].ecoConception.title} theme={projetsData[0].ecoConception.theme} />
                    <ProjetCard link='/projets/ozOccitanie' cover={projetsData[0].oz.cover} coverM={projetsData[0].oz.coverM} altCover={projetsData[0].oz.altCover} title={projetsData[0].oz.title} theme={projetsData[0].oz.theme} />
                </div>
            </section>
        </main>
    )
}

export default Projets;