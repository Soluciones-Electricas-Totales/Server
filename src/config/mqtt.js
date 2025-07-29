import mqtt from 'mqtt';
import dotenv from 'dotenv';

dotenv.config();

const createMQTTClient = () => {
    const clientId = 'emqx_nodejs_' + Math.random().toString(16).substring(2, 8);
    const client = mqtt.connect(process.env.MQTT_URL, {
        clientId,
        username: process.env.MQTT_USERNAME,
        password: process.env.MQTT_PASSWORD,
    });

    client.on('connect', () => {
        console.log('MQTT Connected');
        client.subscribe(process.env.MQTT_TOPIC, { qos: 0 }, (error) => {
            if (error) console.log('Subscribe error:', error);
            else console.log(`Subscribed to ${process.env.MQTT_TOPIC}`);
        });
    });

    client.on('message', (topic, payload) => {
        console.log('Received Message:', topic, payload.toString());
    });

    return client;
};

export default createMQTTClient;