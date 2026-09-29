import CollectionPage from './CollectionPage.jsx';

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
      endpoint="/api/activities/"
      columns={columns}
    />
  );
}