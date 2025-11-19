function caesarCipher(text, shift) {
    let result = ""; // Store encrypted/decrypted text

    for (let i = 0; i < text.length; i++) {
        const char = text[i];

        if (char.match(/[a-zA-Z]/)) { // Check if the character is a letter
            const isUpper = char === char.toUpperCase();
            const base = isUpper ? "A".charCodeAt(0) : "a".charCodeAt(0);

            // Calculate shifted character
            const shiftedChar = String.fromCharCode(
                ((char.charCodeAt(0) - base + shift) % 26 + 26) % 26 + base
            );

            result += shiftedChar;
        } else {
            result += char; // Keep non-letter characters as is
        }
    }

    return result;
}

// Example usage:
console.log(caesarCipher("Hello, World!", 3)); // "Khoor, Zruog!"
console.log(caesarCipher("binod gururng", 2)); // "Hello, World!"
