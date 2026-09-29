import CollectionPage from './CollectionPage.jsx';

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim();
const endpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/teams/`
  : 'http://localhost:8000/api/teams/';

const columns = [
  { key: 'name', label: 'Equipo' },
  { key: 'description', label: 'Descripción' },
  { key: 'members', label: 'Integrantes' },
];

export default function Teams() {
  return (
    <CollectionPage
      eyebrow="Comunidad"
      title="Equipos"
      description="Grupos que convierten el movimiento en un objetivo compartido."
      endpoint={endpoint}
      columns={columns}
    />
  );
}