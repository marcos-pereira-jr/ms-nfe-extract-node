import amqp from "amqplib";

function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const retry = async (url, awaiToRetry) => {
    try {
        const connection = await amqp.connect(url);
        console.log("😎 - To dentro!");
        console.log("🧐 - Iniciando o Trabalho")
        return connection; 1
    } catch (err) {
        console.log("😵‍💫 - Não foi possível se conectar");
        console.log("😴 - Esperando: " + awaiToRetry);
        await timeout(awaiToRetry)
        return retry(url, awaiToRetry);
    }
}

const connectRabbitMQ = new Promise((resolve, reject) => {
    const awaiToRetry = Number.parseInt(process.env.RETRY);
    const url = process.env.RABBITMQ;
    return retry(url, awaiToRetry).then(conection => resolve(conection));

});
export default connectRabbitMQ;