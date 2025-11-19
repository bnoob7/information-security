// User database
const userDatabase = {
    "santoshi": "test",
    "user2": "securepass",
    // Add more users here
};

// Generate 6-digit OTP
function generateOtp() {
    let otp = "";
    for (let i = 0; i < 6; i++) {
        otp += Math.floor(Math.random() * 10); // 0-9
    }
    return otp;
}

// Authenticate with username, password, and OTP
function authenticateWith2FA(username, password, otp, generatedOtp) {
    return userDatabase[username] === password && otp === generatedOtp;
}

// Node.js readline for input
const readline = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout
});

readline.question("Enter your username: ", (username) => {
    readline.question("Enter your password: ", (password) => {

        const generatedOtp = generateOtp();
        console.log("Generated OTP:", generatedOtp);

        readline.question("Enter the OTP: ", (enteredOtp) => {

            if (authenticateWith2FA(username, password, enteredOtp, generatedOtp)) {
                console.log("Authentication successful!");
            } else {
                console.log("Authentication failed.");
            }

            readline.close();
        });
    });
});
