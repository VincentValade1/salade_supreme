import '../styles/ProjetModel.css';

function ProjetModel ({ className, extraContent1, extraContent2, bannerImg, altBannerImg, title, theme, description, img1, alt1, img2, alt2, img3, alt3 }) {
    
    return(
        <main className={className}>
            <img tabIndex="0" className='projet-bannerImg' src={bannerImg} alt={altBannerImg}/>
            <section className="projet-content">
                <h1 tabIndex="0" className='pink-titles'>{title}</h1>
                <h2 tabIndex="0">{theme}</h2>
                <p tabIndex="0" className='projet-description'>{description}</p>
                {extraContent1}
                <div className="projet-duo-images-div">
                    <div className="projet-left-image-div">
                        <img tabIndex="0" src={img1} alt={alt1} />
                        <p tabIndex="0" >{alt1}</p>
                    </div>
                    <div className="projet-right-image-div">
                        <img tabIndex="0" src={img2} alt={alt2} />
                        <p tabIndex="0" >{alt2}</p>
                    </div>
                </div>
                {extraContent2 ? extraContent2 : <img tabIndex="0" className='projet-lastImg' src={img3} alt={alt3} />}
            </section>
        </main>

    )
}

export default ProjetModel;