import ProjetModel from "../components/ProjetModel";
import projetsData from '../datas/projetsData.json';

function MisterFreeze() {
    return (
        <>
            {projetsData.map(( data ) =>
                (
                    <ProjetModel key={data.misterfreeze.title} bannerImg={data.misterfreeze.bannerImg} bannerImgM={data.misterfreeze.bannerImgM} altBannerImg={data.misterfreeze.altBannerImg} title={data.misterfreeze.title} theme={data.misterfreeze.theme} description={data.misterfreeze.description} img1={data.misterfreeze.img1} img1M={data.misterfreeze.img1M} alt1={data.misterfreeze.alt1} img2={data.misterfreeze.img2} img2M={data.misterfreeze.img2M} alt2={data.misterfreeze.alt2} img3={data.misterfreeze.img3} img3M={data.misterfreeze.img3M} alt3={data.misterfreeze.alt3} />
                )
            )}
        </>
    )
}

export default MisterFreeze;