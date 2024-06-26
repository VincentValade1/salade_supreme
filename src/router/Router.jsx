import { BrowserRouter as Routing, Routes, Route } from "react-router-dom";
import React from "react";
import Accueil from "../pages/Accueil";
// import Residences from "../pages/Residences";
import Projets from "../pages/Projets";
import Membres from "../pages/Membres"
import MembreMobile from "../pages/MembreMobile";
import Services from "../pages/Services";
import Contact from "../pages/Contact";
import Erreur from "../pages/Erreur";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";

//pages résidences
import Babayaga from "../pages/Babayaga";

// pages projets
import SupremeVitrines from "../pages/SupremeVitrines";
import MisterFreeze from "../pages/MisterFreeze";
import Colocations from "../pages/Colocations";
import Identite from "../pages/Identite";
import Alphabet from "../pages/Alphabet";
import Ateliers from "../pages/Ateliers";
import FancyFuzz from "../pages/FancyFuzz";
import Serigraphies from "../pages/Serigraphies";
import Biennale from "../pages/Biennale";
import Clutch from "../pages/Clutch";
import EcoConception from "../pages/EcoConception";
import OzOccitanie from "../pages/OzOccitanie";
import StreetArt from "../pages/StreetArt";

function Router() {
    return (
        <Routing>
            <ScrollToTop />
            <Header />
            <Routes>
                <Route exact path='/' element={<Accueil />} />
                {/* <Route exact path='/residences' element={<Residences />} /> */}
                <Route exact path='/residences/babayaga' element={<Babayaga />} />
                <Route exact path='/projets' element={<Projets />} />
                <Route exact path='/projets/supreme-vitrines' element={<SupremeVitrines />} />
                <Route exact path='/projets/mister-freeze' element={<MisterFreeze />} />
                <Route exact path='/projets/colocations' element={<Colocations />} />
                <Route exact path='/projets/identite' element={<Identite />} />
                <Route exact path='/projets/alphabet' element={<Alphabet />} />
                <Route exact path='/projets/ateliers' element={<Ateliers />} />
                <Route exact path='/projets/fancy-fuzz' element={<FancyFuzz />} />
                <Route exact path='/projets/serigraphies' element={<Serigraphies />} />
                <Route exact path='/projets/biennale' element={<Biennale />} />
                <Route exact path='/projets/clutch' element={<Clutch />} />
                <Route exact path='/projets/ecoConception' element={<EcoConception />} />
                <Route exact path='/projets/ozOccitanie' element={<OzOccitanie />} />
                <Route exact path='/projets/streetArt' element={<StreetArt />} />
                
                <Route exact path='/membres/:name' element={<MembreMobile />} />

                <Route exact path='/membres' element={<Membres />} />
                <Route exact path='/services' element={<Services />} />
                <Route exact path='/contact' element={<Contact />} />
                <Route exact path='*' element={<Erreur />} />
                <Route exact path='/pageError404'element={<Erreur />} />
            </Routes>
            <Footer />
        </Routing>
    )
}

export default Router;