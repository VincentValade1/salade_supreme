import ProjetModel from "../components/ProjetModel";
import projetsData from '../datas/projetsData.json';


function Alphabet() {
    return (
        <>
            {projetsData.map(( data ) =>
                (
                    <ProjetModel key={data.alphabet.title} bannerImg={data.alphabet.bannerImg} altBannerImg={data.alphabet.altBannerImg} title={data.alphabet.title} theme={data.alphabet.theme} description={data.alphabet.description} img1={data.alphabet.img1} alt1={data.alphabet.alt1} img2={data.alphabet.img2} alt2={data.alphabet.alt2} img3={data.alphabet.img3} alt3={data.alphabet.alt3} />
                )
            )}
        </>
    )
}

export default Alphabet;