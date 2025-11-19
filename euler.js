function eulerPhi(n) {
    n = BigInt(n);
    let result = n;
    let p = 2n;

    while (p * p <= n) {
        if (n % p === 0n) {
            while (n % p === 0n) {
                n /= p;
            }
            result -= result / p;
        }
        p += 1n;
    }

    if (n > 1n) {
        result -= result / n;
    }

    return result;
}

// User Input
const readline = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout
});

readline.question("Enter the number: ", (input) => {
    const num = BigInt(input);
    console.log(`Euler's Totient Function of ${num}:`, eulerPhi(num).toString());
    readline.close();
});
