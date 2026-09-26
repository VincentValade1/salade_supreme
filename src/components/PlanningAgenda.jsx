import { useEffect, useMemo, useRef, useState } from 'react';
import { BsInfoCircle, BsInstagram } from 'react-icons/bs';
import '../styles/PlanningAgenda.css';

const weekdayLabels = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];

const eventTypeStyles = {
    'Stages': { background: '#fdeaf2', border: '#DB6D93', text: '#4d4d4d' },
    'Atelier Créatif': { background: '#edf4ff', border: '#6f9ae8', text: '#2f3f5f' }
};

function getInstagramUsername(instagramUrl) {
    try {
        const username = new URL(instagramUrl).pathname.split('/').filter(Boolean)[0];
        return username ? `@${username}` : instagramUrl;
    } catch {
        return instagramUrl;
    }
}

function PlanningAgenda({ months, activityDescriptions = [], isLoading = false, errorMessage = null }) {
    const safeMonths = useMemo(() => months || [], [months]);
    const sectionRef = useRef(null);
    const [currentMonthIndex, setCurrentMonthIndex] = useState(0);
    const [selectedActivity, setSelectedActivity] = useState(null);
    const [expandedActivityType, setExpandedActivityType] = useState(null);
    const [isAnchorCopied, setIsAnchorCopied] = useState(false);
    const fallbackMonth = useMemo(() => {
        const today = new Date();
        return {
            name: new Intl.DateTimeFormat('fr-FR', { month: 'long', year: 'numeric' }).format(today),
            activities: []
        };
    }, []);
    const currentMonth = useMemo(() => safeMonths[currentMonthIndex] || safeMonths[0] || fallbackMonth, [safeMonths, currentMonthIndex, fallbackMonth]);
    const currentMonthDate = useMemo(() => {
        const firstActivity = currentMonth?.activities?.find((activity) => activity.date);
        if (firstActivity) {
            return new Date(`${firstActivity.date}T00:00:00`);
        }

        return safeMonths.length ? new Date(2026, currentMonthIndex, 1) : new Date();
    }, [currentMonth, currentMonthIndex, safeMonths.length]);
    const today = new Date();
    const todayDateKey = [
        today.getFullYear(),
        String(today.getMonth() + 1).padStart(2, '0'),
        String(today.getDate()).padStart(2, '0')
    ].join('-');

    useEffect(() => {
        if (window.location.hash === '#cours-ateliers') {
            window.requestAnimationFrame(() => sectionRef.current?.scrollIntoView({ behavior: 'auto', block: 'start' }));
        }
    }, []);

    const calendarWeeks = useMemo(() => {
        const firstDay = new Date(currentMonthDate.getFullYear(), currentMonthDate.getMonth(), 1);
        const lastDay = new Date(currentMonthDate.getFullYear(), currentMonthDate.getMonth() + 1, 0);
        const offset = (firstDay.getDay() + 6) % 7;
        const calendarStart = new Date(firstDay);
        calendarStart.setDate(firstDay.getDate() - offset);
        const totalCells = Math.ceil((lastDay.getDate() + offset) / 7) * 7;
        const days = Array.from({ length: totalCells }, (_, index) => {
            const date = new Date(calendarStart);
            date.setDate(calendarStart.getDate() + index);
            return date;
        });
        return Array.from({ length: days.length / 7 }, (_, index) => days.slice(index * 7, index * 7 + 7));
    }, [currentMonthDate]);

    const moveMonth = (direction) => {
        setCurrentMonthIndex((previous) => Math.min(Math.max(previous + direction, 0), months.length - 1));
        setSelectedActivity(null);
    };

    const copySectionUrl = async () => {
        const sectionUrl = new URL(window.location.href);
        sectionUrl.hash = 'cours-ateliers';

        try {
            await navigator.clipboard.writeText(sectionUrl.href);
        } catch {
            const temporaryInput = document.createElement('input');
            temporaryInput.value = sectionUrl.href;
            document.body.appendChild(temporaryInput);
            temporaryInput.select();
            document.execCommand('copy');
            document.body.removeChild(temporaryInput);
        }

        window.location.hash = 'cours-ateliers';
        window.requestAnimationFrame(() => sectionRef.current?.scrollIntoView({ behavior: 'auto', block: 'start' }));
        setIsAnchorCopied(true);
        window.setTimeout(() => setIsAnchorCopied(false), 1800);
    };

    const hasPreviousMonth = currentMonthIndex > 0;
    const hasNextMonth = currentMonthIndex < safeMonths.length - 1;

    const eventDetails = selectedActivity
        ? Object.entries(selectedActivity).filter(([key]) => !['id', 'month_id', 'month_name', 'intervenantId', 'day', 'type', 'category', 'title', 'description', 'link', 'intervenant'].includes(key))
        : [];
    const eventFieldLabels = { date: 'Date', time: 'Horaire' };

    return (
        <section ref={sectionRef} id="cours-ateliers" className="planning-agenda" aria-labelledby="cours-ateliers-title">
            <div className="planning-agenda__header">
                <div>
                    <h3 id="cours-ateliers-title" className="planning-agenda__title">
                        <button type="button" className="planning-agenda__title-link" onClick={copySectionUrl} title="Copier le lien de cette section" aria-label="Copier le lien vers la section Cours et Ateliers">
                            Ateliers & Stages
                        </button>
                    </h3>
                </div>
            </div>
            {isAnchorCopied && (
                <div className="planning-agenda__copy-toast" role="status" aria-live="polite">
                    URL copiée
                </div>
            )}

            <div className="planning-agenda__month-controls">
                {hasPreviousMonth && (
                    <button type="button" className="planning-agenda__month-button" onClick={() => moveMonth(-1)} aria-label="Mois précédent">‹</button>
                )}
                <h4 className="planning-agenda__month-name">{currentMonth.name}</h4>
                {hasNextMonth && (
                    <button type="button" className="planning-agenda__month-button" onClick={() => moveMonth(1)} aria-label="Mois suivant">›</button>
                )}
            </div>
            <div className={`planning-agenda__desktop-layout ${selectedActivity ? 'planning-agenda__desktop-layout--selected' : ''}`}>
                <div className="planning-agenda__board">
                    <div className="planning-agenda__legend">
                        {Object.entries(eventTypeStyles).map(([label, style]) => {
                            const activityDescription = activityDescriptions.find((activity) => activity.type === label);
                            const descriptionId = `planning-agenda-description-${label.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
                            const isExpanded = expandedActivityType === label;
                            const legendContent = (
                                <>
                                    <span className="planning-agenda__legend-swatch" style={{ '--event-background': style.background, '--event-border': style.border }} />
                                    <span className="planning-agenda__legend-label">{label}</span>
                                    {activityDescription && (
                                        <span className="planning-agenda__legend-indicator" aria-hidden="true">
                                            {isExpanded ? '−' : <BsInfoCircle />}
                                        </span>
                                    )}
                                </>
                            );

                            return activityDescription ? (
                                <button
                                    type="button"
                                    key={label}
                                    className="planning-agenda__legend-item planning-agenda__legend-item--toggle"
                                    aria-expanded={isExpanded}
                                    aria-controls={descriptionId}
                                    onClick={() => setExpandedActivityType(isExpanded ? null : label)}
                                >
                                    {legendContent}
                                </button>
                            ) : (
                                <div key={label} className="planning-agenda__legend-item">{legendContent}</div>
                            );
                        })}
                    </div>
                    {(isLoading || errorMessage) && (
                        <div className="planning-agenda__loading" role={errorMessage ? 'alert' : 'status'}>
                            <span>{errorMessage || 'Chargement du planning…'}</span>
                        </div>
                    )}
                    {activityDescriptions.map((activity) => {
                        if (activity.type !== expandedActivityType) {
                            return null;
                        }

                        const descriptionId = `planning-agenda-description-${activity.type.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
                        return (
                            <section
                                key={activity.type}
                                id={descriptionId}
                                className="planning-agenda__activity-description-panel"
                                aria-labelledby={`${descriptionId}-title`}
                                style={{ '--event-border': eventTypeStyles[activity.type]?.border || '#DB6D93' }}
                            >
                                <h4 id={`${descriptionId}-title`}>{activity.title}</h4>
                                <p>{activity.description}</p>
                            </section>
                        );
                    })}
                    <div className="planning-agenda__weekdays">
                        {weekdayLabels.map((day) => <div key={day} className="planning-agenda__weekday">{day}</div>)}
                    </div>
                    <div className="planning-agenda__weeks">
                        {calendarWeeks.map((week, weekIndex) => (
                            <div key={`week-${weekIndex}`} className="planning-agenda__week">
                                {week.map((date) => {
                                    const dateKey = [
                                        date.getFullYear(),
                                        String(date.getMonth() + 1).padStart(2, '0'),
                                        String(date.getDate()).padStart(2, '0')
                                    ].join('-');
                                    const dayEvents = currentMonth.activities.filter((activity) => activity.date === dateKey);
                                    const isCurrentMonth = date.getFullYear() === currentMonthDate.getFullYear() && date.getMonth() === currentMonthDate.getMonth();
                                    const isToday = dateKey === todayDateKey;
                                    const isPastDate = dateKey < todayDateKey;
                                    const weekdayLabel = weekdayLabels[(date.getDay() + 6) % 7];
                                    return (
                                        <div key={dateKey} className={`planning-agenda__day ${isCurrentMonth ? '' : 'planning-agenda__day--outside'} ${dayEvents.length === 0 ? 'planning-agenda__day--empty' : ''} ${isToday ? 'planning-agenda__day--today' : ''} ${isPastDate ? 'planning-agenda__day--past' : ''}`}>
                                            <div className="planning-agenda__day-heading">
                                                <span className="planning-agenda__day-name">{weekdayLabel}</span>
                                                <span className="planning-agenda__day-number">{date.getDate()}</span>
                                            </div>
                                            <div className="planning-agenda__events">
                                                {dayEvents.slice(0, 3).map((activity) => {
                                                    const typeStyle = eventTypeStyles[activity.type] || eventTypeStyles.Stages;
                                                    return (
                                                        <button
                                                            type="button"
                                                            key={activity.id}
                                                            className="planning-agenda__event"
                                                            style={{ '--event-background': typeStyle.background, '--event-border': typeStyle.border, '--event-text': typeStyle.text }}
                                                            onClick={() => setSelectedActivity(activity)}
                                                        >
                                                            <div className="planning-agenda__event-title">{activity.title}</div>
                                                            <div className="planning-agenda__event-time">{activity.time}</div>
                                                        </button>
                                                    );
                                                })}
                                                {dayEvents.length > 3 && <div className="planning-agenda__more-events">+{dayEvents.length - 3} de plus</div>}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        ))}
                    </div>
                </div>
                {selectedActivity && (
                    <aside className="planning-agenda__side-panel" aria-label="Détail de l’activité sélectionnée">
                        <button type="button" className="planning-agenda__side-panel-close" onClick={() => setSelectedActivity(null)} aria-label="Fermer le détail de l’activité">×</button>
                        <ActivityDetails selectedActivity={selectedActivity} eventDetails={eventDetails} eventFieldLabels={eventFieldLabels} />
                    </aside>
                )}
            </div>

            {selectedActivity && (
                <div className="planning-agenda__modal-overlay" onClick={() => setSelectedActivity(null)}>
                    <div className="planning-agenda__modal" onClick={(event) => event.stopPropagation()}>
                        <button type="button" className="planning-agenda__modal-close" onClick={() => setSelectedActivity(null)} aria-label="Fermer le détail">×</button>
                        <ActivityDetails selectedActivity={selectedActivity} eventDetails={eventDetails} eventFieldLabels={eventFieldLabels} />
                    </div>
                </div>
            )}

            {!isLoading && safeMonths.length > 0 && (
                <div className="planning-agenda__helper" role="status">
                    <span className="planning-agenda__helper-hand" aria-hidden="true">👆</span>
                    <span>
                        <strong className="planning-agenda__closing-message">
                            Cliquez sur un événement pour réserver votre créneau. Attention les places sont limitées.{' '}
                            On a hâte de vous y voir !
                        </strong>
                    </span>
                </div>
            )}
        </section>
    );
}

function ActivityDetails({ selectedActivity, eventDetails, eventFieldLabels }) {
    const eventDate = selectedActivity?.date;
    const isPastEvent = eventDate ? new Date(`${eventDate}T23:59:59`) < new Date() : false;

    return (
        <>
            <h4 className="planning-agenda__modal-title">{selectedActivity.title}</h4>
            <div className="planning-agenda__details">
                {eventDetails.map(([key, value]) => (
                    <div key={key} className="planning-agenda__detail">
                        <div className="planning-agenda__detail-label">{eventFieldLabels[key] || key}</div>
                        <div className="planning-agenda__detail-value">{formatEventDetailValue(key, value)}</div>
                    </div>
                ))}
            </div>
            <p className="planning-agenda__modal-description">{selectedActivity.description || 'Aucune description disponible pour cet événement.'}</p>
            {selectedActivity.intervenant && (
                <div className="planning-agenda__speaker">
                    <div className="planning-agenda__speaker-label">Intervenant</div>
                    <div className="planning-agenda__speaker-name">{selectedActivity.intervenant.name}</div>
                    <p className="planning-agenda__speaker-bio">{selectedActivity.intervenant.bio}</p>
                    {selectedActivity.intervenant.instagram && (
                        <a
                            className="planning-agenda__speaker-link"
                            href={selectedActivity.intervenant.instagram}
                            target="_blank"
                            rel="noreferrer noopener"
                            aria-label={`Instagram de ${selectedActivity.intervenant.name}`}
                        >
                            <BsInstagram aria-hidden="true" />
                            <span className="planning-agenda__instagram-link">
                                {getInstagramUsername(selectedActivity.intervenant.instagram)}
                            </span>
                        </a>
                    )}
                </div>
            )}
            {isPastEvent ? (
                <div className="planning-agenda__no-reservation" aria-disabled="true">Événement terminé</div>
            ) : selectedActivity.link ? (
                <a className="planning-agenda__reservation-link" href={selectedActivity.link} target="_blank" rel="noreferrer noopener">Réserver</a>
            ) : (
                <div className="planning-agenda__no-reservation">Aucun lien de réservation disponible.</div>
            )}
        </>
    );
}

function formatEventDetailValue(key, value) {
    if (key !== 'date') {
        return String(value);
    }

    const [year, month, day] = String(value).split('-');
    const monthLabels = ['jan', 'fev', 'mar', 'avr', 'mai', 'juin', 'juil', 'aout', 'sept', 'oct', 'nov', 'dec'];
    return `${Number(day)} ${monthLabels[Number(month) - 1]} ${year}`;
}

export default PlanningAgenda;
