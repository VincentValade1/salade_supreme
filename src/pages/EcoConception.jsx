import ProjetModel from "../components/ProjetModel";
import projetsData from '../datas/projetsData.json';
import ProjetModel123 from "../components/ProjetModel123";
import '../styles/ProjetModel.css';


function EcoConception() {

    return (
        <main>
            {projetsData.map(( data ) =>
                (
                    <ProjetModel key={data.ecoConception.title} bannerImg={data.ecoConception.bannerImg} bannerImgM={data.ecoConception.bannerImgM} altBannerImg={data.ecoConception.altBannerImg} title={data.ecoConception.title} theme={data.ecoConception.theme} description={data.ecoConception.description} img1={data.ecoConception.img1} img1M={data.ecoConception.img1M} alt1={data.ecoConception.alt1} img2={data.ecoConception.img2} img2M={data.ecoConception.img2M} alt2={data.ecoConception.alt2} img3={data.ecoConception.img3} img3M={data.ecoConception.img3M} alt3={data.ecoConception.alt3} />
                )
            )}
          
            {projetsData.map(( data ) =>
                (
                    <ProjetModel123 key={data.ecoConception.title} img1={data.ecoConception.img4} img1M={data.ecoConception.img4M} alt1={data.ecoConception.alt4} img2={data.ecoConception.img5} img2M={data.ecoConception.img5M} alt2={data.ecoConception.alt5} img3={data.ecoConception.img6} img3M={data.ecoConception.img6M} alt3={data.ecoConception.alt6}  />
                )
            )}

            {projetsData.map(( data ) =>
                (
                    <ProjetModel123 key={data.ecoConception.title} img1={data.ecoConception.img7} img1M={data.ecoConception.img7M} alt1={data.ecoConception.alt7} img2={data.ecoConception.img8} img2M={data.ecoConception.img8M} alt2={data.ecoConception.alt8} img3={null} />
                )
            )}

            {projetsData.map(( data ) =>
                (
                    <ProjetModel123 key={data.ecoConception.title} img1={data.ecoConception.img9} img1M={data.ecoConception.img9M} alt1={data.ecoConception.alt9} img2={data.ecoConception.img10} img2M={data.ecoConception.img10M} alt2={data.ecoConception.alt10} img3={null} />

                )
            )}
           
        </main>
    )
}

export default EcoConception;