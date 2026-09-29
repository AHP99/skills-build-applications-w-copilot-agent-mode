import express from 'express';
import cors from 'cors';
import { connectDatabase } from './config/database.js';
import apiRouter from './routes/index.js';

const app = express();
const port = Number(process.env.PORT) || 8000;
const codespaceName = process.env.CODESPACE_NAME;
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api`
  : `http://localhost:${port}/api`;

app.use(cors());
app.use(express.json());

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok' });
});

app.get('/api/', (_request, response) => {
  response.json({
    users: `${apiBaseUrl}/users/`,
    teams: `${apiBaseUrl}/teams/`,
    activities: `${apiBaseUrl}/activities/`,
    leaderboard: `${apiBaseUrl}/leaderboard/`,
    workouts: `${apiBaseUrl}/workouts/`,
  });
});

app.use('/api', apiRouter);

app.use((error: Error, _request: express.Request, response: express.Response, _next: express.NextFunction) => {
  console.error(error);
  const status = error.name === 'ValidationError' || error.name === 'CastError' ? 400 : 500;
  response.status(status).json({ error: status === 400 ? error.message : 'Internal server error' });
});

async function startServer() {
  try {
    await connectDatabase();
    app.listen(port, () => {
      console.log(`OctoFit API listening on port ${port}`);
    });
  } catch (error) {
    console.error('Unable to start OctoFit API:', error);
    process.exitCode = 1;
  }
}

void startServer();
