import mongoose from 'mongoose';
import Installation from '../../models/Installation.js';
import Product from '../../models/Product.js';

const getProductsByInstallation = async (req, res) => {
    try {
        const { installationId } = req.params;

        // 2. Buscar la instalación para obtener la organización
        const installation = await Installation.findById(installationId);

        if (!installation) {
            return res.status(404).json({
                success: false,
                message: 'Instalación no encontrada'
            });
        }

        const organizationId = installation.organization;

        // 3. Buscar productos de la organización (paralelismo para mejor performance)
        const [orgProducts, installationProducts] = await Promise.all([
            // Productos de la organización
            Product.find({
                'belongsTo.id': organizationId,
                'belongsTo.type': 'Organization'
            }),

            // Productos específicos de la instalación
            Product.find({
                'belongsTo.id': installationId,
                'belongsTo.type': 'Installation'
            })
        ]);

        // 4. Combinar y eliminar duplicados (si es necesario)
        const combinedProducts = [...orgProducts, ...installationProducts];

        const uniqueProducts = combinedProducts.filter(
            (product, index, self) => index === self.findIndex(p => p._id.equals(product._id))
        );

        res.json({
            success: true,
            data: {
                installation: {
                    _id: installation._id,
                    name: installation.name
                },
                organization: {
                    _id: organizationId,
                    name: installation.organization?.name // Si haces populate
                },
                products: uniqueProducts,
                counts: {
                    organizationProducts: orgProducts.length,
                    installationProducts: installationProducts.length,
                    total: uniqueProducts.length
                }
            }
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener products',
            error: error.message
        });
    }
};

export default getProductsByInstallation;