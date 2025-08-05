import Activation from '../../models/Activation.js';
import publishMessage from '../mqtt/publishMessage.js';
import Purchase from '../../models/Purchase.js';

const startActivation = async (req, res, next) => {
    try {
        const { purchaseId, stationId } = req.body;
        const userId = req.user._id; // Assuming JWT auth

        const purchase = await Purchase.findById(purchaseId).populate('product');
        console.log(purchase);

        if (!purchase) {
            return res.status(404).json({
                success: false,
                error: 'Compra no encontrada'
            });
        }

        // Validar que no esté ya usada o cancelada
        if (purchase.status !== 'unused') {
            return res.status(404).json({
                success: false,
                error: `Purchase status is already ${purchase.status}`
            });
        }
        console.log("cambiando a usada")
        purchase.status = 'used';
        purchase.usageDate = new Date();

        await purchase.save();

        const productTime = purchase.product.time;

        const activation = await Activation.create({
            user: userId,
            purchase: purchaseId,
            station: stationId
            // startTime y status se asignan automáticamente
        });

        const topic = `${process.env.MQTT_TOPIC}/${res.locals.station.installation._id}`;
        const msg = JSON.stringify({
            "a": 1, // action 1 to activate
            "s": stationId, //station
            "ai": activation._id,
            "t": productTime //time
        });
        const callBackMQTT = () => {
            /*res.status(201).json({
                success: true,
                data: activation
            });*/
            res.locals.inUse = 1;
            ///next();
            res.json({
                success: true,
                data: activation
            });
        }
        publishMessage(req, res, topic, msg, callBackMQTT);
        /*req.mqttClient.publish(process.env.MQTT_TOPIC, "activando", { qos: 1 }, (error) => {
            if (error) console.error("Error MQTT:", error);
            else console.log("MQTT test message sent");
        });*/


    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
};

export default startActivation;