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
                    <ProjetModel123 key={data.clutch.title} img1={data.clutch.img4} img1M={data.clutch.img4M} alt1={data.clutch.alt4} img2={data.clutch.img5} img2M={data.clutch.img5M} alt2={data.clutch.alt5} extraContent2={null} extraContent3={clutchYoutube2}  />
                )
            )}

            {projetsData.map(( data ) =>
                (
                    <ProjetModel123 key={data.clutch.title} img1={data.clutch.img7} img1M={data.clutch.img7M} alt1={data.clutch.alt7} img2={data.clutch.img8} img2M={data.clutch.img8M} alt2={data.clutch.alt8} img3={data.clutch.img9} img3M={data.clutch.img9M} alt3={data.clutch.alt9} />
                )
            )}

            {projetsData.map(( data ) =>
                (
                    <ProjetModel123 key={data.clutch.title} img1={data.clutch.img10} img1M={data.clutch.img10M} alt1={data.clutch.alt10} img2={data.clutch.img11} img2M={data.clutch.img11M} alt2={data.clutch.alt11} extraContent2={null} />
                )
            )}
           
        </main>
    )
}

export default Clutch;