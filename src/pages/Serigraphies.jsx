import ProjetModel from "../components/ProjetModel";
import projetsData from '../datas/projetsData.json';
import ProjetModel123 from "../components/ProjetModel123";

function Serigraphies() {
    return (
        <>
            {projetsData.map(( data ) =>
                (
                    <ProjetModel key={data.serigraphies.title} bannerImg={data.serigraphies.bannerImg} bannerImgM={data.serigraphies.bannerImgM} altBannerImg={data.serigraphies.altBannerImg} title={data.serigraphies.title} theme={data.serigraphies.theme} description={data.serigraphies.description} img1={data.serigraphies.img1} img1M={data.serigraphies.img1M} alt1={data.serigraphies.alt1} img2={data.serigraphies.img2} img2M={data.serigraphies.img2M} alt2={data.serigraphies.alt2} img3={data.serigraphies.img3} img3M={data.serigraphies.img3M} alt3={data.serigraphies.alt3} />
                )
            )}
            {projetsData.map(( data ) =>
                (
                    <ProjetModel123 key={data.serigraphies.title} img1={data.serigraphies.img4} img1M={data.serigraphies.img4M} alt1={data.serigraphies.alt4} img2={data.serigraphies.img5} img2M={data.serigraphies.img5M} alt2={data.serigraphies.alt5} img3={data.serigraphies.img6} img3M={data.serigraphies.img6M} alt3={data.serigraphies.alt6} />
                )
            )}
            {projetsData.map(( data ) =>
                (
                    <ProjetModel123 key={data.serigraphies.title} img1={data.serigraphies.img7} img1M={data.serigraphies.img7M} alt1={data.serigraphies.alt7} img2={data.serigraphies.img8} img2M={data.serigraphies.img8M} alt2={data.serigraphies.alt8} img3={data.serigraphies.img9} img3M={data.serigraphies.img9M} alt3={data.serigraphies.alt9} />
                )
            )}
            {projetsData.map(( data ) =>
                (
                    <ProjetModel123 key={data.serigraphies.title} img1={data.serigraphies.img10} img1M={data.serigraphies.img10M} alt1={data.serigraphies.alt10} img2={data.serigraphies.img11} img2M={data.serigraphies.img11M} alt2={data.serigraphies.alt11} img3={null} />
                )
            )}
        </>
    )
}

export default Serigraphies;