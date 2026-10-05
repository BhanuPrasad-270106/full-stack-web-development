const path = require("path");

// combine multiple path segments into a single file or directory path
const p = path.join("users", "Bhanu", "Documents", "Projects", "data.txt");
console.log(p);

// Creates an absolute path.
console.log(path.resolve("data.txt"));

// Gets filename.
console.log(path.basename("C:/Users/Bhanu/Documents/Projects/full-stack-web-development/Record/Week5"));

// Gets File Directory
console.log(path.dirname("C:/Users/Bhanu/Documents/Projects/full-stack-web-development/Record/Week5"));

// Gets the Extension
console.log(path.extname("image.jpg"));

// break a file path into its individual components.
console.log(path.parse("/home/user/data.txt"));