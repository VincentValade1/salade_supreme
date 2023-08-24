import ProjetModel from "../components/ProjetModel";
import projetsData from '../datas/projetsData.json';


function Ateliers() {
    return (
        <>
            {projetsData.map(( data ) =>
                (
                    <ProjetModel key={data.ateliers.title} bannerImg={data.ateliers.bannerImg} altBannerImg={data.ateliers.altBannerImg} title={data.ateliers.title} theme={data.ateliers.theme} description={data.ateliers.description} img1={data.ateliers.img1} alt1={data.ateliers.alt1} img2={data.ateliers.img2} alt2={data.ateliers.alt2} img3={data.ateliers.img3} alt3={data.ateliers.alt3} />
                )
            )}
        </>
    )
}

export default Ateliers;