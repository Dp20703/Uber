const http = require('http');
const app = require('./app')
const port = process.env.PORT || 3000;
const connectToDb = require('./Db/db');
connectToDb();

const server = http.createServer(app);


server.listen(port, () => {
    console.log(`Server is listening on http://localhost:${port}`)
})