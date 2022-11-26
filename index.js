import connect from './src/conection.js';
connect.then(read);
async function read(connection) {
    const channel = await connection.createChannel()
    channel.consume("number", message => {
        const input = JSON.parse(message.content.toString());
        console.log(`Received number: ${input.number}`);
        channel.ack(message);
    });
}