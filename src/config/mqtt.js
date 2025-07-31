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
        client.subscribe(process.env.MQTT_TOPIC_TURN_OFF, { qos: 0 }, (error) => {
            if (error) console.log('Subscribe error:', error);
            else console.log(`Subscribed to ${process.env.MQTT_TOPIC_TURN_OFF}`);
        });
    });

    client.on('message', (topic, payload) => {
        console.log('Received Message:', topic, payload.toString());
        const data = JSON.parse(payload);
        if (topic === process.env.MQTT_TOPIC_TURN_OFF && data.a === 0) {
            console.log("apagando")
        }
    });

    return client;
};

export default createMQTTClient;