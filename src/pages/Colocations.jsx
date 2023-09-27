import ProjetModel from "../components/ProjetModel";
import projetsData from '../datas/projetsData.json';


function colocationsations() {
    return (
        <>
            {projetsData.map(( data ) =>
                (
                    <ProjetModel key={data.colocations.title} bannerImg={data.colocations.bannerImg} bannerImgM={data.colocations.bannerImgM} altBannerImg={data.colocations.altBannerImg} title={data.colocations.title} theme={data.colocations.theme} description={data.colocations.description} img1={data.colocations.img1} img1M={data.colocations.img1M} alt1={data.colocations.alt1} img2={data.colocations.img2} img2M={data.colocations.img2M} alt2={data.colocations.alt2} img3={data.colocations.img3} img3M={data.colocations.img3M} alt3={data.colocations.alt3} />
                )
            )}
        </>
    )
}

export default colocationsations;