import mqtt from "mqtt";

const setStatus = async (req, res) => {
    const { status } = req.params;
    const topic = 'testtopic/01'
    const payload = { status: status }
    const qos = 0

    if (!req.mqttClient || !req.mqttClient.connected) {
        return res.status(500).json({ error: "MQTT Client not connected" });
    }

    //console.log("Added to endpoint");

    //console.log(req.mqttClient)

    req.mqttClient.publish(topic, JSON.stringify(payload), { qos }, (error) => {
        if (error) {
            console.error(error)
            console.log("no enviado")
        } else {
            console.log("enviado")
        }

    })

    res.status(200).json("tamo activo");
};

export default setStatus;
