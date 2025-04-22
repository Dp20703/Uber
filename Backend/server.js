const http = require('http');
const app = require('./app')
const port = process.env.PORT || 3000;
const connectToDb = require('./Db/db');
connectToDb();
const { initializeSocket } = require('./socket');


// Create HTTP server
const server = http.createServer(app);

// Initialize Socket.io
initializeSocket(server);

server.listen(port, () => {
    console.log(`Server is listening on http://localhost:${port}`)
})