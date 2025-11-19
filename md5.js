const CryptoJS = require("crypto-js");

const readline = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout
});

readline.question("Enter string to encrypt using MD5: ", (inputStr) => {

    const hash = CryptoJS.MD5(inputStr).toString(CryptoJS.enc.Hex);

    console.log(`MD5 hash of '${inputStr}': ${hash}`);

    readline.close();
});
