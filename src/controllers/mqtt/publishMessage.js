const publishMessage = (req, res, topic, msg, callback) => {
    req.mqttClient.publish(topic, msg, { qos: 1 }, (error) => {
        if (error) console.error("Error MQTT:", error);
        else callback();
    });
};

export default publishMessage;