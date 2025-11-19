const fs = require("fs");
const path = require("path");
const os = require("os");

// Path to Downloads/test.txt
const downloadsFolder = path.join(os.homedir(), "Downloads");
const fileToDelete = path.join(downloadsFolder, "test.txt");

// Check if file exists
if (fs.existsSync(fileToDelete)) {
    try {
        fs.unlinkSync(fileToDelete); // Delete the file
        console.log("File deleted successfully.");
    } catch (err) {
        console.error("Error deleting the file:", err.message);
    }
} else {
    console.log("The file does not exist or the path is incorrect.");
}

// Pause equivalent
const readline = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout
});

readline.question("Press Enter to exit...", () => {
    readline.close();
});
