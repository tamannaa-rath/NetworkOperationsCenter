const axios = require("axios");

const API_URL = "http://localhost:3000/api";

async function getDevices() {
    const response = await axios.get(`${API_URL}/devices`);

    return response.data;
}


function generateMetric(device_id) {

    const failureChance = Math.random();

    let cpu_usage;
    let memory_usage;
    let disk_usage;
    let network_throughput;
    let latency;
    let packet_loss;


    // CRITICAL CPU FAILURE
    if (failureChance < 0.10) {

        cpu_usage = Number(
            (Math.random() * 10 + 90).toFixed(2)
        );

        memory_usage = Number(
            (Math.random() * 30 + 60).toFixed(2)
        );

        disk_usage = Number(
            (Math.random() * 30 + 50).toFixed(2)
        );

        network_throughput = Number(
            (Math.random() * 40 + 20).toFixed(2)
        );

        latency = Number(
            (Math.random() * 100 + 100).toFixed(2)
        );

        packet_loss = Number(
            (Math.random() * 5 + 5).toFixed(2)
        );

    }


    // NORMAL OPERATION
    else {

        cpu_usage = Number(
            (Math.random() * 70 + 20).toFixed(2)
        );

        memory_usage = Number(
            (Math.random() * 60 + 20).toFixed(2)
        );

        disk_usage = Number(
            (Math.random() * 50 + 30).toFixed(2)
        );

        network_throughput = Number(
            (Math.random() * 100).toFixed(2)
        );

        latency = Number(
            (Math.random() * 40 + 10).toFixed(2)
        );

        packet_loss = Number(
            (Math.random() * 1).toFixed(2)
        );

    }


    return {
        device_id,
        cpu_usage,
        memory_usage,
        disk_usage,
        network_throughput,
        latency,
        packet_loss
    };
}


async function startSimulator() {
    try {
        const devices = await getDevices();

        console.log(`Found ${devices.length} devices`);

        devices.forEach((device) => {
            console.log(
                `Simulating ${device.hostname} (ID: ${device.id})`
            );
        });

        setInterval(async () => {

            for (const device of devices) {

                const metric = generateMetric(device.id);

                try {
                    const response = await axios.post(
                        `${API_URL}/metrics`,
                        metric
                    );

                    console.log(
                        `[${device.hostname}]`,
                        response.data
                    );

                } catch (error) {
                    console.error(
                        `[${device.hostname}] Failed to send metric:`,
                        error.response?.data || error.message
                    );
                }
            }

        }, 5000);

    } catch (error) {
        console.error(
            "Failed to start simulator:",
            error.response?.data || error.message
        );
    }
}


startSimulator();
