import Activation from '../../models/Activation.js';

export const getUserActiveActivations = async (req, res) => {
    try {
        const userId = req.user._id; // ID del usuario autenticado

        const activations = await Activation.find({
            user: userId,
            status: 'active'
        })
            .populate({
                path: 'purchase',
                populate: { // Poblamos anidadamente si es necesario
                    path: 'product', // Ejemplo: si purchase tiene referencia a product
                    select: 'name price time' // Solo campos necesarios
                }
            })
            .populate('station', 'name location'); // También poblamos station si es necesario

        // Formateamos la respuesta para incluir información relevante
        const formattedActivations = activations.map(activation => ({
            _id: activation._id,
            startTime: activation.startTime,
            purchase: {
                _id: activation.purchase._id,
                product: activation.purchase.product,
                // Agrega otros campos de purchase que necesites
                createdAt: activation.purchase.createdAt
            },
            station: activation.station,
            // Puedes incluir campos calculados
            duration: activation.durationMinutes // Usando el virtual property
        }));

        res.status(200).json({
            success: true,
            count: activations.length,
            data: formattedActivations
        });

    } catch (error) {
        console.error('Error getting active activations:', error);
        res.status(500).json({
            success: false,
            message: 'Error al obtener las activaciones activas',
            error: error.message
        });
    }
};