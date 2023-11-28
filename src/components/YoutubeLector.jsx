import React from 'react';
import YouTube from 'react-youtube';
import '../styles/YoutubeLector.css';

function YoutubeLector(props) {
    // Remplacez 'VIDEO_ID' par l'ID de la vidéo YouTube que vous souhaitez inclure, en utilisant le composant.
    const videoId = props.videoId;

    const opts = {
        playerVars: {
            autoplay: 0,
        },
    };

    return (
        <YouTube videoId={videoId} opts={opts} className='extra-youtube-content'/>
    );
}

export default YoutubeLector;