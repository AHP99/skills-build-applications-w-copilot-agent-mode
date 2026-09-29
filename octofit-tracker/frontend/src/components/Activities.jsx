import CollectionPage from './CollectionPage.jsx';

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim();
const endpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/activities/`
  : 'http://localhost:8000/api/activities/';

const columns = [
  { key: 'type', label: 'Actividad' },
  { key: 'user', label: 'Atleta' },
  { key: 'durationMinutes', label: 'Minutos' },
  { key: 'distanceKm', label: 'Distancia (km)' },
  { key: 'points', label: 'Puntos' },
  { key: 'loggedAt', label: 'Fecha' },
];

export default function Activities() {
  return (
    <CollectionPage
      eyebrow="Movimiento"
      title="Actividades"
      description="Entrenamientos registrados por la comunidad escolar."
      endpoint={endpoint}
      columns={columns}
    />
  );
}