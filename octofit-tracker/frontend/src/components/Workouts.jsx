import CollectionPage from './CollectionPage.jsx';

const columns = [
  { key: 'title', label: 'Entrenamiento' },
  { key: 'activityType', label: 'Tipo' },
  { key: 'fitnessLevel', label: 'Nivel' },
  { key: 'durationMinutes', label: 'Minutos' },
  { key: 'exercises', label: 'Ejercicios' },
];

export default function Workouts() {
  return (
    <CollectionPage
      eyebrow="Ideas para entrenar"
      title="Entrenamientos"
      description="Sesiones sugeridas para distintos niveles y objetivos."
      endpoint="/api/workouts/"
      columns={columns}
    />
  );
}