import ProjetModel from "../components/ProjetModel";
import projetsData from '../datas/projetsData.json';


function Ateliers() {
    return (
        <>
            {projetsData.map(( data ) =>
                (
                    <ProjetModel key={data.ateliers.title} bannerImg={data.ateliers.bannerImg} bannerImgM={data.ateliers.bannerImgM} altBannerImg={data.ateliers.altBannerImg} title={data.ateliers.title} theme={data.ateliers.theme} description={data.ateliers.description} img1={data.ateliers.img1} img1M={data.ateliers.img1M} alt1={data.ateliers.alt1} img2={data.ateliers.img2} img2M={data.ateliers.img2M} alt2={data.ateliers.alt2} img3={data.ateliers.img3} img3M={data.ateliers.img3M} alt3={data.ateliers.alt3} />
                )
            )}
        </>
    )
}

export default Ateliers;