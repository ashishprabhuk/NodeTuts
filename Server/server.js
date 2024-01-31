const http = require('http');
require('dotenv').config();

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify('ashishprabhuk'));
});

// const port = 3000;
const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});

require('dotenv').config(); // Load environment variables from .env file