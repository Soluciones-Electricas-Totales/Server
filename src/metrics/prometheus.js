import client from "prom-client";
import os from "os";

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

// MÉTRICA DE SATURACIÓN - Uso de memoria (%)
const memoryUsageGauge = new client.Gauge({
    name: 'node_memory_usage_percentage',
    help: 'Porcentaje de uso de memoria',
});

// MÉTRICA DE SATURACIÓN - Uso de CPU (%)
const cpuUsageGauge = new client.Gauge({
    name: 'node_cpu_usage_percentage',
    help: 'Porcentaje de uso de CPU',
});

// Registrar métricas
register.registerMetric(httpRequestDuration);
register.registerMetric(httpRequestCount);
register.registerMetric(httpErrorCount);
register.registerMetric(activeConnections);
register.registerMetric(memoryUsageGauge);
register.registerMetric(cpuUsageGauge);

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


// Función para actualizar el uso de memoria y CPU cada 5 segundos
setInterval(() => {
    const memoryUsage = process.memoryUsage();
    const totalMemory = os.totalmem();
    const usedMemory = memoryUsage.rss / totalMemory; // Uso de memoria en porcentaje

    const cpuLoad = os.loadavg()[0] / os.cpus().length; // Carga promedio de CPU en porcentaje

    memoryUsageGauge.set(usedMemory * 100); // Convertir a porcentaje
    cpuUsageGauge.set(cpuLoad * 100);

    console.log(` Métricas actualizadas → Memoria: ${(usedMemory * 100).toFixed(2)}%, CPU: ${(cpuLoad * 100).toFixed(2)}%`);
}, 5000); // Cada 5 segundos

// Endpoint de métricas
const metricsEndpoint = async (req, res) => {
    res.set("Content-Type", register.contentType);
    res.end(await register.metrics());
};

export { metricsMiddleware, metricsEndpoint };
