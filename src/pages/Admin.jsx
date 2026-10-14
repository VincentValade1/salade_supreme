import { useCallback, useEffect, useMemo, useState } from 'react';
import { BsArrowLeft, BsArrowRepeat, BsBoxArrowRight, BsPencil, BsPlus, BsSearch, BsTrash } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import AdminRecordEditorModal from '../components/AdminRecordEditorModal';
import '../styles/Admin.css';

const DIRECTUS_URL = process.env.REACT_APP_DIRECTUS_URL || 'https://directus.saladesupreme.tarrieu.fr';
const TOKEN_STORAGE_KEY = 'salade-supreme-directus-token';
const COLLECTIONS = [
    { name: 'caphEvent', label: 'Événements', singular: 'événement' },
    { name: 'caphIntervenant', label: 'Intervenants', singular: 'intervenant' },
    { name: 'caphEventType', label: 'Types d’événement', singular: 'type d’événement' }
];

async function directusRequest(path, { token, method = 'GET', body } = {}) {
    const response = await fetch(`${DIRECTUS_URL}${path}`, {
        method,
        headers: {
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
            ...(body !== undefined ? { 'Content-Type': 'application/json' } : {})
        },
        ...(body !== undefined ? { body: JSON.stringify(body) } : {})
    });
    const payload = await response.json().catch(() => ({}));

    if (!response.ok) {
        const message = payload.errors?.map((error) => error.message).join(', ');
        const error = new Error(message || `Erreur Directus (${response.status})`);
        error.status = response.status;
        throw error;
    }

    return payload.data;
}

function fieldLabel(field) {
    const label = field.meta?.translations?.find((translation) => translation.language?.startsWith('fr'))?.translation;
    if (label) return label;
    return String(field.meta?.field || field.field)
        .replace(/([a-z])([A-Z])/g, '$1 $2')
        .replace(/[_-]/g, ' ')
        .replace(/^./, (letter) => letter.toUpperCase());
}

function getRecordLabel(record, fields = []) {
    const labelField = fields.find((field) => ['name', 'title', 'label'].includes(field.field))
        || fields.find((field) => field.field !== 'id');
    return labelField ? record[labelField.field] || `#${record.id}` : `#${record.id}`;
}

function getAdminRecordLabel(record, fields, collection) {
    return collection === 'caphEvent' ? record.title || 'Événement sans titre' : getRecordLabel(record, fields);
}

