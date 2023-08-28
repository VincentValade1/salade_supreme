import { BrowserRouter as Routing, Routes, Route } from "react-router-dom";
import React from "react";
import Accueil from "../pages/Accueil";
import Projets from "../pages/Projets";
import Membres from "../pages/Membres"
import Services from "../pages/Services";
import Contact from "../pages/Contact";
import Erreur from "../pages/Erreur";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";

import SupremeVitrines from "../pages/SupremeVitrines";
import MisterFreeze from "../pages/MisterFreeze";
import Colocations from "../pages/Colocations";
import Identite from "../pages/Identite";
import Alphabet from "../pages/Alphabet";
import Ateliers from "../pages/Ateliers";
import FancyFuzz from "../pages/FancyFuzz";
import Serigraphies from "../pages/Serigraphies";
import Biennale from "../pages/Biennale";



function Router() {
    return (
        <Routing>
            <ScrollToTop />
            <Header />
            <Routes>
                <Route exact path='/' element={<Accueil />} />
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

export default Router