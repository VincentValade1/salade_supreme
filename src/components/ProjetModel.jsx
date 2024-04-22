import '../styles/ProjetModel.css';
import { useEffect, useState } from 'react';

function ProjetModel({ className, extraDescription, extraTopContent, extraBottomContent, twinPictures, bannerImg, bannerImgM, altBannerImg, title, theme, description, img1, img1M, alt1, img2, img2M, alt2, img3, img3M, alt3, showAltText = true }) {
    const [isDesktop, setIsDesktop] = useState(window.innerWidth > 1024);

    useEffect(() => {
        const handleResize = () => {
            setIsDesktop(window.innerWidth > 1024);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    // Ajoute un retour à la ligne avant les mots spécifiques dans la description
    const descriptionWithLineBreaks = description.replace(/(Crédits|Au programme)/g, '\n$1');

    return (
        <section className={className}>
            {isMobile ? (
                <img tabIndex="0" className='projet-bannerImg' src={process.env.PUBLIC_URL + bannerImgM} alt={altBannerImg} />
            ) : (
                <img tabIndex="0" className='projet-bannerImg' src={process.env.PUBLIC_URL + bannerImg} alt={altBannerImg} />
            )}
            <section className="projet-content">
                <h1 tabIndex="0" className='pink-titles'>
                    {title}
                </h1>
                <h2 tabIndex="0">{theme}</h2>
                <div tabIndex="0" className='projet-description'>
                    {descriptionWithLineBreaks.split('\n').map((line, index) => {
                        // Condition pour vérifier si la ligne contient "Crédits photo"
                        if (line.includes("Crédits photo")) {
                            return (
                                <p key={index} tabIndex="0" className="creditsPhoto">
                                    {line}
                                </p>
                            );
                        } else {
                            return (
                                <p key={index} tabIndex="0">
                                    {line}
                                </p>
                            );
                        }
                    })}
                    {extraDescription}
                </div>

                {extraTopContent}
                {twinPictures !== null ? (
                    <div className="projet-duo-images-div">
                        <div className="projet-left-image-div">
                            {isMobile ? <img tabIndex="0" src={process.env.PUBLIC_URL + img1M} alt={alt1} /> : <img tabIndex="0" src={process.env.PUBLIC_URL + img1} alt={alt1} />}
                            {isDesktop && alt1 !== alt2 && showAltText && (<p tabIndex="0">{alt1}</p>)}

                        </div>
                        <div className="projet-right-image-div">
                            {isMobile ? <img tabIndex="0" src={process.env.PUBLIC_URL + img2M} alt={alt2} /> : <img tabIndex="0" src={process.env.PUBLIC_URL + img2} alt={alt2} />}
                            {isDesktop && alt2 && showAltText && (<p tabIndex="0">{alt2}</p>)}

                        </div>
                    </div>
                ) : null}
                
                {img3 !== null ? (
                    isMobile ? (
                        <img tabIndex="0" className='projet-lastImg' src={process.env.PUBLIC_URL + img3M} alt={alt3} />
                    ) : (
                        <img tabIndex="0" className='projet-lastImg' src={process.env.PUBLIC_URL + img3} alt={alt3} />
                    )
                ) : (
                    extraBottomContent
                )}
            </section>
        </section>
    );
}

export default ProjetModel;
