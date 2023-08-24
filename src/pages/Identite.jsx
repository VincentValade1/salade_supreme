import ProjetModel from "../components/ProjetModel";
import projetsData from '../datas/projetsData.json';


function Identite() {
    return (
        <>
            {projetsData.map(( data ) =>
                (
                    <ProjetModel key={data.identite.title} bannerImg={data.identite.bannerImg} altBannerImg={data.identite.altBannerImg} title={data.identite.title} theme={data.identite.theme} description={data.identite.description} img1={data.identite.img1} alt1={data.identite.alt1} img2={data.identite.img2} alt2={data.identite.alt2} />
                )
            )}
        </>
    )
}

export default Identite;