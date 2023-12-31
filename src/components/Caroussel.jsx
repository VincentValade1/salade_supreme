import '../styles/Caroussel.css';
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import React, { useState, useEffect } from 'react';
import carousselPictures from '../datas/carousselPictures.json';
import { NavLink } from 'react-router-dom';

function Caroussel() {
    const [isTablet, setIsTablet] = useState(window.innerWidth <= 1024);

    useEffect(() => {
        const handleResize = () => {
          setIsTablet(window.innerWidth <= 1024);
        };
    
        window.addEventListener('resize', handleResize);
    
        return () => {
          window.removeEventListener('resize', handleResize);
        };
    }, []);


    const logoSalade = process.env.PUBLIC_URL + "/images/logoCaroussel.png";

    const [pictures, setPictures] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [intervalId, setIntervalId] = useState(null);
   
    useEffect(() => {
        setPictures(carousselPictures);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
                setCurrentIndex(prevIndex => (prevIndex + 1) % pictures.length);
        }, 3000);

        setIntervalId(interval);
        return () => clearInterval(interval);
    }, [pictures]);

    if (pictures.length === 0) {
        return <div>Aucune image disponible</div>;
    }

    let slideLength = pictures.length;

    const activeImageBulletPoint = currentIndex + 1;

    const firstIndicePicture = 0;
        
    const lastIndicePicture = slideLength -1;

    function startAutoSlide() {
        const interval = setInterval(() => {
            setCurrentIndex(prevIndex => (prevIndex + 1) % pictures.length);
        }, 4000);
    
        setIntervalId(interval); // Stockez l'ID de l'intervalle
    }
    
    function nextSlide() {
        clearInterval(intervalId);
        setCurrentIndex(currentIndex !== lastIndicePicture ? currentIndex +1 : firstIndicePicture);
        startAutoSlide();
    }

    function previousSlide() {
        clearInterval(intervalId);
        setCurrentIndex(currentIndex !== firstIndicePicture ? currentIndex -1 : lastIndicePicture);
        startAutoSlide();
    }

    const { imageUrl, alt } = pictures[currentIndex];

    return (
        <section className={`slideshow ${ currentIndex ? 'active' : ""}`}>
            <img src={process.env.PUBLIC_URL + imageUrl} alt={alt} />
            {!isTablet && (
                <>
                    <button id='image précédante' tabIndex="0" aria-label='image précédante' aria-roledescription="fleche image précendante du carrousel d'images" className="arrow left" onClick={previousSlide}><FaChevronLeft /></button>
                    <button id='image suivante' tabIndex="0" aria-label='image suivante' aria-roledescription="fleche image suivante du carrousel d'images"  className="arrow right" onClick={nextSlide}><FaChevronRight /></button>
                    <span className='bulletpoint'>{activeImageBulletPoint}/{slideLength}</span>
                </>  
            )}
            
            <div className='overlay-caroussel-div'>
                <h1><img tabIndex="0" src={logoSalade} alt="Salade Suprême"/></h1>
                <h2 tabIndex="0" className='accueil-h2'>Design Global</h2>
            </div>
            <NavLink tabIndex="0" aria-label="lien vers page projets" activeclassname='active' to='/projets' className='carousel-link'>Voir nos projets</NavLink>
        </section>
    );
}

export default Caroussel;