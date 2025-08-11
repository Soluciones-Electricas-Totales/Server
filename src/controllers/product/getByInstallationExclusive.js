import mongoose from 'mongoose';
import Installation from '../../models/Installation.js';
import Product from '../../models/Product.js';

const getProductsByInstallationExclusive = async (req, res) => {
    try {
        const { installationId } = req.params;

        // 2. Buscar la instalación para obtener la organización
        const installation = await Installation.findById(installationId)
            .populate({
                path: 'products',
                select: 'name description price time createdAt', // Campos a incluir
                options: { sort: { createdAt: -1 } } // Ordenar por fecha descendente
            });

        if (!installation) {
            return res.status(404).json({
                success: false,
                message: 'Instalación no encontrada'
            });
        }

        const isOwner = req.user._id.equals(installation.owner);

        if (!isOwner) {
            return res.status(403).json({
                success: false,
                error: 'unauthorized'
            });
        }

        res.json({
            success: true,
            count: installation.products.length,
            data: installation.products
        });


    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener products',
            error: error.message
        });
    }
};

export default getProductsByInstallationExclusive;