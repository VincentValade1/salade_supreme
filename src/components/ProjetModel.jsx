import '../styles/ProjetModel.css'

function ProjetModel ({ bannerImg, altBannerImg, h1, h2, description, img1, alt1, img2, alt2, img3, alt3 }) {
    return(
        // <p className="testProps">{name}</p>
        <main>
            <img className='projet-bannerImg' src={bannerImg} alt={altBannerImg}/>
            <section className="projet-content">
                <h1 className='pink-titles'>{h1}</h1>
                <h2>{h2}</h2>
                <p className='description-projet'>{description}</p>
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
                <img className='projet-lastImg' src={img3} alt={alt3} />
            </section>
        </main>

    )
}

export default ProjetModel