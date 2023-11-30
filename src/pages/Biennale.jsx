import ProjetModel from "../components/ProjetModel";
import projetsData from '../datas/projetsData.json';
import YoutubeLector from "../components/YoutubeLector";


function Biennale() {
    const BiennaleVideo = <YoutubeLector videoId= 'Aaf-2S7YKv8' />

    return (
        <>
            {projetsData.map(( data ) =>
                (
                    <ProjetModel key={data.biennale.title} extraTopContent={BiennaleVideo} bannerImg={data.biennale.bannerImg} bannerImgM={data.biennale.bannerImgM} altBannerImg={data.biennale.altBannerImg} title={data.biennale.title} theme={data.biennale.theme} description={data.biennale.description} img3={null} twinPictures={null} />
                )
            )}
        </>
    )
}

export default Biennale;