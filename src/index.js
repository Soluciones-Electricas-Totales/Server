import express from "express";
import dotenv from 'dotenv';

import connectDB from './config/db.js';
import applyMiddlewares from './config/middleware.js';
import createMQTTClient from './config/mqtt.js';

import { socketioMiddleware, catchErrors } from "./decorators/index.js";
import { metricsMiddleware, metricsEndpoint } from "./metrics/prometheus.js";
import routes from './api/endPoints.js';

dotenv.config();

const app = express();
const port = process.env.PORT;
//const server = http.createServer(app);

applyMiddlewares(app);
connectDB();

const mqttClient = createMQTTClient();

// Middleware para inyectar cliente MQTT
app.use((req, res, next) => {
  req.mqttClient = mqttClient;
  next();
});


// metrics 
app.get("/error", (req, res) => {
  res.status(500).send("Error interno");
});

// Ruta para métricas
app.get("/metrics", metricsEndpoint);

app.use('/', routes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);

  // Test MQTT
  mqttClient.publish(process.env.MQTT_TOPIC, "tamo activo", { qos: 0 }, (error) => {
    if (error) console.error("Error MQTT:", error);
    else console.log("MQTT test message sent");
  });
});


