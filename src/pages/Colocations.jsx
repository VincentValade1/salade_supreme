import ProjetModel from "../components/ProjetModel";
import projetsData from '../datas/projetsData.json';
import ProjetModel123 from "../components/ProjetModel123";
import YoutubeLector from "../components/YoutubeLector";


function Colocations() {
    const ColoctaionYoutube = <YoutubeLector videoId= 'GCF307jppwg' />;

    return (
        <>
            {projetsData.map(( data ) =>
                (
                    <ProjetModel key={data.colocations.title} bannerImg={data.colocations.bannerImg} bannerImgM={data.colocations.bannerImgM} altBannerImg={data.colocations.altBannerImg} title={data.colocations.title} theme={data.colocations.theme} description={data.colocations.description} img1={data.colocations.img1} img1M={data.colocations.img1M} alt1={data.colocations.alt1} img2={data.colocations.img2} img2M={data.colocations.img2M} alt2={data.colocations.alt2} img3={null} extraBottomContent={ColoctaionYoutube} />
                )
            )}
            {projetsData.map(( data ) =>
                (
                    <ProjetModel123 key={data.colocations.title} img1={data.colocations.img4} img1M={data.colocations.img4M} alt1={data.colocations.alt4} img2={data.colocations.img5} img2M={data.colocations.img5M} alt2={data.colocations.alt5} img3={data.colocations.img6} img3M={data.colocations.img6M} alt3={data.colocations.alt6} />
                )
            )}
            {projetsData.map(( data ) =>
                (
                    <ProjetModel123 key={data.colocations.title} img1={data.colocations.img7} img1M={data.colocations.img7M} alt1={data.colocations.alt7} img2={data.colocations.img8} img2M={data.colocations.img8M} alt2={data.colocations.alt8} img3={data.colocations.img9} img3M={data.colocations.img9M} alt3={data.colocations.alt9} />
                )
            )}
        </>
    )
}

export default Colocations;