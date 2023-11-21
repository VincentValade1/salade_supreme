import ProjetModel from "../components/ProjetModel";
import projetsData from '../datas/projetsData.json';
import ProjetModel123 from "../components/ProjetModel123";
import '../styles/ProjetModel.css';


function StreetArt() {

    return (
        <main>
            {projetsData.map(( data ) =>
                (
                    <ProjetModel key={data.streetart.title} bannerImg={data.streetart.bannerImg} bannerImgM={data.streetart.bannerImgM} altBannerImg={data.streetart.altBannerImg} title={data.streetart.title} theme={data.streetart.theme} description={data.streetart.description} img1={data.streetart.img1} img1M={data.streetart.img1M} alt1={data.streetart.alt1} img2={data.streetart.img2} img2M={data.streetart.img2M} alt2={data.streetart.alt2} img3={data.streetart.img3} img3M={data.streetart.img3M} alt3={data.streetart.alt3} />
                )
            )}
          
            {projetsData.map(( data ) =>
                (
                    <ProjetModel123 key={data.streetart.title} img1={data.streetart.img4} img1M={data.streetart.img4M} alt1={data.streetart.alt4} img2={data.streetart.img5} img2M={data.streetart.img5M} alt2={data.streetart.alt5} img3={data.streetart.img6} img3M={data.streetart.img6M} alt3={data.streetart.alt6}  />
                )
            )}

            {projetsData.map(( data ) =>
                (
                    <ProjetModel123 key={data.streetart.title} img1={data.streetart.img7} img1M={data.streetart.img7M} alt1={data.streetart.alt7} img2={data.streetart.img8} img2M={data.streetart.img8M} alt2={data.streetart.alt8} img3={data.streetart.img9} img3M={data.streetart.img9M} alt3={data.streetart.alt9} />
                )
            )}

            {projetsData.map(( data ) =>
                (
                    <ProjetModel123 key={data.streetart.title} img1={data.streetart.img10} img1M={data.streetart.img10M} alt1={data.streetart.alt10} img2={data.streetart.img11} img2M={data.streetart.img11M} alt2={data.streetart.alt11} img3={data.streetart.img12} img3M={data.streetart.img12M} alt3={data.streetart.alt12}  />

                )
            )}
           
        </main>
    )
}

export default StreetArt;