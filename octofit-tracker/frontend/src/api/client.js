const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim();

export const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api`
  : 'http://localhost:8000/api';

export function normalizeCollection(payload) {
  if (Array.isArray(payload)) {
    return { items: payload, total: payload.length };
  }

  if (!payload || typeof payload !== 'object') {
    throw new Error('La API devolvió una respuesta no válida.');
  }

  const items = payload.results ?? payload.items ?? payload.data ?? payload.records;
  if (!Array.isArray(items)) {
    throw new Error('La respuesta de la API no contiene una lista de registros.');
  }

  return {
    items,
    total: Number.isFinite(payload.count) ? payload.count : items.length,
  };
}

export async function fetchCollection(resource, { signal } = {}) {
  const response = await fetch(`${apiBaseUrl}/${resource}/`, { signal });
  if (!response.ok) {
    throw new Error(`La API respondió con el estado ${response.status}.`);
  }

  return normalizeCollection(await response.json());
}