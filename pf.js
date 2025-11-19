const readline = require("readline");

// Create 5x5 matrix using secret key
function createMatrix(key) {
    key = key.toUpperCase().replace(/J/g, "I");
    const matrix = Array.from({ length: 5 }, () => Array(5).fill(0));
    const lettersAdded = [];

    // Add key letters
    for (let char of key) {
        if (/[A-Z]/.test(char) && !lettersAdded.includes(char)) {
            lettersAdded.push(char);
        }
    }

    // Add remaining letters (I/J treated as same)
    for (let i = 65; i <= 90; i++) {
        if (i === 74) continue; // Skip 'J'
        const letter = String.fromCharCode(i);
        if (!lettersAdded.includes(letter)) lettersAdded.push(letter);
    }

    // Fill matrix
    let index = 0;
    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
            matrix[i][j] = lettersAdded[index];
            index++;
        }
    }

    return matrix;
}

// Separate same letters in a pair
function separateSameLetters(message) {
    let result = "";
    let index = 0;

    while (index < message.length) {
        const l1 = message[index];
        let l2 = message[index + 1] || "X";

        if (l1 === l2) {
            result += l1 + "X";
            index++;
        } else {
            result += l1 + l2;
            index += 2;
        }
    }

    return result;
}

// Find index of letter in matrix
function indexOfLetter(letter, matrix) {
    for (let i = 0; i < 5; i++) {
        const j = matrix[i].indexOf(letter);
        if (j !== -1) return [i, j];
    }
    return [-1, -1];
}

// Playfair cipher
function playfair(key, message, encrypt = true) {
    const inc = encrypt ? 1 : -1;
    const matrix = createMatrix(key);

    message = message.toUpperCase().replace(/J/g, "I").replace(/ /g, "");
    message = separateSameLetters(message);
    let cipherText = "";

    for (let i = 0; i < message.length; i += 2) {
        const l1 = message[i];
        const l2 = message[i + 1];
        const [row1, col1] = indexOfLetter(l1, matrix);
        const [row2, col2] = indexOfLetter(l2, matrix);

        if (row1 === row2) {
            // Same row
            cipherText += matrix[row1][(col1 + inc + 5) % 5] + matrix[row2][(col2 + inc + 5) % 5];
        } else if (col1 === col2) {
            // Same column
            cipherText += matrix[(row1 + inc + 5) % 5][col1] + matrix[(row2 + inc + 5) % 5][col2];
        } else {
            // Rectangle swap
            cipherText += matrix[row1][col2] + matrix[row2][col1];
        }
    }

    return cipherText;
}

// Node.js input
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("Enter message: ", (plaintext) => {
    rl.question("Enter secret key: ", (secretKey) => {
        const cipherText = playfair(secretKey, plaintext);
        console.log("Encrypted:", cipherText);

        const decrypted = playfair(secretKey, cipherText, false);
        console.log("Decrypted:", decrypted);

        rl.close();
    });
});
