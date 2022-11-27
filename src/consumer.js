import importNFe from './extract.js';

export default async function read(connection) {
    const channel = await connection.createChannel()
    channel.consume("brute_nfe", message => {
        console.log("📜 - Nota Fiscal Bruta recebida")
        importNFe(message.content.toString());
        channel.ack(message);
    });
}