import ProjetModel from "../components/ProjetModel";
import projetsData from '../datas/projetsData.json';
import YoutubeLector from "../components/YoutubeLector";
import ProjetModel123 from "../components/ProjetModel123";


function Clutch() {
    const clutchYoutube1 = <YoutubeLector videoId= 'X0LqYf4s-q0' />;
    const clutchYoutube2 = <YoutubeLector videoId= 'aXG1X4rCRlk' />;

    return (
        <main>
            {projetsData.map(( data ) =>
                (
                    <ProjetModel key={data.clutch.title} bannerImg={data.clutch.bannerImg} bannerImgM={data.clutch.bannerImgM} altBannerImg={data.clutch.altBannerImg} title={data.clutch.title} theme={data.clutch.theme} description={data.clutch.description} img1={data.clutch.img1} img1M={data.clutch.img1M} alt1={data.clutch.alt1} img2={data.clutch.img2} img2M={data.clutch.img2M} alt2={data.clutch.alt2} extraContent2={null} extraContent3={clutchYoutube1} />
                )
            )}
          
            {projetsData.map(( data ) =>
                (
                    <ProjetModel123 img1={data.clutch.img4} img1M={data.clutch.img4M} alt1={data.clutch.alt4} img2={data.clutch.img5} img2M={data.clutch.img5M} alt2={data.clutch.alt5} extraContent2={null} extraContent3={clutchYoutube2}  />
                )
            )}
           
        </main>
    )
}

export default Clutch;