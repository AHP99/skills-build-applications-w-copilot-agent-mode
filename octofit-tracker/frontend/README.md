# OctoFit Tracker frontend

React 19 presentation tier for the OctoFit Tracker application.

## Start the application

Run the frontend and backend in separate terminals:

```bash
npm run dev --prefix octofit-tracker/frontend -- --host 0.0.0.0
npm run dev --prefix octofit-tracker/backend
```

The frontend uses port `5173`; the API uses port `8000` and MongoDB uses port `27017`.

## Configure the API host

In Codespaces, define `VITE_CODESPACE_NAME` in `octofit-tracker/frontend/.env.local`:

```dotenv
VITE_CODESPACE_NAME=your-codespace-name
```

Vite builds API endpoints as `https://<VITE_CODESPACE_NAME>-8000.app.github.dev/api/<resource>/`. Restart the frontend after changing `.env.local` so Vite reloads the variable. If `VITE_CODESPACE_NAME` is missing or blank, the client safely falls back to `http://localhost:8000/api/` instead of creating an `undefined` URL.

The API client accepts both plain arrays and paginated responses containing `results`, `items`, `data`, or `records` arrays.
