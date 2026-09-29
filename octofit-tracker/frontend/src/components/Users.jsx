import CollectionPage from './CollectionPage.jsx';

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim();
const endpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/users/`
  : 'http://localhost:8000/api/users/';

const columns = [
  { key: 'displayName', label: 'Estudiante' },
  { key: 'username', label: 'Usuario' },
  { key: 'grade', label: 'Curso' },
  { key: 'team', label: 'Equipo' },
  { key: 'points', label: 'Puntos' },
];

export default function Users() {
  return (
    <CollectionPage
      eyebrow="Comunidad"
      title="Estudiantes"
      description="Perfiles y progreso de la comunidad OctoFit."
      endpoint={endpoint}
      columns={columns}
    />
  );
}