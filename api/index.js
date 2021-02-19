const fastify = require("fastify");
const fastifyCors = require("fastify-cors");

const delay = async (delay = 1000) => {
    await new Promise(resolve => setTimeout(resolve, Math.random() * (1000 - delay / 2) + delay / 2));
}

const getUUID = () => {
    let date = new Date().getTime();
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (item) => {
        const random = (date + Math.random() * 16) % 16 | 0;
        date = Math.floor(date / 16);
        return (item == 'x' ? random : (random & 0x3 | 0x8)).toString(16);
    });
}

const fastifyApp = fastify({
    logger: {
        level: "error"
    }
});

fastifyApp.register(fastifyCors, {});

fastifyApp.post("/login", async ({body}) => {
    const {login, password} = JSON.parse(body) || {};
    if (login === "user" && password === "qwerty") {
        const token = getUUID();
        await delay();
        return {token};
    }
    return {};
});

const start = async () => {
    try {
        await fastifyApp.listen(3001);
    } catch (error) {
        fastify.log.error(error);
        process.exit(1)
    }
}

start();
