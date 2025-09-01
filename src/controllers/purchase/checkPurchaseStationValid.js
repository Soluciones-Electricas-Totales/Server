import Purchase from '../../models/Purchase.js';
import Station from '../../models/Station.js';

const checkPurchaseStationValid = async (req, res, next) => {
    try {
        const { stationId, purchaseId } = req.body;

        if (!purchaseId) {
            return res.status(400).json({ message: 'Se requiere el ID de la compra' });
        }

        const purchase = await Purchase.findById(purchaseId)
            .populate({
                path: 'product',
                populate: {
                    path: 'belongsTo'
                }

            })

        if (!purchase) {
            return res.status(404).json({ message: 'compra no encontrada.' });
        }

        if (!stationId) {
            return res.status(400).json({ message: 'Se requiere el ID de la estación.' });
        }

        const station = await Station.findById(stationId).populate({
            path: 'installation',
            populate: {
                path: 'organization',
            }
        });

        if (!station) {
            return res.status(404).json({ message: 'Estación no encontrada.' });
        }

        const ownerType = purchase.product.belongsTo.type

        if (ownerType === 'Installation') {

            if (purchase.product.belongsTo.id.toString() !== station.installation._id.toString()) {
                return res.status(401).json({ message: 'combinacion compra estacion invalidas' });
            }
            next();

        }
        else if (ownerType === 'Organization') {

            if (purchase.product.belongsTo.id.toString() !== station.installation.organization._id.toString()) {
                return res.status(401).json({ message: 'combinacion compra estacion invalidas' });
            }
            next();

        } else {
            return res.status(401).json({ message: 'datos no validos' });
        }

    } catch (error) {
        console.error('Error en checkPurchaseStationValid:', error);
        res.status(500).json({ message: 'Error interno del servidor.' });
    }
};

export default checkPurchaseStationValid;
