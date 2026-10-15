import { useEffect, useId, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { BsCalendarPlus, BsInfoCircle, BsInstagram } from 'react-icons/bs';
import AdminRecordEditorModal from './AdminRecordEditorModal';
import '../styles/PlanningAgenda.css';

const weekdayLabels = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];

const defaultEventTypeStyle = { background: '#edf4ff', border: '#6f9ae8', text: '#2f3f5f' };

function getInstagramUsername(instagramUrl) {
    try {
        const username = new URL(instagramUrl).pathname.split('/').filter(Boolean)[0];
        return username ? `@${username}` : instagramUrl;
    } catch {
        return instagramUrl;
    }
}

function isActivityCanceled(activity) {
    return activity?.canceled === true;
}

function hasPrice(value) {
    return value !== null && value !== undefined;
}

function escapeICalendarText(value) {
    return String(value || '')
        .replace(/\\/g, '\\\\')
        .replace(/\r?\n/g, '\\n')
        .replace(/,/g, '\\,')
        .replace(/;/g, '\\;');
}

function formatICalendarDate(date) {
    return String(date || '').replace(/-/g, '');
}

function addOneDay(date) {
    const nextDay = new Date(`${date}T00:00:00`);
    nextDay.setDate(nextDay.getDate() + 1);
    return getDateKey(nextDay);
}

function downloadCalendarEvent(activity) {
    const isMultiDay = activity.endDate > activity.date;
    const hasStartTime = /^\d{1,2}:\d{2}$/.test(activity.time || '');
    const formatTime = (time) => `${String(time).split(':')[0].padStart(2, '0')}${String(time).split(':')[1]}00`;
    const lines = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'PRODID:-//Salade Supreme//Agenda//FR',
        'CALSCALE:GREGORIAN',
        'BEGIN:VEVENT',
        `UID:${activity.id}@${window.location.hostname}`,
        `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')}`,
        `SUMMARY:${escapeICalendarText(activity.title)}`
    ];

    if (isMultiDay || !hasStartTime) {
        lines.push(`DTSTART;VALUE=DATE:${formatICalendarDate(activity.date)}`);
        lines.push(`DTEND;VALUE=DATE:${formatICalendarDate(addOneDay(isMultiDay ? activity.endDate : activity.date))}`);
    } else {
        lines.push(`DTSTART:${formatICalendarDate(activity.date)}T${formatTime(activity.time)}`);
        if (/^\d{1,2}:\d{2}$/.test(activity.endTime || '')) {
            lines.push(`DTEND:${formatICalendarDate(activity.endDate || activity.date)}T${formatTime(activity.endTime)}`);
        }
    }

    if (activity.description) {
        lines.push(`DESCRIPTION:${escapeICalendarText(activity.description)}`);
    }
    if (activity.location) {
        lines.push(`LOCATION:${escapeICalendarText(activity.location)}`);
    }
    if (activity.link) {
        lines.push(`URL:${activity.link}`);
    }
    lines.push('END:VEVENT', 'END:VCALENDAR');

    const calendarFile = new Blob([`${lines.join('\r\n')}\r\n`], { type: 'text/calendar;charset=utf-8' });
    const downloadUrl = URL.createObjectURL(calendarFile);
    const downloadLink = document.createElement('a');
    const filename = String(activity.title || 'evenement').normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-zA-Z0-9_-]+/g, '-').replace(/^-|-$/g, '');
    downloadLink.href = downloadUrl;
    downloadLink.download = `${filename || 'evenement'}.ics`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    downloadLink.remove();
    window.setTimeout(() => URL.revokeObjectURL(downloadUrl), 1000);
}

function getCalendarEventTiming(activity) {
    const isMultiDay = activity.endDate > activity.date;
    const hasStartTime = /^\d{1,2}:\d{2}$/.test(activity.time || '');
    if (isMultiDay || !hasStartTime) {
        return {
            allDay: true,
            startDate: activity.date,
            endDate: addOneDay(isMultiDay ? activity.endDate : activity.date)
        };
    }

    const normalizeTime = (time) => {
        const [hours, minutes] = String(time).split(':');
        return `${hours.padStart(2, '0')}:${minutes}:00`;
    };
    const startDateTime = `${activity.date}T${normalizeTime(activity.time)}`;
    let endDate = activity.endDate || activity.date;
    let endTime = activity.endTime;

    if (!/^\d{1,2}:\d{2}$/.test(endTime || '')) {
        const fallbackEnd = new Date(startDateTime);
        fallbackEnd.setHours(fallbackEnd.getHours() + 1);
        endDate = getDateKey(fallbackEnd);
        endTime = `${String(fallbackEnd.getHours()).padStart(2, '0')}:${String(fallbackEnd.getMinutes()).padStart(2, '0')}`;
    }

    return {
        allDay: false,
        startDate: activity.date,
        endDate,
        startDateTime,
        endDateTime: `${endDate}T${normalizeTime(endTime)}`
    };
}

