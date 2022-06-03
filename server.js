// Require the framework and instantiate it
const fastify = require("fastify")({ logger: true });

fastify.register(require("@fastify/swagger"), {
  routePrefix: "/swagger",
  swagger: {
    info: {
      title: "Test swagger",
      description: "Testing the Fastify swagger API",
      version: "0.1.0",
    },
  },
  exposeRoute: true,
});
fastify.register(require("./routes/items"));

const PORT = 5000;

// Run the server!
const start = async () => {
  try {
    await fastify.listen(PORT);
  } catch (error) {
    fastify.log.error(error);
    process.exit(1);
  }
};

start();
