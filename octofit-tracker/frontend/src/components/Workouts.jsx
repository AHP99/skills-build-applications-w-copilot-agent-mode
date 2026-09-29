import CollectionPage from './CollectionPage.jsx';

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim();
const endpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/workouts/`
  : 'http://localhost:8000/api/workouts/';

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
      endpoint={endpoint}
      columns={columns}
    />
  );
}