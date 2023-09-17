import React from "react";
import Loader from "../components/Loader";
import Carroussel from '../components/Caroussel';

function Accueil() {
    // const [showLoader, setShowLoader] = useState(true);

    // useEffect(() => {
    //     setTimeout(() => {
    //         setShowLoader(false);
    //     }, 2000);
    // }, []);

    return(
        <>
            {/* {showLoader ? ( */}
            {/* ) : ( */}
                <main className="accueil-main-div">
                    <Loader />
                    <Carroussel />
                </main>
            {/* )} */}
        </>  
    )
}

export default Accueil