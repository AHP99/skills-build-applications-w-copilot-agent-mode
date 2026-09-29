import CollectionPage from './CollectionPage.jsx';

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim();
const endpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/leaderboard/`
  : 'http://localhost:8000/api/leaderboard/';

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
      endpoint={endpoint}
      columns={columns}
    />
  );
}