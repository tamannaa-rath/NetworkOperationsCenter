const dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.PORT || 3000;

const http = require("http");
const app = require("./app");

const { initializeSocket } = require("./socket/socket");
const { connectRedis } = require("./config/redis");

const server = http.createServer(app);

initializeSocket(server);

async function startServer() {

    await connectRedis();

    server.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

startServer();