import { useEffect, useMemo, useState } from 'react';
import { BsArrowUp, BsCalendar3, BsInfoCircle } from 'react-icons/bs';
import caphData from '../datas/capharnaumPage.json';
import CapharnaumIntro from '../components/CapharnaumIntro';
import PlanningAgenda from '../components/PlanningAgenda';
import '../styles/Capharnaum.css';

const API_EVENTS_URL = 'https://api.saladesupreme.tarrieu.fr/api/events?refresh=false';
const API_INTERVENANTS_URL = 'https://api.saladesupreme.tarrieu.fr/api/intervenants?refresh=false';

function getEventDate(event) {
    return String(event.date || '').slice(0, 10);
}

function getActivityKind(activity) {
    const normalizedTypes = [activity.type, activity.category].map((value) => {
        const type = String(value || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim().toLowerCase();
        return type;
    });

    if (normalizedTypes.some((type) => type.includes('atelier'))) {
        return 'atelier créatif';
    }

    if (normalizedTypes.some((type) => type.includes('stage'))) {
        return 'stage';
    }

    return null;
}

function formatActivityDate(dateValue) {
    const formattedDate = new Intl.DateTimeFormat('fr-FR', {
        weekday: 'long',
        day: 'numeric',
        month: 'long'
    }).format(new Date(`${dateValue}T00:00:00`));

    return formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
}

function normalizePlanningData(events = [], intervenants = []) {
    const monthMap = new Map();

    const allIntervenants = Array.isArray(intervenants) ? intervenants : [];

    (Array.isArray(events) ? events : []).forEach((event, eventIndex) => {
        const eventDate = getEventDate(event);
        const monthId = event.month_id || event.monthId || event.month || eventDate.slice(0, 7) || `month-${eventIndex}`;
        const monthName = event.month_name || event.monthName || event.month || (
            eventDate
                ? new Intl.DateTimeFormat('fr-FR', { month: 'long', year: 'numeric' }).format(new Date(`${eventDate}T00:00:00`))
                : monthId
        );

        if (!monthMap.has(monthId)) {
            monthMap.set(monthId, {
                id: monthId,
                name: monthName,
                activities: []
            });
        }

        monthMap.get(monthId).activities.push({
            ...event,
            id: event.id || `${eventDate}-${event.time || ''}-${event.title || ''}-${eventIndex}`,
            date: eventDate,
            intervenant: allIntervenants.find((intervenant) => intervenant.id === event.intervenantId) || null
        });
    });

    return Array.from(monthMap.values());
}

function Capharnaum() {
    const caph = caphData;
    const [planningMonths, setPlanningMonths] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [apiError, setApiError] = useState(false);
    const [selectedActivity, setSelectedActivity] = useState(null);
    const [modalActivityId, setModalActivityId] = useState(null);
    const handleSelectedActivityChange = (activity) => {
        setSelectedActivity(activity);
        if (!activity) {
            setModalActivityId(null);
        }
    };
    const nextActivity = useMemo(() => {
        const today = new Date();
        const todayDateKey = [
            today.getFullYear(),
            String(today.getMonth() + 1).padStart(2, '0'),
            String(today.getDate()).padStart(2, '0')
        ].join('-');

        return planningMonths
            .flatMap((month) => month.activities)
            .filter((activity) => getActivityKind(activity) && activity.date >= todayDateKey)
            .sort((first, second) => first.date.localeCompare(second.date) || String(first.time || '').localeCompare(String(second.time || ''), 'fr', { numeric: true }))[0] || null;
    }, [planningMonths]);

    useEffect(() => {
        let isMounted = true;

        const loadPlanningData = async () => {
            try {
                const [eventsResponse, intervenantsResponse] = await Promise.all([
                    fetch(API_EVENTS_URL),
                    fetch(API_INTERVENANTS_URL).catch((error) => {
                        console.warn('Unable to load Capharnaüm intervenants; events will be shown without speaker details.', error);
                        return null;
                    })
                ]);

                if (!eventsResponse.ok) {
                    throw new Error(`Unexpected response from the Capharnaüm events API (${eventsResponse.status})`);
                }

                const events = await eventsResponse.json();
                const intervenants = intervenantsResponse?.ok ? await intervenantsResponse.json() : [];

                if (!intervenantsResponse?.ok) {
                    console.warn('Capharnaüm intervenants are temporarily unavailable; events will be shown without speaker details.');
                }

                if (!isMounted) {
                    return;
                }

                setApiError(false);
                setPlanningMonths(normalizePlanningData(events, intervenants));
                setIsLoading(false);
            } catch (error) {
                console.error('Unable to fetch Capharnaüm events from API, using the fallback data instead.', error);

                if (!isMounted) {
                    return;
                }

                setApiError(true);
                setIsLoading(false);
            }
        };

        loadPlanningData();

        return () => {
            isMounted = false;
        };
    }, []);

    return (
        <section className={`capharnaum-page ${!apiError && nextActivity ? 'capharnaum-page--with-upcoming' : ''}`}>
            <nav className="capharnaum-quick-navigation" aria-label="Navigation rapide dans le Capharnaüm">
                <button
                    type="button"
                    aria-label="Aller au calendrier"
                    title="Calendrier"
                    onClick={() => document.getElementById('cours-ateliers')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                >
                    <BsCalendar3 aria-hidden="true" />
                </button>
                <button
                    type="button"
                    aria-label="Aller aux informations"
                    title="Informations"
                    onClick={() => document.getElementById('capharnaum-info')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                >
                    <BsInfoCircle aria-hidden="true" />
                </button>
                <button
                    type="button"
                    aria-label="Remonter en haut de page"
                    title="Haut de page"
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                >
                    <BsArrowUp aria-hidden="true" />
                </button>
            </nav>
            {!apiError && nextActivity && (
                <button
                    type="button"
                    className="capharnaum-upcoming-banner"
                    aria-label={`Afficher le planning : ${nextActivity.title}, ${formatActivityDate(nextActivity.date)}`}
                    title="Cliquer pour afficher le planning et les détails de l’activité"
                    onClick={() => {
                        setSelectedActivity(nextActivity);
                        setModalActivityId(nextActivity.id);
                        window.requestAnimationFrame(() => document.getElementById('cours-ateliers')?.scrollIntoView({ behavior: 'smooth', block: 'start' }));
                    }}
                >
                    <span className="capharnaum-upcoming-banner__entrance" aria-hidden="true">
                        <span className="capharnaum-upcoming-banner__track">
                            {Array.from({ length: 16 }, (_, copy) => (
                                <span className="capharnaum-upcoming-banner__message" key={copy}>
                                    Prochain {getActivityKind(nextActivity)}
                                    <span className="capharnaum-upcoming-banner__separator">·</span>
                                    {formatActivityDate(nextActivity.date)}
                                    {nextActivity.time && (
                                        <>
                                            <span className="capharnaum-upcoming-banner__separator">·</span>
                                            {nextActivity.time}
                                        </>
                                    )}
                                    <span className="capharnaum-upcoming-banner__separator">·</span>
                                    {nextActivity.title}
                                    <span className="capharnaum-upcoming-banner__separator">·</span>
                                </span>
                            ))}
                        </span>
                    </span>
                </button>
            )}
            <CapharnaumIntro
                title={caph.title}
                theme={caph.theme}
                description={caph.description}
                bannerImg={caph.bannerImg}
                bannerImgM={caph.bannerImgM}
                altBannerImg={caph.altBannerImg}
                openingDate={caph.openingDate}
                activities={caph.activities}
                atelierLabel={caph.atelierLabel}
                atelierUrl={caph.atelierUrl}
                hours={caph.hours}
                location={caph.location}
                img1={caph.img1}
                img2={caph.img2}
                img3={caph.img3}
                img4={caph.img4}
                alt1={caph.alt1}
                alt2={caph.alt2}
                alt3={caph.alt3}
                alt4={caph.alt4}
            />
            <PlanningAgenda
                months={planningMonths}
                isLoading={isLoading}
                errorMessage={apiError ? 'Le calendrier est temporairement indisponible. Merci de réessayer plus tard.' : null}
                selectedActivity={selectedActivity}
                onSelectedActivityChange={handleSelectedActivityChange}
                modalActivityId={modalActivityId}
                activityDescriptions={[
                    {
                        type: 'Atelier Créatif',
                        title: 'Ateliers créatifs',
                        description: 'Des rendez-vous pour explorer une pratique artistique, expérimenter et réaliser une création.'
                    },
                    {
                        type: 'Stages',
                        title: 'Stages',
                        description: 'Des temps dédiés pour approfondir une pratique et développer un projet créatif.'
                    }
                ]}
            />
        </section>
    );
}

export default Capharnaum;
