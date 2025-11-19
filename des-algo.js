const CryptoJS = require("crypto-js");

// Generate 8-byte DES key
function generateKey() {
    const key = CryptoJS.lib.WordArray.random(8);   // 8 bytes = 64 bits
    return key;
}

function encrypt(key, plaintext) {
    const encrypted = CryptoJS.DES.encrypt(
        plaintext,
        key,
        {
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7
        }
    );
    return encrypted.ciphertext.toString(CryptoJS.enc.Hex);
}

function decrypt(key, ciphertextHex) {
    const ciphertext = CryptoJS.enc.Hex.parse(ciphertextHex);

    const decrypted = CryptoJS.DES.decrypt(
        {
            ciphertext: ciphertext
        },
        key,
        {
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7
        }
    );

    return decrypted.toString(CryptoJS.enc.Utf8);
}

// MAIN
const key = generateKey();
console.log("DES Key (hex):", key.toString(CryptoJS.enc.Hex));

const readline = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout
});

readline.question("Enter a message to encrypt: ", (message) => {

    const ciphertext = encrypt(key, message);
    console.log("Encrypted message (hex):", ciphertext);

    const decryptedMessage = decrypt(key, ciphertext);
    console.log("Decrypted message:", decryptedMessage);

    readline.close();
});
