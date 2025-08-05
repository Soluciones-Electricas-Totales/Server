import Purchase from '../../models/Purchase.js';

const getUserPurchases = async (req, res) => {
    try {

        const { status, minPrice, maxPrice, startDate, endDate, product } = req.query;

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

        res.json({
            success: true,
            count: purchases.length,
            data: purchases
        });

    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

export default getUserPurchases;