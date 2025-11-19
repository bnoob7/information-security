const CryptoJS = require("crypto-js");

function calculateSHA256(inputString) {
    return CryptoJS.SHA256(inputString).toString(CryptoJS.enc.Hex);
}

const readline = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout
});

readline.question("Enter a string to calculate its SHA-256 hash: ", (userInput) => {

    const sha256Result = calculateSHA256(userInput);
    console.log(`SHA-256 Hash: ${sha256Result}`);

    readline.close();
});
