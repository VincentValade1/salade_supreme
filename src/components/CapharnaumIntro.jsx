import { useEffect, useState } from 'react';

function CapharnaumIntro({ title, theme, description, bannerImg, bannerImgM, altBannerImg, extraDescription }) {
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

    const bannerImage = isMobile ? bannerImgM : bannerImg;
    const descriptionWithLineBreaks = description.replace(/(Crédits|Au programme|Chez Salade)/g, '\n$1');

    return (
        <>
            <img tabIndex="0" className="projet-bannerImg" src={process.env.PUBLIC_URL + bannerImage} alt={altBannerImg} />
            <section className="projet-content residence">
                <h1 tabIndex="0" className="pink-titles">
                    {title}
                </h1>
                <h2 tabIndex="0">{theme}</h2>
                <div tabIndex="0" className="projet-description">
                    {descriptionWithLineBreaks.split('\n').map((line, index) => (
                        <p key={index} tabIndex="0" className={line.includes('Crédits photo') ? 'creditsPhoto' : undefined}>
                            {line}
                        </p>
                    ))}
                    {extraDescription}
                </div>
            </section>
        </>
    );
}

export default CapharnaumIntro;