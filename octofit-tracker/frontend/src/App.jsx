import { useEffect, useState } from 'react';
import { Link, NavLink, Route, Routes, useLocation } from 'react-router-dom';
import octofitLogo from '../../../docs/octofitapp-small.png';
import { apiBaseUrl, fetchCollection } from './api/client.js';
import Activities from './components/Activities.jsx';
import Leaderboard from './components/Leaderboard.jsx';
import Teams from './components/Teams.jsx';
import Users from './components/Users.jsx';
import Workouts from './components/Workouts.jsx';
import './octofit.css';

const navigation = [
  { to: '/', label: 'Resumen', index: '01', end: true },
  { to: '/users', label: 'Estudiantes', index: '02' },
  { to: '/teams', label: 'Equipos', index: '03' },
  { to: '/activities', label: 'Actividades', index: '04' },
  { to: '/leaderboard', label: 'Leaderboard', index: '05' },
  { to: '/workouts', label: 'Entrenamientos', index: '06' },
];

const summaryResources = [
  { endpoint: '/api/users/', label: 'Estudiantes', accent: 'leaf' },
  { endpoint: '/api/teams/', label: 'Equipos', accent: 'coral' },
  { endpoint: '/api/activities/', label: 'Actividades registradas', accent: 'gold' },
  { endpoint: '/api/workouts/', label: 'Entrenamientos', accent: 'blue' },
];

function Overview() {
  const [counts, setCounts] = useState(null);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    Promise.all(summaryResources.map(({ endpoint }) => fetchCollection(endpoint, { signal: controller.signal })))
      .then((results) => setCounts(results.map(({ total }) => total)))
      .catch((error) => {
        if (error.name !== 'AbortError') setLoadError(true);
      });

    return () => controller.abort();
  }, []);

  return (
    <div className="overview-page">
      <section className="welcome-band">
        <div className="welcome-copy">
          <p className="eyebrow">Mergington High · Educación física</p>
          <h1>El progreso se construye<br />en equipo.</h1>
          <p>Una mirada clara al movimiento, los equipos y los logros de la comunidad.</p>
          <Link className="primary-link" to="/activities">Explorar actividad <span aria-hidden="true">↗</span></Link>
        </div>
        <div className="welcome-art" aria-hidden="true">
          <img src={octofitLogo} alt="" />
          <span className="art-ring ring-one" />
          <span className="art-ring ring-two" />
          <span className="art-label">MOVE<br />TOGETHER</span>
        </div>
      </section>

      <section className="metrics-section" aria-labelledby="metrics-title">
        <div className="section-heading">
          <div>
            <p className="eyebrow">La comunidad, en cifras</p>
            <h2 id="metrics-title">Actividad del tracker</h2>
          </div>
          {loadError && <span className="inline-warning">No se pudo conectar con la API</span>}
        </div>
        <div className="metrics-grid">
          {summaryResources.map((item, index) => (
            <article className={`metric-item metric-${item.accent}`} key={item.endpoint}>
              <span className="metric-value">{counts ? counts[index] : '—'}</span>
              <span className="metric-label">{item.label}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="next-step-band">
        <div>
          <p className="eyebrow">Siguiente paso</p>
          <h2>Pequeños esfuerzos, grandes rachas.</h2>
          <p>Revisa los registros recientes o encuentra una nueva sesión para el equipo.</p>
        </div>
        <div className="quick-links">
          <Link to="/leaderboard"><span>01</span> Ver leaderboard <b aria-hidden="true">↗</b></Link>
          <Link to="/workouts"><span>02</span> Buscar entrenamiento <b aria-hidden="true">↗</b></Link>
        </div>
      </section>
    </div>
  );
}

function App() {
  const location = useLocation();
  const currentPage = navigation.find((item) => item.to === location.pathname)?.label ?? 'Resumen';

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <Link className="brand-lockup" to="/" aria-label="OctoFit Tracker, inicio">
          <img src={octofitLogo} alt="" />
          <span><strong>OctoFit</strong><small>TRACKER</small></span>
        </Link>

        <div className="nav-group">
          <p className="nav-heading">ESPACIO DE TRABAJO</p>
          <nav className="primary-nav" aria-label="Navegación principal">
            {navigation.map((item) => (
              <NavLink key={item.to} to={item.to} end={item.end}>
                <span className="nav-index">{item.index}</span>
                <span>{item.label}</span>
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="sidebar-bottom">
          <span className="school-seal">MH</span>
          <span><strong>Mergington High</strong><small>Comunidad escolar</small></span>
        </div>
      </aside>

      <div className="main-column">
        <header className="topbar">
          <p className="breadcrumb">OctoFit <span>/</span> <strong>{currentPage}</strong></p>
          <div className="connection-indicator" title={apiBaseUrl}>
            <span className="connection-dot" />
            {apiBaseUrl.startsWith('https://') ? 'Codespaces API' : 'API local'}
          </div>
        </header>

        <main className="workspace">
          <Routes>
            <Route path="/" element={<Overview />} />
            <Route path="/users" element={<Users />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/workouts" element={<Workouts />} />
          </Routes>
        </main>
        <footer className="workspace-footer">OCTOFIT TRACKER <span>·</span> Mergington High School</footer>
      </div>
    </div>
  );
}

export default App;
