import ProjetModel from "../components/ProjetModel";
import projetsData from '../datas/projetsData.json';
import ProjetModel123 from "../components/ProjetModel123";
import YoutubeLector from "../components/YoutubeLector";


function Ateliers() {
    const AtelierVideo1 = <YoutubeLector videoId= 'Aaf-2S7YKv8' />;
    const AtelierVideo2 = <YoutubeLector videoId= 'ddyi87gBgxg' />;

    return (
        <>
            {projetsData.map(( data ) =>
                (
                    <ProjetModel key={data.ateliers.title} bannerImg={data.ateliers.bannerImg} bannerImgM={data.ateliers.bannerImgM} altBannerImg={data.ateliers.altBannerImg} title={data.ateliers.title} theme={data.ateliers.theme} description={data.ateliers.description} img1={data.ateliers.img1} img1M={data.ateliers.img1M} alt1={data.ateliers.alt1} img2={data.ateliers.img2} img2M={data.ateliers.img2M} alt2={data.ateliers.alt2} img3={data.ateliers.img3} img3M={data.ateliers.img3M} alt3={data.ateliers.alt3} />
                )
            )}

            {projetsData.map(( data ) =>
                (
                    <ProjetModel123 key={data.ateliers.title} img1={data.ateliers.img4} img1M={data.ateliers.img4M} alt1={data.ateliers.alt4} img2={data.ateliers.img5} img2M={data.ateliers.img5M} alt2={data.ateliers.alt5} extraContent2={null} extraContent3={AtelierVideo1} />
                )
            )}

            {projetsData.map(( data ) =>
                (
                    <ProjetModel123 key={data.ateliers.title} img1={data.ateliers.img7} img1M={data.ateliers.img7M} alt1={data.ateliers.alt7} img2={data.ateliers.img8} img2M={data.ateliers.img8M} alt2={data.ateliers.alt8} extraContent2={null} extraContent3={AtelierVideo2} />
                )
            )}
        </>
    )
}

export default Ateliers;