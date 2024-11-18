import ProjetModel from "../components/ProjetModel";
import projetsData from '../datas/projetsData.json';
import ActuData from '../datas/residencesData.json';
import ProjetModel123 from "../components/ProjetModel123";
import YoutubeLector from "../components/YoutubeLector";
import BlueButton from "../components/BlueButton";
import SupremeActu from "../components/SupremeActu";


function Ateliers() {
    const AtelierYoutube1 = <YoutubeLector videoId= 'Aaf-2S7YKv8' />

    const AtelierYoutube2 = <YoutubeLector videoId= 'ddyi87gBgxg' />

    // const NewsLetter = <SupremeActu supremeActuPicture={ActuData[0].babayaga.img5} supremeActuPictureAlt={ActuData[0].babayaga.alt5}/>
             

    const AtelierReservationLinkLign = <a tabIndex="0" aria-label="lien vers bookeo pour réservation atelier" href="https://bookeo.com/saladesupreme" target="_blank" rel="noreferrer noopener" >Réserver mon atelier</a>;
    const StageReservationLinkLign = <a tabIndex="0" aria-label="lien vers bookeo pour réservation stage" href="https://bookeo.com/saladesupreme" target="_blank" rel="noreferrer noopener" >Réserver mon stage</a>;



    return (
        <>
            {projetsData.map(( data ) =>
                (
                    <ProjetModel key={data.ateliers.title} bannerImg={data.ateliers.bannerImg} bannerImgM={data.ateliers.bannerImgM} altBannerImg={data.ateliers.altBannerImg} title={data.ateliers.title} theme={data.ateliers.theme} description={data.ateliers.description} extraProjetContentDescriptionTitle={data.ateliers.extraProjetContentDescriptionTitle1} extraProjetContentDescriptionText={data.ateliers.extraProjetContentDescriptionText1} img1={data.ateliers.img1} img1M={data.ateliers.img1M} alt1={data.ateliers.alt1} img2={data.ateliers.img2} img2M={data.ateliers.img2M} alt2={data.ateliers.alt2} img3={null} img3M={null} alt3={null} />
                )
            )}

            {projetsData.map(( data ) =>
                (
                    <ProjetModel123 key={data.ateliers.title} extraProjetContentDescriptionTitle={data.ateliers.extraProjetContentDescriptionTitle2} extraProjetContentDescriptionText={data.ateliers.extraProjetContentDescriptionText2} img1={data.ateliers.img3} img1M={data.ateliers.img3M} alt1={data.ateliers.alt3} img2={data.ateliers.img4} img2M={data.ateliers.img4M} alt2={data.ateliers.alt4} img3={null} />
                )
            )}

            {projetsData.map(( data ) =>
                (
                    <ProjetModel123 key={data.ateliers.title} extraProjetContentDescriptionTitle={data.ateliers.extraProjetContentDescriptionTitle3} extraProjetContentDescriptionText={data.ateliers.extraProjetContentDescriptionText3} img1={data.ateliers.img5} img1M={data.ateliers.img5M} alt1={data.ateliers.alt5} img2={data.ateliers.img6} img2M={data.ateliers.img6M} alt2={data.ateliers.alt6} img3={null} />
                )
            )}

            {projetsData.map(( data ) =>
                (
                    <ProjetModel123 key={data.ateliers.title} extraProjetContentDescriptionTitle={data.ateliers.extraProjetContentDescriptionTitle4} extraProjetContentDescriptionText={data.ateliers.extraProjetContentDescriptionText4} img1={data.ateliers.img7} img1M={data.ateliers.img7M} alt1={data.ateliers.alt7} img2={data.ateliers.img8} img2M={data.ateliers.img8M} alt2={data.ateliers.alt8} img3={null} />
                )
            )}

            <BlueButton className="reservation-atelier" blueButtonLinkLign={AtelierReservationLinkLign} />

            {projetsData.map(( data ) =>
                (
                    <ProjetModel123 key={data.ateliers.title} extraProjetContentDescriptionTitle={data.ateliers.extraProjetContentDescriptionTitle5} extraProjetContentDescriptionText={data.ateliers.extraProjetContentDescriptionText5} img1={data.ateliers.img9} img1M={data.ateliers.img9M} alt1={data.ateliers.alt9} img2={data.ateliers.img10} img2M={data.ateliers.img10M} alt2={data.ateliers.alt10} img3={null} />
                )
            )}

            <BlueButton className="reservation-stage" blueButtonLinkLign={StageReservationLinkLign} />
            {/* <YoutubeLector videoId= 'Aaf-2S7YKv8' className="atelier-youtube" /> */}

            {projetsData.map(( data ) =>
                (
                    <ProjetModel123 key={data.ateliers.title} img1={data.ateliers.img11} img1M={data.ateliers.img11M} alt1={data.ateliers.alt11} img2={data.ateliers.img12} img2M={data.ateliers.img12M} alt2={data.ateliers.alt12} img3={null} extraTopContent={AtelierYoutube1}  extraBottomContent={AtelierYoutube2} />
                )
            )}

            <SupremeActu className='hors-projet-section' supremeActuPicture={ActuData[0].babayaga.img5} supremeActuPictureAlt={ActuData[0].babayaga.alt5}/>
        </>
    )
}

export default Ateliers;