function normalizeSearchText(value) {
    return String(value || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
}

function getRelationLabel(record, field, relations) {
    const relation = relations.find((item) => item.field === field);
    const value = record[field];
    if (value && typeof value === 'object') return getRecordLabel(value, relation?.fields);
    const relatedRecord = relation?.records.find((item) => String(item.id) === String(value));
    return relatedRecord ? getRecordLabel(relatedRecord, relation.fields) : '';
}

function getEventDateLabel(value) {
    if (!value) return '';
    const text = String(value);
    const [year, month, day] = text.slice(0, 10).split('-');
    if (!year || !month || !day) return text;
    const time = text.slice(11, 16);
    return `${day}/${month}/${year}${time ? ` à ${time}` : ''}`;
}

function isEventPast(record, now) {
    const value = record.endDate || record.startDate;
    if (!value) return false;
    const text = String(value);
    const date = /^\d{4}-\d{2}-\d{2}$/.test(text)
        ? new Date(`${text}T23:59:59.999`)
        : new Date(text);
    return !Number.isNaN(date.getTime()) && date < now;
}

function Admin() {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [token, setToken] = useState(() => window.sessionStorage.getItem(TOKEN_STORAGE_KEY) || '');
    const [activeCollection, setActiveCollection] = useState(COLLECTIONS[0].name);
    const [eventSearchQuery, setEventSearchQuery] = useState('');
    const [eventTypeFilter, setEventTypeFilter] = useState('');
    const [eventIntervenantFilter, setEventIntervenantFilter] = useState('');
    const [showPastEvents, setShowPastEvents] = useState(false);
    const [eventSortDirection, setEventSortDirection] = useState('asc');
    const [collectionData, setCollectionData] = useState({});
    const [loginError, setLoginError] = useState('');
    const [pageError, setPageError] = useState('');
    const [isLoggingIn, setIsLoggingIn] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isLogoutConfirmationOpen, setIsLogoutConfirmationOpen] = useState(false);
    const [isEditorOpen, setIsEditorOpen] = useState(false);
    const [editor, setEditor] = useState(null);

    const activeDefinition = COLLECTIONS.find((collection) => collection.name === activeCollection);
    const activeData = collectionData[activeCollection] || { fields: [], relations: [], records: [] };
    const eventRelations = activeData.relations;
    const eventTypes = eventRelations.find((relation) => relation.field === 'eventType')?.records || [];
    const eventIntervenants = eventRelations.find((relation) => relation.field === 'intervenant')?.records || [];
    const matchingEventRecords = useMemo(() => {
        const query = normalizeSearchText(eventSearchQuery.trim());
        const now = new Date();
        const filteredRecords = activeData.records.filter((record) => {
            if (!showPastEvents && isEventPast(record, now)) return false;
            const typeValue = record.eventType && typeof record.eventType === 'object' ? record.eventType.id : record.eventType;
            const intervenantValue = record.intervenant && typeof record.intervenant === 'object' ? record.intervenant.id : record.intervenant;
            if (eventTypeFilter && String(typeValue) !== eventTypeFilter) return false;
            if (eventIntervenantFilter && String(intervenantValue) !== eventIntervenantFilter) return false;
            if (!query) return true;

            return normalizeSearchText([
            record.title,
            record.description,
            record.startDate,
            record.endDate,
            record.link,
            getRelationLabel(record, 'eventType', eventRelations),
            getRelationLabel(record, 'intervenant', eventRelations)
            ].join(' ')).includes(query);
        });
        return filteredRecords.sort((first, second) => {
            const firstDate = new Date(first.startDate).getTime();
            const secondDate = new Date(second.startDate).getTime();
            const firstHasDate = !Number.isNaN(firstDate);
            const secondHasDate = !Number.isNaN(secondDate);
            if (firstHasDate !== secondHasDate) return firstHasDate ? -1 : 1;
            if (firstHasDate && firstDate !== secondDate) {
                return eventSortDirection === 'asc' ? firstDate - secondDate : secondDate - firstDate;
            }
            return String(first.id).localeCompare(String(second.id), 'fr', { numeric: true });
        });
    }, [activeData.records, eventIntervenantFilter, eventRelations, eventSearchQuery, eventSortDirection, eventTypeFilter, showPastEvents]);

    const expireSession = useCallback(() => {
        window.sessionStorage.removeItem(TOKEN_STORAGE_KEY);
        setToken('');
        setCollectionData({});
        setPageError('');
        setLoginError('Votre session a expiré. Veuillez vous reconnecter.');
        setIsLogoutConfirmationOpen(false);
        setIsEditorOpen(false);
        setEditor(null);
    }, []);

    const loadCollection = useCallback(async (collectionName, accessToken) => {
        const [fields, relations, records] = await Promise.all([
            directusRequest(`/fields/${collectionName}`, { token: accessToken }),
            directusRequest('/relations?limit=-1', { token: accessToken }),
            directusRequest(`/items/${collectionName}?limit=200&sort=-id`, { token: accessToken })
        ]);

        const ownRelations = relations.filter((relation) => relation.collection === collectionName && relation.related_collection);
        const relationOptions = await Promise.all(ownRelations.map(async (relation) => {
            try {
                const relatedFields = await directusRequest(`/fields/${relation.related_collection}`, { token: accessToken });
                const relatedRecords = await directusRequest(`/items/${relation.related_collection}?limit=500`, { token: accessToken });
                return {
                    field: relation.field,
                    collection: relation.related_collection,
                    fields: relatedFields,
                    records: relatedRecords
                };
            } catch (error) {
                return { field: relation.field, collection: relation.related_collection, fields: [], records: [], error: error.message };
            }
        }));

        setCollectionData((current) => ({
            ...current,
            [collectionName]: { fields, relations: relationOptions, records }
        }));
    }, []);

    useEffect(() => {
        if (!token) return undefined;
        let isMounted = true;
        setIsLoading(true);
        setPageError('');

        loadCollection(activeCollection, token)
            .catch((error) => {
                if (error.status === 401) {
                    expireSession();
                } else {
                    setPageError(error.message);
                }
            })
            .finally(() => {
                if (isMounted) setIsLoading(false);
            });

        return () => { isMounted = false; };
    }, [activeCollection, expireSession, loadCollection, token]);

    const handleLogin = async (event) => {
        event.preventDefault();
        setLoginError('');
        setIsLoggingIn(true);
        try {
            const session = await directusRequest('/auth/login', {
                method: 'POST',
                body: { email: credentials.email, password: credentials.password }
            });
            window.sessionStorage.setItem(TOKEN_STORAGE_KEY, session.access_token);
            setToken(session.access_token);
            setCredentials((current) => ({ ...current, password: '' }));
        } catch (error) {
            setLoginError(error.message || 'Connexion impossible. Vérifiez vos identifiants.');
        } finally {
            setIsLoggingIn(false);
        }
    };

    const openEditor = (record = null) => {
        setEditor(record);
        setIsEditorOpen(true);
    };

    const closeEditor = () => {
        setIsEditorOpen(false);
        setEditor(null);
    };

    const handleDelete = async (record) => {
        const label = getAdminRecordLabel(record, activeData.fields, activeCollection);
        if (!window.confirm(`Supprimer « ${label} » ? Cette action est définitive.`)) return;
        setPageError('');
        try {
            await directusRequest(`/items/${activeCollection}/${encodeURIComponent(record.id)}`, { token, method: 'DELETE' });
            await loadCollection(activeCollection, token);
        } catch (error) {
            if (error.status === 401) expireSession();
            else setPageError(error.message);
        }
    };

    const logout = () => {
        window.sessionStorage.removeItem(TOKEN_STORAGE_KEY);
        setToken('');
        setCollectionData({});
        setPageError('');
        setIsLogoutConfirmationOpen(false);
        closeEditor();
    };

    const refreshCollection = async () => {
        setIsLoading(true);
        setPageError('');
        try {
            await loadCollection(activeCollection, token);
        } catch (error) {
            if (error.status === 401) expireSession();
            else setPageError(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    if (!token) {
        return (
            <main className="admin-login-page">
                <Link className="admin-back-link" to="/lieux/capharnaum"><BsArrowLeft aria-hidden="true" /> Retour au Capharnaüm</Link>
                <section className="admin-login">
                    <p className="admin-eyebrow">SALade SUPRÊME · ESPACE PRIVÉ</p>
                    <h1>Administration</h1>
                    <p className="admin-login__intro">Connectez-vous avec votre compte Directus pour gérer les contenus du Capharnaüm.</p>
                    <form onSubmit={handleLogin}>
                        <label className="admin-form__field" htmlFor="admin-email">
                            <span>Adresse e-mail</span>
                            <input id="admin-email" type="email" autoComplete="username" required value={credentials.email} onChange={(event) => setCredentials({ ...credentials, email: event.target.value })} />
                        </label>
                        <label className="admin-form__field" htmlFor="admin-password">
                            <span>Mot de passe</span>
                            <input id="admin-password" type="password" autoComplete="current-password" required value={credentials.password} onChange={(event) => setCredentials({ ...credentials, password: event.target.value })} />
                        </label>
                        {loginError && <p className="admin-error" role="alert">{loginError}</p>}
                        <button className="admin-button admin-button--primary admin-login__submit" type="submit" disabled={isLoggingIn}>
                            {isLoggingIn ? 'Connexion…' : 'Se connecter'}
                        </button>
                    </form>
                    <span className="admin-login__footnote">Authentification sécurisée par Directus</span>
                </section>
            </main>
        );
    }

    const displayFields = activeData.fields.filter((field) => field.field !== 'id' && !field.meta?.hidden);
    const primaryFields = ['title', 'name', 'startDate', 'description', 'bio'];
    const summaryFields = displayFields
        .filter((field) => primaryFields.includes(field.field))
        .slice(0, 3);

    return (
        <main className="admin-app">
            <aside className="admin-sidebar">
                <Link className="admin-sidebar__brand" to="/lieux/capharnaum" aria-label="Retour au site">
                    <span className="admin-sidebar__mark">S</span>
                    <span>Salade Suprême<small>Administration</small></span>
                </Link>
                <p className="admin-sidebar__label">CONTENUS</p>
                <nav className="admin-collections" aria-label="Collections Directus">
                    {COLLECTIONS.map((collection) => (
                        <button
                            type="button"
                            key={collection.name}
                            className={activeCollection === collection.name ? 'is-active' : ''}
                            onClick={() => { setActiveCollection(collection.name); setEditor(null); setEventSearchQuery(''); setEventTypeFilter(''); setEventIntervenantFilter(''); }}
                        >
                            <span>{collection.label}</span>
                            <span className="admin-collections__count">{collectionData[collection.name]?.records.length ?? '—'}</span>
                        </button>
                    ))}
                </nav>
                <div className="admin-sidebar__bottom">
                    <Link className="admin-sidebar__action" to="/lieux/capharnaum#cours-ateliers" title="Voir le planning" aria-label="Voir le planning">
                        <BsArrowLeft aria-hidden="true" />
                    </Link>
                    <button className="admin-sidebar__action" type="button" onClick={() => setIsLogoutConfirmationOpen(true)} title="Se déconnecter" aria-label="Se déconnecter">
                        <BsBoxArrowRight aria-hidden="true" />
                    </button>
                    <button className="admin-sidebar__action" type="button" onClick={refreshCollection} title="Actualiser la collection" aria-label="Actualiser la collection">
                        <BsArrowRepeat aria-hidden="true" />
                    </button>
                </div>
            </aside>

            <section className="admin-main">
                <div className="admin-content">
                    <div className="admin-heading">
                        <div>
                            <p className="admin-eyebrow">COLLECTION · {activeCollection}</p>
                            <h1>{activeDefinition.label}</h1>
                            <p>{activeData.records.length} entrée{activeData.records.length !== 1 ? 's' : ''} chargée{activeData.records.length !== 1 ? 's' : ''}</p>
                        </div>
                        <button type="button" className="admin-button admin-button--primary" onClick={() => openEditor()}>
                            <BsPlus aria-hidden="true" /> Ajouter {activeDefinition.singular}
                        </button>
                    </div>

                    {pageError && <p className="admin-error admin-error--panel" role="alert">{pageError}</p>}
                    {isLoading ? <p className="admin-status">Chargement des données et du modèle Directus…</p> : null}
                    {!isLoading && !pageError && activeData.fields.length === 0 && <p className="admin-status">Aucun modèle accessible pour cette collection.</p>}

                    {activeCollection === 'caphEvent' && (
                        <div className="admin-event-controls">
                            <label className="admin-event-search">
                                <BsSearch aria-hidden="true" />
                                <input
                                    type="search"
                                    value={eventSearchQuery}
                                    onChange={(event) => setEventSearchQuery(event.target.value)}
                                    placeholder="Rechercher un événement…"
                                    aria-label="Rechercher un événement"
                                />
                            </label>
                            <label className="admin-event-filter">
                                <span>Type</span>
                                <select value={eventTypeFilter} onChange={(event) => setEventTypeFilter(event.target.value)}>
                                    <option value="">Tous les types</option>
                                    {eventTypes.map((type) => <option key={type.id} value={type.id}>{getRecordLabel(type, eventRelations.find((relation) => relation.field === 'eventType')?.fields)}</option>)}
                                </select>
                            </label>
                            <label className="admin-event-filter">
                                <span>Intervenant</span>
                                <select value={eventIntervenantFilter} onChange={(event) => setEventIntervenantFilter(event.target.value)}>
                                    <option value="">Tous les intervenants</option>
                                    {eventIntervenants.map((intervenant) => <option key={intervenant.id} value={intervenant.id}>{getRecordLabel(intervenant, eventRelations.find((relation) => relation.field === 'intervenant')?.fields)}</option>)}
                                </select>
                            </label>
                            <label className="admin-event-past-toggle">
                                <input
                                    type="checkbox"
                                    role="switch"
                                    checked={showPastEvents}
                                    onChange={(event) => setShowPastEvents(event.target.checked)}
                                />
                                <span>Afficher les événements passés</span>
                            </label>
                            <label className="admin-event-filter">
                                <span>Ordre chronologique</span>
                                <select value={eventSortDirection} onChange={(event) => setEventSortDirection(event.target.value)}>
                                    <option value="asc">Du plus ancien au plus récent</option>
                                    <option value="desc">Du plus récent au plus ancien</option>
                                </select>
                            </label>
                        </div>
                    )}

                    <div className="admin-record-list" aria-live="polite">
                        {(activeCollection === 'caphEvent' ? matchingEventRecords : activeData.records).map((record) => (
                            <article className="admin-record" key={record.id}>
                                <div className="admin-record__identity">
                                    {activeCollection !== 'caphEvent' && <span className="admin-record__id">#{record.id}</span>}
                                    <div>
                                        <h2>{getAdminRecordLabel(record, activeData.fields, activeCollection)}</h2>
                                        <p>{activeCollection === 'caphEvent'
                                            ? [getEventDateLabel(record.startDate), getRelationLabel(record, 'eventType', eventRelations), getRelationLabel(record, 'intervenant', eventRelations), record.description].filter(Boolean).join('  /  ').slice(0, 180)
                                            : summaryFields.filter((field) => record[field.field] && field.field !== (activeData.fields.find((item) => ['title', 'name', 'label'].includes(item.field))?.field)).map((field) => `${fieldLabel(field)} · ${String(record[field.field]).slice(0, 90)}`).join('  /  ') || activeCollection}</p>
                                    </div>
                                </div>
                                <div className="admin-record__actions">
                                    <button type="button" className="admin-icon-button" title="Modifier" aria-label={`Modifier ${getAdminRecordLabel(record, activeData.fields, activeCollection)}`} onClick={() => openEditor(record)}><BsPencil aria-hidden="true" /></button>
                                    <button type="button" className="admin-icon-button admin-icon-button--danger" title="Supprimer" aria-label={`Supprimer ${getAdminRecordLabel(record, activeData.fields, activeCollection)}`} onClick={() => handleDelete(record)}><BsTrash aria-hidden="true" /></button>
                                </div>
                            </article>
                        ))}
                    </div>
                    {activeCollection === 'caphEvent' && matchingEventRecords.length === 0 && activeData.records.length > 0 && (
                        <p className="admin-event-search__empty" role="status">
                            {!showPastEvents && !eventSearchQuery.trim() && !eventTypeFilter && !eventIntervenantFilter
                                ? 'Aucun événement à venir. Activez « Afficher les événements passés » pour consulter l’historique.'
                                : 'Aucun événement ne correspond à ces critères.'}
                        </p>
                    )}
                    {!isLoading && !pageError && activeData.records.length === 0 && activeData.fields.length > 0 && (
                        <div className="admin-empty"><span>0{activeCollection === 'caphEvent' ? '1' : '2'}</span><p>Aucune entrée pour le moment.</p><button type="button" onClick={() => openEditor()}>Créer la première</button></div>
                    )}
                </div>
            </section>

            {isEditorOpen ? (
                <AdminRecordEditorModal
                    key={`${activeCollection}-${editor?.id || 'new'}`}
                    collection={activeCollection}
                    collectionLabel={activeDefinition.label}
                    singular={activeDefinition.singular}
                    token={token}
                    record={editor}
                    fields={activeData.fields}
                    relations={activeData.relations}
                    onClose={closeEditor}
                    onSaved={() => loadCollection(activeCollection, token)}
                    onUnauthorized={expireSession}
                />
            ) : null}

            {isLogoutConfirmationOpen && (
                <div className="admin-dialog-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) setIsLogoutConfirmationOpen(false); }}>
                    <section className="admin-dialog admin-dialog--logout" role="dialog" aria-modal="true" aria-labelledby="admin-logout-title">
                        <h2 id="admin-logout-title">Confirmer la déconnexion</h2>
                        <p>Êtes-vous sûr de vouloir vous déconnecter de l’administration ?</p>
                        <footer className="admin-dialog__footer">
                            <button type="button" className="admin-button admin-button--quiet" onClick={() => setIsLogoutConfirmationOpen(false)}>Annuler</button>
                            <button type="button" className="admin-button admin-button--primary" onClick={logout}>Se déconnecter</button>
                        </footer>
                    </section>
                </div>
            )}
        </main>
    );
}

export default Admin;