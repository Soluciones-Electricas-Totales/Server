import bodyParser from 'body-parser';
import cors from 'cors';
import { metricsMiddleware } from '../metrics/prometheus.js';

const applyMiddlewares = (app) => {
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json({ limit: '1mb' }));
    app.use(cors({ methods: '*' }));
    // app.use(metricsMiddleware); // Descomenta si necesitas métricas
};

export default applyMiddlewares;