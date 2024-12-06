const express = require("express");
const http = require("http");
const { ApolloServer } = require("@apollo/server");

const bodyParser = require("body-parser");
const { expressMiddleware } = require("@apollo/server/express4");
const { WebSocketServer } = require("ws");
const { useServer } = require("graphql-ws/lib/use/ws");
const cors = require("cors");
const schema = require("./schema");

const { PubSub } = require("graphql-subscriptions");

const pubsub = new PubSub();

const app = express();
const httpServer = http.createServer(app);

const wsServer = new WebSocketServer({
  server: httpServer,
  path: "/graphql",
});

useServer(
  {
    schema,
    context: ({ req }) => {
      console.log("WebSocket connection:", { pubsub }); // Verifica que la conexión está presente

      return { pubsub };
    },
  },
  wsServer
);



const main = async () => {
  const server = new ApolloServer({
    schema,
    context: ({ req }) => {
      console.log("HTTP Context:", { pubsub });
      return { pubsub };
    },
    // plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });
  await server.start();
  app.use(
    "/graphql",
    cors({
      origin: ["http://localhost:5173"],
    }),
    bodyParser.json(),
    expressMiddleware(server, {
      context: ({ req }) => {
        console.log("Contexto en Express:", { pubsub });
        return { pubsub }; 
      },
    })
  );

  httpServer.listen(process.env.PORT, () => {
    console.log(`🚀 Server ready at: http://localhost:${process.env.PORT}`);
    console.log(`🚀 Subscriptions ready at ws://localhost:${process.env.PORT}/graphql`);
  });
};

main();
