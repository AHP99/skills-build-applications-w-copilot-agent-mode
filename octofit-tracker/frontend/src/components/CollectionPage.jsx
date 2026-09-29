import { useEffect, useState } from 'react';
import { fetchCollection } from '../api/client.js';

function formatValue(value) {
  if (value === null || value === undefined || value === '') return '—';
  if (Array.isArray(value)) return value.length ? value.map(formatValue).join(', ') : '—';
  if (typeof value === 'object') {
    const label = value.displayName ?? value.username ?? value.name ?? value.title;
    return label ?? value._id ?? value.id ?? '[Registro]';
  }
  return String(value);
}

export default function CollectionPage({ eyebrow, title, description, endpoint, columns }) {
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [state, setState] = useState('loading');
  const [error, setError] = useState('');
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    fetchCollection(endpoint, { signal: controller.signal })
      .then((result) => {
        setItems(result.items);
        setTotal(result.total);
        setState('ready');
      })
      .catch((requestError) => {
        if (requestError.name === 'AbortError') return;
        setError(requestError.message || 'No se pudo cargar la información.');
        setState('error');
      });

    return () => controller.abort();
  }, [attempt, endpoint]);

  function retryLoad() {
    setState('loading');
    setError('');
    setAttempt((value) => value + 1);
  }

  return (
    <section className="collection-view">
      <header className="page-heading">
        <div>
          <p className="eyebrow">{eyebrow}</p>
          <h1>{title}</h1>
          <p className="page-description">{description}</p>
        </div>
        <div className="record-count" aria-live="polite">
          <span className="record-count-value">{state === 'ready' ? total : '—'}</span>
          <span>registros</span>
        </div>
      </header>

      <div className="table-toolbar">
        <span className="table-caption">Directorio de {title.toLowerCase()}</span>
        {state === 'ready' && <span className="live-status"><i /> Datos actualizados</span>}
        {state === 'error' && (
          <button className="text-button" onClick={retryLoad}>
            Reintentar
          </button>
        )}
      </div>

      {state === 'loading' && <div className="loading-row" role="status">Cargando registros…</div>}
      {state === 'error' && <div className="error-panel" role="alert">{error}</div>}
      {state === 'ready' && items.length === 0 && (
        <div className="empty-panel">Todavía no hay registros para mostrar.</div>
      )}
      {state === 'ready' && items.length > 0 && (
        <div className="table-responsive collection-table-wrap">
          <table className="table collection-table">
            <thead>
              <tr>
                {columns.map((column) => <th key={column.key} scope="col">{column.label}</th>)}
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={item._id ?? item.id ?? `${endpoint}-${index}`}>
                  {columns.map((column) => (
                    <td key={column.key}>
                      {column.key === 'displayName' || column.key === 'name' || column.key === 'title'
                        ? <strong>{formatValue(item[column.key])}</strong>
                        : formatValue(item[column.key])}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}