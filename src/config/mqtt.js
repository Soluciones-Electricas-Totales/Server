import mqtt from 'mqtt';
import dotenv from 'dotenv';
import { updateStationStatus } from '../lib/updateStationStatus.js';
import { updateActivationStatus } from '../lib/updateActivationStatus.js';

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
        client.subscribe(process.env.MQTT_TOPIC_TURN_ON, { qos: 0 }, (error) => {
            if (error) console.log('Subscribe error:', error);
            else console.log(`Subscribed to ${process.env.MQTT_TOPIC_TURN_ON}`);
        });
    });

    client.on('message', (topic, payload) => {

        const changeStationStatus = async (data) => {
            const station = await updateStationStatus(data.s, data.a);
        }

        const changeActivationStatus = async (data, status) => {
            const activation = await updateActivationStatus(data.ai, status);
        }

        console.log('Received Message:', topic, payload.toString());
        const data = JSON.parse(payload);
        console.log(data);
        //console.log(topic === process.env.MQTT_TOPIC_TURN_OFF, topic === process.env.MQTT_TOPIC_TURN_ON, data.a === 0, data.a === 1);
        if (topic === process.env.MQTT_TOPIC_TURN_OFF && data.a === false) {
            console.log("apagando")
            changeStationStatus(data);
            changeActivationStatus(data, 'completed');
        }
        if (topic === process.env.MQTT_TOPIC_TURN_ON && data.a === true) {
            console.log("encendiendo")
            changeStationStatus(data);
        }
    });

    return client;
};

export default createMQTTClient;