import CollectionPage from './CollectionPage.jsx';

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
      endpoint="/api/users/"
      columns={columns}
    />
  );
}