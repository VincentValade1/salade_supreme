import '../styles/ProjetModel.css';
import { useEffect, useState } from 'react';

function ProjetModel ({ className, extraContent1, extraContent2, bannerImg, bannerImgM, altBannerImg, title, theme, description, img1, img1M, alt1, img2, img2M, alt2, img3, img3M, alt3 }) {
    
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


    return(
        <main className={className}>
            {isMobile ? (<img tabIndex="0" className='projet-bannerImg' src={bannerImgM} alt={altBannerImg}/>) : (<img tabIndex="0" className='projet-bannerImg' src={bannerImg} alt={altBannerImg}/>)}
            <section className="projet-content">
                <h1 tabIndex="0" className='pink-titles'>{title}</h1>
                <h2 tabIndex="0">{theme}</h2>
                <p tabIndex="0" className='projet-description'>{description}</p>
                {extraContent1}
                <div className="projet-duo-images-div">
                    <div className="projet-left-image-div">
                        {isMobile ? (<img tabIndex="0" src={img1M} alt={alt1} />) : (<img tabIndex="0" src={img1} alt={alt1} />)}
                        {isDesktop && (<p tabIndex="0" >{alt1}</p>)}
                    </div>
                    <div className="projet-right-image-div">
                        {isMobile ? (<img tabIndex="0" src={img2M} alt={alt2} />) : (<img tabIndex="0" src={img2} alt={alt2} />)} 
                        {isDesktop && (<p tabIndex="0" >{alt2}</p>)}
                    </div>
                </div>
                {extraContent2 ? extraContent2 : isMobile ? (<img tabIndex="0" className='projet-lastImg' src={img3M} alt={alt3} />) : (<img tabIndex="0" className='projet-lastImg' src={img3} alt={alt3} />)}
                {/* {extraContent2 ? extraContent2 : {isMobile ? (<img tabIndex="0" className='projet-lastImg' src={img3} alt={alt3} />) : (<img tabIndex="0" className='projet-lastImg' src={img3} alt={alt3} />))} */}

            </section>
        </main>

    )
}

export default ProjetModel;