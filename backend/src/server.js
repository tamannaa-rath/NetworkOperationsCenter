const app = require("./app");
const deviceRouter = require("./routes/device.routes");

app.use ("/api/devices", deviceRouter);

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});