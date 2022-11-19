import amqp from 'amqplib';

async function connect() {
    const msgBuffer = Buffer.from(JSON.stringify({ number: 10 }));
    try {
        const connection = await amqp.connect("amqp://localhost:5672");
        const channel = await connection.createChannel();
        await channel.assertQueue("number");
        await channel.sendToQueue("number", msgBuffer);
        console.log("Sending message to number queue");
        await channel.close();
        await connection.close();
    } catch (ex) {
        console.error(ex);
    }
} connect();