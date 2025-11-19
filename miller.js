function modPow(base, exponent, modulus) {
    base = base % modulus;
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

function isProbablyPrime(n, k = 5) {
    n = BigInt(n);

    if (n <= 1n) return false;
    if (n <= 3n) return true;
    if (n % 2n === 0n) return false;

    // Write n − 1 as 2^s * d
    let s = 0n;
    let d = n - 1n;

    while (d % 2n === 0n) {
        d /= 2n;
        s += 1n;
    }

    for (let i = 0; i < k; i++) {
        // Random a in [2, n-2]
        const a = 2n + BigInt(Math.floor(Math.random() * Number(n - 3n)));

        let x = modPow(a, d, n);

        if (x === 1n || x === n - 1n) continue;

        let passed = false;

        for (let r = 1n; r < s; r++) {
            x = (x * x) % n;
            if (x === n - 1n) {
                passed = true;
                break;
            }
        }

        if (!passed) return false; // Composite
    }

    return true; // Probably prime
}

// User input handling
const readline = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout
});

readline.question("Enter the number: ", (input) => {
    const num = BigInt(input);
    const result = isProbablyPrime(num);

    console.log(`${num} is probably prime:`, result);

    readline.close();
});

