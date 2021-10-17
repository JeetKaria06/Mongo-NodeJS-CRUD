var dotenv = require('dotenv');
dotenv.config();

const port = process.env.BACKEND_SERVER_PORT;
const http = require("http");
const server = http.createServer(require('./app'));

server.listen(port, () => {
    console.log(`Now listening on port ${port}`);
});