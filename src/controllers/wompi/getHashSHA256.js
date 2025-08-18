import { createHash } from 'crypto';

const getHashSHA256 = async (phrase) => {

    // const encondedText = new TextEncoder().encode(phrase);
    // const hashBuffer = await crypto.subtle.digest("SHA-256", encondedText);
    // const hashArray = Array.from(new Uint8Array(hashBuffer));
    // const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");

    // return hashHex;
    return createHash('sha256')
        .update(phrase)
        .digest('hex');
};

export default getHashSHA256;