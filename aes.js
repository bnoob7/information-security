const CryptoJS = require("crypto-js");

// Generate a 16-byte AES key
function generateKey() {
    const key = CryptoJS.lib.WordArray.random(16); // 128-bit key
    return key;
}

// Encrypt with AES-CBC
function encrypt(key, plaintext) {
    const iv = CryptoJS.lib.WordArray.random(16); // 16-byte IV

    const encrypted = CryptoJS.AES.encrypt(
        plaintext,
        key,
        {
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        }
    );

    // Return ciphertext (hex) and IV (WordArray)
    return {
        ciphertext: encrypted.ciphertext.toString(CryptoJS.enc.Hex),
        iv: iv.toString(CryptoJS.enc.Hex)
    };
}

// Decrypt AES-CBC
function decrypt(key, ciphertextHex, ivHex) {
    const ciphertext = CryptoJS.enc.Hex.parse(ciphertextHex);
    const iv = CryptoJS.enc.Hex.parse(ivHex);

    const decrypted = CryptoJS.AES.decrypt(
        {
            ciphertext: ciphertext
        },
        key,
        {
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        }
    );

    return decrypted.toString(CryptoJS.enc.Utf8);
}

// MAIN
const key = generateKey();
console.log("AES Key (hex):", key.toString(CryptoJS.enc.Hex));

const readline = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout
});

readline.question("Enter a message to encrypt: ", (msg) => {

    const { ciphertext, iv } = encrypt(key, msg);

    console.log("Encrypted message (hex):", ciphertext);
    console.log("Initialization Vector (IV):", iv);

    const decrypted = decrypt(key, ciphertext, iv);
    console.log("Decrypted message:", decrypted);

    readline.close();
});
