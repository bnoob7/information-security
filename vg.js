// mode = 1 for encryption, -1 for decryption
function vigenereCipher(text, key, mode) {
    let result = "";
    key = key.toUpperCase();

    for (let i = 0, j = 0; i < text.length; i++) {
        const char = text[i];

        if (/[a-zA-Z]/.test(char)) {
            const keyShift = key[j % key.length].charCodeAt(0) - "A".charCodeAt(0);
            let shiftedChar;

            if (char === char.toUpperCase()) {
                shiftedChar = String.fromCharCode(
                    ((char.charCodeAt(0) - "A".charCodeAt(0) + mode * keyShift + 26) % 26) + "A".charCodeAt(0)
                );
            } else {
                shiftedChar = String.fromCharCode(
                    ((char.charCodeAt(0) - "a".charCodeAt(0) + mode * keyShift + 26) % 26) + "a".charCodeAt(0)
                );
            }

            result += shiftedChar;
            j++; // Only increment key index if a letter is processed
        } else {
            result += char; // Non-letter characters remain unchanged
        }
    }

    return result;
}

// Example usage:
const plaintext = "Hello binod!";
const key = "gurung";

const encrypted = vigenereCipher(plaintext, key, 1); // Encrypt
console.log("Encrypted:", encrypted);

const decrypted = vigenereCipher(encrypted, key, -1); // Decrypt
console.log("Decrypted:", decrypted);
