import CollectionPage from './CollectionPage.jsx';

const columns = [
  { key: 'user', label: 'Atleta' },
  { key: 'points', label: 'Puntos' },
  { key: 'updatedAt', label: 'Última actualización' },
];

export default function Leaderboard() {
  return (
    <CollectionPage
      eyebrow="Competencia amistosa"
      title="Leaderboard"
      description="Puntos acumulados por estudiantes en sus actividades."
      resource="leaderboard"
      columns={columns}
    />
  );
}