function getGoogleCalendarUrl(activity) {
    const timing = getCalendarEventTiming(activity);
    const dates = timing.allDay
        ? `${formatICalendarDate(timing.startDate)}/${formatICalendarDate(timing.endDate)}`
        : `${timing.startDateTime}/${timing.endDateTime}`.replace(/[-:]/g, '');
    const parameters = new URLSearchParams({
        action: 'TEMPLATE',
        text: activity.title || '',
        dates,
        details: activity.description || ''
    });
    if (!timing.allDay) {
        parameters.set('ctz', 'Europe/Paris');
    }
    if (activity.location) {
        parameters.set('location', activity.location);
    }
    if (activity.link) {
        parameters.set('details', [activity.description, `Réservation : ${activity.link}`].filter(Boolean).join('\n\n'));
    }
    return `https://calendar.google.com/calendar/render?${parameters.toString()}`;
}

function getOutlookCalendarUrl(activity) {
    const timing = getCalendarEventTiming(activity);
    const startDateTime = timing.allDay ? `${timing.startDate}T00:00:00` : timing.startDateTime;
    const endDateTime = timing.allDay ? `${timing.endDate}T00:00:00` : timing.endDateTime;
    const parameters = new URLSearchParams({
        subject: activity.title || '',
        startdt: startDateTime,
        enddt: endDateTime,
        body: activity.description || ''
    });
    if (activity.location) {
        parameters.set('location', activity.location);
    }
    if (activity.link) {
        parameters.set('body', [activity.description, `Réservation : ${activity.link}`].filter(Boolean).join('\n\n'));
    }
    return `https://outlook.live.com/calendar/0/deeplink/compose?${parameters.toString()}`;
}

function getTariffToastPosition(anchor) {
    const bounds = anchor.getBoundingClientRect();
    const margin = 12;
    const maxToastWidth = Math.min(260, window.innerWidth - margin * 2);
    const maxLeft = Math.max(margin, window.innerWidth - margin - maxToastWidth);

    return {
        left: Math.min(Math.max(margin, bounds.left), maxLeft),
        top: bounds.bottom + 8
    };
}

function EventHeading({ activity, title = activity.title }) {
    return (
        <div className="planning-agenda__event-heading">
            <span className="planning-agenda__event-title">{title}</span>
            {hasPrice(activity.tarifNormal) && (
                <span className="planning-agenda__event-price" aria-label={`Tarif normal : ${activity.tarifNormal} euros`}>
                    {activity.tarifNormal} €
                </span>
            )}
        </div>
    );
}

function getStartTimeMinutes(time) {
    const match = String(time || '').match(/(\d{1,2})\s*(?:h|:)\s*(\d{2})?/i);
    return match ? Number(match[1]) * 60 + Number(match[2] || 0) : Number.POSITIVE_INFINITY;
}

function getDateKey(date) {
    return [date.getFullYear(), String(date.getMonth() + 1).padStart(2, '0'), String(date.getDate()).padStart(2, '0')].join('-');
}

function getWeekMultiDayEvents(week, activities) {
    const weekStart = getDateKey(week[0]);
    const weekEnd = getDateKey(week[6]);
    const candidates = activities
        .filter((activity) => activity.endDate > activity.date && activity.date <= weekEnd && activity.endDate >= weekStart)
        .sort((first, second) => first.date.localeCompare(second.date) || getStartTimeMinutes(first.time) - getStartTimeMinutes(second.time));
    const laneEnds = [];

    return candidates.map((activity) => {
        const visibleStart = activity.date < weekStart ? weekStart : activity.date;
        const visibleEnd = activity.endDate > weekEnd ? weekEnd : activity.endDate;
        const startColumn = week.findIndex((date) => getDateKey(date) === visibleStart) + 1;
        const endColumn = week.findIndex((date) => getDateKey(date) === visibleEnd) + 1;
        let lane = laneEnds.findIndex((laneEnd) => laneEnd < startColumn);

        if (lane < 0) {
            lane = laneEnds.length;
        }
        laneEnds[lane] = endColumn;

        return { activity, startColumn, endColumn, lane };
    }).map((segment) => ({ ...segment, laneCount: laneEnds.length }));
}

function getMobileMultiDayLanes(activities) {
    const laneEnds = [];
    const lanes = new Map();
    const multiDayActivities = activities
        .filter((activity) => activity.endDate > activity.date)
        .sort((first, second) => first.date.localeCompare(second.date) || getStartTimeMinutes(first.time) - getStartTimeMinutes(second.time));

    multiDayActivities.forEach((activity) => {
        let lane = laneEnds.findIndex((laneEnd) => laneEnd < activity.date);
        if (lane < 0) {
            lane = laneEnds.length;
        }

        lanes.set(activity.id, lane);
        laneEnds[lane] = activity.endDate;
    });

    return lanes;
}

function monthMatchesDate(month, date) {
    const monthIdMatch = String(month?.id || '').match(/^(\d{4})-(\d{2})$/);
    if (monthIdMatch) {
        return Number(monthIdMatch[1]) === date.getFullYear() && Number(monthIdMatch[2]) - 1 === date.getMonth();
    }

    const firstActivityDate = month?.activities?.find((activity) => activity.date)?.date;
    if (firstActivityDate) {
        const [year, monthNumber] = String(firstActivityDate).split('-').map(Number);
        return year === date.getFullYear() && monthNumber - 1 === date.getMonth();
    }

    const monthLabel = new Intl.DateTimeFormat('fr-FR', { month: 'long', year: 'numeric' }).format(new Date(date.getFullYear(), date.getMonth(), 1));
    return String(month?.name || '').trim().toLowerCase() === monthLabel.toLowerCase();
}

