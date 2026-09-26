import CountdownBanner from './CountdownBanner';
import CapharnaumLocation from './CapharnaumLocation';
import '../styles/ProjetModel.css';

function CapharnaumIntro({ className, title, theme, description, bannerImg, bannerImgM, altBannerImg, extraDescription, openingDate, activities, atelierLabel, atelierUrl, hours, location, img1, img2, img3, img4, alt1, alt2, alt3, alt4 }) {
    const descriptionWithLineBreaks = description.replace(/(Crédits|Au programme|Chez Salade)/g, '\n$1');

    return (
        <section className={className}>
            <CountdownBanner
                bannerImg={bannerImg}
                bannerImgM={bannerImgM}
                altBannerImg={altBannerImg}
                openingDate={openingDate}
            />
            <section className="projet-content residence">
                <h1 tabIndex="0" className="pink-titles">
                    {title}
                </h1>
                <h2 tabIndex="0">{theme}</h2>
                <div tabIndex="0" className="projet-description">
                    {descriptionWithLineBreaks.split('\n').map((line, index) => (
                        <p key={index} tabIndex="0" className={line.includes('Crédits photo') ? 'creditsPhoto' : undefined}>
                            {line}
                        </p>
                    ))}
                    {extraDescription}
                </div>
                <div className="capharnaum-twin-pictures">
                    {[{ source: img1, alt: alt1 }, { source: img2, alt: alt2 }, { source: img3, alt: alt3 }, { source: img4, alt: alt4 }].map(({ source, alt }, index) => (
                        <div className={`capharnaum-twin-pictures__item capharnaum-twin-pictures__item--${index + 1}`} key={source}>
                            <img tabIndex="0" src={process.env.PUBLIC_URL + source} alt={alt} />
                        </div>
                    ))}
                </div>
                <div id="capharnaum-info" className="capharnaum-info">
                    <section className="capharnaum-info__section" aria-labelledby="capharnaum-activities-title">
                        <h3 id="capharnaum-activities-title" className="pink-titles capharnaum-info__title">On y fera quoi ?</h3>
                        <ul className="capharnaum-activities">
                            {activities.map((activity) => (
                                <li key={activity.label}>
                                    <span className="capharnaum-activity-icon" aria-hidden="true">{activity.icon}</span>
                                    <span>
                                        <strong>{activity.label}</strong>
                                        <small>{activity.category}</small>
                                    </span>
                                </li>
                            ))}
                            <li>
                                <span className="capharnaum-activity-icon" aria-hidden="true">🧵</span>
                                <span>
                                    <strong>{atelierLabel.replace('🧵 ', '')}</strong>
                                    <small><a href={atelierUrl} target="_blank" rel="noreferrer">@laretourcherie.toulouse</a></small>
                                </span>
                            </li>
                        </ul>
                    </section>
                    <section className="capharnaum-info__section" aria-labelledby="capharnaum-hours-title">
                        <h3 id="capharnaum-hours-title" className="pink-titles capharnaum-info__title">Quand ?</h3>
                        <dl className="capharnaum-hours">
                            {hours.map(({ days, hours: openingHours }) => (
                                <div key={days}>
                                    <dt>{days}</dt>
                                    <dd>{openingHours}</dd>
                                </div>
                            ))}
                        </dl>
                    </section>
                    <section className="capharnaum-info__section" aria-labelledby="capharnaum-location-title">
                        <h3 id="capharnaum-location-title" className="pink-titles capharnaum-info__title">Où ?</h3>
                        <address className="capharnaum-location"><p>📍{location.address}</p></address>
                        <CapharnaumLocation location={location} />
                    </section>
                </div>
            </section>
        </section>
    );
}

export default CapharnaumIntro;