// User database
const userDatabase = {
    "santoshi": "kc",
    "binod": "messi",
    // Add more users here
};

// Authentication function
function authenticate(username, password) {
    return userDatabase[username] === password;
}

// User input
const readline = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout
});

readline.question("Enter your username: ", (username) => {
    readline.question("Enter your password: ", (password) => {

        if (authenticate(username, password)) {
            console.log("Authentication successful!");
        } else {
            console.log("Authentication failed.");
        }

        readline.close();
    });
});
