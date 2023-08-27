import '../styles/ProjetModel.css';

function ProjetModel ({ className, extraContent1, extraContent2, bannerImg, altBannerImg, title, theme, description, img1, alt1, img2, alt2, img3, alt3 }) {
    
    return(
        <main className={className}>
            <img className='projet-bannerImg' src={bannerImg} alt={altBannerImg}/>
            <section className="projet-content">
                <h1 className='pink-titles'>{title}</h1>
                <h2>{theme}</h2>
                <p className='projet-description'>{description}</p>
                {extraContent1}
                <div className="projet-duo-images-div">
                    <div className="projet-left-image-div">
                        <img src={img1} alt={alt1} />
                        <p>{alt1}</p>
                    </div>
                    <div className="projet-right-image-div">
                        <img src={img2} alt={alt2} />
                        <p>{alt2}</p>
                    </div>
                </div>
                {extraContent2 ? extraContent2 : <img className='projet-lastImg' src={img3} alt={alt3} />}
            </section>
        </main>

    )
}

export default ProjetModel;