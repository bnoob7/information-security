// Generate 6-character CAPTCHA
function generateCaptcha() {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let captcha = "";
    for (let i = 0; i < 6; i++) {
        captcha += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return captcha;
}

// Verify CAPTCHA
function verifyCaptcha(inputCaptcha, generatedCaptcha) {
    return inputCaptcha === generatedCaptcha;
}

// Node.js readline for user input
const readline = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout
});

const generatedCaptcha = generateCaptcha();
console.log("Generated CAPTCHA:", generatedCaptcha);

readline.question("Enter the CAPTCHA: ", (inputCaptcha) => {
    if (verifyCaptcha(inputCaptcha, generatedCaptcha)) {
        console.log("CAPTCHA verification successful!");
    } else {
        console.log("CAPTCHA verification failed.");
    }
    readline.close();
});
