import ProjetModel from "../components/ProjetModel";
import projetsData from '../datas/projetsData.json';
import YoutubeLector from "../components/YoutubeLector";

function FancyFuzz() {
    const fancyFuzzClip1 = <YoutubeLector videoId= 'X5Gp4Lh5M1I' />;
    const fancyFuzzClip2 = <YoutubeLector videoId= 'W23KziIwBAY' />;

                
    return (
        <>
            {projetsData.map(( data ) =>
                (
                    <ProjetModel key={data.fancyfuzz.title} className='main-fancy-fuzz' extraContent1={fancyFuzzClip1} extraContent2={null} extraContent3={fancyFuzzClip2} bannerImg={data.fancyfuzz.bannerImg} bannerImgM={data.fancyfuzz.bannerImgM} altBannerImg={data.fancyfuzz.altBannerImg} title={data.fancyfuzz.title} theme={data.fancyfuzz.theme} description={data.fancyfuzz.description} img1={data.fancyfuzz.img1} img1M={data.fancyfuzz.img1M} alt1={data.fancyfuzz.alt1} img2={data.fancyfuzz.img2} img2M={data.fancyfuzz.img2M} alt2={data.fancyfuzz.alt2} />
                )
            )}
        </>
    )
}

export default FancyFuzz;