function PlanningAgenda({ months, eventLocation = '', activityDescriptions = [], isLoading = false, errorMessage = null, selectedActivity: selectedActivityProp, onSelectedActivityChange, isAdmin = false, adminToken, onActivitySaved, onUnauthorized }) {
    const safeMonths = useMemo(() => months || [], [months]);
    const eventTypeStyles = useMemo(() => {
        const styles = {};
        safeMonths.forEach((month) => month.activities.forEach((activity) => {
            if (!activity.type || styles[activity.type]) return;
            const fallbackDescription = activityDescriptions.find((description) => description.type === activity.type);
            styles[activity.type] = {
                ...defaultEventTypeStyle,
                background: activity.typeStyle?.background || defaultEventTypeStyle.background,
                border: activity.typeStyle?.border || defaultEventTypeStyle.border,
                text: activity.typeStyle?.text || defaultEventTypeStyle.text,
                title: activity.typeDescription ? activity.type : fallbackDescription?.title || activity.type,
                description: activity.typeDescription || fallbackDescription?.description || ''
            };
        }));
        activityDescriptions.forEach((description) => {
            if (!styles[description.type]) {
                styles[description.type] = {
                    ...defaultEventTypeStyle,
                    title: description.title,
                    description: description.description
                };
            } else if (!styles[description.type].description) {
                styles[description.type].description = description.description;
            }
        });
        return styles;
    }, [safeMonths, activityDescriptions]);
    const sectionRef = useRef(null);
    const touchStartRef = useRef(null);
    const suppressTouchClickRef = useRef(false);
    const [currentMonthIndex, setCurrentMonthIndex] = useState(0);
    const [monthTransition, setMonthTransition] = useState({ id: 0, direction: null });
    const [internalSelectedActivity, setInternalSelectedActivity] = useState(null);
    const selectedActivity = selectedActivityProp === undefined ? internalSelectedActivity : selectedActivityProp;
    const setSelectedActivity = onSelectedActivityChange || setInternalSelectedActivity;
    const [expandedActivityType, setExpandedActivityType] = useState(null);
    const [isAnchorCopied, setIsAnchorCopied] = useState(false);
    const [hoveredMultiDayActivityId, setHoveredMultiDayActivityId] = useState(null);
    const [isEditingActivity, setIsEditingActivity] = useState(false);
    const fallbackMonth = useMemo(() => {
        const today = new Date();
        return {
            name: new Intl.DateTimeFormat('fr-FR', { month: 'long', year: 'numeric' }).format(today),
            activities: []
        };
    }, []);
    const currentMonth = useMemo(() => safeMonths[currentMonthIndex] || safeMonths[0] || fallbackMonth, [safeMonths, currentMonthIndex, fallbackMonth]);
    const mobileMultiDayLanes = useMemo(() => getMobileMultiDayLanes(currentMonth.activities), [currentMonth]);
    const currentMonthDate = useMemo(() => {
        const monthIdMatch = String(currentMonth?.id || '').match(/^(\d{4})-(\d{2})$/);
        if (monthIdMatch) {
            return new Date(Number(monthIdMatch[1]), Number(monthIdMatch[2]) - 1, 1);
        }

        const firstActivity = currentMonth?.activities?.find((activity) => activity.date);
        if (firstActivity) {
            return new Date(`${firstActivity.date}T00:00:00`);
        }

        return safeMonths.length ? new Date(2026, currentMonthIndex, 1) : new Date();
    }, [currentMonth, currentMonthIndex, safeMonths.length]);

    useLayoutEffect(() => {
        const section = sectionRef.current;
        if (!section) {
            return undefined;
        }

        const updateMobileRailBounds = () => {
            section.querySelectorAll('.planning-agenda__day').forEach((day) => {
                const dayBounds = day.getBoundingClientRect();
                const eventsById = new Map(
                    Array.from(day.querySelectorAll('.planning-agenda__mobile-event'))
                        .map((event) => [event.dataset.mobileActivityId, event])
                );

                day.querySelectorAll('.planning-agenda__mobile-event-rail').forEach((rail) => {
                    const linkedEvent = eventsById.get(rail.dataset.mobileActivityId);
                    if (!linkedEvent) {
                        return;
                    }

                    const eventBounds = linkedEvent.getBoundingClientRect();
                    rail.style.top = rail.dataset.startDay === 'true'
                        ? `${Math.max(0, eventBounds.top - dayBounds.top)}px`
                        : '';
                    rail.style.bottom = rail.dataset.endDay === 'true'
                        ? `${Math.max(0, dayBounds.bottom - eventBounds.bottom)}px`
                        : '';
                });
            });
        };

        updateMobileRailBounds();

        if (typeof ResizeObserver === 'undefined') {
            return undefined;
        }

        const resizeObserver = new ResizeObserver(updateMobileRailBounds);
        resizeObserver.observe(section);
        section.querySelectorAll('.planning-agenda__day, .planning-agenda__mobile-event').forEach((element) => {
            resizeObserver.observe(element);
        });

        return () => resizeObserver.disconnect();
    }, [currentMonth]);

    useEffect(() => {
        if (!safeMonths.length || selectedActivity) {
            return;
        }

        const todayIndex = safeMonths.findIndex((month) => monthMatchesDate(month, new Date()));
        if (todayIndex >= 0) {
            setCurrentMonthIndex(todayIndex);
        }
    }, [safeMonths, selectedActivity]);

    useEffect(() => {
        if (!selectedActivity) {
            return;
        }

        const currentMonthHasActivity = safeMonths[currentMonthIndex]?.activities.some((activity) => activity.id === selectedActivity.id);
        const selectedMonthIndex = currentMonthHasActivity
            ? currentMonthIndex
            : safeMonths.findIndex((month) => month.activities.some((activity) => activity.id === selectedActivity.id));
        if (selectedMonthIndex >= 0) {
            setCurrentMonthIndex(selectedMonthIndex);
        }
    }, [safeMonths, selectedActivity, currentMonthIndex]);

    useEffect(() => {
        if (!selectedActivity) {
            return;
        }

        if (window.matchMedia('(min-width: 1200px)').matches) {
            return;
        }

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';

        return () => {
            document.body.style.overflow = previousOverflow;
        };
    }, [selectedActivity]);

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
        if (!safeMonths.length) {
            return;
        }

        const nextMonthIndex = Math.min(Math.max(currentMonthIndex + direction, 0), safeMonths.length - 1);
        if (nextMonthIndex === currentMonthIndex) {
            return;
        }

        setMonthTransition((previous) => ({ id: previous.id + 1, direction }));
        setCurrentMonthIndex(nextMonthIndex);
        setSelectedActivity(null);
    };

    const handleCalendarTouchStart = (event) => {
        suppressTouchClickRef.current = false;
        if (event.touches.length !== 1 || window.matchMedia('(min-width: 1200px)').matches) {
            touchStartRef.current = null;
            return;
        }

        const { clientX, clientY } = event.touches[0];
        touchStartRef.current = { clientX, clientY };
    };

    const handleCalendarTouchEnd = (event) => {
        const touchStart = touchStartRef.current;
        touchStartRef.current = null;

        if (!touchStart || !event.changedTouches.length) {
            return;
        }

        const deltaX = event.changedTouches[0].clientX - touchStart.clientX;
        const deltaY = event.changedTouches[0].clientY - touchStart.clientY;
        if (Math.abs(deltaX) < 55 || Math.abs(deltaX) < Math.abs(deltaY) * 1.3) {
            return;
        }

        suppressTouchClickRef.current = true;
        window.setTimeout(() => { suppressTouchClickRef.current = false; }, 400);
        moveMonth(deltaX < 0 ? 1 : -1);
    };

    const handleCalendarClickCapture = (event) => {
        if (!suppressTouchClickRef.current) {
            return;
        }

        suppressTouchClickRef.current = false;
        event.preventDefault();
        event.stopPropagation();
    };

    const startEditingActivity = () => {
        setIsEditingActivity(true);
    };

    const closeActivityDetails = () => {
        setSelectedActivity(null);
        setIsEditingActivity(false);
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
        ? Object.entries(selectedActivity).filter(([key]) => (
            !['id', 'month_id', 'month_name', 'intervenantId', 'day', 'type', 'typeDescription', 'typeStyle', 'category', 'title', 'description', 'link', 'intervenant', 'canceled', 'endDate', 'endTime', 'tarifNormal', 'tarifSoutien', 'tarifSolidaire'].includes(key)
            && !(key === 'time' && selectedActivity.endDate > selectedActivity.date)
        ))
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
                            const hasDescription = Boolean(style.description);
                            const descriptionId = `planning-agenda-description-${label.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
                            const isExpanded = expandedActivityType === label;
                            const legendContent = (
                                <>
                                    <span className="planning-agenda__legend-swatch" style={{ '--event-background': style.background, '--event-border': style.border }} />
                                    <span className="planning-agenda__legend-label">{label}</span>
                                    {hasDescription && (
                                        <span className="planning-agenda__legend-indicator" aria-hidden="true">
                                            {isExpanded ? '−' : <BsInfoCircle />}
                                        </span>
                                    )}
                                </>
                            );

                            return hasDescription ? (
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
                    {Object.entries(eventTypeStyles).map(([type, activity]) => {
                        if (type !== expandedActivityType || !activity.description) {
                            return null;
                        }

                        const descriptionId = `planning-agenda-description-${type.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
                        return (
                            <section
                                key={type}
                                id={descriptionId}
                                className="planning-agenda__activity-description-panel"
                                aria-labelledby={`${descriptionId}-title`}
                                style={{ '--event-border': activity.border }}
                            >
                                <h4 id={`${descriptionId}-title`}>{activity.title}</h4>
                                <p>{activity.description}</p>
                            </section>
                        );
                    })}
                    <div
                        key={monthTransition.id}
                        className={`planning-agenda__calendar-scroll ${monthTransition.direction ? `planning-agenda__calendar-scroll--slide-${monthTransition.direction > 0 ? 'next' : 'previous'}` : ''}`}
                        onTouchStart={handleCalendarTouchStart}
                        onTouchEnd={handleCalendarTouchEnd}
                        onTouchCancel={() => { touchStartRef.current = null; }}
                        onClickCapture={handleCalendarClickCapture}
                    >
                        <div className="planning-agenda__weekdays">
                            {weekdayLabels.map((day) => <div key={day} className="planning-agenda__weekday">{day}</div>)}
                        </div>
                        <div className="planning-agenda__weeks">
                            {calendarWeeks.map((week, weekIndex) => {
                            const multiDayEvents = getWeekMultiDayEvents(week, currentMonth.activities);
                            const laneCount = multiDayEvents[0]?.laneCount || 0;
                            return (
                            <div key={`week-${weekIndex}`} className="planning-agenda__week" style={{ '--span-lanes': laneCount, '--span-event-space': laneCount ? `${48 + (laneCount - 1) * 26}px` : '0px', '--span-extra-height': `${Math.max(0, laneCount - 1) * 26}px` }}>
                                {week.map((date) => {
                                    const dateKey = [
                                        date.getFullYear(),
                                        String(date.getMonth() + 1).padStart(2, '0'),
                                        String(date.getDate()).padStart(2, '0')
                                    ].join('-');
                                    const dayEvents = currentMonth.activities
                                        .filter((activity) => activity.date === dateKey)
                                        .sort((first, second) => getStartTimeMinutes(first.time) - getStartTimeMinutes(second.time));
                                    const mobileDayEvents = currentMonth.activities
                                        .filter((activity) => activity.date <= dateKey && (activity.endDate || activity.date) >= dateKey)
                                        .sort((first, second) => first.date.localeCompare(second.date) || getStartTimeMinutes(first.time) - getStartTimeMinutes(second.time));
                                    const mobileVisibleDayEvents = mobileDayEvents.filter((activity) => (
                                        activity.endDate <= activity.date || dateKey === activity.date || dateKey === activity.endDate
                                    ));
                                    const mobileMultiDayEvents = mobileDayEvents.filter((activity) => activity.endDate > activity.date);
                                    const mobileRailOffset = mobileMultiDayEvents.length
                                        ? 15 + Math.max(...mobileMultiDayEvents.map((activity) => mobileMultiDayLanes.get(activity.id) || 0)) * 12
                                        : 0;
                                    const isCurrentMonth = date.getFullYear() === currentMonthDate.getFullYear() && date.getMonth() === currentMonthDate.getMonth();
                                    const isToday = dateKey === todayDateKey;
                                    const isPastDate = dateKey < todayDateKey;
                                    const weekdayLabel = weekdayLabels[(date.getDay() + 6) % 7];
                                    return (
                                        <div key={dateKey} className={`planning-agenda__day ${isCurrentMonth ? '' : 'planning-agenda__day--outside'} ${mobileVisibleDayEvents.length === 0 ? 'planning-agenda__day--empty' : ''} ${mobileMultiDayEvents.length ? 'planning-agenda__day--has-mobile-rails' : ''} ${isToday ? 'planning-agenda__day--today' : ''} ${isPastDate ? 'planning-agenda__day--past' : ''}`}>
                                            <div className="planning-agenda__day-heading">
                                                <span className="planning-agenda__day-name">{weekdayLabel}</span>
                                                <span className="planning-agenda__day-number">{date.getDate()}</span>
                                            </div>
                                            <div className="planning-agenda__events">
                                                {dayEvents.slice(0, 3).map((activity) => {
                                                    const typeStyle = eventTypeStyles[activity.type] || defaultEventTypeStyle;
                                                    const isCanceled = isActivityCanceled(activity);
                                                    const isMultiDay = activity.endDate > activity.date;
                                                    return (
                                                        <button
                                                            type="button"
                                                            key={activity.id}
                                                            className={`planning-agenda__event ${isMultiDay ? 'planning-agenda__event--multi-day' : ''} ${selectedActivity?.id === activity.id ? 'planning-agenda__event--selected' : ''} ${isCanceled ? 'planning-agenda__event--canceled' : ''}`}
                                                            style={{ '--event-background': typeStyle.background, '--event-border': typeStyle.border, '--event-text': typeStyle.text }}
                                                            onClick={() => setSelectedActivity(activity)}
                                                        >
                                                            <EventHeading activity={activity} />
                                                            <div className="planning-agenda__event-time">{activity.time}</div>
                                                        </button>
                                                    );
                                                })}
                                                {dayEvents.length > 3 && <div className="planning-agenda__more-events">+{dayEvents.length - 3} de plus</div>}
                                            </div>
                                            <div className="planning-agenda__mobile-events" style={{ '--mobile-rail-offset': `${mobileRailOffset}px` }}>
                                                {mobileVisibleDayEvents.slice(0, 3).map((activity) => {
                                                    const typeStyle = eventTypeStyles[activity.type] || defaultEventTypeStyle;
                                                    const isCanceled = isActivityCanceled(activity);
                                                    const isMultiDay = activity.endDate > activity.date;
                                                    const isEndDay = isMultiDay && dateKey === activity.endDate;
                                                    const isLinkedHover = isMultiDay && hoveredMultiDayActivityId === activity.id;
                                                    const railIndex = isMultiDay ? mobileMultiDayLanes.get(activity.id) || 0 : -1;
                                                    return (
                                                        <button
                                                            type="button"
                                                            key={`mobile-${activity.id}`}
                                                            data-mobile-activity-id={activity.id}
                                                            className={`planning-agenda__event planning-agenda__mobile-event ${isMultiDay ? 'planning-agenda__mobile-event--multi-day' : ''} ${isEndDay ? 'planning-agenda__mobile-event--continuation' : ''} ${isLinkedHover ? 'planning-agenda__span-event--linked-hover' : ''} ${selectedActivity?.id === activity.id ? 'planning-agenda__event--selected' : ''} ${isCanceled ? 'planning-agenda__event--canceled' : ''}`}
                                                            style={{ '--event-background': typeStyle.background, '--event-border': typeStyle.border, '--event-text': typeStyle.text, '--rail-offset': `${15 + Math.max(railIndex, 0) * 12}px` }}
                                                            aria-label={`${isEndDay ? `Fin de ${activity.title}` : activity.title}, ${formatEventDetailValue('date', dateKey)}`}
                                                            onMouseEnter={() => isMultiDay && setHoveredMultiDayActivityId(activity.id)}
                                                            onMouseLeave={() => setHoveredMultiDayActivityId(null)}
                                                            onFocus={() => isMultiDay && setHoveredMultiDayActivityId(activity.id)}
                                                            onBlur={() => setHoveredMultiDayActivityId(null)}
                                                            onClick={() => setSelectedActivity(activity)}
                                                        >
                                                            <EventHeading activity={activity} title={isEndDay ? `Fin : ${activity.title}` : activity.title} />
                                                            {!isMultiDay && <div className="planning-agenda__event-time">{activity.time}</div>}
                                                        </button>
                                                    );
                                                })}
                                                {mobileVisibleDayEvents.length > 3 && <div className="planning-agenda__more-events">+{mobileVisibleDayEvents.length - 3} de plus</div>}
                                            </div>
                                            {mobileMultiDayEvents.map((activity) => {
                                                const typeStyle = eventTypeStyles[activity.type] || defaultEventTypeStyle;
                                                const lane = mobileMultiDayLanes.get(activity.id) || 0;
                                                return (
                                                    <span
                                                        key={`rail-${activity.id}`}
                                                        className="planning-agenda__mobile-event-rail"
                                                        data-mobile-activity-id={activity.id}
                                                        data-start-day={String(dateKey === activity.date)}
                                                        data-end-day={String(dateKey === activity.endDate)}
                                                        style={{ '--event-border': typeStyle.border, '--rail-offset': `${15 + lane * 12}px` }}
                                                        aria-hidden="true"
                                                    />
                                                );
                                            })}
                                        </div>
                                    );
                                })}
                                <div className="planning-agenda__span-layer" aria-label="Événements sur plusieurs jours">
                                    {multiDayEvents.map(({ activity, startColumn, endColumn, lane }) => {
                                        const typeStyle = eventTypeStyles[activity.type] || defaultEventTypeStyle;
                                        const isCanceled = isActivityCanceled(activity);
                                        return (
                                            <button
                                                type="button"
                                                key={`span-${activity.id}`}
                                                className={`planning-agenda__event planning-agenda__span-event ${hoveredMultiDayActivityId === activity.id ? 'planning-agenda__span-event--linked-hover' : ''} ${selectedActivity?.id === activity.id ? 'planning-agenda__event--selected' : ''} ${isCanceled ? 'planning-agenda__event--canceled' : ''}`}
                                                style={{ '--event-background': typeStyle.background, '--event-border': typeStyle.border, '--event-text': typeStyle.text, '--span-start': startColumn, '--span-end': endColumn + 1, '--span-lane': lane }}
                                                aria-label={`${activity.title}, du ${formatEventDetailValue('date', activity.date)} au ${formatEventDetailValue('date', activity.endDate)}`}
                                                onMouseEnter={() => setHoveredMultiDayActivityId(activity.id)}
                                                onMouseLeave={() => setHoveredMultiDayActivityId(null)}
                                                onFocus={() => setHoveredMultiDayActivityId(activity.id)}
                                                onBlur={() => setHoveredMultiDayActivityId(null)}
                                                onClick={() => setSelectedActivity(activity)}
                                            >
                                                <EventHeading activity={activity} />
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                            );
                            })}
                        </div>
                    </div>
                </div>
                {selectedActivity && (
                    <aside className="planning-agenda__side-panel" aria-label="Détail de l’activité sélectionnée">
                        <button type="button" className="planning-agenda__side-panel-close" onClick={closeActivityDetails} aria-label="Fermer le détail de l’activité">×</button>
                        <ActivityDetails selectedActivity={selectedActivity} eventDetails={eventDetails} eventFieldLabels={eventFieldLabels} eventLocation={eventLocation} />
                        {isAdmin && <button type="button" className="planning-agenda__edit-button" onClick={startEditingActivity}>Modifier</button>}
                    </aside>
                )}
            </div>

            {selectedActivity && (
                <div className="planning-agenda__modal-overlay" onClick={closeActivityDetails}>
                    <div className="planning-agenda__modal" onClick={(event) => event.stopPropagation()}>
                        <button type="button" className="planning-agenda__modal-close" onClick={closeActivityDetails} aria-label="Fermer le détail">×</button>
                        <ActivityDetails selectedActivity={selectedActivity} eventDetails={eventDetails} eventFieldLabels={eventFieldLabels} eventLocation={eventLocation} />
                        {isAdmin && <button type="button" className="planning-agenda__edit-button" onClick={startEditingActivity}>Modifier</button>}
                    </div>
                </div>
            )}

            {selectedActivity && isEditingActivity && isAdmin && (
                <AdminRecordEditorModal
                    key={`caphEvent-${selectedActivity.id}`}
                    collection="caphEvent"
                    collectionLabel="Événements"
                    singular="événement"
                    token={adminToken}
                    record={selectedActivity}
                    onClose={() => setIsEditingActivity(false)}
                    onSaved={onActivitySaved}
                    onUnauthorized={onUnauthorized}
                    isOverlayAbovePage
                />
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

function ActivityDetails({ selectedActivity, eventDetails, eventFieldLabels, eventLocation }) {
    const tariffNoteId = useId();
    const solidarityTariffNoteId = useId();
    const [visibleTariffNote, setVisibleTariffNote] = useState(null);
    const [isCalendarOptionsOpen, setIsCalendarOptionsOpen] = useState(false);
    const calendarOptionsTitleId = useId();
    const tariffNoteTimeoutRef = useRef(null);
    const tariffAnchorRef = useRef(null);
    const tariffToastRef = useRef(null);
    const eventDate = selectedActivity?.date;
    const isPastEvent = eventDate ? new Date(`${eventDate}T23:59:59`) < new Date() : false;
    const isCanceled = isActivityCanceled(selectedActivity);
    const calendarActivity = { ...selectedActivity, location: selectedActivity.location || eventLocation };

    useEffect(() => {
        const repositionTariffToast = () => {
            if (tariffAnchorRef.current) {
                setVisibleTariffNote((current) => current
                    ? { ...current, ...getTariffToastPosition(tariffAnchorRef.current) }
                    : current);
            }
        };

        window.addEventListener('resize', repositionTariffToast);
        return () => {
            window.clearTimeout(tariffNoteTimeoutRef.current);
            window.removeEventListener('resize', repositionTariffToast);
        };
    }, []);

    useEffect(() => {
        if (!isCalendarOptionsOpen) {
            return undefined;
        }

        const previousOverflow = document.body.style.overflow;
        const closeOnEscape = (event) => {
            if (event.key === 'Escape') {
                setIsCalendarOptionsOpen(false);
            }
        };
        document.body.style.overflow = 'hidden';
        window.addEventListener('keydown', closeOnEscape);

        return () => {
            document.body.style.overflow = previousOverflow;
            window.removeEventListener('keydown', closeOnEscape);
        };
    }, [isCalendarOptionsOpen]);

    useLayoutEffect(() => {
        const toast = tariffToastRef.current;
        if (!toast || !visibleTariffNote) {
            return;
        }

        const bounds = toast.getBoundingClientRect();
        const left = Math.min(Math.max(12, visibleTariffNote.left), window.innerWidth - bounds.width - 12);
        const top = Math.min(Math.max(12, visibleTariffNote.top), window.innerHeight - bounds.height - 12);
        if (left !== visibleTariffNote.left || top !== visibleTariffNote.top) {
            setVisibleTariffNote((current) => current ? { ...current, left, top } : current);
        }
    }, [visibleTariffNote]);

    const showTariffNote = (tariff, anchor) => {
        window.clearTimeout(tariffNoteTimeoutRef.current);
        tariffAnchorRef.current = anchor;
        setVisibleTariffNote({ tariff, ...getTariffToastPosition(anchor) });
        tariffNoteTimeoutRef.current = window.setTimeout(() => {
            setVisibleTariffNote(null);
            tariffAnchorRef.current = null;
        }, 3000);
    };

    return (
        <>
            <h4 className="planning-agenda__modal-title">{selectedActivity.title}</h4>
            <div className="planning-agenda__details">
                {eventDetails.map(([key, value]) => (
                    <div key={key} className="planning-agenda__detail">
                        <div className="planning-agenda__detail-label">{eventFieldLabels[key] || key}</div>
                        <div className="planning-agenda__detail-value">
                            {key === 'date' && selectedActivity.endDate && selectedActivity.endDate !== value
                                ? `${formatEventDetailValue('date', value)} au ${formatEventDetailValue('date', selectedActivity.endDate)}`
                                : key === 'time' && selectedActivity.endDate === selectedActivity.date && selectedActivity.endTime
                                    ? `${value} à ${selectedActivity.endTime}`
                                : formatEventDetailValue(key, value)}
                        </div>
                    </div>
                ))}
                {hasPrice(selectedActivity.tarifNormal) && (
                    <div className="planning-agenda__detail">
                        <div className="planning-agenda__detail-label">Tarif normal</div>
                        <div className="planning-agenda__detail-value">{selectedActivity.tarifNormal} €</div>
                    </div>
                )}
                {hasPrice(selectedActivity.tarifSoutien) && (
                    <div className="planning-agenda__detail">
                        <div className="planning-agenda__detail-label planning-agenda__tariff-label">
                            Tarif soutien
                            <button
                                type="button"
                                className="planning-agenda__tariff-info-toggle"
                                aria-label="Afficher l’explication du tarif soutien"
                                aria-expanded={visibleTariffNote === 'soutien'}
                                aria-controls={tariffNoteId}
                                onClick={(event) => showTariffNote('soutien', event.currentTarget)}
                            >
                                <BsInfoCircle aria-hidden="true" />
                            </button>
                        </div>
                        <div className="planning-agenda__detail-value">{selectedActivity.tarifSoutien} €</div>
                    </div>
                )}
                {hasPrice(selectedActivity.tarifSolidaire) && (
                    <div className="planning-agenda__detail">
                        <div className="planning-agenda__detail-label planning-agenda__tariff-label">
                            Tarif solidaire
                            <button
                                type="button"
                                className="planning-agenda__tariff-info-toggle"
                                aria-label="Afficher l’explication du tarif solidaire"
                                aria-expanded={visibleTariffNote === 'solidaire'}
                                aria-controls={solidarityTariffNoteId}
                                onClick={(event) => showTariffNote('solidaire', event.currentTarget)}
                            >
                                <BsInfoCircle aria-hidden="true" />
                            </button>
                        </div>
                        <div className="planning-agenda__detail-value">{selectedActivity.tarifSolidaire} €</div>
                    </div>
                )}
            </div>
            {visibleTariffNote && createPortal(
                <div
                    ref={tariffToastRef}
                    id={visibleTariffNote.tariff === 'soutien' ? tariffNoteId : solidarityTariffNoteId}
                    className="planning-agenda__tariff-toast"
                    role="status"
                    style={{ left: `${visibleTariffNote.left}px`, top: `${visibleTariffNote.top}px` }}
                >
                    {visibleTariffNote.tariff === 'soutien'
                        ? 'Le tarif normal est le prix de référence. Le tarif soutien permet de contribuer davantage aux activités du Capharnaüm.'
                        : 'Le tarif solidaire permet de participer aux activités à un tarif adapté à ses moyens.'}
                </div>,
                document.body
            )}
            <div className="planning-agenda__description-layout">
                <p className="planning-agenda__modal-description">{selectedActivity.description || 'Aucune description disponible pour cet événement.'}</p>
            </div>
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
            <div className="planning-agenda__event-actions">
                {isCanceled ? (
                    <div className="planning-agenda__no-reservation" aria-disabled="true">Événement annulé</div>
                ) : isPastEvent ? (
                    <div className="planning-agenda__no-reservation" aria-disabled="true">Événement terminé</div>
                ) : selectedActivity.link ? (
                    <a className="planning-agenda__reservation-link" href={selectedActivity.link} target="_blank" rel="noreferrer noopener">Réserver</a>
                ) : (
                    <div className="planning-agenda__no-reservation">Aucun lien de réservation disponible.</div>
                )}
                <button type="button" className="planning-agenda__calendar-download" onClick={() => setIsCalendarOptionsOpen(true)} aria-label="Ajouter l’événement à mon calendrier">
                    <BsCalendarPlus aria-hidden="true" />
                    <span>Ajouter au calendrier</span>
                </button>
            </div>
            {isCalendarOptionsOpen && createPortal(
                <div
                    className="planning-agenda__calendar-options-overlay"
                    onClick={(event) => {
                        event.stopPropagation();
                        if (event.target === event.currentTarget) {
                            setIsCalendarOptionsOpen(false);
                        }
                    }}
                >
                    <section className="planning-agenda__calendar-options" role="dialog" aria-modal="true" aria-labelledby={calendarOptionsTitleId}>
                        <div className="planning-agenda__calendar-options-heading">
                            <h4 id={calendarOptionsTitleId}>Ajouter à mon calendrier</h4>
                            <button type="button" className="planning-agenda__calendar-options-close" onClick={() => setIsCalendarOptionsOpen(false)} aria-label="Fermer les options calendrier">×</button>
                        </div>
                        <p className="planning-agenda__calendar-options-event">{selectedActivity.title}</p>
                        <div className="planning-agenda__calendar-options-list">
                            <a className="planning-agenda__calendar-option" href={getGoogleCalendarUrl(calendarActivity)} target="_blank" rel="noreferrer noopener" onClick={() => setIsCalendarOptionsOpen(false)}>
                                Google Calendar
                            </a>
                            <a className="planning-agenda__calendar-option" href={getOutlookCalendarUrl(calendarActivity)} target="_blank" rel="noreferrer noopener" onClick={() => setIsCalendarOptionsOpen(false)}>
                                Outlook Calendar
                            </a>
                            <button type="button" className="planning-agenda__calendar-option planning-agenda__calendar-option--download" onClick={() => downloadCalendarEvent(calendarActivity)}>
                                Apple Calendar et autres (.ics)
                            </button>
                        </div>
                    </section>
                </div>,
                document.body
            )}
        </>
    );
}

function formatEventDetailValue(key, value) {
    if (key !== 'date' && key !== 'endDate') {
        return String(value);
    }

    const [year, month, day] = String(value).split('-');
    const monthLabels = ['jan', 'fev', 'mar', 'avr', 'mai', 'juin', 'juil', 'aout', 'sept', 'oct', 'nov', 'dec'];
    return `${Number(day)} ${monthLabels[Number(month) - 1]} ${year}`;
}

export default PlanningAgenda;
