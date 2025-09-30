import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import { join } from 'node:path';
import { Pool } from 'pg';
import crypto from 'crypto'; // Si quieres validar en Node, pero puedes usar SQL MD5 directamente

const browserDistFolder = join(import.meta.dirname, '../browser');

const app = express();
const angularApp = new AngularNodeAppEngine();

// Configuración de la base de datos PostgreSQL
const dbPool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'clinica_dental',
  password: 'Adriel2002*',
  port: 5432,
});

/**
 * Example Express Rest API endpoints can be defined here.
 * Uncomment and define endpoints as necessary.
 *
 * Example:
 * ```ts
 * app.get('/api/{*splat}', (req, res) => {
 *   // Handle API request
 * });
 * ```
 */

/**
 * Serve static files from /browser
 */
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

/**
 * Handle all other requests by rendering the Angular application.
 */
app.use((req, res, next) => {
  angularApp
    .handle(req)
    .then((response) =>
      response ? writeResponseToNodeResponse(response, res) : next(),
    )
    .catch(next);
});

/**
 * Ejemplo de endpoint para probar la conexión
 */
app.get('/api/test-db', async (req, res) => {
  try {
    const result = await dbPool.query('SELECT NOW()');
    res.json({ time: result.rows[0] });
  } catch (err) {
    const errorMessage = typeof err === 'object' && err !== null && 'message' in err ? (err as { message: string }).message : String(err);
    res.status(500).json({ error: errorMessage });
  }
});

app.post('/api/login-doctor', express.json(), async (req, res) => {
  const { login, cedula, password } = req.body;
  try {
    const result = await dbPool.query(
      `SELECT d.*, u.login, u.role
       FROM doctors d
       JOIN app_users u ON d.user_id = u.id
       WHERE d.cedula = $1 AND u.login = $2 AND u.password_hash = md5($3) AND u.role = 'medico'`,
      [cedula, login, password]
    );
    if (result.rows.length === 1) {
      res.json({ success: true, doctor: result.rows[0] });
    } else {
      res.status(401).json({ success: false, message: 'Credenciales incorrectas' });
    }
  } catch (err) {
    res.status(500).json({ error: String(err) });
  }
});

/**
 * Start the server if this module is the main entry point.
 * The server listens on the port defined by the `PORT` environment variable, or defaults to 4000.
 */
if (isMainModule(import.meta.url)) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, (error) => {
    if (error) {
      throw error;
    }

    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

/**
 * Request handler used by the Angular CLI (for dev-server and during build) or Firebase Cloud Functions.
 */
export const reqHandler = createNodeRequestHandler(app);
