import dotenv from 'dotenv';
import getHashSHA256 from './getHashSHA256';

dotenv.config();

const paymentCallback = async (req, res) => {
    try {
        const { event, data, signature, environment, timestamp } = req.body;

        // 1. Validar estructura básica
        if (!event || !data || !signature?.checksum || !timestamp) {
            return res.status(400).json({ error: 'Body inválido: faltan campos requeridos' });
        }

        // 2. Verificar firma (opcional pero recomendado)
        if (process.env.WOMPI_EVENTS_SECRET) {
            const expectedSignature = await getHashSHA256(`${data.transaction.id}${data.transaction.status}${data.transaction.amount_in_cents}${timestamp}${process.env.WOMPI_EVENTS_SECRET}`);

            if (signature.checksum !== expectedSignature) {
                return res.status(403).json({ error: 'Firma inválida' });
            }
        }

        // 3. Procesar según el tipo de evento
        switch (event) {
            case 'transaction.updated':
                console.log('Transaction updated:', data);
                // Ejemplo: Actualizar estado en base de datos
                // await updateTransactionStatus(data.id, data.status);
                break;

            case 'charge.updated':
                console.log('Charge updated:', data);
                break;

            default:
                console.log('Evento no manejado:', event);
        }

        // 4. Responder éxito (Wompi espera 200 OK)
        res.status(200).json({ received: true });

    } catch (error) {
        console.error('Error en webhook:', error);
        res.status(500).json({ error: 'Error interno' });
    }
};

export default paymentCallback;