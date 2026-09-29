import CollectionPage from './CollectionPage.jsx';

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
      endpoint="/api/teams/"
      columns={columns}
    />
  );
}