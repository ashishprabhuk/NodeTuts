// Importing built-in modules
const fs = require('fs'); // File system module
const http = require('http'); // HTTP module
require('dotenv').config();

// Creating a server
const server = http.createServer((req, res) => {
    // Handling HTTP requests
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello, World!');
});
const port = process.env.PORT || 3000;

// Starting the server
server.listen(3000, 'localhost', () => {
    console.log('Server is running on port 3000');
});

// Reading a file
fs.readFile('file.txt', 'utf8', (err, data) => {
    if (err) throw err;
    console.log(data);
});

// Writing to a file
fs.writeFile('file.txt', 'Hello, World!', (err) => {
    if (err) throw err;
    console.log('File has been written');
});

// Creating a directory
fs.mkdir('mydir', (err) => {
    if (err) throw err;
    console.log('Directory has been created');
});

// Deleting a file
fs.unlink('file.txt', (err) => {
    if (err) throw err;
    console.log('File has been deleted');
});
