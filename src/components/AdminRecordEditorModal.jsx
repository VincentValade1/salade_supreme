import { useEffect, useMemo, useState } from 'react';
import { BsCheck2, BsX } from 'react-icons/bs';
import '../styles/Admin.css';

const DIRECTUS_URL = process.env.REACT_APP_DIRECTUS_URL || 'https://directus.saladesupreme.tarrieu.fr';

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

function inputValue(field, value) {
    if (value == null) return '';
    if (field.type === 'dateTime') {
        // Directus dateTime values have no timezone; keep their local date and time intact.
        const textValue = String(value);
        if (!/(?:Z|[+-]\d{2}:?\d{2})$/i.test(textValue)) return textValue.slice(0, 16);
    }
    if (field.type === 'dateTime' || field.type === 'timestamp') {
        const date = new Date(value);
        return Number.isNaN(date.getTime()) ? '' : new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
    }
    if (field.type === 'date') return String(value).slice(0, 10);
    return typeof value === 'object' ? JSON.stringify(value, null, 2) : String(value);
}

function getInitialFieldValue(record, field) {
    const value = record?.[field.field] ?? field.schema?.default_value ?? '';
    return value && typeof value === 'object' && value.id !== undefined ? value.id : value;
}

function AdminRecordEditorModal({ collection, collectionLabel, singular, token, record, fields, relations, onClose, onSaved, onUnauthorized, isOverlayAbovePage = false }) {
    const [editorData, setEditorData] = useState(() => fields ? { fields, relations: relations || [], record } : null);
    const [formValues, setFormValues] = useState({});
    const [loadError, setLoadError] = useState('');
    const [saveError, setSaveError] = useState('');
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        let isCurrent = true;

        const loadEditorData = async () => {
            setLoadError('');
            if (fields) {
                setEditorData({ fields, relations: relations || [], record });
                return;
            }

            setEditorData(null);
            try {
                const [loadedFields, allRelations, loadedRecord] = await Promise.all([
                    directusRequest(`/fields/${collection}`, { token }),
                    directusRequest('/relations?limit=-1', { token }),
                    record?.id
                        ? directusRequest(`/items/${collection}/${encodeURIComponent(record.id)}`, { token })
                        : Promise.resolve(record)
                ]);
                const ownRelations = allRelations.filter((relation) => relation.collection === collection && relation.related_collection);
                const relationOptions = await Promise.all(ownRelations.map(async (relation) => {
                    try {
                        const [relatedFields, relatedRecords] = await Promise.all([
                            directusRequest(`/fields/${relation.related_collection}`, { token }),
                            directusRequest(`/items/${relation.related_collection}?limit=500`, { token })
                        ]);
                        return { field: relation.field, collection: relation.related_collection, fields: relatedFields, records: relatedRecords };
                    } catch (error) {
                        if (error.status === 401) throw error;
                        return { field: relation.field, collection: relation.related_collection, fields: [], records: [], error: error.message };
                    }
                }));

                if (isCurrent) {
                    setEditorData({ fields: loadedFields, relations: relationOptions, record: loadedRecord });
                }
            } catch (error) {
                if (!isCurrent) return;
                if (error.status === 401) onUnauthorized?.();
                else setLoadError(error.message);
            }
        };

        loadEditorData();
        return () => { isCurrent = false; };
    }, [collection, fields, onUnauthorized, record, relations, token]);

    useEffect(() => {
        if (!editorData) return;
        const editableFields = editorData.fields.filter((field) => field.field !== 'id' && !field.meta?.hidden);
        setFormValues(Object.fromEntries(editableFields.map((field) => [field.field, getInitialFieldValue(editorData.record, field)])));
    }, [editorData]);

    const relationByField = useMemo(
        () => Object.fromEntries((editorData?.relations || []).map((relation) => [relation.field, relation])),
        [editorData]
    );

    const handleSave = async (event) => {
        event.preventDefault();
        if (!editorData) return;
        setIsSaving(true);
        setSaveError('');
        try {
            const payload = {};
            editorData.fields.filter((field) => field.field !== 'id' && !field.meta?.hidden).forEach((field) => {
                const value = formValues[field.field];
                if (value === '' || value === undefined) {
                    payload[field.field] = null;
                } else if (field.type === 'boolean') {
                    payload[field.field] = value === true || value === 'true';
                } else if (['integer', 'bigInteger', 'float', 'decimal'].includes(field.type)) {
                    payload[field.field] = Number(value);
                } else if (field.type === 'dateTime') {
                    payload[field.field] = value.length === 16 ? `${value}:00` : value;
                } else if (field.type === 'timestamp') {
                    payload[field.field] = new Date(value).toISOString();
                } else if (field.type === 'json' && typeof value === 'string') {
                    payload[field.field] = JSON.parse(value);
                } else {
                    payload[field.field] = value;
                }
            });

            const isEditing = Boolean(editorData.record);
            const path = isEditing
                ? `/items/${collection}/${encodeURIComponent(editorData.record.id)}`
                : `/items/${collection}`;
            await directusRequest(path, { token, method: isEditing ? 'PATCH' : 'POST', body: payload });
            await onSaved?.();
            onClose();
        } catch (error) {
            if (error.status === 401) onUnauthorized?.();
            else setSaveError(error.message);
        } finally {
            setIsSaving(false);
        }
    };

    const renderField = (field) => {
        const relation = relationByField[field.field];
        const choices = field.meta?.options?.choices;
        const value = formValues[field.field] ?? '';
        const isEventTypeColor = collection === 'caphEventType'
            && ['backgroundColor', 'borderColor', 'textColor'].includes(field.field);
        const commonProps = {
            id: `admin-field-${field.field}`,
            name: field.field,
            required: Boolean(field.meta?.required),
            value: inputValue(field, value),
            onChange: (event) => setFormValues((current) => ({ ...current, [field.field]: event.target.value }))
        };

        let control;
        if (isEventTypeColor) {
            control = (
                <div className="admin-color-picker">
                    <input {...commonProps} type="color" value={commonProps.value || '#ffffff'} />
                    <span>{commonProps.value || 'Aucune couleur'}</span>
                </div>
            );
        } else if (relation) {
            control = (
                <select {...commonProps}>
                    <option value="">Aucune valeur</option>
                    {relation.records.map((relatedRecord) => (
                        <option key={relatedRecord.id} value={relatedRecord.id}>{getRecordLabel(relatedRecord, relation.fields)}</option>
                    ))}
                </select>
            );
        } else if (Array.isArray(choices) && choices.length) {
            control = (
                <select {...commonProps}>
                    <option value="">Choisir une valeur</option>
                    {choices.map((choice) => <option key={choice.value} value={choice.value}>{choice.text || choice.value}</option>)}
                </select>
            );
        } else if (field.type === 'boolean') {
            control = (
                <select {...commonProps}>
                    <option value="">Non renseigné</option>
                    <option value="true">Oui</option>
                    <option value="false">Non</option>
                </select>
            );
        } else if (field.type === 'json' || field.meta?.interface?.includes('textarea') || field.field.toLowerCase().includes('description') || field.field.toLowerCase() === 'bio') {
            control = <textarea {...commonProps} rows={field.type === 'json' ? 5 : 4} />;
        } else if (field.type === 'date' || field.type === 'dateTime' || field.type === 'timestamp') {
            control = <input {...commonProps} type={field.type === 'date' ? 'date' : 'datetime-local'} />;
        } else if (['integer', 'bigInteger', 'float', 'decimal'].includes(field.type)) {
            control = <input {...commonProps} type="number" step={['float', 'decimal'].includes(field.type) ? 'any' : '1'} />;
        } else if (field.type === 'text' || field.type === 'string') {
            control = <input {...commonProps} type="text" />;
        } else {
            control = <textarea {...commonProps} rows={3} />;
        }

        return (
            <label className="admin-form__field" key={field.field} htmlFor={commonProps.id}>
                <span>{fieldLabel(field)}{field.meta?.required && <b aria-hidden="true"> *</b>}</span>
                {control}
                {relation?.error && <small>Options indisponibles: {relation.error}</small>}
            </label>
        );
    };

    const title = `${editorData?.record ? 'Modifier' : 'Nouvel'} ${singular}`;

    return (
        <div className={`admin-dialog-backdrop ${isOverlayAbovePage ? 'admin-dialog-backdrop--planning' : ''}`} onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
            <section className="admin-dialog" role="dialog" aria-modal="true" aria-labelledby="admin-dialog-title">
                <header className="admin-dialog__header">
                    <div><p className="admin-eyebrow">{collectionLabel || collection}</p><h2 id="admin-dialog-title">{title}</h2></div>
                    <button type="button" className="admin-icon-button" aria-label="Fermer" onClick={onClose}><BsX aria-hidden="true" /></button>
                </header>
                {editorData ? (
                    <form onSubmit={handleSave}>
                        <div className="admin-form__grid">
                            {editorData.fields.filter((field) => field.field !== 'id' && !field.meta?.hidden).map(renderField)}
                        </div>
                        {saveError && <p className="admin-error" role="alert">{saveError}</p>}
                        <footer className="admin-dialog__footer">
                            <button type="button" className="admin-button admin-button--quiet" onClick={onClose}>Annuler</button>
                            <button type="submit" className="admin-button admin-button--primary" disabled={isSaving}>
                                <BsCheck2 aria-hidden="true" /> {isSaving ? 'Enregistrement…' : 'Enregistrer'}
                            </button>
                        </footer>
                    </form>
                ) : (
                    <p className={loadError ? 'admin-error' : 'admin-status'} role={loadError ? 'alert' : 'status'}>{loadError || 'Chargement du formulaire…'}</p>
                )}
            </section>
        </div>
    );
}

export default AdminRecordEditorModal;