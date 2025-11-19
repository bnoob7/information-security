function modPow(base, exp, mod) {
    base = base % mod;
    let result = 1n;

    while (exp > 0n) {
        if (exp % 2n === 1n) {
            result = (result * base) % mod;
        }
        exp /= 2n;
        base = (base * base) % mod;
    }
    return result;
}

function isPrimeFermat(n, k = 5) {
    n = BigInt(n);

    if (n <= 1n) return false;
    if (n <= 3n) return true;

    for (let i = 0; i < k; i++) {
        const a = 2n + BigInt(Math.floor(Math.random() * Number(n - 3n)));

        if (modPow(a, n - 1n, n) !== 1n) {
            return false; // Composite
        }
    }
    return true; // Probably prime
}

// User input
const readline2 = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout
});

readline2.question("Enter the number: ", (num) => {
    const result = isPrimeFermat(num);
    console.log(`${num} is prime:`, result);
    readline2.close();
});
