import client from "prom-client";

// Registro de métricas
const register = new client.Registry();
client.collectDefaultMetrics({ register });

// Definir las 4 Golden Signals

// Latencia (Histogram)
const httpRequestDuration = new client.Histogram({
    name: "http_request_duration_seconds",
    help: "Duración de las solicitudes HTTP en segundos",
    labelNames: ["method", "route", "status_code"],
    buckets: [0.1, 0.5, 1, 2, 5], // Intervalos en segundos
});

// Tráfico (Counter)
const httpRequestCount = new client.Counter({
    name: "http_requests_total",
    help: "Número total de solicitudes HTTP",
    labelNames: ["method", "route", "status_code"],
});

// Errores (Counter)
const httpErrorCount = new client.Counter({
    name: "http_errors_total",
    help: "Número total de errores HTTP",
    labelNames: ["method", "route", "status_code"],
});

// Saturación (Gauge)
const activeConnections = new client.Gauge({
    name: "active_connections",
    help: "Número actual de conexiones activas",
});

// Registrar métricas
register.registerMetric(httpRequestDuration);
register.registerMetric(httpRequestCount);
register.registerMetric(httpErrorCount);
register.registerMetric(activeConnections);

// Middleware para registrar métricas en cada request
const metricsMiddleware = (req, res, next) => {
    const end = httpRequestDuration.startTimer();
    activeConnections.inc();

    res.on("finish", () => {
        end({ method: req.method, route: req.path, status_code: res.statusCode });
        httpRequestCount.inc({ method: req.method, route: req.path, status_code: res.statusCode });

        if (res.statusCode >= 400) {
            httpErrorCount.inc({ method: req.method, route: req.path, status_code: res.statusCode });
        }

        activeConnections.dec();
    });

    next();
};

// Endpoint de métricas
const metricsEndpoint = async (req, res) => {
    res.set("Content-Type", register.contentType);
    res.end(await register.metrics());
};

export { metricsMiddleware, metricsEndpoint };
