import ProjetModel from "../components/ProjetModel";
import projetsData from '../datas/projetsData.json';


function Biennale() {
    return (
        <>
            {projetsData.map(( data ) =>
                (
                    <ProjetModel key={data.biennale.title} bannerImg={data.biennale.bannerImg} bannerImgM={data.biennale.bannerImgM} altBannerImg={data.biennale.altBannerImg} title={data.biennale.title} theme={data.biennale.theme} description={data.biennale.description} img1={data.biennale.img1} img1M={data.biennale.img1M} alt1={data.biennale.alt1} img2={data.biennale.img2} img2M={data.biennale.img2M} alt2={data.biennale.alt2} img3={data.biennale.img3} img3M={data.biennale.img3M} alt3={data.biennale.alt3} />
                )
            )}
        </>
    )
}

export default Biennale;