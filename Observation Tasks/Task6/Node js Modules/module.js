// Import Node.js built-in modules
const os = require('os');
const path = require('path');
const fs = require('fs');

// ==================== OS MODULE ====================

console.log("===== OS MODULE =====");

console.log("Operating System:", os.type());
console.log("Platform:", os.platform());
console.log("Architecture:", os.arch());
console.log("CPU Cores:", os.cpus().length);
console.log("Free Memory:", os.freemem());


// ==================== PATH MODULE ====================

console.log("\n===== PATH MODULE =====");

const filePath = path.join(__dirname, 'student.txt');

console.log("Complete Path:", filePath);
console.log("File Name:", path.basename(filePath));
console.log("Directory:", path.dirname(filePath));
console.log("Extension:", path.extname(filePath));


// ==================== FS MODULE ====================

console.log("\n===== FS MODULE =====");

// Create and write to a file
fs.writeFileSync(
    filePath,
    "Name: Bhanu Prasad\nBranch: CSM\nCollege: ANITS"
);

console.log("File created successfully");

// Read the file
const data = fs.readFileSync(filePath, 'utf8');

console.log("\nFile Content:");
console.log(data);
