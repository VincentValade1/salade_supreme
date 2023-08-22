import ProjetModel from "../components/ProjetModel";
import vitrinesData from '../datas/vitrines.json';

function SupremeVitrines() {
    return (
        <>
            {vitrinesData.map(( data ) =>
                (
                    <ProjetModel bannerImg={data.bannerImg} altBannerImg={data.altBannerImg} h1={data.h1} h2={data.h2} description={data.description} img1={data.img1} alt1={data.alt1} img2={data.img2} alt2={data.alt2} img3={data.img3} alt3={data.alt3} />

                )
            )}
        </>
    )
}

export default SupremeVitrines;