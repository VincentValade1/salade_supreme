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

function normalizeSearchText(value) {
    return String(value || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
}

function Admin() {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [token, setToken] = useState(() => window.sessionStorage.getItem(TOKEN_STORAGE_KEY) || '');
    const [activeCollection, setActiveCollection] = useState(COLLECTIONS[0].name);
    const [eventSearchQuery, setEventSearchQuery] = useState('');
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
    const matchingEventRecords = useMemo(() => {
        const query = normalizeSearchText(eventSearchQuery.trim());
        if (!query) return activeData.records;

        return activeData.records.filter((record) => normalizeSearchText([
            record.id,
            record.title,
            record.description,
            record.startDate,
            record.endDate,
            record.link,
            record.eventType?.name,
            record.intervenant?.name
        ].join(' ')).includes(query));
    }, [activeData.records, eventSearchQuery]);

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
                if (!isMounted) return;
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
        const label = getRecordLabel(record, activeData.fields);
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
                            onClick={() => { setActiveCollection(collection.name); setEditor(null); setEventSearchQuery(''); }}
                        >
                            <span>{collection.label}</span>
                            <span className="admin-collections__count">{collectionData[collection.name]?.records.length ?? '—'}</span>
                        </button>
                    ))}
                </nav>
                <div className="admin-sidebar__bottom">
                    <Link to="/lieux/capharnaum#cours-ateliers"><BsArrowLeft aria-hidden="true" /> Voir le site</Link>
                    <button type="button" onClick={() => setIsLogoutConfirmationOpen(true)}><BsBoxArrowRight aria-hidden="true" /> Se déconnecter</button>
                    <button type="button" onClick={refreshCollection} title="Actualiser la collection" aria-label="Actualiser la collection">
                        <BsArrowRepeat aria-hidden="true" /> Actualiser
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
                    )}

                    <div className="admin-record-list" aria-live="polite">
                        {(activeCollection === 'caphEvent' ? matchingEventRecords : activeData.records).map((record) => (
                            <article className="admin-record" key={record.id}>
                                <div className="admin-record__identity">
                                    <span className="admin-record__id">#{record.id}</span>
                                    <div>
                                        <h2>{getRecordLabel(record, activeData.fields)}</h2>
                                        <p>{summaryFields.filter((field) => record[field.field] && field.field !== (activeData.fields.find((item) => ['title', 'name', 'label'].includes(item.field))?.field)).map((field) => `${fieldLabel(field)} · ${String(record[field.field]).slice(0, 90)}`).join('  /  ') || activeCollection}</p>
                                    </div>
                                </div>
                                <div className="admin-record__actions">
                                    <button type="button" className="admin-icon-button" title="Modifier" aria-label={`Modifier ${getRecordLabel(record, activeData.fields)}`} onClick={() => openEditor(record)}><BsPencil aria-hidden="true" /></button>
                                    <button type="button" className="admin-icon-button admin-icon-button--danger" title="Supprimer" aria-label={`Supprimer ${getRecordLabel(record, activeData.fields)}`} onClick={() => handleDelete(record)}><BsTrash aria-hidden="true" /></button>
                                </div>
                            </article>
                        ))}
                    </div>
                    {activeCollection === 'caphEvent' && eventSearchQuery.trim() && matchingEventRecords.length === 0 && activeData.records.length > 0 && (
                        <p className="admin-event-search__empty" role="status">Aucun événement ne correspond à cette recherche.</p>
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