import { useEffect, useState } from 'react';
import caphData from '../datas/capharnaumPage.json';
import CapharnaumIntro from '../components/CapharnaumIntro';
import PlanningAgenda from '../components/PlanningAgenda';
import '../styles/Capharnaum.css';

const API_EVENTS_URL = 'https://api.saladesupreme.tarrieu.fr/api/events?refresh=false';
const API_INTERVENANTS_URL = 'https://api.saladesupreme.tarrieu.fr/api/intervenants?refresh=false';

function getEventDate(event) {
    return String(event.date || '').slice(0, 10);
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
    const [apiError, setApiError] = useState(false);

    useEffect(() => {
        let isMounted = true;

        const loadPlanningData = async () => {
            try {
                const [eventsResponse, intervenantsResponse] = await Promise.all([
                    fetch(API_EVENTS_URL),
                    fetch(API_INTERVENANTS_URL)
                ]);

                if (!eventsResponse.ok || !intervenantsResponse.ok) {
                    throw new Error('Unexpected response from the Capharnaüm API');
                }

                const [events, intervenants] = await Promise.all([
                    eventsResponse.json(),
                    intervenantsResponse.json()
                ]);

                if (!isMounted) {
                    return;
                }

                setApiError(false);
                setPlanningMonths(normalizePlanningData(events, intervenants));
            } catch (error) {
                console.error('Unable to fetch Capharnaüm events from API, using the fallback data instead.', error);

                if (!isMounted) {
                    return;
                }

                setApiError(true);
            }
        };

        loadPlanningData();

        return () => {
            isMounted = false;
        };
    }, []);

    return (
        <section className="capharnaum-page">
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
            {apiError ? (
                <div className="capharnaum-page__error" role="alert" style={{
                    margin: '2rem auto',
                    maxWidth: '720px',
                    padding: '1.5rem',
                    border: '1px solid #d8b4b4',
                    background: '#fff4f4',
                    color: '#4b2d2d',
                    borderRadius: '12px',
                    textAlign: 'center',
                    fontSize: '1rem'
                }}>
                    Le calendrier est temporairement indisponible. Merci de réessayer plus tard.
                </div>
            ) : (
                <PlanningAgenda months={planningMonths} />
            )}
        </section>
    );
}

export default Capharnaum;
