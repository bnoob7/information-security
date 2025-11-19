// Encrypt plaintext using Rail Fence Cipher
function railFenceEncrypt(plaintext, rails) {
    // Create rail matrix
    const railMatrix = Array.from({ length: rails }, () =>
        Array.from({ length: plaintext.length }, () => '\n')
    );

    let direction = -1;
    let row = 0, col = 0;

    // Place characters in zig-zag
    for (let char of plaintext) {
        if (row === 0 || row === rails - 1) direction *= -1;

        railMatrix[row][col] = char;
        col++;
        row += direction;
    }

    // Read row by row to form ciphertext
    let ciphertext = '';
    for (let r of railMatrix) {
        for (let char of r) {
            if (char !== '\n') ciphertext += char;
        }
    }

    return ciphertext;
}

// Decrypt ciphertext using Rail Fence Cipher
function railFenceDecrypt(ciphertext, rails) {
    const railMatrix = Array.from({ length: rails }, () =>
        Array.from({ length: ciphertext.length }, () => '\n')
    );

    let direction = -1;
    let row = 0, col = 0;

    // Mark positions with '*'
    for (let i = 0; i < ciphertext.length; i++) {
        if (row === 0 || row === rails - 1) direction *= -1;
        railMatrix[row][col] = '*';
        col++;
        row += direction;
    }

    // Fill matrix with ciphertext characters
    let index = 0;
    for (let r = 0; r < rails; r++) {
        for (let c = 0; c < ciphertext.length; c++) {
            if (railMatrix[r][c] === '*' && index < ciphertext.length) {
                railMatrix[r][c] = ciphertext[index];
                index++;
            }
        }
    }

    // Read column by column to form plaintext
    let plaintext = '';
    col = 0;
    for (let i = 0; i < ciphertext.length; i++) {
        for (let r = 0; r < rails; r++) {
            if (railMatrix[r][col] !== '\n') {
                plaintext += railMatrix[r][col];
                col++;
                break;
            }
        }
    }

    return plaintext;
}

// Example usage:
const plaintext = "HELLOBINOD";
const rails = 4;

const encrypted = railFenceEncrypt(plaintext, rails);
console.log("Encrypted:", encrypted);

const decrypted = railFenceDecrypt(encrypted, rails);
console.log("Decrypted:", decrypted);
