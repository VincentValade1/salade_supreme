import React from 'react';
import YouTube from 'react-youtube';
import '../styles/YoutubeLector.css';

function YoutubeLector({ videoId, className }) {
    const opts = {
        playerVars: {
            autoplay: 0,
            // origin: window.location.origin,
            // origin: process.env.NODE_ENV === 'development' ? "http://localhost:3000" : "https://saladesupreme.fr",
            // enablejsapi: 1,
        },
    };

    return (
        <YouTube videoId={videoId} opts={opts} className={`extra-youtube-content ${className || ''}`} />
    );
}

export default YoutubeLector;