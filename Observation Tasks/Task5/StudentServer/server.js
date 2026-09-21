const express = require("express");

const app = express();
const PORT = 3000;

// Home route
app.get("/", (req, res) => {
    res.send("<h1>Welcome to Student Server</h1><p>This is an Express.js application.</p>");
});

// Students route
app.get("/students", (req, res) => {
    const students = [
        "Bhanu Prasad",
        "Rahul",
        "Anil",
        "Priya",
        "Suresh"
    ];

    res.json(students);
});

// About route
app.get("/about", (req, res) => {
    res.send(`
        <h1>About</h1>
        <p>Student Server is a basic Express.js application.</p>
        <p>It demonstrates routing and HTTP GET methods.</p>
    `);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
