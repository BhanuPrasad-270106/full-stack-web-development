const fs = require("fs");
const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("Enter file name: ", (filename) => {
    rl.question("Enter content: ", (content) => {

        // Create and write content to the file
        fs.writeFile(filename, content, (err) => {
            if (err) throw err;

            console.log("\nFile created and content written successfully.");

            // Read the file
            fs.readFile(filename, "utf8", (err, data) => {
                if (err) throw err;

                console.log("\nInitial file content:");
                console.log(data);

                rl.question("\nEnter additional content: ", (additionalContent) => {

                    // Append additional content
                    fs.appendFile(filename, "\n" + additionalContent, (err) => {
                        if (err) throw err;

                        console.log("\nContent appended successfully.");

                        // Read and display final content
                        fs.readFile(filename, "utf8", (err, finalData) => {
                            if (err) throw err;

                            console.log("\nFinal file content:");
                            console.log(finalData);

                            rl.close();
                        });
                    });
                });
            });
        });
    });
});
