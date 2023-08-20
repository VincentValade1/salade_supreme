import { HashRouter, Routes, Route } from "react-router-dom";
import Accueil from "../pages/Accueil";
import Projets from "../pages/Projets";
import Membres from "../pages/Membres"
import Services from "../pages/Services";
import Contact from "../pages/Contact";
import Erreur from "../pages/Erreur";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";


function Router() {
    return (
        <HashRouter>
            <ScrollToTop />
            <Header />
            <Routes>
                <Route exact path='/' element={<Accueil />} />
                <Route exact path='/projets' element={<Projets />} />
                <Route exact path='/membres' element={<Membres />} />
                <Route exact path='/services' element={<Services />} />
                <Route exact path='/contact' element={<Contact />} />
                <Route exact path='*' element={<Erreur />} />
                <Route exact path='/pageError404'element={<Erreur />} />
            </Routes>
            <Footer />
        </HashRouter>
    )
}

export default Router