import ProjetModel from "../components/ProjetModel";
import projetsData from '../datas/projetsData.json';


function Colocations() {
    return (
        <>
            {projetsData.map(( data ) =>
                (
                    <ProjetModel key={data.colocations.title} bannerImg={data.colocations.bannerImg} altBannerImg={data.colocations.altBannerImg} title={data.colocations.title} theme={data.colocations.theme} description={data.colocations.description} img1={data.colocations.img1} alt1={data.colocations.alt1} img2={data.colocations.img2} alt2={data.colocations.alt2} img3={data.colocations.img3} alt3={data.colocations.alt3} />
                )
            )}
        </>
    )
}

export default Colocations;