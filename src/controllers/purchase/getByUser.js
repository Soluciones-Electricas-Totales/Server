import Payment from '../../models/Payment.js';
import Purchase from '../../models/Purchase.js';

const getUserPurchases = async (req, res) => {
    try {

        const { status, minPrice, maxPrice, startDate, endDate, product, paymentStatus } = req.query;

        const filters = {
            user: req.user._id // Siempre filtrar por el usuario autenticado
        };

        if (status) filters.status = status;
        if (product) filters.product = product;

        // Filtros numéricos/rangos
        if (minPrice || maxPrice) {
            filters.purchasePrice = {};
            if (minPrice) filters.purchasePrice.$gte = Number(minPrice);
            if (maxPrice) filters.purchasePrice.$lte = Number(maxPrice);
        }

        // Filtros por fechas
        if (startDate || endDate) {
            filters.purchaseDate = {};
            if (startDate) filters.purchaseDate.$gte = new Date(startDate);
            if (endDate) filters.purchaseDate.$lte = new Date(endDate);
        }

        const purchases = await Purchase.find(filters)
            .populate('product')
            .sort('-purchaseDate');

        let filteredPurchases = purchases;

        console.log("declaracion");
        console.log(filteredPurchases);


        if (purchases.length > 0) {
            console.log("entra p");

            const purchaseIds = purchases.map(purchase => purchase._id);
            const payments = await Payment.find({
                purchase: { $in: purchaseIds }
            }).select('purchase status paymentGateway amount currency processedAt createdAt');
            const paymentMap = {};
            payments.forEach(payment => {
                paymentMap[payment.purchase.toString()] = payment;
            });
            console.log(paymentMap);

            // Formatear la respuesta para incluir la información del payment
            const formattedPurchases = purchases.map(purchase => {
                const payment = paymentMap[purchase._id.toString()];
                return {
                    ...purchase.toObject(), // Convertir a objeto plano
                    payment: payment || null
                };
            });
            console.log(formattedPurchases);

            // Si hay filtro por paymentStatus, aplicarlo después
            filteredPurchases = formattedPurchases;
            if (paymentStatus) {
                filteredPurchases = formattedPurchases.filter(purchase =>
                    purchase.payment && purchase.payment.status === paymentStatus
                );
            }

        }
        console.log(filteredPurchases);


        res.json({
            success: true,
            count: filteredPurchases.length,
            data: filteredPurchases
        });

    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

export default getUserPurchases;