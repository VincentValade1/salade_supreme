import ProjetModel from "../components/ProjetModel";
import projetsData from '../datas/projetsData.json';
import YoutubeLector from "../components/YoutubeLector";


function OzOccitanie() {
    const ozYoutube1 = <YoutubeLector videoId= 'YNPBtORcNwE' />;

    return (
        <main>
            {projetsData.map(( data ) =>
                (
                    <ProjetModel key={data.oz.title} bannerImg={data.oz.bannerImg} bannerImgM={data.oz.bannerImgM} altBannerImg={data.oz.altBannerImg} title={data.oz.title} theme={data.oz.theme} description={data.oz.description} extraContent1={ozYoutube1} extraContent2={null} twinPictures={null} />
                )
            )}   
        </main>
    )
}

export default OzOccitanie;