import dotenv from 'dotenv';
import getHashSHA256 from './getHashSHA256.js';
import { updatePaymentStatus } from '../../lib/UpdatePaymentStatus.js';

dotenv.config();

const paymentCallback = async (req, res) => {
    try {
        const { event, data, signature, environment, timestamp } = req.body;

        // 1. Validar estructura básica
        if (!event || !data || !signature?.checksum || !timestamp) {
            return res.status(400).json({ error: 'Body inválido: faltan campos requeridos' });
        }

        console.log(req.body);

        // 2. Verificar firma 
        if (process.env.WOMPI_EVENTS_SECRET) {
            const expectedSignature = await getHashSHA256(`${data.transaction.id}${data.transaction.status}${data.transaction.amount_in_cents}${timestamp}${process.env.WOMPI_EVENTS_SECRET}`);

            if (signature.checksum !== expectedSignature) {
                return res.status(403).json({ error: 'Firma inválida' });
            }
        }

        const bdStates = {
            'APPROVED': 'approved',
            'VOIDED': 'cancelled',
            'DECLINED': 'declined',
            'ERROR': 'error',
        }

        const bdStatus = bdStates[data.transaction.status]

        if (!bdStatus) {
            return res.status(401).json({ error: 'datos inválidos' });
        }

        // 3. Procesar según el tipo de evento
        switch (event) {
            case 'transaction.updated':
                console.log('Transaction updated:', data);

                const updatedPayment = updatePaymentStatus(data.transaction.reference, bdStatus, data.transaction);

                if (!updatedPayment) {
                    return res.status(401).json({ error: 'datos inválidos' });
                }
                break;

            case 'nequi_token.updated':
                console.log('nequi_token.updated', data);
                const updatedPayment1 = updatePaymentStatus(data.transaction.reference, bdStatus, data.transaction);

                if (!updatedPayment1) {
                    return res.status(401).json({ error: 'datos inválidos' });
                }
                break;

            case 'bancolombia_transfer_token.updated':
                console.log('bancolombia_transfer_token.updated', data);
                const updatedPayment2 = updatePaymentStatus(data.transaction.reference, bdStatus, data.transaction);

                if (!updatedPayment2) {
                    return res.status(401).json({ error: 'datos inválidos' });
                }
                break;

            default:
                console.log('Evento no manejado:', event);
        }
        console.log("success");

        // 4. Responder éxito (Wompi espera 200 OK)
        res.status(200).json({ received: true });

    } catch (error) {
        console.error('Error en webhook:', error);
        res.status(500).json({ error: 'Error interno' });
    }
};

export default paymentCallback;