import ProjetModel from "../components/ProjetModel";
import projetsData from '../datas/projetsData.json';


function Alphabet() {
    return (
        <>
            {projetsData.map(( data ) =>
                (
                    <ProjetModel key={data.alphabet.title} bannerImg={data.alphabet.bannerImg} bannerImgM={data.alphabet.bannerImgM} altBannerImg={data.alphabet.altBannerImg} title={data.alphabet.title} theme={data.alphabet.theme} description={data.alphabet.description} img1={data.alphabet.img1} img1M={data.alphabet.img1M} alt1={data.alphabet.alt1} img2={data.alphabet.img2} img2M={data.alphabet.img2M} alt2={data.alphabet.alt2} img3={data.alphabet.img3} img3M={data.alphabet.img3M} alt3={data.alphabet.alt3} />
                )
            )}
        </>
    )
}

export default Alphabet;