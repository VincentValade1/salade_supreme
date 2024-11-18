import '../styles/ProjetModel.css';
import { useEffect, useState } from 'react';
import ExtraProjetContentDescription from '../components/ExtraProjetContentDescription';

function ProjetModel123 ({ extraTopContent, extraProjetContentDescriptionTitle, extraProjetContentDescriptionText, extraBottomContent, img1, img1M, alt1, img2, img2M, alt2, img3, img3M, alt3}) {

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

    return (
        <section className='projet-content'>
            {extraTopContent}
            <ExtraProjetContentDescription extraProjetContentDescriptionTitle={extraProjetContentDescriptionTitle} extraProjetContentDescriptionText={extraProjetContentDescriptionText} />
            <div className="projet-duo-images-div">
                <div className="projet-left-image-div">
                    {isMobile ? <img tabIndex="0" src={process.env.PUBLIC_URL + img1M} alt={alt1} /> : <img tabIndex="0" src={process.env.PUBLIC_URL + img1} alt={alt1} />}
                    {isDesktop && alt1 !== alt2 && <p tabIndex="0">{alt1}</p>}
                </div>
                <div className="projet-right-image-div">
                    {isMobile ? <img tabIndex="0" src={process.env.PUBLIC_URL + img2M} alt={alt2} /> : <img tabIndex="0" src={process.env.PUBLIC_URL + img2} alt={alt2} />}
                    {isDesktop && <p tabIndex="0">{alt2}</p>}
                </div>
            </div>
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
    );
}

export default ProjetModel123;