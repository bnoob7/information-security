// Modular exponentiation: (base^exponent) % modulus
function modExp(base, exponent, modulus) {
    base = BigInt(base);
    exponent = BigInt(exponent);
    modulus = BigInt(modulus);

    let result = 1n;

    while (exponent > 0n) {
        if (exponent % 2n === 1n) {
            result = (result * base) % modulus;
        }
        exponent /= 2n;
        base = (base * base) % modulus;
    }

    return result;
}

// Diffie-Hellman Key Exchange
function diffieHellmanKeyExchange(p, g, a, b) {
    p = BigInt(p);
    g = BigInt(g);
    a = BigInt(a);
    b = BigInt(b);

    const A = modExp(g, a, p); // public key of A
    const B = modExp(g, b, p); // public key of B

    const sharedSecretA = modExp(B, a, p);
    const sharedSecretB = modExp(A, b, p);

    return { sharedSecretA, sharedSecretB };
}

// User Input (Node.js)
const readline = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout
});

readline.question("Enter the prime no, greater prime is preferred: ", (p) => {
    readline.question(`Enter the primitive root of ${p}, i.e G: `, (g) => {
        readline.question("Enter private secret for party A: ", (a) => {
            readline.question("Enter private secret for party B: ", (b) => {

                const { sharedSecretA, sharedSecretB } =
                    diffieHellmanKeyExchange(p, g, a, b);

                console.log("Shared secret for party A:", sharedSecretA.toString());
                console.log("Shared secret for party B:", sharedSecretB.toString());

                readline.close();
            });
        });
    });
});
