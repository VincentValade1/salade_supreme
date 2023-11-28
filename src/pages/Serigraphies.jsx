import ProjetModel from "../components/ProjetModel";
import projetsData from '../datas/projetsData.json';

function Serigraphies() {
    return (
        <>
            {projetsData.map(( data ) =>
                (
                    <ProjetModel key={data.serigraphies.title} bannerImg={data.serigraphies.bannerImg} bannerImgM={data.serigraphies.bannerImgM} altBannerImg={data.serigraphies.altBannerImg} title={data.serigraphies.title} theme={data.serigraphies.theme} description={data.serigraphies.description} img1={data.serigraphies.img1} img1M={data.serigraphies.img1M} alt1={data.serigraphies.alt1} img2={data.serigraphies.img2} img2M={data.serigraphies.img2M} alt2={data.serigraphies.alt2} img3={data.serigraphies.img3} img3M={data.serigraphies.img3M} alt3={data.serigraphies.alt3} />
                )
            )}
        </>
    )
}

export default Serigraphies;