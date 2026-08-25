import { useEffect, useState } from 'react';

function CountdownBanner({ bannerImg, bannerImgM, altBannerImg, openingDate }) {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(openingDate));

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const countdownInterval = window.setInterval(() => {
            const nextTimeLeft = getTimeLeft(openingDate);
            setTimeLeft(nextTimeLeft);

            if (!nextTimeLeft.isFuture) {
                window.clearInterval(countdownInterval);
            }
        }, 1000);

        return () => window.clearInterval(countdownInterval);
    }, [openingDate]);

    const bannerImage = isMobile ? bannerImgM : bannerImg;

    if (!timeLeft.isFuture) {
        return <img tabIndex="0" className="projet-bannerImg" src={process.env.PUBLIC_URL + bannerImage} alt={altBannerImg} />;
    }

    return (
        <div className="capharnaum-banner">
            <img tabIndex="0" className="projet-bannerImg" src={process.env.PUBLIC_URL + bannerImage} alt={altBannerImg} />
            <div
                className="capharnaum-countdown"
                role="timer"
                aria-live="polite"
                aria-label={`Ouverture du Capharnaum dans ${formatCountdownLabel(timeLeft)}`}
            >
                <p className="capharnaum-countdown__date">{formatOpeningDate(openingDate)}</p>
                <p className="capharnaum-countdown__label">Ouverture dans</p>
                <div className="capharnaum-countdown__values">
                    <CountdownValue value={timeLeft.days} label="jours" />
                    <CountdownValue value={timeLeft.hours} label="heures" />
                    <CountdownValue value={timeLeft.minutes} label="minutes" />
                    <CountdownValue value={timeLeft.seconds} label="secondes" />
                </div>
            </div>
        </div>
    );
}

function CountdownValue({ value, label }) {
    return (
        <span className="capharnaum-countdown__value">
            <strong>{String(value).padStart(2, '0')}</strong>
            <small>{label}</small>
        </span>
    );
}

function getTimeLeft(openingDate) {
    const remaining = new Date(openingDate).getTime() - Date.now();
    const totalSeconds = Math.max(0, Math.floor(remaining / 1000));

    return {
        days: Math.floor(totalSeconds / 86400),
        hours: Math.floor((totalSeconds % 86400) / 3600),
        minutes: Math.floor((totalSeconds % 3600) / 60),
        seconds: totalSeconds % 60,
        isFuture: remaining > 0
    };
}

function formatCountdownLabel(timeLeft) {
    return `${timeLeft.days} jours, ${timeLeft.hours} heures, ${timeLeft.minutes} minutes et ${timeLeft.seconds} secondes`;
}

function formatOpeningDate(openingDate) {
    return new Intl.DateTimeFormat('fr-FR', {
        dateStyle: 'full',
        timeStyle: 'short',
        timeZone: 'Europe/Paris'
    }).format(new Date(openingDate));
}

export default CountdownBanner;
