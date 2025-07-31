import dotenv from 'dotenv';
import getHashSHA256 from './getHashSHA256.js';

dotenv.config();

const createSignatureIntegrity = async (reference, amount) => {

    const signatureConcatenated = `${reference}${amount}COP${process.env.WOMPI_INTEGRITY_SECRET}`

    const hashHex = getHashSHA256(signatureConcatenated);

    return hashHex;
};

export default createSignatureIntegrity;