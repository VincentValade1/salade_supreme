import ResidenceModel from '../components/ResidenceModel';
import residencesData from '../datas/residencesData.json';
import '../styles/ProjetModel.css';
import YoutubeLector from '../components/YoutubeLector';


function Babayaga() {
    const babayagaYoutube1 = <YoutubeLector videoId= '3Ao_4zaKSMk' />;
    const babayagaYoutube2 = <YoutubeLector videoId= 'lXU2xy7l_KE' />;
    const babayagaYoutube3 = <YoutubeLector videoId= 'nXpW1G98-Xc' />;
    const babayagaYoutube4 = <YoutubeLector videoId= '8pA0VTExCLQ' />;
    const babayagaYoutube5 = <YoutubeLector videoId= 'Phb4KquB7S8' />;
    
    // variable contenant la destination du bouton bleu selon l'utilité
    const babayagaVisiteLinkLign = <a tabIndex="0" aria-label="lien vers visite virtuelle" href="https://my.matterport.com/show/?m=AMjH5tcmTmV" target="_blank" rel="noreferrer noopener" >Visite virtuelle</a>;
    const babayagaDossierDownloadLinkLign = <a tabIndex="0" aria-label="cliquer pour télécharger pdf du dossier de présentation" href="/présentation-Salade-Suprême.pdf" download="présentation-Salade-Suprême.pdf" >Dossier de présentation</a>

    return (
        <>
            {residencesData.map(( data ) =>
                (
                    <ResidenceModel key={data.babayaga.title} bannerImg={data.babayaga.bannerImg} bannerImgM={data.babayaga.bannerImgM} altBannerImg={data.babayaga.altBannerImg} title={data.babayaga.title} theme={data.babayaga.theme} description={data.babayaga.description} img1={data.babayaga.img1} img1M={data.babayaga.img1M} alt1={data.babayaga.alt1} img2={data.babayaga.img2} img2M={data.babayaga.img2M} alt2={data.babayaga.alt2} img3={data.babayaga.img3} img3M={data.babayaga.img3M} alt3={data.babayaga.alt3} img4={data.babayaga.img4} img4M={data.babayaga.img4M} alt4={data.babayaga.alt4} img5={data.babayaga.img5} img5M={data.babayaga.img5M} alt5={data.babayaga.alt5} Youtube1={babayagaYoutube1} visiteVirtuelleText={data.babayaga.visiteVirtuelleText} visiteLinkLign={babayagaVisiteLinkLign} dossierDownloadLinkLign={babayagaDossierDownloadLinkLign} supremeActuPicture={data.babayaga.img5} supremeActuPictureAlt={data.babayaga.alt5} projetsRealisesText={data.babayaga.projetsRealisesText} Youtube2={babayagaYoutube2} Youtube3={babayagaYoutube3} Youtube4={babayagaYoutube4} Youtube5={babayagaYoutube5} enSavoirPlusText={data.babayaga.enSavoirPlusText} showAltText={false}/>
                )
            )}
        </>
    )
}

export default Babayaga;