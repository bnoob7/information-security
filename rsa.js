const forge = require("node-forge");

// Generate RSA keypair
function generateKeypair() {
    const keypair = forge.pki.rsa.generateKeyPair(2048);

    const privateKeyPem = forge.pki.privateKeyToPem(keypair.privateKey);
    const publicKeyPem = forge.pki.publicKeyToPem(keypair.publicKey);

    return { privateKeyPem, publicKeyPem };
}

// Encrypt with public key (OAEP)
function encrypt(publicKeyPem, message) {
    const publicKey = forge.pki.publicKeyFromPem(publicKeyPem);

    const encryptedBytes = publicKey.encrypt(message, "RSA-OAEP");

    return forge.util.bytesToHex(encryptedBytes);
}

// Decrypt with private key (OAEP)
function decrypt(privateKeyPem, ciphertextHex) {
    const privateKey = forge.pki.privateKeyFromPem(privateKeyPem);

    const ciphertextBytes = forge.util.hexToBytes(ciphertextHex);

    const decrypted = privateKey.decrypt(ciphertextBytes, "RSA-OAEP");

    return decrypted;
}

// User input (Node.js)
const readline = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout
});

const { privateKeyPem, publicKeyPem } = generateKeypair();

console.log("Public key:");
console.log(publicKeyPem);

console.log("Private key:");
console.log(privateKeyPem);

readline.question("Enter a message to encrypt: ", (message) => {
    const encrypted = encrypt(publicKeyPem, message);
    console.log("Encrypted message:", encrypted);

    const decrypted = decrypt(privateKeyPem, encrypted);
    console.log("Decrypted message:", decrypted);

    readline.close();
});
