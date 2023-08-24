import ProjetModel from "../components/ProjetModel";
import projetsData from '../datas/projetsData.json';


function SupremeVitrines() {
    return (
        <>
            {projetsData.map(( data ) =>
                (
                    <ProjetModel key={data.vitrines.title} bannerImg={data.vitrines.bannerImg} altBannerImg={data.vitrines.altBannerImg} title={data.vitrines.title} theme={data.vitrines.theme} description={data.vitrines.description} img1={data.vitrines.img1} alt1={data.vitrines.alt1} img2={data.vitrines.img2} alt2={data.vitrines.alt2} img3={data.vitrines.img3} alt3={data.vitrines.alt3} />
                )
            )}
        </>
    )
}

export default SupremeVitrines;