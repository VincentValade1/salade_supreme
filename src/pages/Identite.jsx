import ProjetModel from "../components/ProjetModel";
import projetsData from '../datas/projetsData.json';


function Identite() {
    return (
        <>
            {projetsData.map(( data ) =>
                (
                    <ProjetModel key={data.identite.title} bannerImg={data.identite.bannerImg} bannerImgM={data.identite.bannerImgM} altBannerImg={data.identite.altBannerImg} title={data.identite.title} theme={data.identite.theme} description={data.identite.description} img1={data.identite.img1} img1M={data.identite.img1M} alt1={data.identite.alt1} img2={data.identite.img2} img2M={data.identite.img2M} alt2={data.identite.alt2} img3={data.identite.img3} img3M={data.identite.img3M} alt3={data.identite.alt3} />
                )
            )}
        </>
    )
}

export default Identite;