import '../styles/Loader.css';

function Loader () {
    const gifLoader = process.env.PUBLIC_URL + "/images/logo_gif_loader.gif";

    return(
        <div className="loader-div">
            <img src={gifLoader} alt="logo de salade supreme animé"/>
        </div>
    )
}

export default Loader;