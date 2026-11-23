import express from 'express';
import cors from 'cors';

import clientesRoutes from './routes/cliente.routes';
import ventasRoutes from './routes/venta.routes';
import proveedoresRoutes from './routes/proveedor.routes';

import { requestLogger } from './middlewares/logger.middleware';
import {
  errorHandler,
  notFoundHandler
} from './middlewares/error.middleware';

const app = express();

app.use(cors());

app.use(express.json());

app.use(requestLogger);

app.get('/api/v1/health', (req, res) => {
  res.json({
    status: 'OK'
  });
});

app.use(
  '/api/v1/clientes',
  clientesRoutes
);

app.use(
  '/api/v1/ventas',
  ventasRoutes
);

app.use(
  '/api/v1/proveedores',
  proveedoresRoutes
);

app.use(notFoundHandler);

app.use(errorHandler);

export default app;
