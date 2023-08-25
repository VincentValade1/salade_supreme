import ProjetModel from "../components/ProjetModel";
import projetsData from '../datas/projetsData.json';


function Biennale() {
    return (
        <>
            {projetsData.map(( data ) =>
                (
                    <ProjetModel key={data.biennale.title} bannerImg={data.biennale.bannerImg} altBannerImg={data.biennale.altBannerImg} title={data.biennale.title} theme={data.biennale.theme} description={data.biennale.description} img1={data.biennale.img1} alt1={data.biennale.alt1} img2={data.biennale.img2} alt2={data.biennale.alt2} img3={data.biennale.img3} alt3={data.biennale.alt3} />
                )
            )}
        </>
    )
}

export default Biennale;