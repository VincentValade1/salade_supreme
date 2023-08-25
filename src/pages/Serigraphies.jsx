import ProjetModel from "../components/ProjetModel";
import projetsData from '../datas/projetsData.json';


function Serigraphies() {
    return (
        <>
            {projetsData.map(( data ) =>
                (
                    <ProjetModel key={data.serigraphies.title} bannerImg={data.serigraphies.bannerImg} altBannerImg={data.serigraphies.altBannerImg} title={data.serigraphies.title} theme={data.serigraphies.theme} description={data.serigraphies.description} img1={data.serigraphies.img1} alt1={data.serigraphies.alt1} img2={data.serigraphies.img2} alt2={data.serigraphies.alt2} img3={data.serigraphies.img3} alt3={data.serigraphies.alt3} />
                )
            )}
        </>
    )
}

export default Serigraphies;