import ProjetModel from "../components/ProjetModel";
import projetsData from '../datas/projetsData.json';
import ProjetModel123 from '../components/ProjetModel123';

function SupremeVitrines() {
    return (
        <>
            {projetsData.map(( data ) =>
                (
                    <ProjetModel key={data.vitrines.title} bannerImg={data.vitrines.bannerImg} bannerImgM={data.vitrines.bannerImgM} altBannerImg={data.vitrines.altBannerImg} title={data.vitrines.title} theme={data.vitrines.theme} description={data.vitrines.description} img1={data.vitrines.img1} img1M={data.vitrines.img1M} alt1={data.vitrines.alt1} img2={data.vitrines.img2} img2M={data.vitrines.img2M} alt2={data.vitrines.alt2} img3={data.vitrines.img3} img3M={data.vitrines.img3M} alt3={data.vitrines.alt3} />
                )
            )}
            {projetsData.map(( data ) =>
                (
                    <ProjetModel123 key={data.vitrines.title} img1={data.vitrines.img4} img1M={data.vitrines.img4M} alt1={data.vitrines.alt4} img2={data.vitrines.img5} img2M={data.vitrines.img5M} alt2={data.vitrines.alt5} img3={data.vitrines.img6} img3M={data.vitrines.img6M} alt3={data.vitrines.alt6} extraBottomContent={null}/>
                )
            )}
            {projetsData.map(( data ) =>
                (
                    <ProjetModel123 key={data.vitrines.title} img1={data.vitrines.img7} img1M={data.vitrines.img7M} alt1={data.vitrines.alt7} img2={data.vitrines.img8} img2M={data.vitrines.img8M} alt2={data.vitrines.alt8} img3={data.vitrines.img9} img3M={data.vitrines.img9M} alt3={data.vitrines.alt9} extraBottomContent={null}/>
                )
            )}
            {projetsData.map(( data ) =>
                (
                    <ProjetModel123 key={data.vitrines.title} img1={data.vitrines.img10} img1M={data.vitrines.img10M} alt1={data.vitrines.alt10} img2={data.vitrines.img11} img2M={data.vitrines.img11M} alt2={data.vitrines.alt11} img3={data.vitrines.img12} img3M={data.vitrines.img12M} alt3={data.vitrines.alt12} extraBottomContent={null}/>
                )
            )}
        </>
    )
}

export default SupremeVitrines;