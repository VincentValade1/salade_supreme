import ProjetModel from "../components/ProjetModel";
import projetsData from '../datas/projetsData.json';
import YoutubeLector from "../components/YoutubeLector";
import '../styles/FancyFuzz.css';


function FancyFuzz() {
    const extraContent1 = <YoutubeLector videoId= 'X5Gp4Lh5M1I' />;
    const extraContent2 = <YoutubeLector videoId= 'W23KziIwBAY' />;

                
    return (
        <>
            {projetsData.map(( data ) =>
                (
                    <ProjetModel key={data.fancyfuzz.title} className='main-fancy-fuzz' extraContent1={extraContent1} extraContent2={extraContent2} bannerImg={data.fancyfuzz.bannerImg} altBannerImg={data.fancyfuzz.altBannerImg} title={data.fancyfuzz.title} theme={data.fancyfuzz.theme} description={data.fancyfuzz.description} img1={data.fancyfuzz.img1} alt1={data.fancyfuzz.alt1} img2={data.fancyfuzz.img2} alt2={data.fancyfuzz.alt2} />
                )
            )}
        </>
    )
}

export default FancyFuzz;