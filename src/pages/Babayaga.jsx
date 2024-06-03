import ProjetModel from "../components/ProjetModel";
import residencesData from '../datas/residencesData.json';
import '../styles/ProjetModel.css';


function Babayaga() {
    const extraDescriptionContent = (
        <div className="extraDescription">
            <p>Vous souhaitez soutenir notre projet, participer à des ateliers d'initiation artistique (Street art, cinéma d'animation, illustration, ..) ou encore profiter d'après-midi créatives ?</p>
            <p>Rendez-vous sur notre page <a href="https://www.helloasso.com/associations/salade-supreme" target="_blank" rel="noreferrer noopener">Helloasso</a> ou sur le <a href="https://pass.culture.fr/" target="_blank" rel="noreferrer noopener">Pass Culture</a></p>
        </div>
    );

    const extraBottomBabayaga = (
        <div className="babayagaInfos">
            <div className="babayagaLeftColumnInfos">
               <p>
                    <b>OUVERT DU 26 AVRIL au 20 JUILLET 2024</b><br/><br/>
                    Horaires d'ouverture :<br/>
                    Vendredi de 17h à 21h<br/>
                    Samedi de 15h à 21h<br/>
                    114 Rue de Cugnaux - 31300 Toulouse
                </p>
                <div className="map" aria-label="Emplacement géographique de Salade Suprême">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2889.5576129953583!2d1.4278201959079222!3d43.5949301450187!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12aebb76aa1b9b37%3A0x117602b9f7aa2c27!2s114%20Rue%20de%20Cugnaux%2C%2031300%20Toulouse!5e0!3m2!1sfr!2sfr!4v1713444020810!5m2!1sfr!2sfr"
                            title="Adresse Babayaga"
                            loading="chargement" 
                            referrerPolicy="no-referrer-when-downgrade">
                    </iframe>
                </div>
                <span>*Accessibilité PMR, contactez nous pour plus d'informations.</span>
            </div>
            <div className="babayagaRightColumnInfos">
                <p>
                    Pour plus d'informations sur la programmation,<br/>
                    rendez-vous sur Instagram et Facebook :<br/>
                </p>
                <p>
                    Facebook:<br/>
                    <a tabIndex="0" aria-label="lien vers page Facebook Salade Suprême" href="https://www.facebook.com/collectifsaladesupreme" target="_blank" rel="noreferrer noopener">https://www.facebook.com/collectifsaladesupreme</a><br/>
                    <a tabIndex="0" aria-label="lien vers page Facebook Babayaga" href="https://www.facebook.com/profile.php?id=61558040728919" target="_blank" rel="noreferrer noopener">https://www.facebook.com/profile.php?id=61558040728919</a><br/>
                </p>
                <p>
                    Instagram:<br/>
                    <a tabIndex="0" aria-label="lien vers page Instagram Salade Suprême" href="https://www.instagram.com/saladesupreme/" target="_blank" rel="noreferrer noopener">https://www.instagram.com/saladesupreme/</a><br/>
                    <a tabIndex="0" aria-label="lien vers page Instagram Babayaga" href="https://www.instagram.com/chez.babayaga.toulouse/" target="_blank" rel="noreferrer noopener">https://www.instagram.com/chez.babayaga.toulouse/</a><br/>
                </p>
                <a tabIndex="0" aria-label="lien vers page adhésion newsletter hello asso" href="https://www.helloasso.com/associations/salade-supreme/adhesions/adhesion" target="_blank" rel="noreferrer noopener">Abonnez vous à notre newsletter pour ne rien louper !</a>
            </div>
        </div>
    );

    return (
        <>
            {residencesData.map(( data ) =>
                (
                    <ProjetModel key={data.babayaga.title} extraDescription={extraDescriptionContent} extraBottomContent={extraBottomBabayaga} bannerImg={data.babayaga.bannerImg} bannerImgM={data.babayaga.bannerImgM} altBannerImg={data.babayaga.altBannerImg} title={data.babayaga.title} theme={data.babayaga.theme} description={data.babayaga.description} img1={data.babayaga.img1} img1M={data.babayaga.img1M} alt1={data.babayaga.alt1} img2={data.babayaga.img2} img2M={data.babayaga.img2M} alt2={data.babayaga.alt2} img3={null} showAltText={false}/>
                )
            )}
        </>
    )
}

export default Babayaga;